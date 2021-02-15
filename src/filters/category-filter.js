import Filter from './filter.js';

export default class CategoryFilter extends Filter {
    constructor(categories = []) {
        super();
        this.categories = categories;
    }

    addCategory(category) {
        this.categories.push(category)
    }

    applies(product) {
        if (this.invalidInput(product)) return false;
        return this.categories.includes(product.category);
    }

    static fromCategory(category) {
        const filter = new CategoryFilter();
        filter.addCategory(category);
        return filter;
    }

    static fromCategories(categories) {
        return new CategoryFilter(categories);
    }
}