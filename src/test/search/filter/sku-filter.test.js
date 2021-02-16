import Assertions from '../../framework/assertions.js';
import Test from '../../framework/test-builder.js';
import SkuFilter from '../../../search/filters/sku-filter.js'
import products from '../../sample/wix-product-query-json-real-parsed-reduced.js';

const test = new Test('SkuFilter Test')

function testSkuFilter() {
    const f = new SkuFilter('2188');

    const filtered = f.filter(products);

    Assertions.assertThatArray(filtered)
        .hasLength(1);
    Assertions.assertThatObject(filtered[0])
        .hasAttributeWithValue('sku', '2188')
        .hasAttributeWithValue('name', 'Acrilwax Cera Acrílica Incolora x 30 L.')
        .hasAttributeWithValue('price', 3380);
}

test.add(() => testSkuFilter());
test.safeRun();