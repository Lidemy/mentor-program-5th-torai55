const path = require('path')
const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const router = require('./router')

const app = express()
const port = 8686

// use template engine
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, './views'))

// parse body
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// session
app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: false
}))

// flash
app.use(flash())

// set variables for rendering
app.use((req, res, next) => {
  res.locals.errMsg = req.flash('errMsg')
  res.locals.username = req.session.username
  res.locals.urlPath = req.path
  next()
})

// static files
app.use('/static', express.static(path.resolve(__dirname, './static')))

// api document
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// mount router
app.use(router)

// error handler
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError) {
    res.status(400).send('json format error')
  } else {
    res.status(500).send('something broke')
  }
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
