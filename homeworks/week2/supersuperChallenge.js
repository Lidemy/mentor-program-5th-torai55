// 不能使用 BigInt 這個資料型態
function multiply(a, b) {
  const result = []
  // 位數拆開各個相乘
  for (let aIndex = a.length - 1; aIndex >= 0; aIndex--) {
    for (let bIndex = b.length - 1; bIndex >= 0; bIndex--) {
      const product = parseInt(a[aIndex]) * parseInt(b[bIndex])
      const currDigit = aIndex + bIndex + 1

      if (!result[currDigit]) {
        result[currDigit] = product
        continue
      }
      result[currDigit] += product
    }
  }
  // 處理進位
  for (let resIndex = result.length - 1; resIndex > 0; resIndex--) {
    const currDigit = resIndex - 1
    result[currDigit] = result[currDigit] | 0
    result[currDigit] =
      result[currDigit] + Math.floor(result[resIndex] / 10)
    result[resIndex] = (result[resIndex] % 10).toString()
  }
  // 處理前面是 0 的部分
  while (!result[0]) {
    result.shift()
  }
  return result.join('')
}
