const error_codes = require('./error_codes')
const restifyErrors = require('restify-errors')

module.exports = function (type, code, detail, meta) {
  if (!error_codes[type]) {
    // default to internal server error
    return new restifyErrors.InternalServerError({}, 'Internal Server Error')
  }

  const statusCode = parseInt(error_codes[type].status)

  // generate error using restify and statusCode
  const error = restifyErrors.makeErrFromCode(statusCode, {code, statusCode}, detail)

  // only return the specified error details
  return {
    statusCode: error.statusCode,
    code: error.code,
    message: error.message,
    meta
  }
}