// 加入標示
function appendMark(div, text) {
  if (div.querySelector('.invalid')) return
  const p = document.createElement('p')
  p.innerText = text
  p.classList.add('invalid')
  div.appendChild(p)
}

// div 裡面 input 或者 textarea 有填就回傳 'name: value'，沒有就回 false
function getNameValue(div) {
  const inputNodes = div.querySelectorAll('input, textarea')
  const results = Array.from(inputNodes, (input) => {
    if ((input.type !== 'radio' && input.value.length) || input.checked) {
      return `${input.getAttribute('name')}: ${input.value}`
    }
    return false
  })

  return results.filter((res) => res)
}

// 檢查格式
function checkformat(name, value) {
  let regexRule
  switch (name) {
    case 'phone':
      regexRule = /^09[0-9]{8}$/
      break
    case 'email':
      regexRule = /^\w+((\.)|(\+)|(\w))*@\w+(\.\w+)*$/
      break
    default:
      return true
  }
  if (value.search(regexRule) === -1) return false
  return true
}

// 檢查必填欄位是否有填、輸入格式是否正確
function checkInput(div) {
  let messages = getNameValue(div)

  // 檢查格式
  for (const msg of messages) {
    const [name, value] = msg.split(': ')
    if (!checkformat(name, value)) {
      appendMark(div, '格式錯誤')
      messages = false
      break
    }
  }

  // 檢查必填欄位
  if (div.classList.contains('required') && messages.length === 0) {
    appendMark(div, '此項目為必填')
    messages = false
  }

  return messages
}

const form = document.querySelector('form')
const btn = document.querySelector('.btn')

form.addEventListener('input', (e) => {
  // 沒輸入內容且為必填 就加標記
  const isRequired = e.target.parentNode.classList.contains('required')
  if (!(e.target.value.length) && isRequired) {
    appendMark(e.target.parentNode, '此項目為必填')
    return
  }
  // 有輸入內容且標記存在 就移除標記
  const marker = e.target.parentNode.querySelector('.invalid')
  if (marker) {
    marker.remove()
  }
})

btn.addEventListener('click', () => {
  const questionList = document.querySelectorAll('.question')
  const outputs = []

  // 檢查所有欄位
  for (const question of questionList) {
    outputs.push(checkInput(question))
  }

  // 檢查通過，則取得所有輸入並印出
  if (outputs.every((value) => value)) {
    alert(outputs.join('\n'))
  }
})

// 保存重新整理後填的資料（可以存在瀏覽器）
