function capitalize(str) {
  if (
    "a".charCodeAt(0) <= str.charCodeAt(0) &&
    str.charCodeAt(0) <= "z".charCodeAt(0)
  ) {
    str[0] = String.fromCharCode(str.charCodeAt(0) + 32);
  }
  return str;
}

console.log(capitalize("a,hello"));
