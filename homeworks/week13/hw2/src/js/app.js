/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/css/bootstrap.min.css'
// window.$ = $  // 把 $ 放到 windows 物件下（之前測試用）
// 在 webpack.config.js 加入 output.library: 'variable_name' 把整包丟給瀏覽器

import { getCommentFromTemplate, getFormTemplate } from './templates'
import { getComments, postComment } from './api'

export function init(options) {
  let cursor = 0
  const { limit } = options
  const { boardKey } = options
  const { host } = options
  const { containerSelector } = options

  const renderComments = setLimitToRenderComments(limit)

  $(containerSelector).append(getFormTemplate(boardKey))
  getComments(host, boardKey, cursor, limit, renderComments)

  $(`.${boardKey}-more`).click((e) => {
    getComments(host, boardKey, cursor, limit, renderComments)
  })

  $(`.${boardKey}-form`).submit((e) => {
    e.preventDefault()

    const comment = {
      board_key: boardKey, // 不能從表單上抓值，不然可能被使用者改
      author: $(`.${boardKey}-author`).val(),
      comment: $(`.${boardKey}-comment`).val()
    }

    postComment(host, comment, (data) => { // 把資料 POST 到資料庫，成功的話 API 回傳資料；失敗則 console.error(error)
      const comment = getCommentFromTemplate(data) // 把 API 回傳的資料放進 template
      $(`.${boardKey}-comments`).prepend(comment) // render 到頁面

      $(`.${boardKey}-author`).val('')
      $(`.${boardKey}-comment`).val('')
    })
  })

  // [求救] 想把這個搬去 utils.js 同時還是能修改位於 init 函式裡的變數 cursor
  // 目前想到的是把 cursor 改成 object，傳給 getComments，然後 getComments 再用 (data) => callback(data, cursor) 傳進去
  // 不過用 callback 傳感覺很怪很難看
  function setLimitToRenderComments(limit) {
    return (data) => {
      const { length } = data.contents

      if (length < limit + 1) { // 發現已經是最後一包資料，把按鈕移除
        $(`.${boardKey}-more`).remove()
      }

      for (let i = 0; i < length; i++) { // 從 SQL 取 limit + 1 筆資料，真正拿來 render 的只有 limit 筆，多取一筆是為了判斷是否最後一包資料
        const element = getCommentFromTemplate(data.contents[i])
        $(`.${boardKey}-comments`).append(element)
        cursor = data.contents[i].id
        if (i === limit - 1) break
      }
    }
  }
}
