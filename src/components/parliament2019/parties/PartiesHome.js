import React from 'react';
import { connect } from 'react-redux';

import { Dimmer, Loader, Dropdown, Grid, Table} from 'semantic-ui-react'
import Parties from './Parties';
import {Pie} from 'react-chartjs-2';
import './parties.css'
import { getKysymykset } from '../../../reducers/kysymyksetReducer';
import { getYle2019 } from '../../../reducers/yle2019Reducer';
import { getKategoriat } from '../../../reducers/kategoriatReducer';
import { getYlenKysymykset } from '../../../reducers/ylenKysymyksetReducer';
import yleQuestions from '../../general/parseYleQuestions'

class Home extends React.Component {
  state = {
  }

  componentDidMount = async () => {
    this.props.getKysymykset();
    this.props.getKategoriat();
    this.props.getYle2019();
    this.props.getYlenKysymykset();
  }

  handleChange(e, { name, value }) {
    // If you are using babel, you can use ES 6 dictionary syntax
    // let change = { [e.target.name] = e.target.value }
    if (name && value) {
      this.setState({ [name]: value })
    } else {
      const change = {}
      change[e.target.name] = e.target.value
      this.setState(change)
    }
  }

  parseQuestion = (q) => {
    let slicedQ = (q.length > 50 && window.innerWidth < 700)? q.slice(0, 50) + '...' : q
    return slicedQ
  }

  parseParties = (party) => {
    let puolue = party
    switch (party) {
      case 'kesk':
        puolue = 'Keskusta'
        break
      case 'ps':
        puolue = 'Perussuomalaiset'
        break
      case 'kok':
        puolue = 'Kokoomus'
        break
      case 'sd':
        puolue = 'SDP'
        break
      case 'vihr':
        puolue = 'Vihreät'
        break
      case 'vas':
        puolue = 'Vasemmistoliitto'
        break
      case 'r':
        puolue = 'RKP'
        break
      case 'kd':
        puolue = 'Kristillisdemokraatit'
        break
      case 'Nyt':
        puolue = 'Liike Nyt'
        break
      default:
        break
    }
    return puolue
  }

  singlePartyOpinion = (members, opinon, party) =>  {
    if (opinon !== 'jaa' && opinon !== 'ei') {
      return members.filter(mem => mem.puolue === party).filter(x => x.kanta.toLowerCase() == 'tyhja' || x.kanta.toLowerCase() == 'poissa').length
    } 
    return members.filter(mem => mem.puolue === party).filter(x => x.kanta.toLowerCase() == opinon).length
  }

  singleYleOpinion = (party, opinon, question) => {
    return party.filter(member => yleQuestions.opinonsHelper(member[question]) == opinon).length
  }

