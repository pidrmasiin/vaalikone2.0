import yle2019Service from '../services/yle2019'


const initialState = {
  members: [],
  parties: [],
  headers: [],
}

const yle2019Reducer = (store = initialState, action) => {
    console.log('data', action);
    
  if (action.type === 'YLE2019') {
    return {
      ...store,
      members: action.data.members,
      parties: action.data.parties,
      headers: action.data.headers,
    }
  }
  return store
}



export const getYle2019 = () => async (dispatch) => {
  const all = await yle2019Service.getAll()
  dispatch({
    type: 'YLE2019',
    data: all[0],
  })
}

export default yle2019Reducer