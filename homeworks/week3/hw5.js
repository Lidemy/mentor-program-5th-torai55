const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})
const lines = []

rl.on('line', (line) => {
  lines.push(line)
})

rl.on('close', () => {
  solve(lines)
})

function solve(lines) {
  for (let i = 1; i <= lines[0]; i++) {
    const race = lines[i].split(' ')
    if (BigInt(race[0]) === BigInt(race[1])) {
      console.log('DRAW')
      continue
    }
    BigInt(race[0]) * BigInt(race[2]) > BigInt(race[1]) * BigInt(race[2])
      ? console.log('A')
      : console.log('B')
  }
}
