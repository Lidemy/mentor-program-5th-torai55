let cursor = 0
const limit = 5
const boardKey = 'torai'

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function appendComment(selector, content, usePrepend = false) {
  const template = `<div class="mb-3 list-group-item list-group-item-action" aria-current="true">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">${escapeHtml(content.author)}</h5>
                  <small>${escapeHtml(content.created_at)}</small>
                </div>
                <p class="mb-1">${escapeHtml(content.comment)}</p>
              </div>`
  if (usePrepend) {
    $(selector).prepend(template)
  } else {
    $(selector).append(template)
  }
}

function getComments() {
  const path = `?board_key=${boardKey}&cursor=${cursor}&limit=${limit + 1}`
  const url = `./get_comments.php${path}`

  $.getJSON(url, (data) => {
    const { length } = data.contents

    if (length < limit + 1) {
      $('.more').remove()
    }

    for (let i = 0; i < length; i++) {
      appendComment('.list-group', data.contents[i])
      cursor = data.contents[i].id
      if (i === 4) break
    }
  })
}

$(document).ready((e) => {
  getComments()
})

$('.more').click((e) => {
  getComments()
})

$('#form').submit((e) => {
  e.preventDefault()

  $.ajax({
    type: 'POST',
    url: './post_comment.php',
    data: {
      board_key: $('#board_key').val(),
      author: $('#author').val(),
      comment: $('#comment').val()
    },
    success: (res) => {
      $('#author').val('')
      $('#comment').val('')
      appendComment('.list-group', res.contents[0], true)
    },
    error: (e) => {
      console.error(e)
    }
  })
})
