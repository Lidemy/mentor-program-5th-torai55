const main = document.querySelector('main')
const background = document.querySelector('.background-img')
const msg = {
  first: '恭喜你中頭獎了！日本東京來回雙人遊！',
  second: '二獎！90 吋電視一台！',
  third: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！',
  none: '銘謝惠顧'
}
let currentPage = 'Main'

function renderMainPage() {
  const template = document.querySelector('#product__main')
  const clone = template.content.cloneNode(true)
  const activity = document.querySelector('.activity')

  background.classList.remove('background-img--first', 'background-img--second', 'background-img--third', 'background-img--black')
  background.classList.add('background-img--main')
  activity.parentNode.replaceChild(clone, activity)
}

function renderLotteryPage(result) {
  result.prize = result.prize.toLowerCase()
  // replace .activity with template
  const activity = document.querySelector('.activity')
  const template = document.querySelector('#product__lottery')
  const clone = template.content.cloneNode(true)
  const desc = clone.querySelector('.lottery__desc')

  // set background
  background.classList.remove('background-img--main')
  background.classList.add(`background-img--${result.prize}`)
  if (result.prize === 'none') desc.classList.add('desc--white')

  desc.textContent = msg[result.prize]
  activity.parentNode.replaceChild(clone, activity)
}

function getLotteryResult(callback) {
  // call api
  const request = new XMLHttpRequest()
  request.onload = () => {
    if (!(request.status >= 200 && request.status < 400)) return alert('系統不穩定，請再試一次')

    try {
      const result = JSON.parse(request.responseText)
      if (result.error) {
        throw new Error('Exception')
      }
      callback(result)
    } catch (e) {
      alert('系統不穩定，請再試一次')
    }
  }

  request.onerror = () => {
    alert('系統不穩定，請再試一次')
  }

  request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery')
  request.send()
}

main.addEventListener('click', (e) => {
  if (!(e.target === document.querySelector('.btn'))) return

  if (currentPage === 'Main') {
    getLotteryResult(renderLotteryPage)
    currentPage = 'Lottery'
  } else {
    renderMainPage()
    currentPage = 'Main'
  }
})
