import AssertionError from '../assertion-error.js';
import ArrayAsserter from './array-asserter.js';
import FunctionAsserter from './function-asserter.js';

export default class ObjectAsserter {
    constructor (o, container) {
        this.o = o
        if (container) {
            this.name =  o.constructor.name + ' in ' + container.constructor.name;
        } else {
            this.name = o.constructor.name;
        }   
        this.assertionError = new AssertionError(this.name)
    }

    hasAttribute(atrName) {
        const actualValue = this.getAttribute(atrName);
        if (typeof actualValue == 'undefined') {
            this.assertionError.failExpectedAttribute(atrName)
        }
        return this
    }

    hasAttributeWithValueAndType(atrName, expectedValue) {
        this.hasAttribute(atrName);
        const actualValue = this.getAttribute(atrName);
        if (actualValue !== expectedValue) {
            this.assertionError.attributeStrictEqualFails(atrName, expectedValue, actualValue)
        }
        return this
    }

    hasAttributeWithValue(atrName, expectedValue) {
        this.hasAttribute(atrName);
        const actualValue = this.getAttribute(atrName);
        if (actualValue != expectedValue) {
            this.assertionError.attributeEqualFails(atrName, expectedValue, actualValue)
        }
        return this
    }

    hasArrayContaining(arrName, values) {
        const arrayAsserter = this.hasArrayAndGetIt(arrName);
        arrayAsserter.containsAll(values);
        return this;
    }

    doesNotHaveAttribute(atrName) {
        const actualValue = this.getAttribute(atrName);
        if (actualValue) {
            this.assertionError.failUnexpectedAttribute(atrName, actualValue)
        }
        return this    
    }

    doesNotHaveAttributeWithValue(atrName, value) {
        const actualValue = this.getAttribute(atrName);
        if (actualValue === expectedValue) {
            this.assertionError.attributeNotEqualFails(atrName, actualValue)
        }
        return this    
    }

    isEqualTo(other) {
        if (this.o != other) {
            this.assertionError.equalsFails(other)
        }
        return this
    }

    afterCallingFunction(fun) {
        fun()
        return this
    }

    afterCallingFunctionAndGetIt(fun) {
        return new FunctionAsserter(fun)
    }

    hasArrayAndGetIt(arrName) {
        this.hasAttribute(arrName);
        const arr = this.getAttribute(arrName);
        if (!Array.isArray(arr)) {
            this.assertionError.failDifferentType('array', arr)
        }
        return new ArrayAsserter(arr, this.name);
    }

    hasObjectAndGetIt(objName) {
        this.hasAttribute(objName);
        return new ObjectAsserter(this.getAttribute(objName));
    }

    getAttribute(atrName) {
        return this.o[atrName];
    }
}