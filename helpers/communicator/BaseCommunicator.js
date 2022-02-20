class BaseCommunicator {
    constructor (options) {
        this.options = options;
    }

    send() {
        throw new Error('You have to implement the method doSomething!');
    }
}

module.exports = BaseCommunicator;