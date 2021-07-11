// eslint-disable-next-line import/no-unresolved
import $ from 'jquery'

export function getComments(host, boardKey, cursor, limit) {
  const path = `?board_key=${boardKey}&cursor=${cursor.current}&limit=${limit + 1}`
  const url = `${host}/get_comments.php${path}`

  return $.getJSON(url)
}

export function postComment(host, data) {
  return $.ajax({
    type: 'POST',
    url: `${host}/post_comment.php`,
    data
  })
}
