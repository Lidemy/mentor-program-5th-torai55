const https = require('https')

const BATCH_LIMIT = 5
const TOTAL = 12

function sendRequest(option, callback) {
  const chunks = []
  const req = https.request(option, (res) => {
    res.on('data', (d) => {
      chunks.push(d)
    })

    res.on('end', () => {
      try {
        const body = JSON.parse(Buffer.concat(chunks))
        callback(body)
      } catch (err) {
        console.error(err)
      }
    })
  })

  req.on('error', (err) => {
    console.error(err)
  })

  req.end()
}

/* eslint-disable quote-props */
function getGameName(searchStr, callback) {
  const option = {
    hostname: 'api.twitch.tv',
    path: `/kraken/search/games?query=${searchStr}`,
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'r0me6woz37936skc3tsuviuipkp9mb'
    }
  }
  sendRequest(option, callback)
}

function getStreams(game, batchLimit, offset, callback) {
  const option = {
    hostname: 'api.twitch.tv',
    path: `/kraken/streams/?game=${game}&limit=${batchLimit}&offset=${offset}`,
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'r0me6woz37936skc3tsuviuipkp9mb'
    }
  }
  sendRequest(option, callback)
}

function getMoreStreams(game, limit, total, callback) {
  let streams = []
  let offset = 0

  function handleStreams(body) {
    offset += limit
    streams = streams.concat(body.streams)
    if (streams.length < TOTAL) {
      getStreams(game, limit, offset, handleStreams)
    } else {
      callback(streams.slice(0, total))
    }
  }

  getStreams(game, limit, offset, handleStreams)
}

// running
// callback 好難，偷看解答還是不太會寫:(
getGameName(process.argv[2], (body) => {
  const game = body.games[0].name

  getMoreStreams(game, BATCH_LIMIT, TOTAL, (body) => {
    body.forEach((stream) => {
      console.log(`status: ${stream.channel.status}, id: ${stream._id}`)
    })
  })
})
