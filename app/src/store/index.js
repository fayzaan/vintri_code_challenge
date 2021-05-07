import Vue from 'vue'
import Vuex from 'vuex'
import apiBeer from '../services/api.beer'
import apiRating from '../services/api.rating'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    beers: []
  },
  mutations: {
    SET_BEERS(state, beers) {
      state.beers = beers
    }
  },
  getters: {
    beers: (state) => state.beers
  },
  actions: {
    getBeers({commit}, params) {
      // find the beers first, based on criteria
      apiBeer.get(params)
        .then(results => {
          const beerIds = results.map(b => b.id)

          if (beerIds.length) {
            // then grab the ratings for the ids of the beers returned
            apiRating.get({beerIds})
              .then(ratings => {
                // merge the results with ratings
                const beers = results.map(b => {
                  b.rating = ratings.filter(r => r.beerId === b.id)
                  return b
                })

                commit('SET_BEERS', beers)
              })
              .catch(err => {
                console.log('ratings.get.failed', err)
              })
          } else {
            // this case shouldn't happen unless empty results
            const beers = results.map(b => ({...b, rating: []}))
            
            commit('SET_BEERS', beers)
          }
        })
        .catch(err => {
          console.error('beers.get.failed', err)
        })
    }
  },
  modules: {
  }
})
