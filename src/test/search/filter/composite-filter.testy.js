import Assertions from '../../framework/assertions.js';
import Test from '../../framework/test-builder.js';
import CategoryFilter from '../../../search/filters/category-filter.js'
import BrandFilter from '../../../search/filters/brand-filter.js';
import CompositeFilter from '../../../search/filters/composite-filter.js';

import products from '../../sample/wix-product-query-json-real-parsed-reduced.js';

const test = new Test('CompositeFilterTest')

function testSingleFilter() {
    const compositeFilter = new CompositeFilter();
    compositeFilter.addFilter(CategoryFilter.fromCategory('W Cuidado Pisos'));
    
    Assertions.assertThatArray(compositeFilter.filters).hasLength(1);

    const filtered = compositeFilter.filter(products);
    Assertions.assertThatArray(filtered)
        .hasLength(2)
        .allMatchAssertion(v => v.hasAttributeWithValue('category', 'W Cuidado Pisos'));
}

function testMultipleFilters() {
    const compositeFilter = new CompositeFilter();
    compositeFilter.addFilter(CategoryFilter.fromCategory('W Cuidado Pisos'));
    compositeFilter.addFilter(new BrandFilter('Wassington'));

    Assertions.assertThatArray(compositeFilter.filters).hasLength(2);

    const filtered = compositeFilter.filter(products);
    Assertions.assertThatArray(filtered)
        .hasLength(1)
        .allMatchAssertion(v => v.hasAttributeWithValue('category', 'W Cuidado Pisos')
                        .hasAttributeWithValue('brand', 'Wassington'));
}

test.add(testSingleFilter);
test.add(testMultipleFilters);

test.run();