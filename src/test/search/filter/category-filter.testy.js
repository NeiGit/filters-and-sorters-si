import Assertions from '../../framework/assertions.js';
import Test from '../../framework/test-builder.js';
import CategoryFilter from '../../../search/filters/category-filter.js'
import products from '../../sample/wix-product-query-json-real-parsed-reduced.js';

const test = new Test('CategoryFilterTest')

function testSingleCategory() {
    const f = CategoryFilter.fromCategory('W Cuidado Pisos')
    Assertions.assertThatArray(f.categories).hasLength(1);
    Assertions.assertThatObject(f)
        .hasArrayContaining('categories', ['W Cuidado Pisos'])

    const filtered = f.filter(products);

    Assertions.assertThatArray(filtered)
        .hasLength(2)
        .allMatch(v => v.hasAttributeWithValue('category', 'W Cuidado Pisos'));
}

function testMultipleCategories() {
    const f = CategoryFilter.fromCategories(['W Cuidado Pisos', 'S Linea Agral']);
    Assertions.assertThatArray(f.categories).hasLength(2);
    Assertions.assertThatObject(f)
        .hasArrayAndGetIt('categories')
            .containsOnly(['W Cuidado Pisos', 'S Linea Agral']);

    const filtered = f.filter(products);
    Assertions.assertThatArray(filtered)
        .hasLength(4);

    const cat1 = filtered.filter(p => p.category === 'W Cuidado Pisos');
    const cat2 = filtered.filter(p => p.category === 'S Linea Agral');

    Assertions.assertThatArray(cat1).hasLength(2);
    Assertions.assertThatArray(cat2).hasLength(2);
}

test.add(() => testSingleCategory());
test.add(() => testMultipleCategories());
test.safeRun();