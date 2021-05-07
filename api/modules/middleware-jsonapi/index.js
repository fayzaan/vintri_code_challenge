'use strict'

const ajv = require('ajv')
const jsonschema = ajv()
const errorcodes = require('../errorcodes')
// const log = require('../logger')

let self = {}

let wrapper = function (req, res, jsonSchema) {
  this.req = req
  this.res = res
  this.jsonschema = jsonSchema
  this._errors = []
}

wrapper.prototype.send = function (data, options = {}) {
  let json = {}

  if (this._errors.length) {
    json.errors = this._errors
    let _status = 200
    
    this._errors.forEach(err => {
      // log errors
      _status = Math.max(_status, parseInt(err.statusCode))
    })

    this.res.status(_status)
  } else {
    json.data = data
  }

  // log the response
  return this.res.send(json)
}

wrapper.prototype.error = function (error) {
  if (!Array.isArray(error)) {
    error = [error]
  }

  if (!error[0].statusCode) {
    error = errorcodes() // throw default error
  }

  this._errors = this._errors.concat(error)

  return this
}

self.middleware = function () {
  return function (req, res, next) {
    res.jsonapi = new wrapper(req, res, jsonschema)
    next()
  }
}

module.exports = self