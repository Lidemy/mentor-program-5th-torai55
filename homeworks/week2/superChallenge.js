/*
carry = a&b: 取得兩數需要進位的位元
carry << 1: 把進位移到正確的位數上
remain = a^b: 兩數相加後，除了進位剩下的數值存在這
如果 carry&remain !=0 代表還需要再次進位，再跑一次迴圈
確定不用進位後，result= a|b 把兩數加起來
可以用 5 和 7 相加當例子寫一遍就知道了
*/

function add(a, b) {
  let result = 0;
  while ((a & b) != 0) {
    let carry = (a & b) << 1;
    let remain = a ^ b;
    a = carry;
    b = remain;
  }
  result = a | b;

  return result;
}
