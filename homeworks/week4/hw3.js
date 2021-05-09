const https = require('https')

const country = process.argv.slice(2)[0]

const option = {
  hostname: 'restcountries.eu',
  path: `/rest/v2/name/${country}`,
  method: 'GET'
}

// pipeline in javascript
// https://zhuanlan.zhihu.com/p/52207982

// curried function
// https://stackoverflow.com/questions/32782922/what-do-multiple-arrow-functions-mean-in-javascript

// usage: pipe(fun1, fun2, fun3...)(initiateValue)
const pipe = (...args) => (x) =>
  args.reduce(
    (outputValue, currentFunction) => currentFunction(outputValue),
    x
  )

const buffers = []
const req = https.request(option, (res) => {
  if (res.statusCode === 404) {
    console.log('找不到國家資訊')
    return
  }

  // 可以取消註解觀察
  // 將 buffer 轉成 JSON 字串
  // res.setEncoding('utf8')
  res.on('data', (d) => {
    buffers.push(d)
    // console.log(d)
    // console.log('------')
    // const parsedData = JSON.parse(JSON.stringify(d))
    // console.log(parsedData)
    // console.log('------')
  })

  res.on('end', () => {
    // 因為 data event listener 在一次 request 內會被觸發許多次，每次都會送一段 buffer 物件形式的數據
    // 所以先用 buffers 裝起來，等待 end event 觸發再用 Buffer concat 合成一個大 buffer 物件
    const result = pipe(Buffer.concat,
      JSON.parse)(buffers)

    result.forEach((element) => {
      console.log('============')
      console.log('國家:', element.name)
      console.log('首都:', element.capital)
      console.log('貨幣:', element.currencies[0].code)
      console.log('國碼:', element.callingCodes[0])
    })
  })
})

req.on('error', (error) => {
  console.error(error)
})

req.end()
