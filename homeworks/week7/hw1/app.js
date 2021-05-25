// 加入標示
function appendMark(div) {
  if (div.querySelector('.invalid')) return
  const p = document.createElement('p')
  p.innerText = '此項目為必填'
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

const form = document.querySelector('form')
const btn = document.querySelector('.btn')

form.addEventListener('input', (e) => {
  // 沒輸入內容且為必填 就加標記
  const isRequired = e.target.parentNode.className.split(' ').includes('required')
  if (!(e.target.value.length) && isRequired) {
    appendMark(e.target.parentNode)
    return
  }
  //  有輸入內容且標記存在 就移除標記
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

  // 檢查所有必填
  if (inputs.some((input) => input.length === 0)) {
    inputs.forEach((input, index) => {
      if (input.length === 0) {
        appendMark(requiredList[index])
      }
    })
    return
  }

  // 都有填 則取得所有輸入並印出
  const msg = Array.from(questionList, (question) => getNameValue(question))
    .join('\n')
  alert(msg)
})
