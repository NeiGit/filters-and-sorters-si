import FunctionAsserter from './asserter/function-asserter.js';
import ObjectAsserter from './asserter/object-asserter.js';
import ArrayAsserter from './asserter/array-asserter.js';
import AssertionError from './assertion-error.js';

function assertThatFunction(fun) {
    return new FunctionAsserter(fun);
}

function assertThatObject(o) {
    return new ObjectAsserter(o)
}

function assertThatArray(arr, container) {
    return new ArrayAsserter(arr, container);
}

function assertTrue(condition) {
    if (!condition()) {
        AssertionError.failTrueWasFalse(condition);
    }
}

function assertFalse(condition) {
    if (condition()) {
        AssertionError.failFalseWasTrue(condition);
    }
}

export default {
    assertThatFunction,
    assertThatObject,
    assertThatArray,
    assertTrue,
    assertFalse
}