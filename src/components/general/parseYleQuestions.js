import React from 'react';
import { Icon, Popup} from 'semantic-ui-react'

const parseQuestion = (q) => {
    let slicedQ = (q.length > 50 && window.innerWidth < 700)? q.slice(0, 50) + '...' : q
    return slicedQ
  }

  const parseQuestionOut = (q) => {
    if (q.length > 200) {
        let slicedQ = q.slice(0, 200) + '...'
        return <h3 style={{textAlign: 'center'}}>{
            slicedQ
             } <Popup 
                 content={q}
                 trigger={<Icon name='add' 
                 />} />
               </h3>
    }
    return <h3 style={{textAlign: 'center'}}>{q}</h3>
  }


const yleQuestions2019 = (yle2019) => {
    console.log('haloo');
    const back = yle2019.headers.slice(4,33).map(x => x = { text: parseQuestion(x), value: x })
    return back
} 

const opinonsHelper = (yleOpionNumber) => {
    let opinion = 'poissa'
    switch (yleOpionNumber) {
      case '1':
        opinion = 'ei'
        break
      case '2':
        opinion = 'ei'
        break
      case '4':
        opinion = 'jaa'
        break
      case '5':
        opinion = 'jaa'
        break
      default:
        break
    }
    return opinion
  }

export default { yleQuestions2019, parseQuestionOut, opinonsHelper }

