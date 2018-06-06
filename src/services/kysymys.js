import axios from 'axios'

const baseUrl = '/api/kysymykset'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const addKysymys = async (newObject) => {
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


const addKategoria = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post('/api/kategoriat', newObject, config)
  return response.data
}

const modifyKysymys = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}


export default {
  getAll,
  setToken,
  addKysymys,
  remove,
  addKategoria,
  modifyKysymys,
}
