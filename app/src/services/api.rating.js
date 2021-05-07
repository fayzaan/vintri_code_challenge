import axios from 'axios'

export default {
  get: function (params) {
    return axios
      .get(`${process.env.VUE_APP_API_URL}/api/rating`, {headers: {'x-user': 'foo@bar.com'}, params})
      .then(ratingResponse => ratingResponse.data.data.results)
  },
  rate: function (data) {
    return axios.post(`${process.env.VUE_APP_API_URL}/api/rating`, data, {headers: {'x-user': 'foo@bar.com'}})
  }
}