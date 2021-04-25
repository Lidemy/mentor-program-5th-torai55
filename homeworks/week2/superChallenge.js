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
