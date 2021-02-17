import Sorter from './sorter.js';

export default class NameDescSorter extends Sorter {
    comparator = (a, b) => b.name.localeCompare(a.name);
}