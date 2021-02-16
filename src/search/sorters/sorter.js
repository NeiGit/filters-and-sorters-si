export default class Sorter {
    sort (products) {
        return products.sort(this.comparator());
    }

    comparator() {
        return (a, b) => 0;
    }
}

class SorterError extends Error{}
