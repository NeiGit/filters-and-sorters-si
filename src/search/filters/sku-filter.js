import Filter from './filter.js';

export default class SkuFilter extends Filter {
    constructor(sku) {
        super();
        this.sku = sku.toLowerCase();
    }

    predicate = p => {
        const lowerCaseSku = p.sku.toLowerCase();
        return lowerCaseSku == this.sku;
    }
}