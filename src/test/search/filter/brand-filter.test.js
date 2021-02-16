import Assertions from '../../framework/assertions.js';
import Test from '../../framework/test-builder.js';
import BrandFilter from '../../../search/filters/brand-filter.js'
import products from '../../sample/wix-product-query-json-real-parsed-reduced.js';

const test = new Test('BrandFilter Test')

function testBrandFilter() {
    let f = new BrandFilter('Wassington');
    let filtered = f.filter(products);
    Assertions.assertThatArray(filtered)
        .hasLength(2);
    Assertions.assertThatArray(filtered.map(p => p.sku))
        .containsOnly(['2102', '2188']);
}

test.add(() => testBrandFilter());
test.safeRun();