'use strict'
const ajv = require('ajv')
const jsonschema = ajv()
const validateEmail = jsonschema.compile(
  {
    "type": "string",
    "format": "email"
  }
)

let self = {}

self.middleware = function () {
  return function (req, res, next) {
    try {
      const {'x-user': email} = req.headers
      const valid = validateEmail(email)

      if (!valid) {
        return res
          .status(401)
          .json({
            errors: [{
              statusCode: '401',
              title: 'Unauthorized',
              message: 'Missing or invalid header, x-user. Must include valid email.'
            }]
          })
      }

      return next()
    } catch (e) {
      console.log('auth.failed', e)
      return res
        .status(500)
        .json({
          errors: [{
            statusCode: '500',
            title: 'Unexpected Error'
          }]
        })
    }
  }
}

module.exports = self