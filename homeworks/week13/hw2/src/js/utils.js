// eslint-disable-next-line import/no-unresolved
import $ from 'jquery'
import { commentTemplate } from './templates'

export function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function getFormFromTemplate(boardKey, template) {
  return template.replace(/{{boardKey}}/g, escapeHtml(boardKey))
}

export function getCommentFromTemplate(data, template) {
  return template.replace(/{{author}}/g, escapeHtml(data.author))
    .replace(/{{created_at}}/g, escapeHtml(data.created_at))
    .replace(/{{comment}}/g, escapeHtml(data.comment))
}

export function setLimitToRenderComments(limit, boardKey, cursor) {
  return (data) => {
    const { length } = data.contents

    if (length < limit + 1) { // 發現已經是最後一包資料，把按鈕移除
      $(`.${boardKey}-more`).remove()
    }

    for (let i = 0; i < length; i++) { // 從 SQL 取 limit + 1 筆資料，真正拿來 render 的只有 limit 筆，多取一筆是為了判斷是否最後一包資料
      const element = getCommentFromTemplate(data.contents[i], commentTemplate)
      $(`.${boardKey}-comments`).append(element)
      cursor.current = data.contents[i].id
      if (i === limit - 1) break
    }
  }
}
