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
                test();
                this.registerPassed(test)
            } catch (err) {
                this.registerFailed(test, err)
            }
        })
        if (this.failed.length) {
            console.log('\x1b[41m', '\x1b[30m', `${this.failed.length} FAILED TESTS: `, '\x1b[0m')
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
            console.log('\x1b[41m', '\x1b[30m', `${this.name} - FAILED`, '\x1b[0m')
        }
    }

    registerFailed (test, err) {
        const string = test.toString();
        this.failed.push(new FailedTest(string.replace('() =>', '').substr(0, string.indexOf('{')).trim(), err.message))
    }

    registerPassed (test) {
        const string = test.toString();
        const name = string.replace('() =>', '').substr(0, string.indexOf('{')).trim();
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
        return `${this.name} failed\n${this.message}`
    }
}