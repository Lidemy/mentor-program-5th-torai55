function join(arr, concatStr) {
  let result = "";
  for (let i = 0; i < arr.length; i++) {
    if (i == 0) {
      result += arr[0];
    } else {
      result += concatStr + arr[i];
    }
  }
  return result;
}

function repeat(str, times) {
  let result = "";
  for (let i = 0; i < times; i++) {
    result += str;
  }
  return result;
}

console.log(join(["aaa", "bb", "c", "dddd"], ",,"));
console.log(repeat("ab", 3));
