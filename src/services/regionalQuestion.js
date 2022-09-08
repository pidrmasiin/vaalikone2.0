import axios from 'axios'

const baseUrl = '/api/regionalQuestions'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getAllRegion = async (region) => {
  const response = await axios.get(`${baseUrl}/region/${region}`)
  return response.data
}

const getAllWithDisabled = async () => {
  const response = await axios.get(`${baseUrl}/all_requlars`)
  return response.data
}

const activate = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/activate/${id}`, config)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const addRegionalQuestion = async (newObject) => {
  console.log(newObject)
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

const modifyRegionalQuestion = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const getRegionalQuestion = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}


export default {
  getAll,
  setToken,
  addRegionalQuestion,
  remove,
  modifyRegionalQuestion,
  getAllWithDisabled,
  activate,
  getRegionalQuestion,
  getAllRegion
}
