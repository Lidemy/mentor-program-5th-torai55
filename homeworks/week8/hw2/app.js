const CLIENTID = 'r0me6woz37936skc3tsuviuipkp9mb'
const ACCEPT = 'application/vnd.twitchtv.v5+json'
const GAMELIMIT = 5
const STREAMLIMIT = 20
/* eslint-disable */
let OFFSET = STREAMLIMIT
/* eslint-enable */

function callTwitchAPI(endPoint, callback) {
  const request = new XMLHttpRequest()

  request.onload = () => {
    if (!(request.status >= 200 && request.status < 400)) return
    try {
      callback(JSON.parse(request.responseText))
    } catch (e) {
      console.log(e)
    }
  }
  request.onerror = (e) => console.log(e)
  request.open('GET', endPoint)
  request.setRequestHeader('Client-ID', CLIENTID)
  request.setRequestHeader('Accept', ACCEPT)
  request.send()
}

function getTopGames(limit, callback) {
  const endpoint = `https://api.twitch.tv/kraken/games/top?limit=${limit}`

  callTwitchAPI(endpoint, (body) => {
    const topGames = []
    body.top.forEach((item) => {
      topGames.push(item.game.name)
    })
    callback(topGames)
  })
}

function getStreams(game, callback, limit = STREAMLIMIT, offset = 0, options = []) {
  game = encodeURIComponent(game)
  const endPoint = `https://api.twitch.tv/kraken/streams/?limit=${limit}&game=${game}&offset=${offset}`

  callTwitchAPI(endPoint, (streams) => {
    callback(streams, ...options)
  })
}

function renderContent(streams, clearOld = true) {
  const container = document.querySelector('.gamelist')
  /* eslint-disable */
  if (clearOld) {
    container.textContent = ''
    OFFSET = STREAMLIMIT
  } else {
    OFFSET += STREAMLIMIT
  }
  /* eslint-enable */

  // update title
  const gamename = document.querySelector('.gamename')
  gamename.textContent = streams.streams[0].game

  streams.streams.forEach((stream) => {
    const preview = stream.preview.template.replace(/{width}/, 250).replace(/{height}/, 150)
    const avatar = stream.channel.logo.replace(/300x300/, '50x50')
    const {
      status: title,
      name: player,
      url: address
    } = stream.channel

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
  getTopGames(GAMELIMIT, (topGames) => {
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
// 可以把 challenge 底下全部取消註解，體驗新的功能
// 捲動到接近底部，再抓新頻道
function throttle(method) {
  clearTimeout(method._tId)
  method._tId = setTimeout(() => {
    method()
  }, 100)
}

function scrollHandler() {
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

    getStreams(game, renderContent, STREAMLIMIT, OFFSET, [clearOld])
    if (OFFSET > 900) document.removeEventListener('scroll', scrollHandler)
  }
}

document.addEventListener('scroll', scrollHandler)

// -----------------------------------------------------
// 螢幕太大沒有卷軸（判斷高度再抓更多頻道）
// [bug] 若兩秒內抓不夠（例如伺服器回應延遲）就不會再抓
function loadMore() {
  const gameList = document.querySelector('.gamelist')
  const config = {
    attributes: true,
    childList: true,
    subtree: true
  }

  function mutateHandler() {
    const { clientHeight, scrollHeight } = document.documentElement
    if (clientHeight <= scrollHeight) {
      expandContent()
    }
  }

  const observer = new MutationObserver(mutateHandler)
  observer.observe(gameList, config)

  setTimeout(() => {
    observer.disconnect()
  }, 2000)
}

const links = document.querySelector('nav .links')
links.addEventListener('click', () => {
  loadMore()
})

document.addEventListener('DOMContentLoaded', () => {
  loadMore()
})
