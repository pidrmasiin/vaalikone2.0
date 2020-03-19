import React from 'react';
import { connect } from 'react-redux';
import { Segment, Dropdown, Dimmer, Loader, Icon, Button, Modal } from 'semantic-ui-react'
import '../../css/Home.css'
import '../../App.css'

import SimpleOpinionChart from '../general/SimpleOpinionChart';
import InfoAccordion from '../general/InfoAccordion';
import SimpleYleChart from './yle2019/SimpleYleChart';
import FundsModal from './funds/FundsModal';

class SingleQuestionData extends React.Component {
    state = {
      yle2019: this.props.question.yle2019,
      question: this.props.question,
      questionIndex: 0,
      active: false
    }
  componentDidMount() {
      this.setQuestionData(this.props.question)
  }

  setQuestionData = (question) => {
    const questionData = question.puolueet.map( party => ({ 
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

  handleChange(e, { name, value }) {
    this.setState({ [name]: value, questionIndex: this.state.questionIndex + 1 })
  }

  handleQuestionChange(e, { name, value }) {
    this.setState({ [name]: this.props.questions.find(q => q.id == value) })
    this.setQuestionData(this.props.questions.find(q => q.id == value))
  }

  parseQuestion = (q) => {
    let slicedQ = (q.length > 50 && window.innerWidth < 700)? q.slice(0, 50) + '...' : q
    return slicedQ
  }

  handleOpen = () => this.setState({ active: true })
  handleClose = () => this.setState({ active: false })

  render(){
    const yleValues2019 = this.props.yle2019.headers.slice(4,33).map(x => x = { text: this.parseQuestion(x), value: x })
    const questions = this.props.questions.filter(q => q.createdAt != null).map(q => q = {text: this.parseQuestion(q.kysymys), value: q.id})
     
    return <div style={{marginTop: '0.5em'}}>
        <h1>Tulokset</h1>
          <Dropdown
            scrolling
            text={this.state.question.kysymys}
            style={{fontWeight: 'bold', borderTop: '2px solid #004d99'}}
            type="text"
            name="question"
            value={this.state.question.id}
            onChange={this.handleQuestionChange.bind(this)}
            fluid 
            selection 
            options={questions}
            search={false}
          />
          <div style={{marginLeft: '0.5em'}}>
            <span className='question-text'>
              <InfoAccordion 
                text={this.state.question.selitys}
                title='Lisätietoja kysymyksestä'
                question={this.state.question}
                iconSize='small'
                explain={this.state.question.explain}
                />
            </span>
          </div>
      <h3 style={{marginTop: '0.8em'}}>Tiedot</h3>
      <p>Voit klikata palkkeja ja lohkoja tarkastellaksi puolueiden kantoja lähemmin.</p>
      {this.state.questionData && <SimpleOpinionChart data={this.state.questionData} chartId='singleParliamentQuestion'/>}
      <br />
      <FundsModal question={this.props.question}/>
      <br />
      <br />

      <hr className='chart-divider'/>
      {this.props.yle2019.members.length > 0 ?
      <Segment style={{fontSize: '1em'}} basic>
      <h2>Yle</h2>
      <Dropdown
        search={false}
        scrolling
        text={this.state.yle2019}
        style={{fontWeight: 'bold', marginBottom: '0.5em', borderTop: '2px solid #004d99'}} 
        type="text"
        name="yle2019"
        value={this.state.yle2019}
        onChange={this.handleChange.bind(this)} 
        fluid 
        selection 
        options={yleValues2019} />
      <div className="info-icon" >
        <Icon name="info circle" size='small' />
      </div>
      <span style={{fontSize: '0.9em'}}>
        Voit verrata eduskunnan käyttäytymistä edustajien antamiin vastauksiin valitsemassasi ylen vaalikonekysymyksessä.
        Vastauksissa melko samaa mieltä on tulkittu jaaksi ja melko eri mieltä eiksi.
      </span>
      <br />
      <br />
      <SimpleYleChart yleQuestion={this.state.yle2019} />
      </Segment>
      :
      <Segment basic style={{height: '5em'}}>
      <Dimmer active>
        <Loader indeterminate>Ladataan ylen dataa</Loader>
      </Dimmer>
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