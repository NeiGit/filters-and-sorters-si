import Sorter from './sorter.js';

export default class NameAscSorter extends Sorter {
    comparator () {
        return (a, b) => a.name.localeCompare(b.name);
    }
}