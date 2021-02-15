import Sorter from './sorter.js';

export default class NameDescSorter extends Sorter {
    comparator () {
        return (a, b) => b.name.localeCompare(a.name);
    }
}