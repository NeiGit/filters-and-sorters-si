export default class Test {
    constructor(name) {
        this.name = name
        this.failed = []
        this.passed = 0;
        this.tests = []
    }

    add (test) {
        this.tests.push(test)
    }

    run() {
        console.log('\x1b[33m%s\x1b[0m', `EXECUTING ${this.name} - Total: ${this.tests.length}`);
        this.tests.forEach(test => {
            try {
                test()
                this.registerPassed(test)
            } catch (err) {
                this.registerFailed(test, err)
            }
        })
        if (this.failed.length) {
            console.log(`${this.failed.length} FAILED TESTS: `)
            // X = \u2613 o 2
            this.failed.forEach(t => console.log('\x1b[31m%s\x1b[0m', '\u26D4 ' + t.describe()))
            throw new Error (`${this.name} - FAILED`)
        } else {
            console.log('\x1b[32m%s\x1b[0m', `FINISHED ${this.name} - ALL TESTS PASSED - Total: ${this.passed}`)
        }
    }

    safeRun() {
        try {
            this.run()
        } catch (err) {
            console.log('\x1b[41m%s\x1b[0m',`${this.name} - FAILED`)
        }
    }

    registerFailed (test, err) {
        this.failed.push(new FailedTest(test.toString().replace('() =>', ''), err.message))
    }

    registerPassed (test) {
        const name = test.toString().replace('() =>', '');
        console.log('\x1b[36m%s\x1b[0m', '\u2713 ' + name + ' passed')
        this.passed ++;
    }
}

class FailedTest {
    constructor (name, message) {
        this.name = name
        this.message = message
    }

    describe () {
        return `${this.name} - ${this.message}`
    }
}