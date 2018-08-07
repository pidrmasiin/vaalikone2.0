import kategoriatService from '../services/kategoria'

const kategoriatReducer = (store = [], action) => {
  if (action.type === 'GET_GATEGORIES') {
    return action.data
  } if (action.type === 'ADD_GATEGORIES') {
    return store.concat(action.data)
  }
  return store
}

export const getKategoriat = () => async (dispatch) => {
  const all = await kategoriatService.getAll()
  dispatch({
    type: 'GET_GATEGORIES',
    data: all,
  })
}

export const addKategoriat = kategoria => async (dispatch) => {
  const one = await kategoriatService.addKategoria(kategoria);
  dispatch({
    type: 'ADD_GATEGORIES',
    data: one,
  })
}

export default kategoriatReducer
