const https = require('https')

/* eslint-disable quote-props */
const option = {
  hostname: 'api.twitch.tv',
  path: '/kraken/games/top',
  headers: {
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'r0me6woz37936skc3tsuviuipkp9mb'
  },
  method: 'GET'
}
/* eslint-enable quote-props */

const chunks = []
const req = https.request(option, (res) => {
  if (res.statusCode === 503) {
    console.log('statusCode:', res.statusCode)
    console.log('error to retrieve games status')
    return
  }

  res.on('data', (d) => {
    chunks.push(d)
  })

  res.on('end', () => {
    const result = JSON.parse(Buffer.concat(chunks))
    result.top.forEach((element) => {
      console.log(`${element.viewers} ${element.game.name}`)
    })
  })
})

req.on('error', (error) => {
  console.error(error)
})

req.end()
