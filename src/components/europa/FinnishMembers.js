import _ from 'lodash'
import React from 'react';
import { connect } from 'react-redux'
import { Table, Dropdown } from 'semantic-ui-react'



class FinnishMembers extends React.Component {
  state = {
    questions: this.props.kysymykset.filter(q => q.tunniste === 'eu2019'),
    selectedQuestion: []
  }

  finnishParties = (name) => {
    switch (name) {
      case 'EPP':
        return 'Kokoomus/Kristilliset'
      case 'S&D':
        return 'SDP'
      case 'ALDE/ADLE':
        return 'Keskusta/RKP'
      case 'ECR':
        return 'Perussuomalaiset'
      case 'Greens/EFA':
        return 'Vihreät'
      case 'GUE-NGL':
        return 'Vasemmistoliitto'
      default:
        return 'Ei suomalaisia jäseniä'
    }
  }

  result = (party) => {
    if (!party) {
      return 'non'
    }
    
    switch (party.kanta) {
      case 'ei':
        return `ei (${party.ei}/${party.yhteensa})`
      case 'jaa':
        return `jaa (${party.jaa}/${party.yhteensa})`
      case 'tyhjia':
        return `tyhjia (${party.tyhjia}/${party.yhteensa})`
      default:
        return party.kanta
    }
  }

  color = (kanta, opinion) => {
    kanta = kanta === opinion ? kanta : ''
    switch (kanta) {
      case 'ei':
        return '#ffcccc'
      case 'jaa':
        return '#e6ffe6'
      case 'tyhjia':
        return '#bcbcbc'
      default:
        return ''
    }
  }

  handleQuestion = (e, data) => {
    this.setState({selectedQuestion: data.value})
    }

    opinion = (opinion) => {
        switch (opinion) {
        case 'This MEP voted in favour':
            return 'jaa'
        case 'This MEP voted abstained':
            return 'ei'
        case 'This MEP was absent':
            return 'poissa'
        case 'This MEP did not vote':
            return 'tyhja'
        default:
            return opinion
        }
    }

    loyal = (opinion) => {
        switch (opinion.trim()) {
        case 'Loyal':
            return 'Lojaali'
        case 'Rebel':
            return 'Kapinallinen'
        case "Didn't vote":
            return 'Ei äänestänyt'
        case 'Absent':
            return 'poissa'
        default:
            return opinion
        }
    }

    party = (party) => {
        switch (party.trim()) {
        case 'European Conservatives and Reformists Group':
            return 'ECR (Perussuomalaiset)'
        case 'Group of the Greens/European Free Alliance':
            return 'Greens/EFA (Vihreät)'
        case "Group of the Progressive Alliance of Socialists and Democrats in the European Parliament":
            return 'S&D (SDP)'
        case 'Group of the Alliance of Liberals and Democrats for Europe':
            return 'ALDE/ADLE (Keskusta/RKP)'
        case 'Confederal Group of the European United Left - Nordic Green Left':
            return 'GUE-NGL (Vasemmistoliitto)'
        case 'Group of the European People s Party (Christian Democrats)':
            return 'EPP (Kokoomus/Kristilliset)'
        default:
            return party
        }
    }

    color = (kanta) => {
        switch (kanta) {
          case 'ei':
            return '#ffcccc'
          case 'jaa':
            return '#e6ffe6'
          case 'tyhja':
            return '#bcbcbc'
          default:
            return ''
        }
      }

  render() {
    const euros = this.props.kysymykset.filter(q => q.tunniste === 'eu2019')
    const questions = euros.map(q => {return {key: q.kysymys, text: q.kysymys, value: q.kysymys }})
    
    return(
      <div>
          <Dropdown
            placeholder='Select Friend'
            fluid
            selection
            multiple 
            options={questions}
            onChange={(e, data) => this.handleQuestion(e, data)}
        />
        Valitse kysymykset, joita haluat tarkastella.
          {euros.filter(q => this.state.selectedQuestion.includes(q.kysymys)).map(question => 
            <div style={{marginTop: "2em"}} key={question.kysymys}>
                <h2>{question.kysymys}</h2>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nimi</Table.HeaderCell>
                            <Table.HeaderCell>Ryhmä</Table.HeaderCell>
                            <Table.HeaderCell>Kanta</Table.HeaderCell>
                            <Table.HeaderCell>Lojaalius</Table.HeaderCell>
                        </Table.Row> 
                    </Table.Header>

                    <Table.Body>
                        {question.edustajat.map(member => 
                            <Table.Row key={member.nimi}>
                                <Table.Cell>
                                    {member.nimi}
                                </Table.Cell>
                                <Table.Cell>
                                    {this.party(member.puolue)}
                                </Table.Cell>
                                <Table.Cell style={{background: this.color(this.opinion(member.kanta))}}>
                                    {this.opinion(member.kanta)}
                                </Table.Cell>
                                <Table.Cell>
                                    {this.loyal(member.loyal)}
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>   
                </Table>
            </div>
            )}
            <br/>
            <br/>
    </div>
    )
  }
}
const mapStateToProps = state => ({
    kayttaja: state.kayttaja,
    kysymykset: state.kysymykset,
  })
  
  export default connect(
    mapStateToProps,
  )(FinnishMembers)