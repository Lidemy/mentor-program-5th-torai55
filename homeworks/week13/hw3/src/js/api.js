import { STREAMLIMIT, CLIENTID, ACCEPT, ROOTURL } from './variables'

export function callTwitchAPI(endPoint) {
  const headers = new Headers({
    'Client-ID': CLIENTID,
    Accept: ACCEPT
  })
  const request = new Request(endPoint, {
    method: 'GET',
    headers
  })

  return fetch(request)
    .then((response) => {
      if (!response.ok) {
        alert('oops, 網站出錯ㄌ')
        throw new Error(`statusCode: ${response.status}`)
      }
      return response.json()
    })
    .catch((err) => console.error(err))
}

export function getTopGames(limit) {
  const endpoint = `${ROOTURL}games/top?limit=${limit}`

  return callTwitchAPI(endpoint)
    .then((body) => {
      const topGames = []
      body.top.forEach((item) => {
        topGames.push(item.game.name)
      })
      return topGames
    })
}

export function getStreams(game, limit = STREAMLIMIT, offset = 0) {
  game = encodeURIComponent(game)
  const endPoint = `${ROOTURL}streams/?limit=${limit}&game=${game}&offset=${offset}`

  return callTwitchAPI(endPoint)
}
