import _ from 'lodash'
import React from 'react';
import { connect } from 'react-redux'
import { Table, Modal, Button, Icon } from 'semantic-ui-react'
import FinnishMembers from './FinnishMembers';



class EuroAnswers extends React.Component {
  state = {
    monta: this.props.kayttaja.kysymykset.length,
    show: false,
    order: _.orderBy(this.props.kayttaja.euroParties, ['aanet'], ['desc'])
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

  render() {
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
              <Table.HeaderCell>Puolue</Table.HeaderCell>
              <Table.HeaderCell>Ryhmä</Table.HeaderCell>
              <Table.HeaderCell>Osuvuus</Table.HeaderCell>
              <Table.HeaderCell>Kysymykset</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.order.map(x =>
                  <Table.Row key={x.name}>
                    <Table.Cell>
                      <img src={x.url} alt={x.name} height="80em" width="120em" /> {x.url2 && <img src={x.url2} alt={"toinen"} height="80em" width="120em" />}
                    </Table.Cell>
                    <Table.Cell>
                      {this.finnishParties(x.name)}
                    </Table.Cell>
                    <Table.Cell>
                      <p>{x.name}</p>
                    </Table.Cell>
                    <Table.Cell>{Math.round((x.aanet / this.state.monta) * 100)} %</Table.Cell>
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
                        {x.name} ({this.finnishParties(x.name)}) <Icon style={{right: "5%", position: 'absolute'}}name="close" onClick={() => this.setState({show: false})}/>
                          </Modal.Header>
                        <Modal.Content>
                        {this.props.kayttaja.kysymykset.map(question =>
                                      <Table celled id="table" key={question.id} >
                                      <Table.Body>
                                          <Table.Row >
                                            <Table.Cell style={{width: '40%'}}>
                                              <p>{question.kysymys}</p>
                                            </Table.Cell>
                                            <Table.Cell style={{width: '15%', background: this.color(question.puolueet.find(party => party.nimi == x.name).kanta, 'jaa')}}>
                                              Jaa ({question.puolueet.find(party => party.nimi == x.name).jaa})
                                            </Table.Cell>
                                            <Table.Cell style={{width: '15%', background: this.color(question.puolueet.find(party => party.nimi == x.name).kanta, 'tyhjia')}}>
                                              Tyhjia ({question.puolueet.find(party => party.nimi == x.name).tyhjia})
                                            </Table.Cell>
                                            <Table.Cell style={{width: '14%', background: this.color(question.puolueet.find(party => party.nimi == x.name).kanta, 'ei')}}>
                                              Ei ({question.puolueet.find(party => party.nimi == x.name).ei})
                                            </Table.Cell>
                                            <Table.Cell style={{width: '1%'}}/>
                                            <Table.Cell style={{width: '14%', background: this.color(question.user, question.user)}}>
                                              {"Vastasit " + question.user} 
                                            </Table.Cell>
                                          </Table.Row>
                                      </Table.Body>
                                    </Table>
                                      )}
                        </Modal.Content>
                      </Modal>
                    </Table.Cell>
                </Table.Row>
            )}
            </Table.Body>
        </Table>
        <br />
        Tulostaulukossa sopivuus määrittyy parlamenttiryhmän enemmistön käyttäytymisen perusteella, sillä ryhmät äänestävät usein yhtenäisesti.
        Näytä vastaukset -napin alta voit tarkastella, miten ryhmän mielipide on kussakin kysymyksessä jakautunut.
        <br/>
        <br/>
        Alta löydät vielä suomalaisten kannat erikseen eroteltuna.
        <br/>
        <br/>
        <h2>Suomalaisten edustajien kannat</h2>
        <FinnishMembers />
        <br/>
        <br/>            
    </div>
    )
  }
}
const mapStateToProps = state => ({
    kayttaja: state.kayttaja,
  })
  
  export default connect(
    mapStateToProps,
  )(EuroAnswers)