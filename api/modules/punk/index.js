'use strict'

const cache = require('memory-cache')
const axios = require('axios')
const API_VERSION = `v2`
const API_URL = `https://api.punkapi.com/${API_VERSION}/`
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

let self = {}

self.Get = async function (params = {}) {
  const {beer_name = null, per_page = 9} = params
  const cached = cache.get(beer_name)
  
  // check if we have a cached result for this query
  if (cached) {
    // return cached
    return cached
  }

  // if not cached, lets query from source
  const res = await axios.get(`${API_URL}/beers`, {params: {beer_name, per_page}})
  
  // filter out the other metadata that we don't need
  const results = res.data.map(beer => {
    const {id, name, description, first_brewed, food_pairing, image_url} = beer
    return {id, name, description, first_brewed, food_pairing, image_url}
  })

  // write to cache for future requests for same name
  cache.put(beer_name, results, CACHE_DURATION)

  return results
}

module.exports = self