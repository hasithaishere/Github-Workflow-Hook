class BaseDataSource {
    constructor (options) {
        this.options = options;
    }

    save() {
        throw new Error('You have to implement the method doSomething!');
    }
}

module.exports = BaseDataSource;