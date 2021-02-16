import Sorter from './sorter.js';

export default class PriceAscSorter extends Sorter {
    comparator () {
        return (a, b) => a.price - b.price;
    }
}