import React from 'react';
import {Bubble} from 'react-chartjs-2';
import { Table } from 'semantic-ui-react'
import '../../../css/FundsModal.css'

class SingleQuestionChartAndTable extends React.Component {
   
  render() {
    const selectedPartyData = this.props.selectedPartyData
    const selectedPartyMembers = this.props.funds.filter(x => x.party == this.props.selectedParty)
    
    return(
        <div>
        {window.innerWidth > 700 && 
            <div style={{paddingTop: '2em'}}>
            <h2>Rahoituksen jakautuminen</h2>
            <Table striped className='funds-table'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>{this.props.selectedParty == 'Kaikki' ? 'Puolue' : '' }</Table.HeaderCell>
                        <Table.HeaderCell>Jaa</Table.HeaderCell>
                        <Table.HeaderCell>Ei</Table.HeaderCell>
                        <Table.HeaderCell>Tyhja/Poissa</Table.HeaderCell>
                        <Table.HeaderCell>Yhteensä</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {this.props.selectedParty == 'Kaikki' ?  this.props.data.sort(function(a,b) {return b.sum - a.sum}).map(x => 
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
                            <Table.Cell><b>Rahoitusta keskimäärin</b></Table.Cell>
                            <Table.Cell>{Math.round(selectedPartyData.jaa.sum/selectedPartyData.jaa.members.length)} €</Table.Cell>
                            <Table.Cell>{Math.round(selectedPartyData.ei.sum/selectedPartyData.ei.members.length)} €</Table.Cell>
                            <Table.Cell>{Math.round(selectedPartyData.poissa.sum/selectedPartyData.poissa.members.length)} €</Table.Cell>
                            <Table.Cell>{Math.round(selectedPartyData.sum/selectedPartyData.members)} €</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                }
            </Table>
            </div>
        }

        {selectedPartyData &&
        <div style={{marginTop: '1em'}}>
            <div style={{paddingBottom: '1em'}}>
                <h3>Koonti edustajien rahoituksen jakautumisesta</h3>
                Kuvaajassa x-akselilla on rahoituksen määrä yhteensä ja y-akselilla rahoitus keskimäärin.
                Pallon koko on suhteessa edustajien määrään.
                <br/>
            </div>
            <div style={{background: 'white', color: 'black', borderRadius: '3px'}} >
            <Bubble
                
                data = {{
                    datasets: [
                        {
                            label: 'Koonti',
                            data: [
                                { 
                                    x: selectedPartyData.sum, 
                                    y: Math.round(selectedPartyData.sum/selectedPartyData.members), 
                                    r: selectedPartyData.members > 50 ? selectedPartyData.members / 3 : selectedPartyData.members
                                }
                            ],
                        },
                        {
                            label: 'Ei',
                            data: [
                                { 
                                    x: selectedPartyData.ei.sum,
                                    y: Math.round(selectedPartyData.ei.sum/selectedPartyData.ei.members.length),
                                    r: selectedPartyData.members > 50 ? selectedPartyData.ei.members.length / 4 : selectedPartyData.ei.members.length
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
                                    r: selectedPartyData.members > 50 ? selectedPartyData.poissa.members.length / 4 : selectedPartyData.poissa.members.length
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
                                    r: selectedPartyData.members > 50 ? selectedPartyData.jaa.members.length / 4 :  selectedPartyData.jaa.members.length
                                }
                            ],
                            backgroundColor:"green",
                            hoverBackgroundColor: "lightgreen"
                        }
                    ],
                }}
            />
            </div>
        </div>
        }

        {this.props.selectedParty != 'Kaikki' && 
            <div>
                <br/>
                <h2>Edustajien rahoituksen lähteet</h2>
            <Table style={{width: '120%'}}> 
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
                         <Table.Cell>{member.alias.toUpperCase()}</Table.Cell>
                         <Table.Cell>{member.opinion}</Table.Cell>
                    </Table.Row>
                    {member.funds.map(x => 
                    <Table.Row>
                        <Table.Cell />
                        <Table.Cell />
                        <Table.Cell>{x.funder.slice(0, 40)}</Table.Cell>
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
            </div>

        }
        </div>
    )
  }
}

export default SingleQuestionChartAndTable