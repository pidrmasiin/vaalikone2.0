import _ from 'lodash'
import React from 'react';
import { Table, Button, Popup, Modal, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addPuolue } from '../reducers/kayttajaReducer'
import OneResult from './yleParties/OneResult';
import Members from './questions/MembersAnswers';


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
      });
    }
    this.setState({
      show: !this.state.show,
    });
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

render() {
  console.log('order', this.state);
  
  return (
    <div style={{ padding: '1em', paddingLeft: '0em' }} >
      
      <Table id="table">
       
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
                            dimmer='blurring'
                            trigger={
                              <Button color="blue" inverted onClick={() => this.show(x.name)}>Näytä vastaukset</Button>
                              }
                          >
                            <Modal.Header>{this.state.puolue}</Modal.Header>
                            <Modal.Content>
                              <Modal.Description>
                                  {this.props.kayttaja.kysymykset.map(x =>
                                  <Table celled id="table">
                                    <Table.Header>
                                      <Table.Row>
                                        <Table.HeaderCell>Lähde</Table.HeaderCell>
                                        <Table.HeaderCell width="10">Kysymys</Table.HeaderCell>
                                        <Table.HeaderCell width="2">Puolue</Table.HeaderCell>
                                        <Table.HeaderCell width="1">Sinä</Table.HeaderCell>
                                        <Table.HeaderCell>Edustajien kannat</Table.HeaderCell>
                                      </Table.Row>
                                    </Table.Header>
                                  <Table.Body key={x.id} style={{marginTop: "2em"}}>
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
                                              this.color(x.user),
                                            }}
                                        >
                                          {this.capitalize(x.user)} 
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
