const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})

const lines = []

rl.on('line', (line) => {
  lines.push(line)
})

rl.on('close', () => {
  for (let i = 1; i <= lines[0]; i++) {
    console.log(isPrime(Number(lines[i])))
  }
})

function isPrime(n) {
  if (n === 1) return 'Composite'
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return 'Composite'
  }
  return 'Prime'
}
