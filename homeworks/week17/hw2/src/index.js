require('dotenv').config()

const path = require('path')
const express = require('express')
const router = require('./router')

const app = express()
const PORT = process.env.APP_PORT || 8686
const CLIENT_PORT = process.env.CLIENT_PORT || 80
const DOMAIN = process.env.APP_DOMAIN || 'http://localhost'

app.locals.domain = DOMAIN
app.locals.port = CLIENT_PORT

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
  // handle json parsing error
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json(`json parsing error: ${err.message}`)
  }

  console.log(err)
  res.status(500).json(`something broke in the server: ${err.message}`)
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`)
})
