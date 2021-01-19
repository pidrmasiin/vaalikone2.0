import React from 'react';
import _ from 'lodash'
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import TextArea from '../form/TextArea'
import Input from '../form/FormInput'
import kysymysService from './../../services/kysymys'

class Eu2019 extends React.Component {
  state = {
    answers: [],
    parties: {
      "Group of the Greens/European Free Alliance": {
        opinion: null,
        members: []
      },
      "Group of the Progressive Alliance of Socialists and Democrats in the European Parliament":{
        opinion: null,
        members: []
      },
      "Group of the Alliance of Liberals and Democrats for Europe": {
        opinion: null,
        members: []
      },
      "Confederal Group of the European United Left - Nordic Green Left":{
        opinion: null,
        members: []
      },
      "Group of the European People s Party (Christian Democrats)": {
        opinion: null,
        members: []
      },
      "European Conservatives and Reformists Group": {
        opinion: null,
        members: []
      }
    },
    error: ''
  }
  onSubmit = async (e) => {
    e.preventDefault()
    const edustajat = this.finnishHtml(e.target.euFinnishHtml.value)
    const puolueet = this.euPartiesHtml(e.target.euPartiesHtml.value)

      this.setState({
        question: e.target.question.value
      })
    
    const toDB = {
      kysymys: e.target.question.value,
      puolueet: puolueet,
      edustajat: edustajat,
      selitys: e.target.details.value,
      tunniste: "eu2019",
      url: e.target.url.value,
      vuosi: e.target.vuosi.value
    }
    
    if (toDB.puolueet.length > 7 && toDB.puolueet.length < 11 && toDB.edustajat.length > 10 && toDB.edustajat.length < 20) {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      
      kysymysService.setToken(JSON.parse(loggedUserJSON).token)
      await kysymysService.addKysymys(toDB)
      window.location.reload()
    } else {
      this.setState({
        error: "tapahtui virhe"
      })
    }
   
  }
    
   euPartiesHtml = (euHtml) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(euHtml, 'text/html');
    if (!doc.getElementsByTagName('TBODY')[0]){
      return false
    }
    let answers = []
    const rows = doc.getElementsByTagName('TBODY')[0].rows;
    for (let i = 0; i < rows.length; i = i + 1) {
      let puolue = {
        jaa: Number(rows[i].cells[1].innerText),
        ei: Number(rows[i].cells[2].innerText),
        tyhjia: Number(rows[i].cells[3].innerText),
      }
      
      puolue.kanta=_.maxBy(_.keys(puolue), function (o) { return puolue[o]; });
      puolue.yhteensa = rows[i].cells[4].innerText
      puolue.nimi = rows[i].cells[0].innerText
      puolue.poissa = 0
      
      answers.push(puolue)
      this.setState({
        partiesData: answers,
      })
    }
    return answers
  }

  finnishHtml = (euFinnishHtml) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(euFinnishHtml, 'text/html');
    if (!doc.getElementsByTagName('TBODY')[0]) {
      return false
    }
    const rows = doc.getElementsByTagName('TBODY')[0].rows;
    let answers = this.state.answers
    for (let i = 0; i < rows.length; i = i + 1) {
      answers.push({
        nimi: rows[i].cells[0].firstChild.title,
        puolue: rows[i].cells[1].firstChild.title,
        kanta: rows[i].cells[3].firstChild.title,
        loyal: rows[i].cells[4].firstChild.innerHTML
      })
      this.setState({
        answers,
      })
    }
    return answers
  }

  setParties = (councils) => {
    councils.forEach(council => {
      let copyParties = this.state.parties
      const opinion = this.getOpinion(council)
      copyParties[council.party].members.push({
        name: council.name,
        vote: council.vote
      })
      copyParties[council.party].opinion = opinion
      this.setState({
        parties: copyParties
      })
    })
  }

  getOpinion = (council) => {
    if (council.loyal == ' Loyal') {
      return council.vote
    }
    return false
  }
  render() {
      return (
        <div>
          <form onSubmit={this.onSubmit} id="htmlform">
            <Input placeholder="url" name="url" label="Linkki asiakirjaan"/>
            <Input placeholder="vuosi" name="vuosi" label="vuosi"/>
            <TextArea placeholder="kysymys" name="question" label="Kysymys"/>
            <TextArea label="Tarkempi kuvaus kysymyksestä" placeholder="details" name="details" />
            <TextArea label="Suomalaiset mepit" placeholder="html-elementti" name="euFinnishHtml" />
            <TextArea label="Ryhmät" placeholder="html-elementti ryhmistä" name="euPartiesHtml" />
            <p style={{color: 'red', fontSize: '1.5em'}}>{this.state.error}</p>
            <Button positive type="submit" className="fluid ui button">create</Button>
          </form>
        </div>

      )
  }
}

export default Eu2019
