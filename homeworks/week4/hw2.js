const https = require('https')

// 原本是用 let [method, arg1, arg2] = ...
// eslint 要求 arg1, arg2 用 const
let method = process.argv[2]
const [, arg1, arg2] = process.argv.slice(2)
let path = '/books'
const data = {}
let output = ''

switch (method) {
  case 'list':
    method = 'GET'
    path += '?_limit=20'
    getData(method, path)
    break
  case 'read':
    method = 'GET'
    path += `/${arg1}?_limit=20`
    getData(method, path)
    break
  case 'delete':
    method = 'DELETE'
    path += `/${arg1}`
    output = 'delete success'
    getData(method, path, data, output)
    break
  case 'create':
    method = 'POST'
    data.name = arg1
    getData(method, path, data)
    break
  case 'update':
    method = 'PATCH'
    path += `/${arg1}`
    data.name = arg2
    getData(method, path, data)
    break
  default:
    console.error('method not exist: ', method)
    // 這裡應該要終止程式?
}

// get data from twitch API and console.log
function getData(method, path, data = {}, output = '') {
  data = JSON.stringify(data)
  const options = {
    hostname: 'lidemy-book-store.herokuapp.com',
    // object property shorthand
    path,
    method,
    headers: {
      'Content-type': 'application/json',
      'Content-length': Buffer.byteLength(data)
      /**
       * 小心陷阱，平常會用 data.length
       * 但是中文字轉成 buffer 所佔的長度會變成 3 而出錯
       * 英文因為 utf8 編碼關係，佔的長度一樣是 1
       */
    }
  }

  const req = https.request(options, (res) => {
    const chunks = []
    res.on('data', (d) => {
      chunks.push(d)
    })

    res.on('end', () => {
      try {
        const parsedBooks = JSON.parse(Buffer.concat(chunks))
        // if parsedBookes is empty
        console.log(Object.keys(parsedBooks).length === 0 ? output : parsedBooks)
      } catch (error) {
        console.error(error)
      }
    })
  })

  req.on('error', (error) => {
    console.error(error)
  })

  // 將 JSON 格式的 data 寫入 req.body
  req.write(data)
  req.end()
}
