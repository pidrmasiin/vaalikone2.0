import React from 'react';
import {Bubble} from 'react-chartjs-2';
import { Dropdown, Table } from 'semantic-ui-react'

class BubbleChart extends React.Component {
  state = {
    activeIndex: false
  }

  componentWillMount = () => {
    const parties = this.props.funds.map(x => x.party)
    let uniqParties = [...new Set(parties)]
    
    const data = uniqParties.map(x => this.parseParty(x))
    let jaaMoney = 0
    data.forEach(x => jaaMoney = jaaMoney + x.jaa.sum)

    let eiMoney = 0
    data.forEach(x => eiMoney = eiMoney + x.ei.sum)

    let eosMoney = 0
    data.forEach(x => eosMoney = eosMoney + x.poissa.sum)
    const selectedPartyData = {
        party: 'Kaikki',
        members: this.props.funds.length,
        sum: eosMoney + eiMoney + jaaMoney,
        poissa: {
            sum: eosMoney,
            members: this.props.funds.filter(x => x.opinion == 'Poissa' || x.opinion == 'Tyhjä')
        },
        ei: {
            sum: eiMoney,
            members: this.props.funds.filter(x => x.opinion == 'Ei')
        },
        jaa: {
            sum: jaaMoney,
            members: this.props.funds.filter(x => x.opinion == 'Jaa')
        }
    }
    data.push(selectedPartyData)
    uniqParties.push('Kaikki')
    this.setState({data, parties: uniqParties, selectedParty: 'Kaikki', selectedPartyData})
  }

  parseParty = (party) => {
    const partyData = this.props.funds.filter(x => x.party == party)
    const memebersWithOpinion = partyData.map(x =>  this.setOpinion(x))
    const jaa = memebersWithOpinion.filter(x => x.opinion == 'Jaa')
    const ei = memebersWithOpinion.filter(x => x.opinion == 'Ei')
    const poissa = memebersWithOpinion.filter(x => x.opinion == 'Poissa' || x.opinion == 'Tyhjä')

    return {
        party,
        members: memebersWithOpinion.length,
        sum: memebersWithOpinion.map(x => x.sum).reduce(function(acc, val) { return acc + val; }, 0),
        poissa: {
            sum: poissa.map(x => x.sum).reduce(function(acc, val) { return acc + val; }, 0),
            members: poissa
        },
        ei: {
            sum: ei.map(x => x.sum).reduce(function(acc, val) { return acc + val; }, 0),
            members: ei
        },
        jaa: {
            sum: jaa.map(x => x.sum).reduce(function(acc, val) { return acc + val; }, 0),
            members: jaa
        }
    }
  }

  setOpinion = (member) => {
    const opinon = this.props.question.edustajat.find(x => x.nimi.toLowerCase().includes(member.alias))
    member['opinion'] = opinon.kanta
    return member
  }

  handlePartyChange = (e, { name, value }) => {
      this.setState({selectedPartyData: this.state.data.find(x => x.party == value), selectedParty: value})
  }

