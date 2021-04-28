const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})

const lines = []

rl.on('line', (line) => {
  lines.push(line)
})

rl.on('close', () => {
  const input = lines[0].split(' ')
  narcissistic(Number(input[0]), Number(input[1]))
})

function narcissistic(n, m) {
  //  loop through n to m
  for (let i = n; i <= m; i++) {
    let digits = 0
    let number = i
    const numberArray = []
    while (number) {
      numberArray.push(number % 10)
      number = Math.floor(number / 10)
      digits++
    }

    const sum = numberArray.reduce((accu, curr) => accu + Math.pow(curr, digits), 0)
    if (sum === i) {
      console.log(i)
    }
  }
}
