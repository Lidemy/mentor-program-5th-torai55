const path = require('path')
const express = require('express')
const router = require('./router')

const app = express()
const port = 8686

// set template engine
app.set('view engine', 'ejs')

// set path of views
app.set('views', path.resolve(__dirname, 'views'))

// populate req.body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded

// host static files
app.use('/static', express.static(path.resolve(__dirname, 'static')))

// mount router
app.use(router)

// error handling
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send(`something broke: ${err.message}`)
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`)
})
