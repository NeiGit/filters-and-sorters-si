export default class Filter {
    applies(product) {
        throw new FilterError(this.constructor.name + ': applies() not implemented!')
    }

    invalidInput(product) {
        return product === undefined;
    }

    filter(products) {
        return products.filter(p => this.applies(p));
    }
}

class FilterError extends Error{}