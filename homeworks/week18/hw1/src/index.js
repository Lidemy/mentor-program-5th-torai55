require('dotenv').config()

const path = require('path')
const express = require('express')

const pageRouter = require('./routers/pageRouter')
const apiRouter = require('./routers/apiRouter')

const app = express()
const port = process.env.RESTAURANT_WEB_PORT || 8787
const domain = process.env.RESTAURANT_WEB_DOMAIN || 'http://localhost'

app.locals.domain = domain
app.locals.port = port
app.locals.imagePath = '/static/images'

// parse http body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// set template engine
app.set('view engine', 'ejs')

// path to views
app.set('views', path.resolve(__dirname, 'views'))

// host static files
app.use('/static', express.static(path.resolve(__dirname, 'static')))

// mount router
app.use('/api', apiRouter)
app.use('/restaurant', pageRouter)

// default route => 收到上面兩個 router 都沒有定義的 path，就重新導向到首頁
app.get('*', (req, res) => res.redirect(301, '/restaurant'))

// error handling middleware
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json(`something is broke: ${err.message}`)
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`)
})
