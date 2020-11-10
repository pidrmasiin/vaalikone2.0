import React from 'react';
import { connect } from 'react-redux';
import SimpleOpinionChart from '../../general/SimpleOpinionChart';
import '../../../css/Chart.css'


class SimpleYleChart extends React.Component {

  opinions = (party) => {
    party = this.props.yle2019.parties[party]
    let selectedMembers = party.filter( member => member['Valintatieto (0=ei valita, 1=valitaan, 2=varalla)'] == '1')
    let opinions = selectedMembers.map(member => this.opinonsHelper(member[this.props.yleQuestion]))
    let freq = {jaa: opinions.filter(o => o == 'jaa').length, ei: opinions.filter(o => o == 'ei').length, 'tyhjiä': opinions.filter(o => o == 'tyhjiä').length}
    return freq
  }

  opinonsHelper = (yleOpionNumber) => {
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
      case 'Keskusta':
        puolue = 'kesk'
        break
      case 'Perussuomalaiset':
        puolue = 'ps'
        break
      case 'Kokoomus':
        puolue = 'kok'
        break
      case 'SDP':
        puolue = 'sdp'
        break
      case 'Vihreät':
        puolue = 'vihr'
        break
      case 'Vasemmistoliitto':
        puolue = 'vas'
        break
      case 'RKP':
        puolue = 'rkp'
        break
      case 'Kristillisdemokraatit':
        puolue = 'kd'
        break
      case 'Liike Nyt':
        puolue = 'nyt'
        break
      default:
        break
    }
    return puolue
  }

  getColor = (party) => {
    let puolue = 'grey'
    switch (party) {
      case 'Keskusta':
        puolue = '#006600'
        break
      case 'Perussuomalaiset':
        puolue = '#000066'
        break
      case 'Kokoomus':
        puolue = '#0099ff'
        break
      case 'SDP':
        puolue = '#ff3300'
        break
      case 'Vihreät':
        puolue = '#33cc33'
        break
      case 'Vasemmistoliitto':
        puolue = '#660033'
        break
      case 'RKP':
        puolue = '#ffcc00'
        break
      case 'Kristillisdemokraatit':
        puolue = '#ffff66'
        break
      case 'Liike Nyt':
        puolue = '#cc0099'
        break
      default:
        break
    }
    return puolue
  }
        
  render(){

    let keys = Object.keys(this.props.yle2019.parties)
    let data = keys.map(party => ({State: this.parseParties(party), freq: this.opinions(party), barColor: this.getColor(party)}))
    data = data.sort(function (a, b) {
      const aTotal = a.freq.ei + a.freq.jaa + a.freq['tyhjiä']
      const bTotal = b.freq.ei + b.freq.jaa + b.freq['tyhjiä']
      return bTotal - aTotal;
    })
    
    return <div className='font-chart' key={data}>
      {data && <SimpleOpinionChart data={data} 
          chartId="simpleYleChartSVG"
          />}
        <br/>
        <br/>

      Ylen datan kaaviossa ei ole huomioitu Ahvenanmaan edustajaa. Puhemies sen sijaan on mukana.
    </div>
  }
}

const mapStateToProps = state => ({
  questions: state.kysymykset,
  yle2019: state.yle2019
});

export default connect(
  mapStateToProps,
  null
)(SimpleYleChart)