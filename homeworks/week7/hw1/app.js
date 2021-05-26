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
  const inputNodes = (div.querySelectorAll('input').length !== 0) ? div.querySelectorAll('input') : div.querySelectorAll('textarea')
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
      regexRule = /^[A-Za-z0-9]+@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*$/
      break
    default:
      return true
  }
  if (value.search(regexRule) === -1) return false
  return true
}

const form = document.querySelector('form')
const btn = document.querySelector('.btn')

form.addEventListener('input', (e) => {
  // 沒輸入內容且為必填 就加標記
  const isRequired = e.target.parentNode.className.split(' ').includes('required')
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

btn.addEventListener('click', (e) => {
  const requiredList = document.querySelectorAll('.required')
  const questionList = document.querySelectorAll('.question')

  // 取得所有必填的 name: value
  const inputs = Array.from(requiredList, (required) => getNameValue(required))

  // 檢查所有必填欄位
  let isPass = true
  inputs.forEach((input, index) => {
    if (input.length === 0) {
      appendMark(requiredList[index], '此項目為必填')
      isPass = false
    }
  })

  // 檢查格式
  const msgList = Array.from(questionList, (question) => getNameValue(question))
  msgList.forEach((item, index) => {
    if (item.length === 0) return
    const [name, value] = item[0].split(': ')
    if (!checkformat(name, value)) {
      appendMark(questionList[index], '格式錯誤')
      isPass = false
    }
  })

  // 檢查通過 則取得所有輸入並印出
  if (!isPass) return
  const msg = msgList.join('\n')
  alert(msg)
})

// 保存重新整理後填的資料（可以存在瀏覽器）
