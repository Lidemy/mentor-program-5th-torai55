let filterState = 'All'
const template = `<div class="todo col-12 mb-3">
                    <div class="form-check position-relative">
                      <input class="todo-check form-check-input" type="checkbox">
                      <div class="todo-content position-relative">
                        <div class="todo-text position-absolute start-0 end-0 top-0 bottom-0">^todo$</div>
                        <input type="text" class="todo-input form-control">
                        <div class="strikethrough position-absolute top-50"></div>
                      </div>
                      <button type="button" class="btn-delete btn btn-danger position-absolute end-0 top-0 hide" data-bs-toggle="tooltip" data-bs-placement="top" title="delete">
                        X
                      </button>
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

function updateCounts() {
  const { length } = $('.todo-check:not(:checked)')
  const text = length === 1 ? `${length} item left` : `${length} items left`
  $('.todo-count').text(text)
}

function getSelectorFromState(filterState) {
  let selector
  switch (filterState) {
    case 'All':
      selector = '.filter__all'
      break
    case 'Active':
      selector = '.filter__active'
      break
    case 'Completed':
      selector = '.filter__completed'
      break
  }
  return selector
}

updateCounts()

// 編輯
$('.todos').on('dblclick', '.todo-text', (e) => {
  $(e.target).hide()
  $(e.target).parent().find('.todo-input').focus()
})

$('.todos').on('focusout', '.todo-input', (e) => {
  $(e.target).parent().find('.todo-text').show()
})

$('.todos').on('change', '.todo-input', (e) => {
  $(e.target).parent().find('.todo-text').text($(e.target).val())
})

// 新增
$('.add-todo').on('keydown', '.add-todo__input', (e) => {
  if (e.which !== 13) return

  const input = $(e.target)
  const value = escapeHtml(input.val())
  const todo = template.replace(/\^todo\$/, value)

  input.closest('.add-todo').parent().find('.todos').append(todo)
  $('.todo-input').eq(-1).val(value)
  input.val('')

  updateCounts()
  $('.todo-select-all').prop('checked', false)

  const selector = getSelectorFromState(filterState)
  $(selector).click()
})

// 刪除
$('.todos').on('click', '.btn-delete', (e) => {
  $(e.target).closest('.todo').remove()
  updateCounts()
})

// 清空
$('.todo-clear').click(() => {
  $('.todo-check:checked').closest('.todo').remove()
  updateCounts()
})

// 篩選
$('.todo-filter').on('click', '.filter__all, .filter__active, .filter__completed', (e) => {
  filterState = $(e.target).text()
  switch (filterState) {
    case 'All':
      $('.todo').show()
      updateCounts()
      break
    case 'Active':
      $('.todo-check:checked').closest('.todo').hide()
      $('.todo-check:not(:checked)').closest('.todo').show()
      updateCounts()
      break
    case 'Completed':
      $('.todo-check:checked').closest('.todo').show()
      $('.todo-check:not(:checked)').closest('.todo').hide()
      updateCounts()
      break
  }
})

// 全選
$('.container').on('click', '.todo-select-all, .todo-check', (e) => {
  const isSelectAll = $(e.target).is($('.todo-select-all'))
  let isChecked
  let checkbox

  if (isSelectAll) {
    isChecked = $(e.target).prop('checked')
    checkbox = $('.todo-check:visible')
  } else {
    isChecked = $('.todo-check:not(:checked)').length === 0
    checkbox = $('.todo-select-all')
  }
  checkbox.prop('checked', isChecked)
  updateCounts()

  const selector = getSelectorFromState(filterState)
  $(selector).click()
})

// 儲存
$('.save-btn').click(() => {
  const todoID = new URLSearchParams(window.location.search).get('id')
  const data = {
    todoID,
    todos: []
  }
  $('.todo').each((index, element) => {
    element = $(element)
    const isCompleted = element.find('.todo-check').is(':checked')
    const content = element.find('.todo-input').val()
    data.todos.push({
      isCompleted,
      content
    })
  })

  const addr = 'http://mentor-program.co/mtr04group1/Torai/week12/hw2/'
  // const addr = 'http://localhost:8787/week12/hw2/'
  const url = `${addr}update_todo.php`

  $.ajax({
    method: 'PUT',
    url,
    data: JSON.stringify(data)
  }).done((res) => {
    try {
      const parsedRes = JSON.parse(res)
      if (parsedRes.status === 'fail') return alert(parsedRes.message)
      alert(`Saved in url: ${addr}?id=${parsedRes.todo_id}`)
      window.location.href = `${addr}?id=${parsedRes.todo_id}`
    } catch (e) {
      console.error(e)
    }
  })
    .fail(() => alert('connection fail'))
})
