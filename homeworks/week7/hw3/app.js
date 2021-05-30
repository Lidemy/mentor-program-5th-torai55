function appendAndSetElement(container, msg) {
  const item = document.createElement('div')
  item.classList.add('item')
  item.innerHTML = `
    <input type="checkbox" class="done" name="done">
    <div class="content">
      <p>${msg}</p>
      <div class="strikethrough"></div>
    </div>
    <div class="delete"></div>`
  container.appendChild(item)
  return container
}

const input = document.querySelector('.input__area')
const btnDelete = document.querySelector('.list')

input.addEventListener('keypress', (e) => {
  if (e.key !== 'Enter' || e.target.value === '') return
  const container = document.querySelector('.list')
  appendAndSetElement(container, e.target.value)
  e.target.value = ''
})

btnDelete.addEventListener('click', (e) => {
  if (!(e.target.classList.contains('delete'))) return
  e.target.parentElement.remove()
})
