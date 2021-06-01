const btn = document.querySelector('.btn')
const msg = {
  FIRST: '恭喜你中頭獎了！日本東京來回雙人遊！',
  SECOND: '二獎！90 吋電視一台！',
  THIRD: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！',
  NONE: '銘謝惠顧'
}

function backToMain() {
  const background = document.querySelector('.background-img')
  const template = document.querySelector('#product__main')
  const clone = template.content.cloneNode(true)
  const activity = document.querySelector('.activity')

  background.classList.remove('background-img--first', 'background-img--second', 'background-img--third', 'background-img--black')
  background.classList.add('background-img--main')
  clone.querySelector('.btn').addEventListener('click', goToLottery)
  activity.parentNode.replaceChild(clone, activity)
}

function goToLottery() {
  // call api
  const request = new XMLHttpRequest()
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      try {
        const result = JSON.parse(request.responseText)

        if (result.error) {
          throw new Error('Exception')
        }

        // replace .activity with template
        const background = document.querySelector('.background-img')
        const activity = document.querySelector('.activity')
        const template = document.querySelector('#product__lottery')
        const clone = template.content.cloneNode(true)
        const desc = clone.querySelector('.lottery__desc')

        // set background
        background.classList.remove('background-img--main')
        switch (result.prize) {
          case 'FIRST':
            background.classList.add('background-img--first')
            break
          case 'SECOND':
            background.classList.add('background-img--second')
            break
          case 'THIRD':
            background.classList.add('background-img--third')
            break
          case 'NONE':
            background.classList.add('background-img--black')
            desc.classList.add('desc--white')
            break
        }

        desc.textContent = msg[result.prize]
        clone.querySelector('.btn').addEventListener('click', backToMain)
        activity.parentNode.replaceChild(clone, activity)
      } catch (e) {
        alert('系統不穩定，請再試一次')
      }
    } else {
      alert('系統不穩定，請再試一次')
    }
  }

  request.onerror = () => {
    alert('系統不穩定，請再試一次')
  }

  request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery')
  request.send()
}

btn.addEventListener('click', goToLottery)
