import _ from 'lodash'
import React from 'react';
import { connect } from 'react-redux'
import { Table, Modal, Button, Icon, List, Accordion } from 'semantic-ui-react'
import partiesNames from './members/partiesNames';



class RegionalAnswers extends React.Component {
  state = {
    monta: this.props.regionalUser.questions.length,
    show: false,
    order: _.orderBy(this.props.regionalUser.helsinkiParties, ['votes'], ['desc'])
  }

  componentDidMount = () => {
    console.log("HALOOO");

    console.log(this.props);
    
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

  opinionColor = (kanta) => {
    switch (kanta) {
      case 'ei':
        return 'red'
      case 'jaa':
        return 'green'
      case 'tyhjia':
        return 'grey'
      default:
        return ''
    }
  }

  handleAccordion = (key) => {
    if(this.state.activeAccordion == key) {
      this.setState({activeAccordion: false})
    } else {
      this.setState({activeAccordion: key})
    }
  }

  render() {
    console.log('names',partiesNames);

    console.log('kesk',partiesNames.partiesNames['kesk']);
    
    const desktop = window.innerWidth > 800
    return(
      <div>
        <h1>Tulokset</h1>
        Alla näet parlamenttiryhmät ja niihin kuuluvat suomalaiset puolueet järjestettynä vastaamiesi kysymysten perusteella.
       <br />
       <br />
       Suomalaisten edustajien kannat löytyvät taulukon alta.
       <br />
       <br />
        <Table textAlign='center'>

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Logo</Table.HeaderCell>
              <Table.HeaderCell>Ryhmä</Table.HeaderCell>
              <Table.HeaderCell>Osuvuus</Table.HeaderCell>
              <Table.HeaderCell>Kysymykset</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.order.map(x =>
                  <Table.Row key={x.name}>
                    <Table.Cell>
                      <img src={x.url} alt={x.name} height="80em" width="120em" />
                    </Table.Cell>
                    <Table.Cell>
                      <p>{partiesNames.partiesNames[x.name] && partiesNames.partiesNames[x.name].name}</p>
                    </Table.Cell>
                    <Table.Cell>{Math.round((x.votes / this.state.monta) * 100)} %</Table.Cell>
                    <Table.Cell>
                    <Modal 
                        trigger={
                          <Button color="blue" inverted onClick={() => this.setState({show: x.name})}>Näytä vastaukset</Button>
                          }
                        open={this.state.show == x.name}
                        size={'small'}
                        style={{marginBottom: "5em"}}
                      >
                        <Modal.Header>
                        {partiesNames.partiesNames && partiesNames.partiesNames[x.name].name} <Icon style={{right: "5%", position: 'absolute'}}name="close" onClick={() => this.setState({show: false})}/>
                          </Modal.Header>
                        <Modal.Content>
                        {this.props.regionalUser.questions.map(question =>
                          <div style={{marginBottom: '2em'}}>
                            <Table celled id="table" key={question.id} >
                              <Table.Body>
                                  <Table.Row >
                                    <Table.Cell style={{width: '30%'}}>
                                      <h4>{question.question}</h4>
                                    </Table.Cell>
                                    <Table.Cell style={{width: '14%', background: this.color(question.parties[x.name].kanta, 'jaa')}}>
                                      <Icon name="circle" color='green' /> Jaa ({question.parties[x.name].jaa})
                                    </Table.Cell>
                                    <Table.Cell style={{width: '14%', background: this.color(question.parties[x.name].kanta, 'tyhjia')}}>
                                      <Icon name="circle" color='grey' /> Tyhjia ({question.parties[x.name].tyhjia})
                                    </Table.Cell>
                                    <Table.Cell style={{width: '12%', background: this.color(question.parties[x.name].kanta, 'ei')}}>
                                      <Icon name="circle" color='red' /> Ei ({question.parties[x.name].ei})
                                    </Table.Cell>
                                    <Table.Cell style={{width: '14%'}}>
                                      <Icon name="circle outline" color='grey' /> Poissa ({question.parties[x.name].poissa})
                                    </Table.Cell>
                                  </Table.Row>
                                  
                                </Table.Body>
                                <Table.Footer fullWidth>
                                <Table.Row>
                                  <Table.HeaderCell>
                                    {desktop ?
                                    <List divided verticalAlign='middle' size='large' style={{fontWeight: 'normal'}}>
                                        <List.Item>
                                          <Icon name="circle" color={this.opinionColor(question.regionalUser)} />  
                                          <List.Content>
                                            Sinä
                                          </List.Content>
                                        </List.Item>
                                        <List.Item>
                                          <Icon name={this.opinionColor(question.parties[x.name].kanta) ? 'circle' : 'circle outline'} color={this.opinionColor(question.parties[x.name].kanta)} />  
                                          <List.Content>
                                          {partiesNames.partiesNames && partiesNames.partiesNames[x.name].name}
                                          </List.Content>
                                        </List.Item>
                                      </List>
                                      :  <List divided verticalAlign='middle' style={{fontWeight: 'normal'}}>
                                        <List.Item style={{fontWeight: 'normal'}}>
                                        <List.Content>
                                        <Icon name="circle" color={this.opinionColor(question.regionalUser)} /> Sinä äänestit {question.regionalUser}
                                        </List.Content>
                                      </List.Item>
                                      </List>
                                    }
                                  </Table.HeaderCell>
                                  <Table.HeaderCell colSpan='4'>
                                    <Accordion>
                                      <Accordion.Title
                                        active={this.state.activeAccordion === question.question}
                                        onClick={() => this.handleAccordion(question.question)}
                                      >
                                        <p>Näytä yksittäiset vastaukset <Icon name='dropdown' /></p>
                                      </Accordion.Title>
                                      <Accordion.Content active={this.state.activeAccordion === question.question}>
                                      <List divided verticalAlign='middle' size='large' style={{fontWeight: 'normal'}}>
                                      <List.Item>
                                          <List.Content>
                                            <h4>Ryhmän jäsenten vastaukset</h4>
                                          </List.Content>
                                        </List.Item>
                                      {question.yes.parties[x.name] && question.yes.parties[x.name].map( member => 
                                        <List.Item>
                                          <List.Content floated='right'>
                                            <a href={`https://www.hel.fi/${member.linkPath}`} target="_blank"><Icon name="info" /> </a>
                                          </List.Content>
                                          <List.Content>
                                            <Icon name="circle" color='green' /> {member.name}
                                          </List.Content>
                                        </List.Item>
                                      )}
                                      {question.no.parties[x.name] && question.no.parties[x.name].map( member => 
                                        <List.Item>
                                        <List.Content floated='right'>
                                          <a href={`https://www.hel.fi/${member.linkPath}`} target="_blank"><Icon name="info" /> </a>
                                        </List.Content>
                                        <List.Content>
                                          <Icon name="circle" color='red' /> {member.name}
                                        </List.Content>
                                      </List.Item>
                                      )}
                                      {question.empty.parties[x.name] && question.empty.parties[x.name].map( member => 
                                        <List.Item>
                                        <List.Content floated='right'>
                                          <a href={`https://www.hel.fi/${member.linkPath}`} target="_blank"><Icon name="info" /> </a>
                                        </List.Content>
                                        <List.Content>
                                          <Icon name="circle" color='grey' /> {member.name}
                                        </List.Content>
                                      </List.Item>
                                      )}
                                      {question.out.parties[x.name] && question.out.parties[x.name].map( member => 
                                        <List.Item>
                                        <List.Content floated='right'>
                                          <a href={`https://www.hel.fi/${member.linkPath}`} target="_blank"><Icon name="info" /> </a>
                                        </List.Content>
                                        <List.Content>
                                          <Icon name="circle outline" /> {member.name}
                                        </List.Content>
                                      </List.Item>
                                      )}
                                      </List>
                                      </Accordion.Content>
                                      </Accordion>
                                      </Table.HeaderCell>
                                      </Table.Row>
                                      </Table.Footer>
                              </Table>
                            </div>
                             
                          )}
                        </Modal.Content>
                      </Modal>
                    </Table.Cell>
                </Table.Row>
            )}
            </Table.Body>
        </Table>
        <br />
        Tulostaulukossa sopivuus määrittyy ryhmän enemmistön käyttäytymisen perusteella, sillä ryhmät äänestävät usein yhtenäisesti.
        Näytä vastaukset -napin alta voit tarkastella, miten ryhmän mielipide on kussakin kysymyksessä jakautunut.
        <br/>
        <br/>
        <Button onClick={() => window.location.assign('/kuntavaalit2021')} basic fluid color="yellow" size='massive' style={{marginTop: "3em", margin: "1em"}}>
            Vastaa kysymyksiin uudelleen
          </Button>           
    </div>
    )
  }
}
const mapStateToProps = state => ({
    regionalUser: state.regionalUser,
  })
  
  export default connect(
    mapStateToProps,
  )(RegionalAnswers)