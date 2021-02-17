import Sorter from './sorter.js';

export default class PriceDescSorter extends Sorter {
    comparator = (a, b) => b.price - a.price;
}