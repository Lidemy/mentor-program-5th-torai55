const msg = {
  FIRST: '恭喜你中頭獎了！日本東京來回雙人遊！',
  SECOND: '二獎！90 吋電視一台！',
  THIRD: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！',
  NONE: '銘謝惠顧'
}

function getPrize(callback, errHandler) {
  const req = new XMLHttpRequest()
  const url = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery'

  req.onload = () => {
    if (!(req.status >= 200 && req.status < 400)) {
      errHandler()
      return alert('系統不穩定，請再試一次')
    }

    try {
      const result = JSON.parse(req.responseText)
      callback(result)
    } catch (e) {
      errHandler()
      alert('系統不穩定，請再試一次')
    }
  }

  req.onerror = () => {
    errHandler()
    alert('系統不穩定，請再試一次')
  }
  req.open('GET', url)
  req.send()
}

function renderPage(result = false) {
  const background = document.querySelector('.lottery')
  const message = document.querySelector('.lottery__result .message')

  document.querySelector('.lottery__info').classList.toggle('hide')
  document.querySelector('.lottery__result').classList.toggle('hide')

  if (result) {
    background.dataset.backgroundImage = result.prize
    message.innerText = msg[result.prize]
  } else {
    background.dataset.backgroundImage = 'main'
    message.innerText = ''
  }
}

function toggleLoadingHint() {
  document.querySelector('.lottery__info').classList.toggle('hide')
  document.querySelector('.loading').classList.toggle('hide')
}

document.addEventListener('DOMContentLoaded', () => {
  const drawingButton = document.querySelector('.lottery__info button')
  const backButton = document.querySelector('.lottery__result button')

  drawingButton.addEventListener('click', () => {
    toggleLoadingHint()

    setTimeout(() => {
      getPrize((res) => {
        toggleLoadingHint()
        renderPage(res)
      }, toggleLoadingHint)
    }, 1000)
  })

  backButton.addEventListener('click', () => {
    renderPage()
  })
})
