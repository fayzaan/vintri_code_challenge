const assert = require('chai').assert
const sinon = require('sinon')
const middleware = require('../index').middleware
const {mockReq, mockRes} = require('sinon-express-mock')

describe('Testing authorized middleware', function () {
  const mw = middleware()
  
  it('missing x-user header should not call next', () => {
    const nextSpy = sinon.spy()
    const req = mockReq({headers:{}})
    const res = mockRes()
    
    mw(req, res, nextSpy)
    assert.equal(nextSpy.calledOnce, false)
  })

  it('x-user header with invalid email should not call next', () => {
    const nextSpy = sinon.spy()
    const req = mockReq({headers:{'x-user': 'foo'}})
    const res = mockRes()
    
    mw(req, res, nextSpy)
    assert.equal(nextSpy.calledOnce, false)
  })

  it('x-user header with valid email should call next', () => {
    const nextSpy = sinon.spy()
    const req = mockReq({headers:{'x-user': 'foo@bar.com'}})
    const res = mockRes()
    
    mw(req, res, nextSpy)
    assert.equal(nextSpy.calledOnce, true)
  })
})