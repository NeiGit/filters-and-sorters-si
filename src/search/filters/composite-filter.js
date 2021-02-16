import Filter from './filter.js';

export default class CompositeFilter extends Filter {
    constructor() {
        super();
        this.filters = [];
    }

    addFilter(filter) {
        this.filters.push(filter);
    }

    addFilters(filters) {
        this.filters.push(... filters);
    }

    predicate = p => this.filters.every(f => f.predicate(p));
}