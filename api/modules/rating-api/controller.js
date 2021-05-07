'use strict'
const DB = require('nosql')
const nosql = DB.load('./modules/database/db.nosql')
const errorcodes = require('../errorcodes')

let self = {}

self.Post = async function (req, res) {
  try {
    const {beerId, rating, comment} = req.body
    const result = await nosql.insert({beerId, rating, comment})

    return res.jsonapi.send({success: true, result})
  } catch (e) {
    console.log('rating.post.failed', e)
    return res.jsonapi.error(errorcodes('Internal', e.code, e.message)).send()
  }
}

self.Get = async function (req, res) {
  try {
    let {beerId, beerIds} = req.query

    // because its from query, it is in string form
    // assume its number, the json validation ensures its a number
    if (beerId) {
      beerId = parseInt(beerId)
    } else {
      beerIds = beerIds.map(id => parseInt(id))
    }
    
    await nosql.find()
      .make(builder => {
        if (beerId) {
          builder.where('beerId', '=', beerId)
        }
        
        if (beerIds) {
          builder.in('beerId', beerIds)
        }
      })
      .callback((err, results) => {
        if (err) {
          return res.jsonapi.error(errorcodes()).send()
        }

        return res.jsonapi.send({success: true, results})
      })

  } catch (e) {
    console.log('rating.get.failed', e)
    return res.jsonapi.error(errorcodes('Internal', e.code, e.message)).send()
  }
}

module.exports = self