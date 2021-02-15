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
            this.failed.forEach(t => console.log(t.describe()))
            throw new Error (`${this.name} - FAILED`)
        } else {
            console.log(`${this.name} - ALL TESTS PASSED - Total: ${this.passed}`)
        }
    }

    safeRun() {
        try {
            this.run()
        } catch (err) {
            console.log((`${this.name} - FAILED`))
        }
    }

    registerFailed (test, err) {
        this.failed.push(new FailedTest(test.toString().replace('() =>', ''), err.message))
    }

    registerPassed (test) {
        const name = test.toString().replace('() =>', '');
        console.log(name + ' passed')
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