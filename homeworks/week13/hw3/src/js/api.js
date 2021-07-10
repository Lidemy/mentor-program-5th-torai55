import { STREAMLIMIT, CLIENTID, ACCEPT, ROOTURL } from './variables'

export function callTwitchAPI(endPoint, callback) {
  const headers = new Headers({
    'Client-ID': CLIENTID,
    Accept: ACCEPT
  })
  const request = new Request(endPoint, {
    method: 'GET',
    headers
  })
  fetch(request)
    .then((response) => {
      if (!response.ok) {
        alert('oops, 網站出錯ㄌ')
        throw new Error(`statusCode: ${response.status}`)
      }
      return response.json()
    })
    .then((data) => callback(data))
    .catch((err) => console.error(err))
}

export function getTopGames(limit, callback) {
  const endpoint = `${ROOTURL}games/top?limit=${limit}`

  callTwitchAPI(endpoint, (body) => {
    const topGames = []
    body.top.forEach((item) => {
      topGames.push(item.game.name)
    })
    callback(topGames)
  })
}

export function getStreams(game, callback, limit = STREAMLIMIT, offset = 0, options = []) {
  game = encodeURIComponent(game)
  const endPoint = `${ROOTURL}streams/?limit=${limit}&game=${game}&offset=${offset}`

  callTwitchAPI(endPoint, (streams) => {
    callback(streams, ...options)
  })
}
