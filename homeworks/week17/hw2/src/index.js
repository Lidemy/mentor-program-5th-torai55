const path = require('path')
const express = require('express')
const router = require('./router')

const app = express()
const port = 8686

// set template engine
app.set('view engine', 'ejs')

// set path of views
app.set('views', path.resolve(__dirname, 'views'))

// parse request
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// host static files
app.use(express.static(path.resolve(__dirname, 'static')))

// mount router
app.use(router)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`)
})
