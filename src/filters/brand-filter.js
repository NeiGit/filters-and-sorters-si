import Filter from './filter.js';

export default class BrandFilter extends Filter {
    constructor(brand) {
        super();
        this.brand = brand;
    }
    applies(product) {
        if (this.invalidInput(product)) return false;
        else return product.brand == this.brand
    }
}