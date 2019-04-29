const initialState = {
  kysymykset: [],
  puolueet: [
    { name: 'Sosialidemokraattinen eduskuntaryhmä', aanet: 0, url: 'https://i.imgur.com/GSMua2B.png' },
    { name: 'Keskustan eduskuntaryhmä', aanet: 0, url: 'https://i.imgur.com/qbiX1tI.png' },
    { name: 'Perussuomalaisten eduskuntaryhmä', aanet: 0, url: 'https://i.imgur.com/4YZPeP9.jpg' },
    { name: 'Kansallisen kokoomuksen eduskuntaryhmä', aanet: 0, url: 'https://i.imgur.com/kSDY19E.jpg' },
    { name: 'Ruotsalainen eduskuntaryhmä', aanet: 0, url: 'https://i.imgur.com/hrCJsLx.png' },
    { name: 'Vihreä eduskuntaryhmä', aanet: 0, url: 'https://i.imgur.com/qOxMDMd.png' },
    { name: 'Kristillisdemokraattinen eduskuntaryhmä', aanet: 0, url: 'https://i.imgur.com/oVzcTTD.jpg' },
    { name: 'Vasemmistoliiton eduskuntaryhmä', aanet: 0, url: 'https://i.imgur.com/P0wEpt3.png' },
    { name: 'Sininen eduskuntaryhmä', aanet: 0, url: 'https://i.imgur.com/gbryVO0.png' },
    { name: 'Liike Nyt-eduskuntaryhmä', aanet: 0, url: 'https://liikenyt.fi/wp-content/uploads/2018/04/liike-nyt-vari-ensisijainen.jpg' },
  ],
  euroParties: [
    { name: 'S&D', aanet: 0, url: 'https://i.imgur.com/GSMua2B.png' },
    { name: 'ALDE/ADLE', aanet: 0, url: 'https://i.imgur.com/qbiX1tI.png', url2: 'https://i.imgur.com/hrCJsLx.png' },
    { name: 'ECR', aanet: 0, url: 'https://i.imgur.com/4YZPeP9.jpg' },
    { name: 'EPP', aanet: 0, url: 'https://i.imgur.com/kSDY19E.jpg', url2: 'https://i.imgur.com/oVzcTTD.jpg' },
    { name: 'Greens/EFA', aanet: 0, url: 'https://i.imgur.com/qOxMDMd.png' },
    { name: 'GUE-NGL', aanet: 0, url: 'https://i.imgur.com/P0wEpt3.png' },
    { name: 'EFDD', aanet: 0, url: 'https://upload.wikimedia.org/wikipedia/commons/7/74/EFDD_logo.jpg' },
    { name: 'NI', aanet: 0, url: 'https://pbs.twimg.com/profile_images/1100156912656621573/o9YlcsX__400x400.png' }
  ],
  puolue: '',
}

const kayttajaReducer = (store = initialState, action) => {
  let puolue = store.puolueet.filter(p => p.name === action.type)
  let filtered = store.puolueet.filter(p => p.name !== action.type)

  if(action.eu){
    puolue = store.euroParties.filter(p => p.name === action.type)
    filtered = store.euroParties.filter(p => p.name !== action.type)
  }

  if (puolue.length > 0) {
    puolue[0].aanet = puolue[0].aanet + 1
    filtered.push(puolue[0])
  }

  if (action.type === 'VASTAUS') {
    const old = store.kysymykset.filter(k => k.id !== action.kysymys.id)
    old.push(action.kysymys)
    return { ...store, kysymykset: old }
  }

  if (action.type === 'PUOLUE') {
    return { ...store, puolue: action.puolue }
  }
  switch (action.type) {
    case 'Liike Nyt-eduskuntaryhmä':
      return { ...store, puolueet: filtered }
    case 'Keskustan eduskuntaryhmä':
      return { ...store, puolueet: filtered }
    case 'Perussuomalaisten eduskuntaryhmä':
      return { ...store, puolueet: filtered }
    case 'Kansallisen kokoomuksen eduskuntaryhmä':
      return { ...store, puolueet: filtered }
    case 'Sosialidemokraattinen eduskuntaryhmä':
      return { ...store, puolueet: filtered }
    case 'Vihreä eduskuntaryhmä':
      return { ...store, puolueet: filtered }
    case 'Vasemmistoliiton eduskuntaryhmä':
      return { ...store, puolueet: filtered }
    case 'Sininen eduskuntaryhmä':
      return { ...store, puolueet: filtered }
    case 'Ruotsalainen eduskuntaryhmä':
      return { ...store, puolueet: filtered }
    case 'Kristillisdemokraattinen eduskuntaryhmä':
      return { ...store, puolueet: filtered }
    default:
  }
  return store
}

export const addKysymys = content => async (dispatch) => {
  dispatch({
    type: 'VASTAUS',
    kysymys: content,
  })
}

export const addPuolue = content => async (dispatch) => {
  dispatch({
    type: 'PUOLUE',
    puolue: content,
  })
}

export const addVastaus = content => async (dispatch) => {
  dispatch({
    type: content,
  })
}

export const addEuroVastaus = content => async (dispatch) => {
  dispatch({
    eu: true,
    type: content,
  })
}


export default kayttajaReducer;
