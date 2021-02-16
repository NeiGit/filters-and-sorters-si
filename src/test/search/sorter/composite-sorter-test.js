import Assertions from '../../framework/assertions.js';
import Test from '../../framework/test-builder.js';
import NameAscSorter from '../../search/sorters/name-asc-sorter.js.js';
import NameDescSorter from '../../search/sorters/name-desc-sorter.js.js';
import PriceAscSorter from '../../search/sorters/price-asc-sorter.js.js';
import CompositeSorter from '../../search/sorters/composite-sorter.js.js';
import products from '../../sample/wix-product-query-json-real-parsed-reduced.js';

const test = new Test('NameSorterTest')

function testPriceAndName() {
    const compositeSorter = new CompositeSorter();
    compositeSorter.addSorter(new PriceAscSorter());
    compositeSorter.addSorter(new NameDescSorter());

    const sorted = compositeSorter.sort(products);

    const firstElement = sorted[0];
    const secondElement = sorted[1];

    // third y fourth tienen el mismo precio
    const thirdElement = sorted[2]; 
    const fourthElement = sorted[3];

    Assertions.assertThatObject(firstElement)
        .hasAttributeWithValue('sku', 2004);
    Assertions.assertThatObject(secondElement)
        .hasAttributeWithValue('sku', 2102);
    Assertions.assertThatObject(thirdElement)
        .hasAttributeWithValue('sku', 2002);
    Assertions.assertThatObject(fourthElement)
        .hasAttributeWithValue('sku', 2001);

    // ahora nombres ascendentes, deberian cambiar los ultimos dos
    const compositeSorter2 = new CompositeSorter();
    compositeSorter2.addSorter(new PriceAscSorter());
    compositeSorter2.addSorter(new NameAscSorter());

    const sorted2 = compositeSorter2.sort(products);

    const firstElement2 = sorted2[0];
    const secondElement2 = sorted2[1];

    // third y fourth tienen el mismo precio
    const thirdElement2 = sorted2[2]; 
    const fourthElement2 = sorted2[3];

    Assertions.assertThatObject(firstElement2)
        .hasAttributeWithValue('sku', 2004);
    Assertions.assertThatObject(secondElement2)
        .hasAttributeWithValue('sku', 2102);
    Assertions.assertThatObject(thirdElement2)
        .hasAttributeWithValue('sku', 2001);
    Assertions.assertThatObject(fourthElement2)
        .hasAttributeWithValue('sku', 2002);
}

test.add(() => testPriceAndName());
test.safeRun();