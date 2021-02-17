export default class Sorter {
    sort (products) {
        return products.sort(this.comparator);
    }

    comparator = () => 0;
}

