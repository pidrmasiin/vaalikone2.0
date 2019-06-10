import axios from 'axios'

const baseUrl = '/api/yle2019'


const getAll = async () => {
  const config = {
    headers: { Authorization: 'ylerocks' },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const addYle = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default {
  getAll,
  addYle
}
