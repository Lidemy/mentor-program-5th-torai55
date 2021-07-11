import { STREAMLIMIT } from './variables'
import { getStreams } from './api'

// 該怎麼把這行移到 variables.js 裡面，同時又能利用 OFFSET 保存狀態
// 目前想到：把它包成物件，然後用 getter / setter function 來取值 / 更改值
let OFFSET = STREAMLIMIT

export function renderContent(streams, clearOld = true) {
  const container = document.querySelector('.gamelist')

  if (clearOld) {
    container.textContent = ''
    OFFSET = STREAMLIMIT
  } else {
    OFFSET += STREAMLIMIT
  }

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

export function renderLinks(games) {
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

// 捲動到接近底部，再抓新頻道
// 用 webpack 包起來之後會觸發兩次，第八週時沒有用 webpack 明明正常QQ
export function throttle(callback) {
  clearTimeout(callback._tId)
  callback._tId = setTimeout(() => {
    callback()
  }, 100)
}

export function scrollHandler() {
  // DO NOT use anonymous function in throttle
  throttle(expandContent)
}

// [bug] 排名變動時，可能會抓到重複的頻道
// 給後端處理比較優
export function expandContent() {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement
  const distanceToBottom = scrollHeight - scrollTop - clientHeight

  if (distanceToBottom <= 450) {
    const game = document.querySelector('.gamename').textContent
    const clearOld = false

    getStreams(game, STREAMLIMIT, OFFSET)
      .then((data) => {
        renderContent(data, clearOld)
      })
      .catch((e) => console.error(e))
    if (OFFSET > 900) document.removeEventListener('scroll', scrollHandler)
  }
}

// 螢幕太大沒有卷軸（判斷高度再抓更多頻道）
// [bug] 若 3.5 秒內抓不夠（例如伺服器回應延遲）就不會再抓
export function loadMore() {
  const gameList = document.querySelector('.gamelist')
  const config = {
    childList: true
  }

  function mutateHandler() {
    const { clientHeight, scrollHeight } = document.documentElement
    if (clientHeight >= scrollHeight) {
      expandContent()
    }
  }

  const observer = new MutationObserver(mutateHandler)
  observer.observe(gameList, config)

  setTimeout(() => {
    observer.disconnect()
  }, 3500)
}
