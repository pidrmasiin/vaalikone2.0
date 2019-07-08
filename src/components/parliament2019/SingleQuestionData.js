import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react'

import SimpleOpinionChart from '../general/SimpleOpinionChart';
import InfoAccordion from '../general/InfoAccordion';
import SimpleYleChart from './yle2019/SimpleYleChart';

class SingleQuestionData extends React.Component {
    state = {}
  componentDidMount() {
      const questionData = this.props.question.puolueet.map( party => ({ 
            State: this.parseParties(party.nimi), 
            freq: {jaa: party.jaa, ei: party.ei, "poissa/tyhjiä": party.tyhjia + party.poissa},
            barColor: this.getColor(party.nimi)
            }
          ))
      
      this.setState({questionData})    
   
  }

  parseParties = (party) => {
    let puolue = party
    switch (party) {
      case 'Keskustan eduskuntaryhmä':
        puolue = 'kesk'
        break
      case 'Perussuomalaisten eduskuntaryhmä':
        puolue = 'ps'
        break
      case 'Kansallisen kokoomuksen eduskuntaryhmä':
        puolue = 'kok'
        break
      case 'Sosialidemokraattinen eduskuntaryhmä':
        puolue = 'sdp'
        break
      case 'Vihreä eduskuntaryhmä':
        puolue = 'vihr'
        break
      case 'Vasemmistoliiton eduskuntaryhmä':
        puolue = 'vas'
        break
      case 'Ruotsalainen eduskuntaryhmä':
        puolue = 'rkp'
        break
      case 'Kristillisdemokraattinen eduskuntaryhmä':
        puolue = 'kd'
        break
      case 'Liike Nyt -eduskuntaryhmä':
        puolue = 'nyt'
        break
      default:
        break
    }
    return puolue
  }

  getColor = (party) => {
    let puolue = 'grey'
    switch (party) {
      case 'Keskustan eduskuntaryhmä':
        puolue = '#006600'
        break
      case 'Perussuomalaisten eduskuntaryhmä':
        puolue = '#000066'
        break
      case 'Kansallisen kokoomuksen eduskuntaryhmä':
        puolue = '#0099ff'
        break
      case 'Sosialidemokraattinen eduskuntaryhmä':
        puolue = '#ff3300'
        break
      case 'Vihreä eduskuntaryhmä':
        puolue = '#33cc33'
        break
      case 'Vasemmistoliiton eduskuntaryhmä':
        puolue = '#660033'
        break
      case 'Ruotsalainen eduskuntaryhmä':
        puolue = '#ffcc00'
        break
      case 'Kristillisdemokraattinen eduskuntaryhmä':
        puolue = '#ffff66'
        break
      case 'Liike Nyt -eduskuntaryhmä':
        puolue = '#cc0099'
        break
      default:
        break
    }
    return puolue
  }
        
  render(){
    return <div>
        <h2>Eduskunta</h2>
        <Segment color='blue'>
          <h3>{this.props.question.kysymys}</h3>
          <span className='question-text'>
            <InfoAccordion 
              text={this.props.question.selitys}
              title='Lisätietoja'
              iconSize='little'
              />
          </span>
        </Segment>
      Voit klikata palkkeja ja tarkastella yksittäisten puolueiden käyttäytymisen jakautumista.
      {this.state.questionData && <SimpleOpinionChart data={this.state.questionData} chartId='singleParliamentQuestion'/>}
      {this.props.question.yle2019 && <Segment basic>
      <h2>Yle</h2>
      <SimpleYleChart yleQuestion={this.props.question.yle2019}/>
      </Segment>
      }

    </div>
  }
}

const mapStateToProps = state => ({
  questions: state.kysymykset,
  yle2019: state.yle2019
});

export default connect(
  mapStateToProps,
  null
)(SingleQuestionData)