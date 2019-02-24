import React from 'react'
import { connect } from 'react-redux';
import {Radar} from 'react-chartjs-2';
import { Checkbox} from 'semantic-ui-react';


class NolansMap extends React.Component {
  state = {
    questions: this.props.questions,
    valuesCount: 0,
    greenCount: 0,
    economicsCount: 0,
    maxDataValue: 0,
    dataSets: [],
    partiesData: [
      {
        data: [null, null, null, null, null], 
        label: "Keskustan eduskuntaryhmä",
        borderColor: "rgb(51, 153, 51)",
        backgroundColor: "rgb(51, 153, 51, 0.1)"
      },
      {
        data: [null, null, null, null, null], 
        label: "Kansallisen kokoomuksen eduskuntaryhmä",
        borderColor: "rgb(51, 153, 255)",
        backgroundColor: "rgb(51, 153, 255, 0.1)"
      },
      {
        data: [null, null, null, null, null], 
        label: "Sosialidemokraattinen eduskuntaryhmä",
        borderColor: "rgb(153, 0, 0)",
        backgroundColor: "rgb(153, 0, 0, 0.1)"
      },
      {
        data: [null, null, null, null, null], 
        label: "Sininen eduskuntaryhmä",
        borderColor: "rgb(102, 255, 204)",
        backgroundColor: "rgb(102, 255, 204, 0.1)"
      },
      {
        data: [null, null, null, null, null], 
        label: "Perussuomalaisten eduskuntaryhmä",
        borderColor: "rgb(0, 0, 153)",
        backgroundColor: "rgb(0, 0, 153, 0.1)"
      },
      {
        data: [null, null, null, null, null], 
        label: "Vihreä eduskuntaryhmä",
        borderColor: "rgb(153, 255, 102)",
        backgroundColor: "rgb(153, 255, 102, 0.1)"
      },
      {
        data: [null, null, null, null, null], 
        label: "Ruotsalainen eduskuntaryhmä",
        borderColor: "rgb(255, 255, 0)",
        backgroundColor: "rgb(255, 255, 0, 0.1)"
      },
      {
        data: [null, null, null, null, null], 
        label: "Vasemmistoliiton eduskuntaryhmä",
        borderColor: "rgb(204, 102, 153)",
        backgroundColor: "rgb(204, 102, 153, 0.1)"
      },
      {
        data: [null, null, null, null, null], 
        label: "Kristillisdemokraattinen eduskuntaryhmä",
        borderColor: "rgb(255, 153, 51)",
        backgroundColor: "rgb(255, 153, 51, 0.1)"
      },
      {
        data: [null, null, null, null, null], 
        label: "Liike Nyt -eduskuntaryhmä",
        borderColor: "rgb(204, 0, 255)",
        backgroundColor: "rgb(204, 0, 255, 0.1)"
      },
      {
        data: [null, null, null, null, null], 
        label: "Tähtiliikkeen eduskuntaryhmä"
      }
    ],
    selectedParties: [],
    allParties: true
  }

  dataToRadar = () => {
    this.setState({
      selectedParties: this.state.partiesData.map(set => set.label)
    })
    const questions = this.props.questions
    const valueQuestions = questions.filter(q => q.hasOwnProperty('jaaLiberal'))
    const economicQuestions = questions.filter(q => q.hasOwnProperty('jaaLeftist'))
    const greenQuestions = questions.filter(q => q.hasOwnProperty('green'))

    valueQuestions.forEach(q => this.setValuesToDataset(q, "values"))
    economicQuestions.forEach(q => this.setValuesToDataset(q, "economics"))
    greenQuestions.forEach(q => this.setValuesToDataset(q, "green"))
  }

  setValuesToDataset = (question, label) => {
    if (question.jaaLiberal) {
      question.puolueet.forEach( party => this.setValuesToDataHelper(party, true, label))
    } else {
      question.puolueet.forEach( party => this.setValuesToDataHelper(party, false, label))
    }
  }

  setValuesToDataHelper = (party, jaa, label) => {
    var index = ""
    if (label === "values") {
      index = jaa ? 3 : 0
    } else if (label=== "economics") {
      index = jaa ? 4 : 1
    } else if (label === "green") {
      index = 2
    }
    console.log('index', index);
    
    if (party.kanta === 'jaa'){
       // liberal
       this.setDataToPartyHelper(party, index)
    } else if (index != 2) {
      // conservative
      this.setDataToPartyHelper(party, index)
    }
  }

  setDataToPartyHelper = (party, index) => {
    var partiesDataCopy = this.state.partiesData
    console.log('datalabel', party.nimi);
    const orginalValue = partiesDataCopy.find(data => data.label.replace(/\s/g, '') === party.nimi.replace(/\s/g, '')).data[index]
    console.log('orginal', orginalValue);
    
    partiesDataCopy.find(data => data.label.replace(/\s/g, '') === party.nimi.replace(/\s/g, '')).data[index] = orginalValue + 1
    console.log('datasets', partiesDataCopy.find(data => data.label.replace(/\s/g, '') === party.nimi.replace(/\s/g, '')).data);
    
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
    if (this.props.questions != this.state.questions) {
      this.setState({
        questions: this.props.questions
      })
      this.dataToRadar()
    }
    const allParties = this.state.partiesData.map(set => set.label)

    return (
      <div>
        <h1 style={{textAlign: "center"}}>Puolueiden kannat arvokartalla</h1>
        {this.state.questions &&
          <div style={{paddingTop: "2em", textAlign: "center"}}>
            <b style={{margin: "5em", padding: "0.3em"}}> Huomaa, että hallituspuolueiden kanta on hyvin yhtenevä ja oppositionkin usein.</b>
            <div style={{textAlign: "center", marginTop:"1em"}}>
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
              style={{padding: "0.8em"}}
              checked={this.state.selectedParties.includes(party)}
              onChange={() => this.handleParties(party)} />
            )}
         <hr />
        </div>
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
        }
    
        <div style={{margin: "5em", padding: "2em", marginRight: "8em", borderColor: "#004d99", borderStyle: "solid"}}>
          <h3>Mitä graaffi kuvaa?</h3>
          <p style={{fontSize: "1.2em"}}>
            Kartalla oikeisto ja vasemmisto ulottuvuudet kuvaavat talouspolitiikkaa niin, 
            että vasemmistolaisuus tarkoittaa valtionohjauksen suosimisto ja oikeistolaisuus 
            vapaan talouselämän suosimista. Konservatiivisuus taas viittaa halukkuuteen
            ohjata sellaisia arvovalintoja, joissa ei ole kyse puhtaasti taloudellisista
            arvoista kun taas liberaali on näiden arvojen suhteen ns. suvaitsevampi.
            Vihreys sen sijaan kertoo ympäristöystävällisyydestä oli kyse sitten rajoituksista
            tai tuista. 

            Huomaa, että nollapisteenä toimii pienin yhteinen arvo.
          </p>
        </div>
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
