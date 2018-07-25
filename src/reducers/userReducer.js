
const userReducer = (store = '', action) => {
  if (action.type === 'USER') {
    return action.user
  }
  return store
}

export const userLogin = content => async (dispatch) => {
  dispatch({
    type: 'USER',
    user: content,
  })
}

export default userReducer
