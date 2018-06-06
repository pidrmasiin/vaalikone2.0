

const edustajaReducer = (store = null, action) => {
  if (action.type === 'ADD') {
    return action.data
  }
  return store
}

export const addEdustaja = data => async (dispatch) => {
  dispatch({
    type: 'ADD',
    data,
  })
}

export default edustajaReducer
