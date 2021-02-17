import Assertions from '../framework/assertions.js';
import Test from '../framework/test-builder.js';
import CategoryFilter from '../../search/filters/category-filter.js'
import BrandFilter from '../../search/filters/brand-filter.js'
import CompositeFilter from '../../search/filters/composite-filter.js'
import NameDescSorter from '../../search/sorters/name-desc-sorter.js';
import PriceAscSorter from '../../search/sorters/price-asc-sorter.js';
import CompositeSorter from '../../search/sorters/composite-sorter.js';
import products from '../sample/wix-product-query-json-real-parsed-reduced.js';
import SearchEngine from '../../search/search-engine.js';

const test = new Test('SearchEngine test');

function testNoFiltersAndNoSorters() {
    const se = new SearchEngine();
    const result = se.process(products);

    // no me deberia cambiar nada
    Assertions.assertThatArray(result)
        .hasLength(products.length)
        .containsOnlyInOrder(products);   
}

test.add(() => testNoFiltersAndNoSorters());
test.safeRun();
