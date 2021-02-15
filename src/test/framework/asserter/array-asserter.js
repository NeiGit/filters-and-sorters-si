import AssertionError from '../assertion-error.js';
import ObjectAsserter from './object-asserter.js';

export default class ArrayAsserter {
    constructor(arr, container) {
        this.arr = arr;
        if (container) {
            this.name = 'Array in ' + container;
        } else {
            this.name = 'Array';
        }
        this.assertionError = new AssertionError(this.name);
    }

    hasLength(expectedLength) {
        const actualLength = this.arr.length;
        if (actualLength !== expectedLength) {
            this.assertionError.failDifferentLength(expectedLength, actualLength);
        }
        return this;
    }

    isEmpty() {
        this.hasLength(0);
        return this;
    }

    isNotEmpty() {
        if (this.arr.length == 0) {
            this.assertionError.failArrayEmpty();
        }
        return this;
    }

    doesNotContainAny(unexpectedValue) {
        if (this.arr.includes(unexpectedValue)) {
            this.assertionError.failUnexpectedAttribute('any', unexpectedValue);
        }
        return this;
    }

    doesNotContainAll(unexpectedValues) {
        const presentValues = unexpectedValues.filter(v => this.arr.includes(v));
        if (presentValues.length) {
            this.assertionError.failUnexpectedValues(presentValues);
        }
        return this;
    }

    containsAny(expectedValue) {
        if (!this.arr.includes(expectedValue)) {
            this.assertionError.failValueNotPresent(expectedValue);
        }
        return this;
    }

    containsAll(expectedValues) {
        const notPresentValues = expectedValues.some(v => !this.arr.includes(v));
        if (notPresentValues.length) {
            this.assertionError.failValuesNotPresent(notPresentValues);
        }
        return this;
    }

    containsOnly(expectedValues) {
        this.hasLength(expectedValues.length);
        this.containsAll(expectedValues);
        return this;
    }

    containsOnlyInOrder(expectedValues) {
        expectedValues.forEach((v, expectedIndex) => {
            const actualIndex = this.arr.indexOf(v);
            if (actualIndex !== expectedIndex) {
                this.assertionError.failDifferentIndex(v, expectedIndex, actualIndex);
            }
        })
        return this;
    }

    allMatch (predicate) {
        this.arr.map(v => new ObjectAsserter(v))
            .forEach(predicate);
    }
}