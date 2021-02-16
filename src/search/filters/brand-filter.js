import Filter from './filter.js';

export default class BrandFilter extends Filter {
    constructor(brand) {
        super();
        this.brand = brand.toLowerCase();
    }
    predicate = p => {
        const brandLowerCase = p.brand.toLowerCase()
        return brandLowerCase == this.brand;
    }
}