  render() {
    console.log('stppppp', this.props);
    console.log('stateee', this.state);


    const dropParties = this.state.parties.map(x => {return {value: x, text: x}})
    const selectedPartyData = this.state.selectedPartyData
    const selectedPartyMembers = this.props.funds.filter(x => x.party == this.state.selectedParty)

    return(
        <div>
            <Dropdown
                scrolling
                text={this.state.selectedParty}
                style={{fontWeight: 'bold', borderTop: '2px solid #004d99'}}
                type="text"
                name="question"
                value={this.state.selectedParty}
                onChange={this.handlePartyChange.bind(this)}
                fluid 
                search 
                selection 
                options={dropParties} 
            /> 
        {window.innerWidth > 700 && 
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>{this.state.selectedParty == 'Kaikki' ? 'Puolue' : '' }</Table.HeaderCell>
                        <Table.HeaderCell>Jaa</Table.HeaderCell>
                        <Table.HeaderCell>Ei</Table.HeaderCell>
                        <Table.HeaderCell>Tyhja/Poissa</Table.HeaderCell>
                        <Table.HeaderCell>Yhteensä</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {this.state.selectedParty == 'Kaikki' ?  this.state.data.sort(function(a,b) {return b.sum - a.sum}).map(x => 
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>{x.party}</Table.Cell>
                            <Table.Cell>{x.jaa.sum} €</Table.Cell>
                            <Table.Cell>{x.ei.sum} €</Table.Cell>
                            <Table.Cell>{x.poissa.sum} €</Table.Cell>
                            <Table.Cell>{x.sum} €</Table.Cell>
                        </Table.Row>
                    </Table.Body>

                ) : 
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell><b>Jakauma</b></Table.Cell>
                            <Table.Cell>{selectedPartyData.jaa.sum} €</Table.Cell>
                            <Table.Cell>{selectedPartyData.ei.sum} €</Table.Cell>
                            <Table.Cell>{selectedPartyData.poissa.sum} €</Table.Cell>
                            <Table.Cell>{selectedPartyData.sum} €</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell><b>Edustajien määrä</b></Table.Cell>
                            <Table.Cell>{selectedPartyData.jaa.members.length}</Table.Cell>
                            <Table.Cell>{selectedPartyData.ei.members.length}</Table.Cell>
                            <Table.Cell>{selectedPartyData.poissa.members.length}</Table.Cell>
                            <Table.Cell>{selectedPartyData.members}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell><b>Rahaa keskimäärin</b></Table.Cell>
                            <Table.Cell>{Math.round(selectedPartyData.jaa.sum/selectedPartyData.jaa.members.length)} €</Table.Cell>
                            <Table.Cell>{Math.round(selectedPartyData.ei.sum/selectedPartyData.ei.members.length)} €</Table.Cell>
                            <Table.Cell>{Math.round(selectedPartyData.poissa.sum/selectedPartyData.poissa.members.length)} €</Table.Cell>
                            <Table.Cell>{Math.round(selectedPartyData.sum/selectedPartyData.members)} €</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                }
            </Table>
        }

        {selectedPartyData &&
            <Bubble 
                data = {{
                    datasets: [
                        {
                            label: 'Koonti',
                            data: [
                                { 
                                    x: selectedPartyData.sum, 
                                    y: Math.round(selectedPartyData.sum/selectedPartyData.members), 
                                    r: selectedPartyData.members > 50 ? 5 : selectedPartyData.members
                                }
                            ],
                        },
                        {
                            label: 'Ei',
                            data: [
                                { 
                                    x: selectedPartyData.ei.sum,
                                    y: Math.round(selectedPartyData.ei.sum/selectedPartyData.ei.members.length),
                                    r: selectedPartyData.members > 50 ? 5 : selectedPartyData.ei.members.length
                                }
                            ],
                            backgroundColor:"red",
                            hoverBackgroundColor: "pink"
                        },
                        {
                            label: 'Eos',
                            data: [
                                { 
                                    x: selectedPartyData.poissa.sum,
                                    y: Math.round(selectedPartyData.poissa.sum/selectedPartyData.poissa.members.length),
                                    r: selectedPartyData.members > 50 ? 5 : selectedPartyData.poissa.members.length
                                }
                            ],
                            backgroundColor:"grey",
                            hoverBackgroundColor: "lightgrey"
                        },
                        {
                            label: 'Jaa',
                            data: [
                                { 
                                    x: selectedPartyData.jaa.sum,
                                    y: Math.round(selectedPartyData.jaa.sum/selectedPartyData.jaa.members.length),
                                    r: selectedPartyData.members > 50 ? 5 :  selectedPartyData.jaa.members.length
                                }
                            ],
                            backgroundColor:"green",
                            hoverBackgroundColor: "lightgreen"
                        }
                    ],
                }}
            />
        }

        {this.state.selectedParty != 'Kaikki'  && window.innerWidth > 700 && 
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Edustaja</Table.HeaderCell>
                        <Table.HeaderCell>Kanta</Table.HeaderCell>
                        <Table.HeaderCell>Rahoittaja</Table.HeaderCell>
                        <Table.HeaderCell>Rahoitus</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {selectedPartyMembers.map(member=> 
                <Table.Body>
                    <Table.Row>
                         <Table.Cell>{member.alias}</Table.Cell>
                         <Table.Cell>{member.opinion}</Table.Cell>
                    </Table.Row>
                    {member.funds.map(x => 
                    <Table.Row>
                        <Table.Cell />
                        <Table.Cell />
                        <Table.Cell>{x.funder.slice(0, 50)}</Table.Cell>
                        <Table.Cell>{x.sum}</Table.Cell>
                    </Table.Row>
                    )}
                    <Table.Row>
                        <Table.Cell />
                        <Table.Cell />
                        <Table.Cell><b>Yhteensä</b></Table.Cell>
                        <Table.Cell><b>{member.sum}</b></Table.Cell>
                    </Table.Row>
                </Table.Body> 
                )}
            </Table>

        }
        </div>
    )
  }
}

export default BubbleChart