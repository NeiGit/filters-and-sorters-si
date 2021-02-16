import Filter from './filters/filter.js';
import Sorter from './sorters/sorter.js';

export default class SearchEngine {
    constructor() {
        this.filterSupplier = () => new Filter();
        this.sorterSupplier = () => new Sorter();
    }

    setFilter(filter) {
        this.filterSupplier = () => filter;
    }

    setSorter(sorter) {
        this.sorterSupplier = () => sorter;
    }

    process(products) {
        const predicate = this.filterSupplier().predicate;
        const comparator = this.sorterSupplier().comparator;
        return products.filter(predicate).sort(comparator);
    }
}