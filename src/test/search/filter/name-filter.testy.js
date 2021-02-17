import Assertions from '../../framework/assertions.js';
import Test from '../../framework/test-builder.js';
import NameFilter from '../../../search/filters/name-filter.js'
import products from '../../sample/wix-product-query-json-real-parsed-reduced.js';

const test = new Test('NameFilter Test')

function testNameFilter() {
    let f = new NameFilter('AcrilwaX');
    let filtered = f.filter(products);
    Assertions.assertThatArray(filtered)
        .hasLength(3);
    
    f = new NameFilter('ACRILWAX CERA');
    filtered = f.filter(products);
    Assertions.assertThatArray(filtered)
        .hasLength(2);

    f = new NameFilter('acrilwax LI');
    filtered = f.filter(products);
    Assertions.assertThatArray(filtered)
        .hasLength(1);
    Assertions.assertThatObject(filtered[0])
        .hasAttributeWithValue('sku', '2189');
}

test.add(() => testNameFilter());
test.run();