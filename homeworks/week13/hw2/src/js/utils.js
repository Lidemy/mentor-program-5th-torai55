// import $ from 'jquery'
// import { getCommentFromTemplate } from './templates'

// eslint-disable-next-line import/prefer-default-export
export function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// export function setLimitToRenderComments(limit) {
//   return (data) => {
//     const { length } = data.contents

//     if (length < limit + 1) {
//       $('.more').remove()
//     }

//     for (let i = 0; i < length; i++) {
//       const element = getCommentFromTemplate(data.contents[i])
//       $('.list-group').append(element)
//       cursor = data.contents[i].id
//       if (i === limit - 1) break
//     }
//   }
// }
