import React from 'react';
import { Dropdown } from 'semantic-ui-react'
import SingleQuestionChartAndTable from './SingleQuestionChartAndTable';

class BubbleChart extends React.Component {
  state = {
    activeIndex: false,
    selectedParty: 'Kaikki'
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
    member['opinion'] = opinon && opinon.kanta ? opinon.kanta : 'poissa'
    return member
  }

  handlePartyChange = (e, { name, value }) => {
      this.setState({selectedPartyData: this.state.data.find(x => x.party == value), selectedParty: value})
  }

  render() {
    const dropParties = this.state.parties.map(x => {return {value: x, text: x}})
    const selectedPartyData = this.state.selectedPartyData

    return(
        <div style={{paddingTop: '2em'}}>
            <b style={{textAlign: 'left'}}>Valitse puolue, jota haluat tarkastella</b>
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
            <SingleQuestionChartAndTable 
                data={this.state.data} 
                selectedParty={this.state.selectedParty} 
                funds={this.props.funds} 
                selectedPartyData={selectedPartyData}/>
        </div>
    )
  }
}

export default BubbleChart