const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})

const lines = []

rl.on('line', (line) => {
  lines.push(line)
})

rl.on('close', () => {
  printStar(lines[0], lines[1], lines[2])
})

function printStar(n) {
  for (let i = 0; i < n; i++) {
    let stars = ''
    for (let j = 0; j <= i; j++) {
      stars += '*'
    }
    console.log(stars)
  }
}
