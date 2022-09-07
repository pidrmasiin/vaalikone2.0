import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react'


class SimpleYleOpinon extends React.Component {

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

  color = (jaa) => {
    if (jaa === 'jaa') {
      return '#e6ffe6'
    } if (jaa === 'ei') {
      return '#ffcccc'
    }
    return null
  }
        
  render(){
    let yleOpinons = this.opinions(this.props.party)
    console.log('yles', yleOpinons);
    
    return(
        <Table.Row >
            <Table.Cell>Yle 2019</Table.Cell>
            <Table.Cell>
                {this.props.yleQuestion}
            </Table.Cell>
            <Table.Cell>
                Jaa: {yleOpinons.jaa} kpl
            </Table.Cell>
            <Table.Cell>
                Ei: {yleOpinons.ei} kpl
            </Table.Cell>
            <Table.Cell>
                Tyhjia: {yleOpinons.tyhjiä} kpl
            </Table.Cell>
        </Table.Row>
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
