module.exports = function (app, authMiddleware, validation, jsonapi) {
  const ctrl = require('./controller')

  app.get('/api/beers',
    jsonapi.middleware(),
    authMiddleware.middleware(),
    validation.middleware(`${__dirname}/schema/Get.req`),
    ctrl.Get
  )
}