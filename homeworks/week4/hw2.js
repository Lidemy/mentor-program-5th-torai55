const https = require('https')

// 原本是用 let [method, arg1, arg2] = ...
// eslint 要求 arg1, arg2 用 const
// 試過分開宣告 let method
//             const arg1
//             const arg2 ，但 eslint 看不懂
// 也試過 const arg1, arg2 但 eslint 都不給過，只能用這種麻煩寫法
let method = process.argv[2]
const [, arg1, arg2] = process.argv.slice(2)
let path = '/books'
let data = {}

switch (method) {
  case 'list':
    method = 'GET'
    path += '?_limit=20'
    break
  case 'read':
    method = 'GET'
    path += `/${arg1}?_limit=20`
    break
  case 'delete':
    method = 'DELETE'
    path += `/${arg1}`
    break
  case 'create':
    method = 'POST'
    data.name = arg1
    break
  case 'update':
    method = 'PATCH'
    path += `/${arg1}`
    data.name = arg2
    break
  default:
    console.error('method not exist', method)
    // 這裡應該要終止程式?
}

data = JSON.stringify(data)
const options = {
  hostname: 'lidemy-book-store.herokuapp.com',
  // object property shorthand
  path,
  method,
  headers: {
    'Content-type': 'application/json',
    'Content-length': data.length
  }
}

const req = https.request(options, (res) => {
  res.setEncoding('utf8')
  // console.log('statusCode:', res.statusCode)
  res.on('data', (d) => {
    const parsedBooks = JSON.parse(d)
    console.log(parsedBooks)
  })
})

req.on('error', (error) => {
  console.error(error)
})

// 將 JSON 格式的 data 寫入 req.body
req.write(data)
req.end()
