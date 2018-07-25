import axios from 'axios'

const baseUrl = '/api/yle'


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// const addYle = async (newObject) => {
//   const response = await axios.post(baseUrl, newObject)
//   return response.data
// }

export default {
  getAll,
}
