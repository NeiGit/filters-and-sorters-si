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
import SorterTestUtils from './sorter/sorter-test-utils.js';
import NameAscSorter from '../../search/sorters/name-asc-sorter.js';
import Filter from '../../search/filters/filter.js';
import Sorter from '../../search/sorters/sorter.js';

const test = new Test('SearchEngineTest');

function testNoFiltersAndNoSorters() {
    const se = new SearchEngine();
    const result = se.search(products);

    // no me deberia cambiar nada
    Assertions.assertThatArray(result)
        .hasLength(products.length)
        .containsOnlyInOrder(products);   
}

function testFilterAndNoSorter() {
    const se = new SearchEngine();
    se.setFilter(new BrandFilter('Sutter'));
    const result = se.search(products);
    
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
    const result = se.search(products);

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

function testFilterAndSorter() {
    const se = new SearchEngine();
    se.setFilter(CategoryFilter.fromCategory('W Cuidado Pisos'));
    se.setSorter(new PriceAscSorter());
    const result = se.search(products);

    Assertions.assertThatArray(result)
        .hasLength(2)
        .allMatchAssertion(p => p.hasAttributeWithValue('category', 'W Cuidado Pisos'));

    SorterTestUtils.assertOrder(result, (pRest, pCompare) => pRest.price >= pCompare.price);
}

function testFilterAndThenSorter() {
    const se = new SearchEngine();
    se.setFilter(CategoryFilter.fromCategory('S Linea Agral'));
    const resultUO = se.search(products);
    Assertions.assertThatArray(resultUO)
        .hasLength(2)
        .allMatchAssertion(p => p.hasAttributeWithValue('category', 'S Linea Agral'));

    const firtsElementUO = resultUO[0];
    Assertions.assertThatObject(firtsElementUO)
        .hasAttributeWithValue('sku', 2003);
    
    // ahora agrego un sorter, tiene que cambiar el orden
    se.setSorter(new NameDescSorter());
    const resultO = se.search(products);
    Assertions.assertThatArray(resultO)
        .hasLength(2)
        .allMatchAssertion(p => p.hasAttributeWithValue('category', 'S Linea Agral'));
    const firtsElementO = resultO[0];
    Assertions.assertThatObject(firtsElementO)
        .hasAttributeWithValue('sku', 2004);
}

function testJustFilterAndThenJustSort() {
    const se = new SearchEngine();
    se.setFilter(CategoryFilter.fromCategory('S Linea Agral'));
    const resultUO = se.search(products);

    // le cambio el filtro para asegurarme que si se lanza el filter rompa el test
    se.setFilter(new Filter());
    se.setSorter(new NameDescSorter());
    const resultO = se.sort(resultUO);
    // me tiene que haber respetado el filtro anterior
    Assertions.assertThatArray(resultO)
        .hasLength(2)
        .allMatchAssertion(p => p.hasAttributeWithValue('category', 'S Linea Agral'));
    const firtsElementO = resultO[0];
    Assertions.assertThatObject(firtsElementO)
        .hasAttributeWithValue('sku', 2004);
    
    // ahora arranco con el sort
    const resultO2 = se.search(products);
    Assertions.assertThatArray(resultO2)
        .hasLength(products.length);
    const firtsElementO2 = resultO2[0];
    Assertions.assertThatObject(firtsElementO2)
        .hasAttributeWithValue('sku', 2102);
    // cambio el sort para asegurarme que si se lanza el sort rompa el test
    se.setSorter(new NameAscSorter());
    se.setFilter(CategoryFilter.fromCategory('W Vajilla'));
    const resultO3 = se.filter(resultO2);

    Assertions.assertThatArray(resultO3)
        .hasLength(2)
        .allMatchAssertion(p => p.hasAttributeWithValue('category', 'W Vajilla'));

    // me tiene que respetar el orden anterior 
    const firtsElementO3 = resultO3[0];
    Assertions.assertThatObject(firtsElementO3)
        .hasAttributeWithValue('sku', 2102);
}

test.add(testNoFiltersAndNoSorters);
test.add(testFilterAndNoSorter);
test.add(testSorterAndNoFilter);
test.add(testFilterAndSorter);
test.add(testFilterAndThenSorter);
test.add(testJustFilterAndThenJustSort);
test.run();
