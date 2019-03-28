import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux';
import {Radar} from 'react-chartjs-2';
import { Checkbox, Accordion, Icon} from 'semantic-ui-react';


class NolansMap extends React.Component {
  state = {
    questions: this.props.questions,
    valuesCount: 0,
    greenCount: 0,
    economicsCount: 0,
    maxDataValue: 0,
    dataSets: [],
    selectParties: false,
    partiesData: [
      {
        data: [0, 0, 0, 0, 0], 
        label: "Keskustan eduskuntaryhmä",
        borderColor: "rgb(51, 153, 51)",
        backgroundColor: "rgb(51, 153, 51, 0.1)"
      },
      {
        data: [0, 0, 0, 0, 0], 
        label: "Kansallisen kokoomuksen eduskuntaryhmä",
        borderColor: "rgb(51, 153, 255)",
        backgroundColor: "rgb(51, 153, 255, 0.1)"
      },
      {
        data: [0, 0, 0, 0, 0], 
        label: "Sosialidemokraattinen eduskuntaryhmä",
        borderColor: "rgb(153, 0, 0)",
        backgroundColor: "rgb(153, 0, 0, 0.1)"
      },
      {
        data: [0, 0, 0, 0, 0], 
        label: "Sininen eduskuntaryhmä",
        borderColor: "rgb(102, 255, 204)",
        backgroundColor: "rgb(102, 255, 204, 0.1)"
      },
      {
        data: [0, 0, 0, 0, 0], 
        label: "Perussuomalaisten eduskuntaryhmä",
        borderColor: "rgb(0, 0, 153)",
        backgroundColor: "rgb(0, 0, 153, 0.1)"
      },
      {
        data: [0, 0, 0, 0, 0], 
        label: "Vihreä eduskuntaryhmä",
        borderColor: "rgb(153, 255, 102)",
        backgroundColor: "rgb(153, 255, 102, 0.1)"
      },
      {
        data: [0, 0, 0, 0, 0], 
        label: "Ruotsalainen eduskuntaryhmä",
        borderColor: "rgb(255, 255, 0)",
        backgroundColor: "rgb(255, 255, 0, 0.1)"
      },
      {
        data: [0, 0, 0, 0, 0], 
        label: "Vasemmistoliiton eduskuntaryhmä",
        borderColor: "rgb(204, 102, 153)",
        backgroundColor: "rgb(204, 102, 153, 0.1)"
      },
      {
        data: [0, 0, 0, 0, 0], 
        label: "Kristillisdemokraattinen eduskuntaryhmä",
        borderColor: "rgb(255, 153, 51)",
        backgroundColor: "rgb(255, 153, 51, 0.1)"
      },
      {
        data: [0, 0, 0, 0, 0], 
        label: "Liike Nyt -eduskuntaryhmä",
        borderColor: "rgb(204, 0, 255)",
        backgroundColor: "rgb(204, 0, 255, 0.1)"
      },
      {
        data: [0, 0, 0, 0, 0], 
        label: "Tähtiliikkeen eduskuntaryhmä"
      },
      {
        data: [0, 0, 0, 0, 0], 
        label: "Sinä",
        borderColor: "rgb(255, 0, 165)",
        backgroundColor: "rgb(255, 0, 165, 0.1)"
      }
    ],
    selectedParties: [],
    allParties: true,
    info: false
  }

  componentDidMount = () => {
    this.dataToRadar()
  }

  dataToRadar = () => {
    this.setState({
      selectedParties: [_.orderBy(this.props.user.puolueet, ['aanet'], ['desc'])[0].name, "Sinä"]
    })
    const questions = this.props.user.kysymykset
    const valueQuestions = questions.filter(q => q.hasOwnProperty('jaaLiberal'))
    const economicQuestions = questions.filter(q => q.hasOwnProperty('jaaLeftist'))
    const greenQuestions = questions.filter(q => q.hasOwnProperty('green'))


    valueQuestions.forEach(q => this.setValuesToDataset(q, "values"))
    economicQuestions.forEach(q => this.setValuesToDataset(q, "economics"))
    greenQuestions.forEach(q => this.setValuesToDataset(q, "green"))
  }

  setValuesToDataset = (question, label) => {
    const user_party = {
      nimi: "Sinä",
      kanta: question.user
    }
    if (!question.puolueet.find(x => x.nimi == 'Sinä')){
      question.puolueet.push(user_party)
    }
    
    switch(label) {
      case "values":
        if (question.jaaLiberal) {
          question.puolueet.forEach( party => this.setValuesToDataHelper(party, true, label))
        } else if (typeof question.jaaLiberal == 'boolean') {
          question.puolueet.forEach( party => this.setValuesToDataHelper(party, false, label))
        }
        break;
      case "economics":
        if (question.jaaLeftist) {
          question.puolueet.forEach( party => this.setValuesToDataHelper(party, true, label))
        } else if (typeof question.jaaLeftist == 'boolean') {
          question.puolueet.forEach( party => this.setValuesToDataHelper(party, false, label))
        }
        break;
      default:
        if (question.green) {
          question.puolueet.forEach( party => this.setValuesToDataHelper(party, true, label))
        } else if (typeof question.green == 'boolean') {
          question.puolueet.forEach( party => this.setValuesToDataHelper(party, false, label))
        }
    }
  
  }

