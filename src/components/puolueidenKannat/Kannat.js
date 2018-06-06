import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Divider } from 'semantic-ui-react'

class Kannat extends React.Component {
  kanta = (kysymys) => {
    const puolueet = this.props.ylenKysymykset.puolueet
    if (kysymys) {
      /*eslint-disable */
      let puolue = false
      switch (this.props.puolue) {
        case 'Keskustan eduskuntaryhmä':
          puolue = 'kesk'
          break
        case 'Perussuomalaisten eduskuntaryhmä':
          puolue = 'ps'
          break
        case 'Kansallisen kokoomuksen eduskuntaryhmä':
          puolue = 'kok'
          break
        case 'Sosialidemokraattinen eduskuntaryhmä':
          puolue = 'sdp'
          break
        case 'Vihreä eduskuntaryhmä':
          puolue = 'vihr'
          break
        case 'Vasemmistoliiton eduskuntaryhmä':
          puolue = 'vas'
          break
        case 'Ruotsalainen eduskuntaryhmä':
          puolue = 'rkp'
          break
        case 'Kristillisdemokraattinen eduskuntaryhmä':
          puolue = 'kd'
          break
        default:
          break
      }
      console.log('puolue', puolue)
      console.log('kysymys', kysymys)
      if(puolue){
        const kannat = puolueet[puolue].map(x => x =
          { edustaja: `${x.etunimi } ${x.sukunimi}`,
            kanta: x[kysymys.vastaus]
          })
          console.log('kannat', kannat)
          const eit = kannat.filter(x => x.kanta.toString() === 'jokseenkin eri mieltä'
          || x.kanta.toString() === 'täysin eri mieltä')
        const jaat = kannat.filter(x => x.kanta.toString() === 'jokseenkin samaa mieltä'
          || x.kanta.toString() === 'täysin samaa mieltä')
        if (jaat.length > eit.length) {
          return 'jaa'
        }
        return 'ei'
      }
    }
    return 'tyhja'
  }
  render() {
    const map = []
    for (let k = 0; k < this.props.kayttaja.kysymykset.length; k = k + 1) {
      const puolueet = this.props.kayttaja.kysymykset[k].puolueet
      for (let i = 0; i < puolueet.length; i = i + 1) {
        if (puolueet[i].nimi === this.props.kayttaja.puolue) {
          const data = {
            kanta: puolueet[i].kanta,
            kysymys: this.props.kayttaja.kysymykset[k].kysymys,
          }
          if (!map.find(p => p.kysymys === data.kysymys)) {
            map.push(data)
          }
        }
      }
    }
    console.log(this.props.kayttaja.kysymykset)
    return (
      <div>
        <h1 style={{ background: '#ffc180' }}>{this.props.kayttaja.puolue}</h1>
        <Table striped celled id="table" style={{ background: 'AliceBlue' }}>

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell positive>Kysymys</Table.HeaderCell>
              <Table.HeaderCell>
              Kanta
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {this.props.kayttaja.kysymykset.map(x =>
           (
             <Table.Body key={x.id}>
               <Table.Row >
                 <Table.Cell><b>Eduskunta</b><Link to={`/kysymykset/${x.id}`}>{x.kysymys}</Link></Table.Cell>
                 <Table.Cell>{map.find(k => k.kysymys === x.kysymys)
                            && map.find(k => k.kysymys === x.kysymys).kanta}
                 </Table.Cell>
               </Table.Row>
               <Table.Row>
                 <Table.Cell><b>Ylen vaalikone</b>{x.vastaus}</Table.Cell>
                 <Table.Cell>{this.kanta(x)}</Table.Cell>
               </Table.Row>
               <Table.Row>
                 <Table.Cell><Divider style={{background:'white'}}/></Table.Cell>
               </Table.Row>
             </Table.Body>))}
        </Table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  kysymykset: state.kysymykset,
  kayttaja: state.kayttaja,
  ylenKysymykset: state.ylenKysymykset,
});

export default connect(
  mapStateToProps,
  { },
)(Kannat);

