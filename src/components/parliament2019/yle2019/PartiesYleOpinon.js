import React from 'react';
import { connect } from 'react-redux';
import { Table, Accordion, List, Icon, Divider} from 'semantic-ui-react'


class SimpleYleOpinon extends React.Component {
  state = {
    yes: false,
    no: false,
    empty: false
  }

  opinions = (rawParty) => {
    let party = this.parseParties(rawParty)
    party = this.props.yle2019.parties[party]
    let selectedMembers = party.filter( member => member['Valintatieto (0=ei valita, 1=valitaan, 2=varalla)'] == '1')
    let opinions = selectedMembers.map(member => this.opinonsHelper(member))
    let freq = {jaa: opinions.filter(o => o == 'jaa').length, ei: opinions.filter(o => o == 'ei').length, 'tyhjiä': opinions.filter(o => o == 'tyhjiä').length}
    return freq
  }

  opinonsHelper = (member) => {
    let yleOpionNumber = member[this.props.yleQuestion]
    let opinion = 'tyhjiä'
    switch (yleOpionNumber) {
      case '1':
        opinion = 'ei'
        break
      case '2':
        opinion = 'ei'
        break
      case '4':
        opinion = 'jaa'
        break
      case '5':
        opinion = 'jaa'
        break
      default:
        break
    }
    return opinion
  }
  parseParties = (party) => {
    let puolue = party
    switch (party) {
      case 'Keskustan eduskuntaryhmä':
        puolue = 'Keskusta'
        break
      case 'Perussuomalaisten eduskuntaryhmä':
        puolue = 'Perussuomalaiset'
        break
      case 'Kansallisen kokoomuksen eduskuntaryhmä':
        puolue = 'Kokoomus'
        break
      case 'Sosialidemokraattinen eduskuntaryhmä':
        puolue = 'SDP'
        break
      case 'Vihreä eduskuntaryhmä':
        puolue = 'Vihreät'
        break
      case 'Vasemmistoliiton eduskuntaryhmä':
        puolue = 'Vasemmistoliitto'
        break
      case 'Ruotsalainen eduskuntaryhmä':
        puolue = 'RKP'
        break
      case 'Kristillisdemokraattinen eduskuntaryhmä':
        puolue = 'Kristillisdemokraatit'
        break
      case 'Liike Nyt -eduskuntaryhmä':
        puolue = 'Liike Nyt'
        break
      default:
        break
    }
    return puolue
  }

  color = (partyOpinon) => {
    let yes = this.opinions(this.props.party).jaa
    let no = this.opinions(this.props.party).ei
    let emptys = this.opinions(this.props.party).tyhjiä

    if (yes > no && yes > emptys) {
      return partyOpinon == 'yes' ? '#e6ffe6' : 'white'
    } if (no > yes && no > emptys) {
      return partyOpinon == 'no' ? '#ffcccc' : 'white'
    } 
    return null
  }

  parseOpinion = (opinion) => {
    let yes = this.opinions(this.props.party).jaa
    let no = this.opinions(this.props.party).ei
    let emptys = this.opinions(this.props.party).tyhjiä

    let total = yes + no + emptys

    if (opinion === 'Ei') {
      if(no > 0) {
        return opinion + " (" + Math.round((no / total) * 100) + "%)"
      } else {
        return opinion
      }
    } else if (opinion === 'Jaa') {
      if(yes > 0) {
        return opinion + " (" + Math.round((yes / total) * 100) + "%)"
      } else {
        return opinion
      }
    }
    if(emptys > 0) {
      return  "Tyhjiä (" + Math.round((emptys / total) * 100) + "%)"
    } else {
      return opinion
    }
  }

  memberOpinions = (rawParty) => {
    let party = this.parseParties(rawParty)
    party = this.props.yle2019.parties[party]
    let selectedMembers = party.filter( member => member['Valintatieto (0=ei valita, 1=valitaan, 2=varalla)'] == '1')
    let empty = selectedMembers.filter(member => member[this.props.yleQuestion] == '3' || !member[this.props.yleQuestion])
    let yes = selectedMembers.filter(member => member[this.props.yleQuestion] == '4' ||  member[this.props.yleQuestion] == '5')
    let no = selectedMembers.filter(member => member[this.props.yleQuestion] == '1' ||  member[this.props.yleQuestion] == '2')

    return {empty: empty, yes: yes, no: no}
  }

  render(){
    let yleOpinons = this.memberOpinions(this.props.party)
    console.log('yles', yleOpinons);
    
    return(
      <>
       <Table.HeaderCell colSpan='5'><Divider /></Table.HeaderCell>
      <Table.Row>
            <Table.Cell>Yle 2019</Table.Cell>
            <Table.Cell>
                {this.props.yleQuestion}
            </Table.Cell>
            <Table.Cell style={{background: this.color('yes')}}>
              <Accordion>
                <Accordion.Title
                  active={this.state.yes}
                  onClick={() => this.setState({yes: !this.state.yes})}
                >
                  {this.parseOpinion("Jaa")} {yleOpinons.yes.length > 0 && <Icon name='dropdown' />}
                  </Accordion.Title>
                  <Accordion.Content active={this.state.yes}>
                  <List divided verticalAlign='middle' size='large' style={{padding: "3px", fontSize: '10px', background: 'white'}}>
                    {yleOpinons.yes.map(x => 
                      <List.Item>{x.etunimi} {x.sukunimi} </List.Item>
                    )}
                    </List>
                  </Accordion.Content>
              </Accordion>
            </Table.Cell>
            <Table.Cell style={{background: this.color('no')}}>
              <Accordion>
                <Accordion.Title
                  active={this.state.no}
                  onClick={() => this.setState({no: !this.state.no})}
                >
                  {this.parseOpinion("Ei")} {yleOpinons.no.length > 0 && <Icon name='dropdown' />}
                  </Accordion.Title>
                  <Accordion.Content active={this.state.no}>
                  <List divided verticalAlign='middle' size='large' s style={{padding: "3px", fontSize: '10px', background: 'white'}}>
                    {yleOpinons.no.map(x => 
                      <List.Item>{x.etunimi} {x.sukunimi} </List.Item>
                    )}
                    </List>
                  </Accordion.Content>
              </Accordion>
            </Table.Cell>
            <Table.Cell>
              <Accordion>
                <Accordion.Title
                  active={this.state.empty}
                  onClick={() => this.setState({empty: !this.state.empty})}
                >
                  {this.parseOpinion("Tyhjiä")} {yleOpinons.empty.length > 0 && <Icon name='dropdown' />}
                  </Accordion.Title>
                  <Accordion.Content active={this.state.empty}>
                  <List divided verticalAlign='middle' size='large'  style={{padding: "3px", fontSize: '10px', background: 'white'}}>
                    {yleOpinons.empty.map(x => 
                      <List.Item>{x.etunimi} {x.sukunimi} </List.Item>
                    )}
                    </List>
                  </Accordion.Content>
              </Accordion>
             
            </Table.Cell>
        </Table.Row>
      </>
        
    )
  }
}

const mapStateToProps = state => ({
    yle2019: state.yle2019
  });
  
export default connect(
    mapStateToProps,
    null
)(SimpleYleOpinon)
