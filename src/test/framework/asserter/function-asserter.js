import AssertionError from '../assertion-error.js';

export default class FunctionAsserter {
    constructor(fun) {
        this.fun = fun
        this.assertionError = new AssertionError(fun.toString().replace('() =>', 'function'))
    }

    returns (expectedValue) {
        const actualValue = this.fun();
        if (expectedValue !== actualValue) {
            this.assertionError.returnFails(expectedValue, actualValue)
        }
        return this
    }

    throwsError (expectedMessage) {
        try {
            this.fun();
        } catch (err) {
            if (typeof expectedMessage != 'undefined') 
                if (!err.message.includes(expectedMessage)) {
                    this.assertionError.throwsFailsComparison(expectedMessage, err.message)
                }
            return this
        }
        this.assertionError.throwsFails()
    }
}