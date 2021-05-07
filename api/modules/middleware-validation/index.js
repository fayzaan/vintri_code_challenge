'use strict'

const ajv = require('ajv')
const jsonschema = ajv()
const errorcodes = require('../errorcodes')

let self = {}

function build(errors) {
  if (!errors) {
    return errorcodes('InternalService', 'Validation-000', 'Internal Validation Schema Error')
  }

  let arr = []

  for (let i = 0; i < errors.length; i++) {
    arr.push(errorcodes('BadRequest', 'Validation-Request', errors[i].message, errors[i]))
  }

  return arr
}

self.middleware = function (requestSchemaPath) {
  const requestSchema = require(requestSchemaPath)

  return function (req, res, next) {
    const validate = jsonschema.compile(requestSchema)
    const parameters = {...req.body, ...req.query}

    // if the parameters don't match the schema requirements, throw bad request
    if (!validate(parameters)) {
      return res.jsonapi.error(build(validate.errors)).send()
    }

    next()
  }
}

module.exports = self