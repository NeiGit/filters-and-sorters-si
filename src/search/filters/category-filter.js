import Filter from './filter.js';

export default class CategoryFilter extends Filter {
    constructor(categories = []) {
        super();
        this.categories = [];
        categories.forEach(c => this.addCategory(c));
    }

    addCategory(category) {
        this.categories.push(category.toLowerCase());
    }

    predicate = p => {
        const catLowerCase = p.category.toLowerCase();
        return this.categories.includes(catLowerCase);
    }

    static fromCategory(category) {
        return this.fromCategories([category]);
    }

    static fromCategories(categories) {
        return new CategoryFilter(categories);
    }
}