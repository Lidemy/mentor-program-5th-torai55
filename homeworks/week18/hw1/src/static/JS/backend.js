const cardTemplate = `
<div class="prize card">
  <input type="hidden" class="prize-id" value="{{id}}">
  <img src="{{imageUrl}}" class="prize-image card-img-top" alt="prize">
  <div class="prize__imageUrl card-header">
    <input type="text" class="imageUrl-input getImageUrl" value="{{imageUrl}}">
    <div class="imageUrl-cover" data-content-head="imageUrl：">imageUrl：{{imageUrl}}</div>
  </div>
  <div class="card-body">
    <h5 class="prize__name card-title">
      <input type="text" class="name-input getName" value="{{name}}">
      <div class="name-cover" data-content-head="name：">name：{{name}}</div>
    </h5>
    <div class="prize__desc card-text">
      <input type="text" class="description-input getDescription" value="{{description}}">
      <div class="description-cover" data-content-head="description：">description：{{description}}</div>
    </div>
    <div class="prize__weight mt-2 card-text">
      <input type="text" class="weight-input getWeight" value="{{weight}}">
      <div class="weight-cover" data-content-head="weight：">weight：{{weight}}</div>
    </div>
    <button type="button" class="prize-save mt-3 btn btn-primary">儲存</button>
    <button type="button" class="prize-delete mt-3 btn btn-danger">刪除</button>
  </div>
</div>`

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function renderCard(prize) {
  const cardContent = cardTemplate
    .replace(/{{id}}/g, escapeHtml(prize.id.toString()))
    .replace(/{{imageUrl}}/g, escapeHtml(prize.imageUrl))
    .replace(/{{name}}/g, escapeHtml(prize.name))
    .replace(/{{description}}/g, escapeHtml(prize.description))
    .replace(/{{weight}}/g, escapeHtml(prize.weight))

  const newCard = document.createElement('div')
  newCard.classList.add('col')
  newCard.innerHTML = cardContent
  document.querySelector('.prizes').appendChild(newCard)
}

function clearInput(parentElement) {
  parentElement.querySelector('.getImageUrl').value = ''
  parentElement.querySelector('.getName').value = ''
  parentElement.querySelector('.getDescription').value = ''
  parentElement.querySelector('.getWeight').value = ''
}

function getCardData(parentElement) {
  const id = parentElement.querySelector('.prize-id')?.value || ''
  const url = `${window.location.protocol}//${window.location.host}/api/prizes/${id}`
  const imageUrl = parentElement.querySelector('.getImageUrl').value
  const name = parentElement.querySelector('.getName').value
  const description = parentElement.querySelector('.getDescription').value
  const weight = parentElement.querySelector('.getWeight').value
  const data = {
    imageUrl,
    name,
    description,
    weight
  }
  return {
    url,
    data
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.prizes').addEventListener('dblclick', (e) => {
    const { target } = e
    const classNames = ['imageUrl-cover', 'name-cover', 'description-cover', 'weight-cover']
    if (!classNames.some((className) => target.classList.contains(className))) return
    target.classList.add('hide')
    target.parentNode.querySelector('input').focus()
  })

  document.querySelector('.prizes').addEventListener('change', (e) => {
    const { target } = e
    const classNames = ['imageUrl-input', 'name-input', 'description-input', 'weight-input']
    if (!classNames.some((className) => target.classList.contains(className))) return
    const div = target.parentNode.querySelector('div')
    div.textContent = div.dataset.contentHead + target.value
  })

  document.querySelector('.prizes').addEventListener('focusout', (e) => {
    const { target } = e
    const classNames = ['imageUrl-input', 'name-input', 'description-input', 'weight-input']
    if (!classNames.some((className) => target.classList.contains(className))) return
    target.parentNode.querySelector('div').classList.remove('hide')
  })

  document.querySelector('.prizes').addEventListener('click', (e) => {
    const { target } = e
    const classNames = ['prize-save', 'prize-delete', 'prize-post']
    if (!classNames.some((className) => target.classList.contains(className))) return
    const prizeContainer = target.closest('.prize')
    const { url, data } = getCardData(prizeContainer)
    let request

    if (target.classList.contains('prize-save')) {
      request = new Request(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    } else if (target.classList.contains('prize-delete')) {
      request = new Request(url, { method: 'DELETE' })
    } else if (target.classList.contains('prize-post')) {
      request = new Request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    } else {
      console.log(target.classList)
      return
    }

    (async() => {
      try {
        const prize = await fetch(request)
        const parsedPrize = await prize.json()
        if (!(prize.status > 100 && prize.status < 300)) throw new Error(parsedPrize)
        switch (request.method) {
          case 'PATCH':
            alert('更新成功') // 可以改用 bootstrap Toasts
            break
          case 'POST':
            alert('新增成功') // bootstrap toasts
            renderCard(parsedPrize)
            clearInput(prizeContainer)
            break
          case 'DELETE':
            alert('刪除成功') // bootstrap Toasts
            prizeContainer.parentNode.remove()
            break
        }
      } catch (err) {
        alert(err)
      }
    })()
  })
})
