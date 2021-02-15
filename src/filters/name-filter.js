import Filter from './filter.js';

export default class NameFilter extends Filter {
    constructor(name) {
        super();
        this.name = String.toLowerCase(name);
    }
    applies(product) {
        if (this.invalidInput(product)) return false;
        const lowerCaseName = String.toLowerCase(product.name);
        return lowerCaseName.includes(this.name);
    }
}