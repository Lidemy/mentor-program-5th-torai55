function search(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let index = 0;
  while (left <= right) {
    index = Math.ceil((right + left) / 2);
    if (arr[index] == target) return index;

    if (arr[index] < target) left = index + 1;
    else right = index - 1;
  }

  return -1;
}

console.log(search([1, 3, 10, 14, 39], 0));
