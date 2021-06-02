const CLIENTID = 'r0me6woz37936skc3tsuviuipkp9mb'
const ACCEPTHEADER = 'Accept: application/vnd.twitchtv.v5+json'
const LIMIT = 5

function callTwitchAPI(endPoint, callback) {
  const request = new XMLHttpRequest()

  request.onload = () => {
    if (!(request.status >= 200 && request.status < 400)) return console.log(request.status, request.responseText)
    try {
      callback(JSON.parse(request.responseText))
    } catch (e) {
      console.log(e)
    }
  }
  request.onerror = (e) => console.log(e)
  request.open('GET', endPoint)
  request.setRequestHeader('Client-ID', CLIENTID)
  request.setRequestHeader('Accept', ACCEPTHEADER)
  request.send()
}

function getTopGames(limit, callback) {
  const endPoint = `https://api.twitch.tv/kraken/games/top?limit=${limit}`

  callTwitchAPI(endPoint, (body) => {
    const topGames = []
    body.top.forEach((item) => {
      topGames.push(item.game.name)
    })
    callback(topGames)
  })
}

function getStreams(game, callback, offset = 0, options = []) {
  game = encodeURIComponent(game)
  const endPoint = `https://api.twitch.tv/kraken/streams/?limit=20&game=${game}&offset=${offset}`

  callTwitchAPI(endPoint, (streams) => {
    if (options.length) {
      callback(streams, ...options)
    } else {
      callback(streams)
    }
  })
}

function renderContent(streams, clearOld = true) {
  const container = document.querySelector('.gamelist')
  if (clearOld) {
    container.textContent = ''
    OFFSET = 20
  }

  const gamename = document.querySelector('.gamename')
  gamename.textContent = streams.streams[0].game

  streams.streams.forEach((stream) => {
    const preview = stream.preview.template.replace(/{width}/, 250).replace(/{height}/, 150)
    const avatar = stream.channel.logo.replace(/300x300/, '50x50')
    /* eslint-disable */
    const {
      status: title,
      name: player,
      url: address } = stream.channel
    /* eslint-enable */

    const template = document.querySelector('#product-content')
    const clone = template.content.cloneNode(true)

    clone.querySelector('.game').setAttribute('href', address)
    clone.querySelector('.preview img').setAttribute('src', preview)
    clone.querySelector('.avatar img').setAttribute('src', avatar)
    clone.querySelector('.game__title').textContent = title
    clone.querySelector('.game__player').textContent = player

    container.appendChild(clone)
  })
}

function renderLinks(games) {
  const container = document.querySelector('nav .links')
  const fragment = document.createDocumentFragment()
  const template = document.querySelector('#product-link')

  games.forEach((game) => {
    const clone = template.content.cloneNode(true)
    const button = clone.querySelector('button')

    button.textContent = game
    fragment.appendChild(clone)
  })

  container.textContent = ''
  container.appendChild(fragment)
}

document.addEventListener('DOMContentLoaded', () => {
  getTopGames(LIMIT, (topGames) => {
    renderLinks(topGames)
    getStreams(topGames[0], renderContent)
  })

  const links = document.querySelector('nav .links')
  links.addEventListener('click', (e) => {
    getStreams(e.target.textContent, renderContent)
  })
})

// -----------------------------------------------------
// challenge
let OFFSET = 20

function throttle(method) {
  clearTimeout(method._tId)
  method._tId = setTimeout(() => {
    method()
  }, 100)
}

function scrollHandler(event) {
  // DO NOT use anonymous function in throttle
  throttle(expandContent)
}

// [bug] 排名變動時，可能會抓到重複的頻道
function expandContent() {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement
  const distanceToBottom = scrollHeight - scrollTop - clientHeight

  if (distanceToBottom <= 450) {
    const game = document.querySelector('.gamename').textContent
    const clearOld = false

    getStreams(game, renderContent, OFFSET, [clearOld])
    OFFSET += 20
    if (OFFSET > 900) document.removeEventListener('scroll', scrollHandler)
  }
}

document.addEventListener('scroll', scrollHandler)
