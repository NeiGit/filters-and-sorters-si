export default class Sorter {
    sort (products) {
        return products.sort(this.comparator());
    }

    comparator() {
        throw new SorterError(this.constructor.name + ': comparator() not implemented!')
    }
}

class SorterError extends Error{}
