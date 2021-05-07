import axios from 'axios'

export default {
  get: function (params = {}) {
    const {beer_name} = params

    return axios
      .get(`${process.env.VUE_APP_API_URL}/api/beers`, {
        headers: {'x-user': 'foo@bar.com'},
        params: {
          beer_name
        }
      })
      .then(response => response.data.results)
  }
}