// customize error class
function ServerError(message) {
  this.name = 'lotteryServerError'
  this.message = message
  Error.captureStackTrace(this, ServerError) // set this.stack property
}
ServerError.prototype = new Error()
ServerError.constructor = ServerError

module.exports = ServerError
