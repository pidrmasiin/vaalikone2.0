import _ from 'lodash'
import React from 'react';
import { Table, Button, Modal, Segment, Icon} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addPuolue } from '../reducers/kayttajaReducer'
import OneResult from './yleParties/OneResult';
import Members from './questions/MembersAnswers';
import { parseParties } from './yle/ylesQuestionsCategories';
import PromiseShow from './yle/promiseShow';


class AnswersTable extends React.Component {
  state = {
    monta: this.props.kayttaja.kysymykset.length,
    show: false,
    puolue: 'Keskustan eduskuntaryhmä',
    order: _.orderBy(this.props.kayttaja.puolueet, ['aanet'], ['desc'])
  }

  show = (puolue) => {
    if (puolue) {
      this.setState({
        puolue,
        show: puolue
      });
    }
  }
color = (jaa) => {
  if (jaa === 'jaa') {
    return '#e6ffe6'
  } if (jaa === 'ei') {
    return '#ffcccc'
  }
  return null
}

parseOpinion = (party) => {
  const opinion = this.capitalize(party.kanta)
  if (opinion === 'Ei') {
    return opinion + " (" + Math.round((party.ei / party.yhteensa) * 100) + "%)"
  } else if (opinion === 'Jaa') {
    return opinion + " (" + Math.round((party.jaa / party.yhteensa) * 100) + "%)"
  }
  return  "EOS (" + Math.round(((party.tyhjia + party.poissa) / party.yhteensa) * 100) + "%)"
}

capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

leaderName = (party) => {
  switch (party) {
    case 'Keskustan eduskuntaryhmä':
      return "Sipilä"
    case 'Perussuomalaisten eduskuntaryhmä':
      return "Huhtasaari"
    case 'Kansallisen kokoomuksen eduskuntaryhmä':
      return "Häkkänen"
    case 'Sosialidemokraattinen eduskuntaryhmä':
      return "Lindtman"
    case 'Vihreä eduskuntaryhmä':
      return "Niinistö"
    case 'Vasemmistoliiton eduskuntaryhmä':
      return "Andersson "
    case 'Ruotsalainen eduskuntaryhmä':
      return "Henriksson"
    default:
      return "Essayah"
  }
}

leaderSpeakman = (party) => {
  switch (party) {
    case 'Keskustan eduskuntaryhmä':
      return true
    case 'Perussuomalaisten eduskuntaryhmä':
      return false
    case 'Kansallisen kokoomuksen eduskuntaryhmä':
      return false
    case 'Sosialidemokraattinen eduskuntaryhmä':
      return false
    case 'Vihreä eduskuntaryhmä':
      return true
    case 'Vasemmistoliiton eduskuntaryhmä':
      return true
    case 'Ruotsalainen eduskuntaryhmä':
      return true
    default:
      return true
  }
}

render() {
  const desktop = window.innerWidth > 600

  return (
    <div style={{ padding: '1em', paddingLeft: '0em'}} >
      
      <Table id="table" textAlign='center'>
       
        <Table.Body>
          {this.state.order.map(x =>
              (
                <Table.Row key={x.name}>
                  <Table.Cell>
                    <img src={x.url} alt={x.name} height="80em" width="120em" />
                  </Table.Cell>
                  <Table.Cell>
                    <p>{x.name}</p>
                  </Table.Cell>
                  <Table.Cell>{Math.round((x.aanet / this.state.monta) * 100)} %</Table.Cell>
                  <Table.Cell>
                    {x.name !== 'Liike Nyt-eduskuntaryhmä' && x.name !== 'Sininen eduskuntaryhmä' ?
                          <Modal 
                            trigger={
                              <Button color="blue" inverted onClick={() => this.show(x.name)}>Näytä vastaukset</Button>
                              }
                            dimmer={'default'}
                            open={this.state.show == x.name}
                            size={'small'}
                            style={{marginBottom: "5em"}}
                          >
                            <Modal.Header>
                            {this.state.puolue} <Icon style={{right: "2%", position: 'absolute'}}name="close" onClick={() => this.setState({show: false})}/>
                            </Modal.Header>
                            <Modal.Content>
                              <Modal.Description>
                                <p>Alla näet vastaukset yksittäisiin kysymksiin. Voit myös verrata vastauksia Ylen vuoden 2015 vaalikonedataan.</p>
                              <Segment.Group horizontal>
                                  <Segment>
                                  <span><b>{this.leaderSpeakman(this.state.puolue) ? "Puheenjohtaja" : "Varapuheenjohtaja"} ({this.leaderName(this.state.puolue)}) lupasi ylen vaalikoneessa: </b>
                                  {this.props.ylenKysymykset.puolueet[parseParties(this.state.puolue)] && this.props.ylenKysymykset.puolueet[parseParties(this.state.puolue)].find( edustaja =>
                                edustaja.sukunimi == this.leaderName(this.state.puolue))['Vaalilupaus 1']}</span> 
                                  </Segment>
                                  <Segment clearing>
                                  <PromiseShow puolue={this.props.ylenKysymykset.puolueet[parseParties(this.state.puolue)]} />

                                  </Segment>
                                </Segment.Group>
                                  {this.props.kayttaja.kysymykset.map(x =>
                                  <Table celled id="table" key={x.id} >
                                    {desktop 
                                    ?  <Table.Header>
                                          <Table.Row>
                                            <Table.HeaderCell>Lähde</Table.HeaderCell>
                                            <Table.HeaderCell width="10">Kysymys</Table.HeaderCell>
                                            <Table.HeaderCell width="2">Puolue</Table.HeaderCell>
                                            <Table.HeaderCell width="1">Sinä</Table.HeaderCell>
                                            <Table.HeaderCell>Edustajien kannat</Table.HeaderCell>
                                          </Table.Row>
                                       </Table.Header>
                                    : <Table.Header>
                                        <Table.Row textAlign='center'>
                                          <b>{this.state.puolue}</b>
                                        </Table.Row>
                                      </Table.Header>
                                  }
                                  <Table.Body>
                                      <Table.Row >
                                        <Table.Cell>Eduskunta</Table.Cell>
                                        <Table.Cell>
                                          <p>{x.kysymys}</p>
                                        </Table.Cell>
                                        <Table.Cell
                                          style={{
                                            background:
                                              this.color(x.puolueet.find(y => y.nimi === this.state.puolue).kanta),
                                            }}
                                        >
                                          {this.parseOpinion(x.puolueet.find(y => y.nimi === this.state.puolue))} 
                                        </Table.Cell>
                                        <Table.Cell
                                          style={{
                                            background:
                                            desktop && this.color(x.user),
                                            }}
                                        >
                                          {desktop ? this.capitalize(x.user) : "Sinä vastasit " + x.user} 
                                        </Table.Cell>
                                        <Table.Cell>
                                        <Modal.Actions>
                                          <Members edustajat={x.edustajat} puolue={this.state.puolue} question={x.kysymys}/>
                                        </Modal.Actions>
                                        </Table.Cell>
                                      </Table.Row>
                                      <OneResult puolue={this.state.puolue} kysymys={x.vastaus} />
                                  </Table.Body>
                                </Table>
                                  )}
                              </Modal.Description>
                          </Modal.Content>
                        </Modal>
                    : <p>Ei mukana koko kautta</p>}
                  </Table.Cell>
                </Table.Row>))}
        </Table.Body>
      </Table>
    </div>
  )
}
}

const mapStateToProps = state => ({
  kayttaja: state.kayttaja,
  ylenKysymykset: state.ylenKysymykset,
})

export default connect(
  mapStateToProps,
  { addPuolue },
)(AnswersTable)
