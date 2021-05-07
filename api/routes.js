const authMiddleware = require('./modules/middleware-authorized')
const validation = require('./modules/middleware-validation')
const jsonapi = require('./modules/middleware-jsonapi')
const beers = require('./modules/beers-api/route')
const rating = require('./modules/rating-api/route')

module.exports = function (app) {
  beers(app, authMiddleware, validation, jsonapi)
  rating(app, authMiddleware, validation, jsonapi)
}