// 不能使用 BigInt 這個資料型態
function multiply(a, b) {
  let result = [];
  //位數拆開各個相乘
  for (let aIndex = a.length - 1; aIndex >= 0; aIndex--) {
    for (let bIndex = b.length - 1; bIndex >= 0; bIndex--) {
      if (!result[aIndex + bIndex + 1]) {
        result[aIndex + bIndex + 1] = parseInt(a[aIndex]) * parseInt(b[bIndex]);
      } else {
        result[aIndex + bIndex + 1] +=
          parseInt(a[aIndex]) * parseInt(b[bIndex]);
      }
    }
  }
  //處理進位
  for (let resIndex = result.length - 1; resIndex > 0; resIndex--) {
    result[resIndex - 1] = result[resIndex - 1] | 0;
    result[resIndex - 1] =
      result[resIndex - 1] + Math.floor(result[resIndex] / 10);
    result[resIndex] = (result[resIndex] % 10).toString();
  }
  //處理前面是 0 的部分
  while (!result[0]) {
    result.shift();
  }
  return result.join("");
}
