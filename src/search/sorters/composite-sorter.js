import Sorter from './sorter.js';

export default class CompositeSorter extends Sorter {
    constructor() {
        super();
        this.sorters = [];
    }
    addSorter(sorter) {
        this.sorters.push(sorter);
    }
    comparator = (a, b) => {
        let result = 0;
        let index = 0;
        while (result == 0 && index < this.sorters.length) {
            result = this.sorters[index].comparator(a, b);
            index ++;
        }
        return result;
    }
}