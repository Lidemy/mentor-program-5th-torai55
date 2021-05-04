const https = require('https')

const options = {
  hostname: 'lidemy-book-store.herokuapp.com',
  path: '/books?_page=1',
  method: 'GET'
}

const req = https.request(options, (res) => {
  res.setEncoding('utf8')
  res.on('data', (d) => {
    const parsedBooks = JSON.parse(d)
    parsedBooks.forEach((element) => { console.log(`${element.id} ${element.name}`) })
  })
})

req.on('error', (error) => {
  console.error(error)
})

req.end()
