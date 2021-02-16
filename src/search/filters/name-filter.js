import Filter from './filter.js';

export default class NameFilter extends Filter {
    constructor(name) {
        super();
        this.name = name.toLowerCase();
    }
    
    predicate = p => {
        const lowerCaseName = p.name.toLowerCase();
        return lowerCaseName.includes(this.name);
    }
}