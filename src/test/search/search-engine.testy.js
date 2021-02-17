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

function testFilterAndNoSorter() {
    const se = new SearchEngine();
    se.setFilter(new BrandFilter('Sutter'));
    const result = se.process(products);
    
    Assertions.assertThatArray(result)
        .hasLength(2);
    Assertions.assertThatArray(result)
        .allMatchAssertion(p => p.hasAttributeWithValue('brand', 'Sutter'));
    
    // pruebo que no estén ordenados
    Assertions.assertThatObject(result[0])
        .hasAttribute('sku', 2001);
}

function testSorterAndNoFilter() {
    const se = new SearchEngine();
    se.setSorter(new PriceAscSorter());
    const result = se.process(products);

    // pruebo que no me haya filtrado nada
    Assertions.assertThatArray(result)
        .hasLength(products.length);
    Assertions.assertThatArray(result.map(p => p.sku))
        .containsOnly(products.map(p => p.sku));
    
    // pruebo que me haya ordenado bien
    const first = result[0];
    Assertions.assertThatObject(first)
        .hasAttributeWithValue('sku', 2004);

    Assertions.assertThatArray(result.filter(p => p.sku != 2004))
        .allMatch(p => p.price > first.price);
}

test.add(() => testNoFiltersAndNoSorters());
test.add(() => testFilterAndNoSorter());
test.add(() => testSorterAndNoFilter());
test.run();
