module.exports = function (app, authMiddleware, validation, jsonapi) {
  const ctrl = require('./controller')

  app.post('/api/rating',
    jsonapi.middleware(),
    authMiddleware.middleware(),
    validation.middleware(`${__dirname}/schema/Post.req`),
    ctrl.Post
  )

  app.get('/api/rating',
    jsonapi.middleware(),
    authMiddleware.middleware(),
    validation.middleware(`${__dirname}/schema/Get.req`),
    ctrl.Get
  )
}