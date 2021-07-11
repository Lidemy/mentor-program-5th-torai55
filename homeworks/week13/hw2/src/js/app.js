/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/css/bootstrap.min.css'
// window.$ = $  // 把 $ 放到 windows 物件下（之前測試用）
// 在 webpack.config.js 加入 output.library: 'variable_name' 把整包丟給瀏覽器

import { commentTemplate, formTemplate } from './templates'
import { getComments, postComment } from './api'
import { getFormFromTemplate, getCommentFromTemplate, setLimitToRenderComments, escapeHtml } from './utils'

export function init(options) {
  const cursor = { // 為了讓 setLimitToRenderComments 裡面也能改
    current: 0
  }
  const { limit } = options
  const { boardKey } = options
  const { host } = options
  const { containerSelector } = options
  const renderComments = setLimitToRenderComments(limit, boardKey, cursor)
  const form = getFormFromTemplate(boardKey, formTemplate)

  $(containerSelector).append(form)
  getComments(host, boardKey, cursor, limit, renderComments)

  $(`.${boardKey}-more`).click((e) => {
    getComments(host, boardKey, cursor, limit, renderComments)
  })

  $(`.${boardKey}-form`).submit((e) => {
    e.preventDefault()

    const comment = {
      board_key: escapeHtml(boardKey), // 不能從表單上抓值，不然可能被使用者改
      author: $(`.${boardKey}-author`).val(),
      comment: $(`.${boardKey}-comment`).val()
    }

    postComment(host, comment, (data) => { // 把資料 POST 到資料庫，成功的話 API 回傳資料；失敗則 console.error(error)
      const commentElement = getCommentFromTemplate(data, commentTemplate) // 把 API 回傳的資料放進 template
      $(`.${boardKey}-comments`).prepend(commentElement) // render 到頁面

      $(`.${boardKey}-author`).val('')
      $(`.${boardKey}-comment`).val('')
    })
  })
}
