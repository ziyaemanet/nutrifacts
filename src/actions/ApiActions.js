import axios from 'axios'

export const search = (query, page) => ({
  type: 'SEARCH_FOODS',
  payload: axios.get(`https://api.nal.usda.gov/ndb/search/?format=json&q=${encodeURIComponent(query)}&sort=r&offset=${page * 50}&max=50&api_key=${process.env.API_KEY}`)
                .then(res => res.data)
})

export const getFood = (ndbno) => ({
  type: 'GET_FOOD',
  payload: axios.get(`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${ndbno}&type=b&format=json&api_key=${process.env.API_KEY}`)
                .then(res => res.data)
})

export const clearResults = () => ({
  type: 'CLEAR_RESULTS'
})
