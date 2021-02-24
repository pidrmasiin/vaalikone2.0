const initialState = {
    questions: [],
    helsinkiParties: [
      { name: 'sdp', votes: 0, url: 'https://i.imgur.com/GSMua2B.png' },
      { name: 'kesk', votes: 0, url: 'https://i.imgur.com/qbiX1tI.png' },
      { name: 'ps', votes: 0, url: 'https://i.imgur.com/4YZPeP9.jpg' },
      { name: 'kok', votes: 0, url: 'https://i.imgur.com/kSDY19E.jpg' },
      { name: 'rkp', votes: 0, url: 'https://i.imgur.com/hrCJsLx.png' },
      { name: 'vihr', votes: 0, url: 'https://i.imgur.com/qOxMDMd.png' },
      { name: 'kd', votes: 0, url: 'https://i.imgur.com/oVzcTTD.jpg' },
      { name: 'vas', votes: 0, url: 'https://i.imgur.com/P0wEpt3.png' },
      { name: 'sin', votes: 0, url: 'https://i.imgur.com/gbryVO0.png' },
      { name: 'liike', votes: 0, url: 'https://liikenyt.fi/wp-content/uploads/2018/04/liike-nyt-vari-ensisijainen.jpg' },
      { name: 'ap', votes: 0, url: '' },
      { name: 'th', votes: 0, url: '' },
      { name: 'fp', votes: 0, url: '' }
    ],
    party: '',
  }
  
  const regionalUserReducer = (store = initialState, action) => {
  
    let party = store.helsinkiParties.filter(p => p.name === action.type)
    let filtered = store.helsinkiParties.filter(p => p.name !== action.type)
  
    if (party.length > 0) {
      party[0].votes = party[0].votes + 1
      filtered.push(party[0])
    }
  
    if (action.type === 'REGIONAL_QUESTION_WITH_ANSWER') {
      const old = store.questions.filter(k => k.id !== action.question.id)
      old.push(action.question)

      return { ...store, questions: old }
    }
  
    if (action.type === 'REGIONAL_PARTY') {
      return { ...store, party: action.party }
    }
    switch (action.type) {
      case 'liike':
        return { ...store, helsinkiParties: filtered }
      case 'kesk':
        return { ...store, helsinkiParties: filtered }
      case 'ps':
        return { ...store, helsinkiParties: filtered }
      case 'kok':
        return { ...store, helsinkiParties: filtered }
      case 'sdp':
        return { ...store, helsinkiParties: filtered }
      case 'vihr':
        return { ...store, helsinkiParties: filtered }
      case 'vas ':
        return { ...store, helsinkiParties: filtered }
      case 'sin':
        return { ...store, helsinkiParties: filtered }
      case 'rkp':
        return { ...store, helsinkiParties: filtered }
      case 'kd':
        return { ...store, helsinkiParties: filtered }
      default:
    }

    return store
  }
  
  export const addQuestion = content => async (dispatch) => {
    dispatch({
      type: 'REGIONAL_QUESTION_WITH_ANSWER',
      question: content,
    })
  }
  
  export const addParty = content => async (dispatch) => {
    dispatch({
      type: 'REGIONAL_PARTY',
      party: content,
    })
  }
  
  export const addAnswer = content => async (dispatch) => {
    console.log('ah.');

      console.log(content);
      
    dispatch({
      type: content,
    })
  }
  
  
  export default regionalUserReducer;
  