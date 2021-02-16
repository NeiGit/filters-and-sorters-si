export default class Filter {
    predicate = () => true;

    validInput = p => p !== undefined;

    filter(products) {
        return products.filter(this.validInput).filter(this.predicate);
    }
}
