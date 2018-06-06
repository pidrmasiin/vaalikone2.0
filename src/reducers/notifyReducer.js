const notifyReducer = (store = '', action) => {
    if (action.type==='SHOW') {
      return action.notify
    }
    return store
  }
  
  export const notifyCreation = (content, time) => {
    return async (dispatch) => {
      dispatch({
        type: 'SHOW',
        notify: content
      })
      setTimeout(() => dispatch({
        type: 'SHOW',
        notify: ''
      }), time * 1000)
    }
  }
  
  export default notifyReducer