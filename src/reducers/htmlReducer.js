const intialState = {
  puolueet: '',
  edustajat: '',
}

const htmlReducer = (store = intialState, action) => {
  if (action.type === 'HTML_PUOLUEET') {
    return { ...store, puolueet: action.html }
  } if (action.type === 'HTML_EDUSTAJAT') {
    return { ...store, edustajat: action.html }
  }


  return store
}

export const htmlPuolueet = html => async (dispatch) => {
  dispatch({
    type: 'HTML_PUOLUEET',
    html,
  })
}

export const htmlEdustajat = html => async (dispatch) => {
  dispatch({
    type: 'HTML_EDUSTAJAT',
    html,
  })
}

export default htmlReducer;