  render() {
    const dropParties = Object.keys(this.props.yle2019.parties).map(party => {return {
        text: party,
        value: party
    }})

    const questions = this.props.questions.filter(q => q.createdAt != null).map(q => q = {text: q.kysymys, value: q.id})
    
    if (this.props.yle2019.members.length == 0){
      return (
        <Dimmer active>
          <Loader indeterminate>searching data</Loader>
        </Dimmer>
      )
    }

    let members = []
    if (this.state.qid) {
        members = this.props.questions.find(q => q.id === this.state.qid).edustajat.map(x => ({
            nimi: x.nimi.split('/')[0],
            puolue: this.parseParties(x.nimi.split('/')[1]),
            kanta: x.kanta
          }))

    }
    
    const yleQue = yleQuestions.yleQuestions2019(this.props.yle2019);
     console.log(this.props);
     
    return(
    
      <div>
        <div style={{marginLeft: '10%', marginRight: '10%'}}>
        <h1 style={{textAlign: 'center', margin: '1.2em', marginTop: '0.5em'}}>Puolueet</h1>
          <Parties />
          <h2 style={{textAlign: 'center'}}>Vertaile puolueita</h2>
          <p style={{textAlign: 'justify'}}>
            Voit valita kaksi puoluetta ja vertailla niiden äänestyskäyttäytymistä ja vastauksia
            vuoden 2019 Ylen vaalikonekysymykseen. Vaalikonevastauksissa on mukana myös varalla olijat, ja 
            melko samaa mieltä on tulkittu jaaksi ja melko eri mieltä eiksi.
          </p>
          <h4 style={{textAlign: 'center'}}>Puolue 1</h4>
          <Dropdown search={false}  type="text" name="party" placeholder="Valitse puolue" onChange={this.handleChange.bind(this)} fluid selection options={dropParties} />
         
          <h4 style={{textAlign: 'center'}}>Puolue 2</h4>
          <Dropdown search={false}  type="text" name="party2" placeholder="Valitse puolue" onChange={this.handleChange.bind(this)} fluid selection options={dropParties} />
         
          <h4 style={{textAlign: 'center'}}>Eduskunta äänestys</h4>
          <Dropdown search={false} type="text" name="qid" placeholder="Valitse kysymys" onChange={this.handleChange.bind(this)} fluid selection options={questions} />
        
          <h4 style={{textAlign: 'center'}}>Ylen vaalikonekysymys</h4>
          <Dropdown search={false} type="text" name="yleQuestion" placeholder="Valitse vaalikonekysymys" onChange={this.handleChange.bind(this)} fluid selection options={yleQue} />
          </div>
          {this.state.party &&
          <Grid style={{marginTop: '2em'}}>
              
              {this.state.qid &&
                <Grid.Row>
                  <Grid.Column width={16}>
                  <hr />
                    {yleQuestions.parseQuestionOut(questions.find(x => x.value == this.state.qid).text)}
                    </Grid.Column>
                </Grid.Row>
              } 
              {this.state.qid &&

            <Grid.Row>
              <Grid.Column width={8}>
                <div className="parties-pie">
                  
                    <Pie
                    height={500}
                        data = {{
                            labels: [
                                'Jaa (' + this.singlePartyOpinion(members, 'jaa', this.state.party) +')',
                                'Tyhjä/Poissa (' + this.singlePartyOpinion(members, 'eos', this.state.party) +')',
                                'Ei (' + this.singlePartyOpinion(members, 'ei', this.state.party) +')'
                            ],
                            datasets: [{
                                data:[this.singlePartyOpinion(members, 'jaa', this.state.party ), this.singlePartyOpinion(members, 'eos', this.state.party), this.singlePartyOpinion(members, 'ei', this.state.party)],
                                backgroundColor: ["rgb(51, 204, 51)", "rgb(165, 165, 165)",  "rgb(255, 51, 0)"]
                            }
                            ],
                        }}
                        options={{
                          title: {
                            display: true,
                            text: this.state.party
                           }
                        }}
                    />
                  </div>
               
                </Grid.Column>
                  <Grid.Column width={8}>
                    <div className="parties-pie">
                        <Pie
                            height={500}
                            data = {{
                                labels: [
                                    'Jaa (' + this.singlePartyOpinion(members, 'jaa', this.state.party2) +')',
                                    'Tyhjä/Poissa (' + this.singlePartyOpinion(members, 'eos', this.state.party2) +')',
                                    'Ei (' + this.singlePartyOpinion(members, 'ei', this.state.party2) +')'
                                ],
                                datasets: [{
                                    data:[this.singlePartyOpinion(members, 'jaa', this.state.party2), this.singlePartyOpinion(members, 'eos', this.state.party2), this.singlePartyOpinion(members, 'ei', this.state.party2)],
                                    backgroundColor: ["rgb(51, 204, 51)", "rgb(165, 165, 165)",  "rgb(255, 51, 0)"]
                                }
                                ],
                            }}
                            options={{
                              title: {
                                display: true,
                                text: this.state.party2
                               }
                            }}
                        />
                      </div>
                  </Grid.Column>
                
          </Grid.Row>
  }
 
         
          {this.state.yleQuestion &&
             <Grid.Row>
               <Grid.Column width={16}>
               <hr />
               {yleQuestions.parseQuestionOut(this.state.yleQuestion)} 
               </Grid.Column>
            </Grid.Row>
          }

               
        {this.state.yleQuestion &&
                  <Grid.Row>
                  <Grid.Column width={8}>
                    <div className="parties-pie">
                      
                        <Pie
                        height={500}
                            data = {{
                                labels: [
                                    'Jaa (' + this.singleYleOpinion(this.props.yle2019.parties[this.state.party], 'jaa', this.state.yleQuestion) +')',
                                    'Tyhjä/Poissa (' +this.singleYleOpinion(this.props.yle2019.parties[this.state.party], 'poissa', this.state.yleQuestion) +')',
                                    'Ei (' + this.singleYleOpinion(this.props.yle2019.parties[this.state.party], 'ei', this.state.yleQuestion) +')'
                                ],
                                datasets: [{
                                    data:[this.singleYleOpinion(this.props.yle2019.parties[this.state.party], 'jaa', this.state.yleQuestion),
                                    this.singleYleOpinion(this.props.yle2019.parties[this.state.party], 'poissa', this.state.yleQuestion), 
                                    this.singleYleOpinion(this.props.yle2019.parties[this.state.party], 'ei', this.state.yleQuestion)],
                                    backgroundColor: ["rgb(51, 204, 51)", "rgb(165, 165, 165)",  "rgb(255, 51, 0)"]
                                }
                                ],
                            }}
                            options={{
                              title: {
                                display: true,
                                text: this.state.party
                              }
                            }}
                        />
                      </div>
                  
                    </Grid.Column>
                      <Grid.Column width={8}>
                        <div className="parties-pie">
                            
                        <Pie
                        height={500}
                            data = {{
                                labels: [
                                    'Jaa (' + this.singleYleOpinion(this.props.yle2019.parties[this.state.party2], 'jaa', this.state.yleQuestion) +')',
                                    'Tyhjä/Poissa (' +this.singleYleOpinion(this.props.yle2019.parties[this.state.party2], 'poissa', this.state.yleQuestion) +')',
                                    'Ei (' + this.singleYleOpinion(this.props.yle2019.parties[this.state.party2], 'ei', this.state.yleQuestion) +')'
                                ],
                                datasets: [{
                                    data:[this.singleYleOpinion(this.props.yle2019.parties[this.state.party2], 'jaa', this.state.yleQuestion),
                                    this.singleYleOpinion(this.props.yle2019.parties[this.state.party2], 'poissa', this.state.yleQuestion), 
                                    this.singleYleOpinion(this.props.yle2019.parties[this.state.party2], 'ei', this.state.yleQuestion)],
                                    backgroundColor: ["rgb(51, 204, 51)", "rgb(165, 165, 165)",  "rgb(255, 51, 0)"]
                                }
                                ],
                            }}
                            options={{
                              title: {
                                display: true,
                                text: this.state.party2
                              }
                            }}
                        />
                          </div>
                      </Grid.Column>
                    
              </Grid.Row>
                }


          <Grid.Row>
            <Grid.Column width={8}>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Edustaja</Table.HeaderCell>
                    <Table.HeaderCell>Äänestys</Table.HeaderCell>
                    <Table.HeaderCell>Vaalikonekysymys</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                {members.filter(mem => mem.puolue === this.state.party).map(x => 
                      <Table.Row>
                      <Table.Cell>
                        {x.nimi}
                      </Table.Cell>
                      <Table.Cell>{x.kanta}</Table.Cell>
                      <Table.Cell>{this.state.yleQuestion &&
                        this.props.yle2019.parties[this.state.party].find(mem => mem.sukunimi + mem.etunimi == x.nimi) && 
                        yleQuestions.opinonsHelper(this.props.yle2019.parties[this.state.party].find(mem => mem.sukunimi + mem.etunimi == x.nimi)[this.state.yleQuestion])
                      }</Table.Cell>
                      </Table.Row>
                      )}
                  </Table.Body>
              </Table>
            
            </Grid.Column>
            <Grid.Column width={8}>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Edustaja</Table.HeaderCell>
                    <Table.HeaderCell>Äänestys</Table.HeaderCell>
                    <Table.HeaderCell>Vaalikonekysymys</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                {members.filter(mem => mem.puolue === this.state.party2).map(x => 
                      <Table.Row>
                      <Table.Cell>
                        {x.nimi}
                      </Table.Cell>
                      <Table.Cell>{x.kanta}</Table.Cell>
                      <Table.Cell>{this.state.yleQuestion &&
                        this.props.yle2019.parties[this.state.party2].find(mem => mem.sukunimi + mem.etunimi == x.nimi) && 
                        yleQuestions.opinonsHelper(this.props.yle2019.parties[this.state.party2].find(mem => mem.sukunimi + mem.etunimi == x.nimi)[this.state.yleQuestion])
                      }</Table.Cell>
                      </Table.Row>
                      )}
                  </Table.Body>
              </Table>
            
            </Grid.Column>
          </Grid.Row>

        </Grid>
       }
         
      </div>
    )
  }
}

const mapStateToProps = state => ({
    user: state.user,
    questions: state.kysymykset,
    kategoriat: state.kategoriat,
    yle2019: state.yle2019
  });
  
  export default connect(
    mapStateToProps,
    {
      getKysymykset,
      getKategoriat,
      getYlenKysymykset,
      getYle2019
    },
  )(Home);