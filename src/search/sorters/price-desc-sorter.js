import Sorter from './sorter.js';

export default class PriceDescSorter extends Sorter {
    comparator () {
        return (a, b) => b.price - a.price;
    }
}