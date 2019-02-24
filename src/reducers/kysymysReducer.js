const initialState = {
  kysymys: '',
  selitys: '',
  url: '',
  puolueet: [],
  edustajat: [],
  kategoriat: [],
  vuosi: '',
  vastaus: '',
  tunniste: ''
}

const kysymysReducer = (store = initialState, action) => {
  if (action.type === 'ADD_PUOLUE') {
    return { ...store, puolueet: action.puolueet }
  } if (action.type === 'ADD_DETAILS') {
    return {
      ...store,
      kysymys: action.details.kysymys,
      selitys: action.details.selitys,
      url: action.details.url,
      vuosi: action.details.vuosi,
      vastaus: action.details.vastaus,
      hot: action.details.hot,
      kysymyksenAsettelu: action.details.kysymyksenAsettelu,
      jaaLiberal: action.details.jaaLiberal,
      jaaLeftist: action.details.jaaLeftist,
      jaaGreen: action.details.jaaGreen,
      tunniste: action.details.tunniste
    }
  } if (action.type === 'ADD_EDUSTAJAT') {
    return { ...store, edustajat: action.edustajat }
  } if (action.type === 'ADD_KATEGORIAT') {
    return { ...store, kategoriat: action.kategoriat }
  }
  return store
}

export const addPuolueet = puolueet => async (dispatch) => {
  dispatch({
    type: 'ADD_PUOLUE',
    puolueet,
  })
}

export const addEdustajat = edustajat => async (dispatch) => {
  dispatch({
    type: 'ADD_EDUSTAJAT',
    edustajat,
  })
}

export const addDetails = details => async (dispatch) => {
  dispatch({
    type: 'ADD_DETAILS',
    details,
  })
}

export const addKategoriat = kategoriat => async (dispatch) => {
  dispatch({
    type: 'ADD_KATEGORIAT',
    kategoriat,
  })
}


export default kysymysReducer;

