import yleService from '../services/yle'
import Papa from 'papaparse'
import csv from '../components/yle/vanhatvastaukset.csv'

const initialState = {
  edustajat: [],
  puolueet: [],
  kysymykset: [],
}

const ylenKysymyksetReducer = (store = initialState, action) => {
  if (action.type === 'DATA') {
    return {
      ...store,
      edustajat: action.data.edustajat,
      puolueet: action.data.puolueet,
      kysymykset: action.data.kysymykset,
    }
  }
  return store
}



export const getYlenKysymykset = () => async (dispatch) => {
  const all = await yleService.getAll()
  dispatch({
    type: 'DATA',
    data: all[0],
  })
}

export const getYlenKysymyksetFromCSV = (nimet) => async (dispatch) => {
  console.log('moi', Papa)
  console.log('csv', csv)
  await Papa.parse(csv, {
    header: true,
    download: true,
    complete(results) {
      addYlePuolueet(nimet, results.data);
    },
  })
}

  const addYlePuolueet = async (nimet, ylendata) => {
  const edustajat = []
  for (let i = 0; i < nimet.length; i = i + 1) {
    const apu = nimet[i].split('/')
    let puolue = apu[1]
    switch (puolue) {
      case 'kesk':
        puolue = 'Keskustan eduskuntaryhmä'
        break
      case 'ps':
        puolue = 'Perussuomalaisten eduskuntaryhmä'
        break
      case 'kok':
        puolue = 'Kansallisen kokoomuksen eduskuntaryhmä'
        break
      case 'sd':
        puolue = 'Sosialidemokraattinen eduskuntaryhmä'
        break
      case 'vihr':
        puolue = 'Vihreä eduskuntaryhmä'
        break
      case 'vas':
        puolue = 'Vasemmistoliiton eduskuntaryhmä'
        break
      case 'r':
        puolue = 'Ruotsalainen eduskuntaryhmä'
        break
      case 'kd':
        puolue = 'Kristillisdemokraattinen eduskuntaryhmä'
        break
      default:
        break
    }
    const nimi = apu[0].toLowerCase()
    const data = {
      nimi,
      puolue,
    }

    edustajat.push(data)
  }
  const kesk = []
  const kok = []
  const sdp = []
  const vihr = []
  const vas = []
  const rkp = []
  const kd = []
  const ps = []

  const ulos = []
  for (let i = 0; i < ylendata.length; i = i + 1) {
    let copy = []
    // ylen datassa oli kaksi samaa nimeä ja ideetä
    if (ylendata[i].puolue !== 'Piraattipuolue') {
      copy = ylendata[i]
    }
    if (copy.sukunimi && copy.etunimi) {
      const nimi = copy.sukunimi.replace(/\s/g, '') + copy.etunimi.replace(/\s/g, '')
      const edustaja = edustajat.find(x => x.nimi === nimi.toLowerCase())
      if (edustaja) {
        copy.puolue = edustaja.puolue
        switch (copy.puolue) {
          case 'Keskustan eduskuntaryhmä':
            kesk.push(copy)
            break
          case 'Perussuomalaisten eduskuntaryhmä':
            ps.push(copy)
            break
          case 'Kansallisen kokoomuksen eduskuntaryhmä':
            kok.push(copy)
            break
          case 'Sosialidemokraattinen eduskuntaryhmä':
            sdp.push(copy)
            break
          case 'Vihreä eduskuntaryhmä':
            vihr.push(copy)
            break
          case 'Vasemmistoliiton eduskuntaryhmä':
            vas.push(copy)
            break
          case 'Ruotsalainen eduskuntaryhmä':
            rkp.push(copy)
            break
          case 'Kristillisdemokraattinen eduskuntaryhmä':
            kd.push(copy)
            break
          default:
            break
        }
        ulos.push(copy)
      }
    }
  }
  const puolueet = {
    kesk,
    kok,
    sdp,
    vihr,
    vas,
    rkp,
    kd,
    ps,
  }

  const kysymykset = Object.keys(ulos[0])
  const sliced = kysymykset.slice(37, 99)
  const filtered = sliced.filter(x => !x.includes('kommentti'))


  const out = {
    edustajat: ulos,
    puolueet,
    kysymykset: filtered,
  }
  console.log('ou', out);
   try {
        await yleService.addYle(out);
      } catch (exception) {
        console.log('Tapahtui virhe');
      }
}

export default ylenKysymyksetReducer
