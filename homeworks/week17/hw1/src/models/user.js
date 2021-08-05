const db = require('../db')

module.exports = {
  create: (userInfo, cb) => {
    const { username, password } = userInfo
    db.query(
      `INSERT INTO blog_users (username, password)
      SELECT * FROM (SELECT ? AS username, ? AS password) AS tmp
      WHERE NOT EXISTS (
        SELECT username FROM blog_users WHERE username = ?
      );`,
      [username, password, username],
      (err, result) => {
        if (err) return cb(err)
        cb(null, result)
      }
    )
  },

  get: (username, cb) => {
    db.query('SELECT * FROM blog_users WHERE username = ?;',
      username,
      (err, result) => {
        if (err) return cb(err)
        cb(null, result[0])
      })
  }
}