  setValuesToDataHelper = (party, jaa, label) => {
    var index = ""
    if (label === "values") {
      if (jaa && party.kanta === 'jaa' || !jaa && party.kanta === 'ei') {
        index = 3
      } else {
        index = 0
      }
    } else if (label=== "economics") {
      if (party.kanta === 'jaa' && jaa  || !jaa && party.kanta === 'ei') {
        index = 4
      } else {
        index = 1
      }
    } else if (label === "green") {
      index = 2
    }
    
    switch(index) {
      case 2:
        if (party.kanta === 'jaa' && jaa) {
          this.setDataToPartyHelper(party, index)
        } else if  (party.kanta == 'ei' && !jaa){
          this.setDataToPartyHelper(party, index)
        }
      break;
      default:
        this.setDataToPartyHelper(party, index)
    }
  }

  setDataToPartyHelper = (party, index) => {
    var partiesDataCopy = this.state.partiesData
    let orginalValue = 0
    if (partiesDataCopy.find(data => data.label.replace(/\s/g, '') === party.nimi.replace(/\s/g, ''))) {
      orginalValue = partiesDataCopy.find(data => data.label.replace(/\s/g, '') === party.nimi.replace(/\s/g, '')).data[index]
    }
    
    if (partiesDataCopy.find(data => data.label.replace(/\s/g, '') === party.nimi.replace(/\s/g, ''))) {
      partiesDataCopy.find(data => data.label.replace(/\s/g, '') === party.nimi.replace(/\s/g, '')).data[index] = orginalValue + 1
    }
    
    this.setState({
      partiesData: partiesDataCopy
    })
  }

  allParties = (e) => {
    const selectedParties = this.state.allParties ? [] : this.state.partiesData.map(set => set.label)
    this.setState({
      allParties: !this.state.allParties,
      selectedParties
    })
  }

  handleParties = (party) => {
    if (this.state.selectedParties.includes(party)) {
      this.setState({
        selectedParties: this.state.selectedParties.filter(parti => parti !== party)
      })
    } else {
      const copy = this.state.selectedParties
      copy.push(party)
      this.setState({
        categories: copy
      })
    }
  }

  render() {
    console.log('partised', this.state.partiesData);
    
    if (this.props.questions != this.state.questions) {
      this.setState({
        questions: this.props.questions
      })
      this.dataToRadar()
    }
    const allParties = this.state.partiesData.map(set => set.label)
    return (
      <div style={{paddingTop: "1em", marginBottom: "2em"}}>
        {this.state.questions &&
        <div>
          <div style={{textAlign: "center"}}>
            <h1 style={{textAlign: "center"}}>Arvokartta</h1>
            <Accordion>
              <Accordion.Title active={!this.state.selectParties} onClick={() => this.setState({selectParties: !this.state.selectParties})}>
                <Icon name='dropdown' />
                <b>Valitse puolueita kartalle </b>
              </Accordion.Title>
              <Accordion.Content active={this.state.selectParties} style={{marginLeft: "2em"}}>
                <div>
                <Checkbox
                    label={{ children: "Kaikki/Tyhjennä" }} 
                    style={{padding: "0.8em"}}
                    checked={this.state.allParties}
                    onChange={() => this.allParties()} />
                    <hr />
                {allParties.map(party => 
                  <Checkbox
                    key={party}
                    label={{ children: party }} 
                    style={party == 'Sinä' ? {padding: "0.8em", background: "rgb(255, 0, 165, 0.1)"} : {padding: "0.8em"}}
                    checked={this.state.selectedParties.includes(party)}
                    onChange={() => this.handleParties(party)} />
                  )}
                </div>
              </Accordion.Content>
            </Accordion>
      
            <div> 
              <Radar 
                options = {{
                  layout: {
                    padding: 0.5,
                  },
                  legend: {
                    labels: {
                        fontSize: 14
                    }
                  },
                  
                }}
                data = {{
                  labels: ['Konservatiivisuus', 'Oikeistolaisuus',  'Vihreys', 'Liberaalius', 'Vasemmistolaisuus'],
                  datasets: this.state.partiesData.filter(party => this.state.selectedParties.includes(party.label)),
                }}
              />
            </div>
            </div>
             <Accordion>
             <Accordion.Title active={!this.state.info} style={{textAlign: "center"}} onClick={() => this.setState({info: !this.state.info})}>
               <Icon name='dropdown' />
               <b>Tietoa arvokartasta </b>
             </Accordion.Title>
             <Accordion.Content active={this.state.info} style={{marginLeft: "5em"}}>
             Vaalikoneen kysymykset on luokiteltu viiteen ulottuvuuteen.
             <br/><br/> 
             <i>Vasemmistolaisiksi</i> on luokiteltu kysymykset, jotka painottavat verotuksen
             kiristämistä ja valtionohjauksen suosimista taloudessa. <i>Oikeistolaisia</i> ovat puolestaan ne kysymykset, jotka edistävät vapaita markkinoita ja 
             valtion talouspoliittisen kontrollin vähentämistä. 
             <br/><br/> 
             <i>Liberaalius</i> tarkoittaa vapaamielisyyttä arvokysymyksissä ja <i>konservatiivisuus</i> puolestaan halukkuutta säilyttää
             perinteisinä pidettyjä arvoja. 
             <br/><br/> 
             Viidentänä ulottuvuutena on <i>vihreys</i>, joka tarkoittaa ekologisen kestävyyden painottamista poliittisessa päätöksenteossa.
             </Accordion.Content>
           </Accordion>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  questions: state.kysymykset,
});

export default connect(
  mapStateToProps,
  null,
)(NolansMap);