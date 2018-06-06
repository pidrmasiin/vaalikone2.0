import axios from 'axios'

const baseUrl = '/api/kategoriat'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const addKategoria = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default {
  getAll,
  setToken,
  addKategoria,
  remove,
}
