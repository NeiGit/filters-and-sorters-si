import Assertions from '../../framework/assertions.js';

function assertOrder(arr, predicate) {
    let compareIndex = 0;
    while (compareIndex < arr.length) {
        const compareElement = arr[compareIndex];
        const restOfArray = [...arr].splice(compareIndex + 1, 1);
        Assertions.assertThatArray(restOfArray)
            .allMatch(p => predicate(p, compareElement));
        compareIndex ++;
    }
}

export default {
    assertOrder
}