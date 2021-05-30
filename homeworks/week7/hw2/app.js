const questionList = ['如何查詢目前訂單的處理情況？', '訂單成立後，是否可以取消或是更改訂單數量及商品？', '我想購買的商品已經缺貨，什麼時候會進貨呢？', '如何辦理退貨？', '目前提供哪些付款方式？', '線上刷卡如何操作呢？']
let count = 4
const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias praesentium et nostrum, sapiente corporis eveniet! Veniam ipsa ex facilis atque!'

function createAndSetElement(tag, cls, content) {
  const element = document.createElement(tag)
  if (cls) {
    element.classList.add(cls)
  }

  if (content) {
    element.innerText = content
  }
  return element
}

function appendQuestion(questionContainer, count, desc, ans) {
  const question = createAndSetElement('div', 'question')
  const questionCount = createAndSetElement('h3', 'question__count', count)
  const questionDesc = createAndSetElement('h3', 'question__desc', desc)
  const questionAns = createAndSetElement('h3', 'question__ans')
  const p = createAndSetElement('p', '', ans)

  questionAns.appendChild(p)
  question.appendChild(questionCount)
  question.appendChild(questionDesc)
  question.appendChild(questionAns)
  questionContainer.appendChild(question)
  return questionContainer
}

// 網頁載入完成後動態新增 Q4 以後的內容
document.addEventListener('DOMContentLoaded', (e) => {
  const questions = document.querySelector('.main__questions')
  questionList.forEach((item) => {
    appendQuestion(questions, `Q${count}`, item, lorem)
    count++
  })
})

const mainQuestions = document.querySelector('.main__questions')
mainQuestions.addEventListener('click', (e) => {
  const parentClass = e.target.parentNode.classList
  if (parentClass.contains('question')) {
    parentClass.toggle('active')
  }
})
