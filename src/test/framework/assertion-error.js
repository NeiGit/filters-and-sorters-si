export default class AssertionError {
    constructor (funName) {
        this.funName = funName
    }

    failDifferentLength(expectedLength, actualLength) {
        this.fail(`have length ${expectedLength} but it was ${actualLength}`)
    }

    failDifferentIndex(value, expectedIndex, actualIndex) {
        this.fail(`have value "${value}" with index ${expectedIndex} but it was ${actualIndex}`)
    }

    failDifferentType(expectedType, value) {
        this.fail(`have value "${value}" of type ${expectedType} but it was ${typeof value}`)
    }

    failArrayEmpty() {
        this.fail('not be empty but it was')
    }

    returnFails(expectedValue, actualValue) {
        this.fail(`return type "${typeof expectedValue}" and value "${expectedValue}" but it returned type "${typeof actualValue}" and value "${actualValue}"`)
    }

    attributeStrictEqualFails(atrName, expectedValue, actualValue) {
        this.fail(`have attribute "${atrName}" with type "${typeof expectedValue}" and value "${expectedValue}" but it was type "${typeof actualValue}" and value "${actualValue}"`)
    }

    attributeEqualFails(atrName, expectedValue, actualValue) {
        this.fail(`have attribute "${atrName}" with value "${expectedValue}" but it was "${actualValue}"`)
    }

    attributeNotEqualFails(atrName, expectedValue) {
        this.fail(`not have attribute "${atrName}" with with value "${expectedValue}" but it had exactly that value`)
    }

    failExpectedAttribute(atrName) {
        this.fail(`have attribute "${atrName}" but it did not`)
    }

    failUnexpectedAttribute(atrName, actualValue) {
        this.fail(`not have attribute "${atrName}" but it did and the actual type was "${typeof actualValue}" and value "${actualValue}"`)
    }

    failUnexpectedValues(unexpectedValues) {
        this.fail(`not contain all ${unexpectedValues} but it did`)
    }

    failValueNotPresentInArray(arrName, value) {
        this.fail(`have array "${arrName}" containing value ${value} but it did not`)
    }

    failSomeMismatched(predicate, values) {
        this.fail(`have every value matching "${predicate.toString()}" but some did not: ${values}`)
    }

    failValueNotPresent(value) {
        this.fail(`contain value "${value}" but it did not`)
    }

    failValuesNotPresent(values) {
        this.fail(`contain value/s "${values}" but it did not`)
    }

    throwsFails() {
        this.fail(`throw an Error but it did not`)
    }

    throwsFailsComparison(expectedMessage, actualMessage) {
        this.fail(`throw an Error containing "${expectedMessage}" but the actual message was "${actualMessage}"`)
    }

    equalsFails(expected) {
        this.fail(`be equal to ${expected} but it was not`)
    }

    fail(message) {
        console.trace();
        throw new Error(`ASSERTION ERROR: Expecting "${this.funName}" to ${message}`)
    }

    static failTrueWasFalse(condition) {
        console.trace();
        throw new Error(`ASSERTION ERROR: Expecting "${condition.toString()}" to be true but it was false`)
    }

    static failFalseWasTrue(condition) {
        console.trace();
        throw new Error(`ASSERTION ERROR: Expecting "${condition.toString()}" to be false but it was true`)
    }
}