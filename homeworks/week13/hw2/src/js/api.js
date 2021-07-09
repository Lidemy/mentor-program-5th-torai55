// eslint-disable-next-line import/no-unresolved
import $ from 'jquery'

export function getComments(host, boardKey, cursor, limit, callback) {
  const path = `?board_key=${boardKey}&cursor=${cursor.current}&limit=${limit + 1}`
  const url = `${host}/get_comments.php${path}`

  $.getJSON(url, callback)
}

export function postComment(host, data, callback) {
  $.ajax({
    type: 'POST',
    url: `${host}/post_comment.php`,
    data,
    success: (res) => {
      callback(res.contents[0])
    },
    error: (e) => {
      console.error(e)
    }
  })
}
