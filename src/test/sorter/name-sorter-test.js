import Assertions from '../framework/assertions.js';
import Test from '../framework/test-builder.js';
import NameAscSorter from '../../sorters/name-asc-sorter.js';
import NameDescSorter from '../../sorters/name-desc-sorter.js';
import products from '../sample/wix-product-query-json-real-parsed-reduced.js';

const test = new Test('NameSorterTest')

function testSortedAsc() {
    const nameAscSorter = new NameAscSorter();

    const sortedAsc = nameAscSorter.sort(products);

    const firstElement = sortedAsc[0];
    const secondElement = sortedAsc[1];

    Assertions.assertThatObject(firstElement)
        .hasAttributeWithValue('sku', 2001);
    Assertions.assertThatObject(secondElement)
        .hasAttributeWithValue('sku', 2101);
}

function testSortedDesc() {
    const nameDescSorter = new NameDescSorter();

    const sortedAsc = nameDescSorter.sort(products);

    const firstElement = sortedAsc[0];
    const secondElement = sortedAsc[1];

    Assertions.assertThatObject(firstElement)
        .hasAttributeWithValue('sku', 2102);
    Assertions.assertThatObject(secondElement)
        .hasAttributeWithValue('sku', 2004);
}

test.add(() => testSortedAsc());
test.add(() => testSortedDesc());
test.safeRun();