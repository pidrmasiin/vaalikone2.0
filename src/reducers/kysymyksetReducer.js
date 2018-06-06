import kysymysService from '../services/kysymys'

const kysymyksetReducer = (store = [], action) => {
  if (action.type === 'GET_ALL') {
    return action.data
  }
  return store
}

export const getKysymykset = () => async (dispatch) => {
  const all = await kysymysService.getAll()
  dispatch({
    type: 'GET_ALL',
    data: all,
  })
}

export default kysymyksetReducer
