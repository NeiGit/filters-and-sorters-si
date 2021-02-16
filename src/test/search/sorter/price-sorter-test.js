import Assertions from '../../framework/assertions.js';
import Test from '../../framework/test-builder.js';
import PriceAscSorter from '../../search/sorters/price-asc-sorter.js';
import PriceDescSorter from '../../search/sorters/price-desc-sorter.js';
import products from '../../sample/wix-product-query-json-real-parsed-reduced.js';

const test = new Test('PriceSorterTest')

function testSortedAsc() {
    const priceAscSorter = new PriceAscSorter();

    const sortedAsc = priceAscSorter.sort(products);

    const firstElement = sortedAsc[0];
    const secondElement = sortedAsc[1];

    Assertions.assertThatObject(firstElement)
        .hasAttributeWithValue('sku', 2004);
    Assertions.assertThatObject(secondElement)
        .hasAttributeWithValue('sku', 2102);

    Assertions.assertTrue(() => firstElement.price < secondElement.price);
}

function testSortedDesc() {
    const priceDescSorter = new PriceDescSorter();

    const sortedDesc = priceDescSorter.sort(products);

    const firstElement = sortedDesc[0];
    const secondElement = sortedDesc[1];

    Assertions.assertThatObject(firstElement)
        .hasAttributeWithValue('sku', 2188);
    Assertions.assertThatObject(secondElement)
        .hasAttributeWithValue('sku', 2255);

    Assertions.assertFalse(() => firstElement.price > secondElement.price);
}

test.add(() => testSortedAsc());
test.add(() => testSortedDesc());
test.safeRun();