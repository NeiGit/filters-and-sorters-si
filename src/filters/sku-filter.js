import Filter from './filter.js';

export default class SkuFilter extends Filter {
    constructor(sku) {
        super();
        this.sku = String.toLowerCase(sku);
    }
    applies(product) {
        if (this.invalidInput(product)) return false;
        return product.sku == this.sku;
    }
}