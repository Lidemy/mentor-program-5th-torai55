import { escapeHtml } from './utils'

export function getFormTemplate(boardKey) {
  return `
    <div class="alert alert-info mt-3" role="alert">
    ${escapeHtml(boardKey)} 的留言板
    </div>
    <form class="${escapeHtml(boardKey)}-form">
      <div class="mb-3 form-floating">
        <input type="text"" class="form-control ${escapeHtml(boardKey)}-board-key" value="${escapeHtml(boardKey)}" placeholder="Board key" disabled>
        <label class="form-label">Board key</label>
      </div>
      <div class="mb-3 form-floating">
        <input type="text" class="form-control ${escapeHtml(boardKey)}-author" placeholder="Author">
        <label>Author</label>
      </div>
      <div class="mb-3 form-floating">
        <textarea class="form-control ${escapeHtml(boardKey)}-comment" placeholder="Leave a comment here" style="height: 150px"></textarea>
        <label >Comment</label>
      </div>
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>

    <div class="mt-5 list-group ${escapeHtml(boardKey)}-comments"></div>
    <div class="mb-4 d-grid gap-2 col-5 mx-auto">
    <button type="button" class="btn btn-success ${escapeHtml(boardKey)}-more">more</button>
    </div>
  `
}

export function getCommentFromTemplate(data) {
  return `
    <div class="mb-3 list-group-item list-group-item-action" aria-current="true">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${escapeHtml(data.author)}</h5>
        <small>${escapeHtml(data.created_at)}</small>
      </div>
      <p class="mb-1">${escapeHtml(data.comment)}</p>
    </div>
  `
}
