const db = require('../db')

module.exports = {
  getAll: (cb) => {
    db.query('SELECT * FROM blog_posts WHERE is_deleted = 0;', cb)
  },

  get: (id, cb) => {
    db.query('SELECT * FROM blog_posts WHERE id = ? AND is_deleted = 0;', id, (err, result) => {
      if (err) return cb(err)
      cb(null, result[0])
    })
  },

  create: (post, cb) => {
    const { postTitle, postContent, author } = post
    db.query(
      `INSERT INTO blog_posts(title, content, author_id) VALUES(?, ?, (
        SELECT id FROM blog_users WHERE username = ?
      ));`,
      [postTitle, postContent, author],
      cb
    )
  },

  delete: (id, cb) => {
    db.query('UPDATE blog_posts SET is_deleted = 1 WHERE id = ?;', id, cb)
  },

  update: (post, cb) => {
    const { title, content, id } = post
    db.query('UPDATE blog_posts SET title = ?, content = ? WHERE id = ?',
      [title, content, id],
      cb
    )
  }
}
