'use strict'
const Punk = require('../punk')

let self = {}

self.Get = async function (req, res) {
  try {
    let {beer_name} = req.query

    // if no beer_name is specified, have to pass null as Punk API wont accept ''
    if (!beer_name) {
      beer_name = null
    }
    
    const results = await Punk.Get({beer_name})
    
    return res.json({success: true, results})
  } catch (e) {
    console.log('Beers.get.faild', e)
    return res.status(500).json({errors: [{title: 'Unexpected Error', statusCode: '500',}]})
  }
}

module.exports = self