import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react'
import { parseParties } from '../yle/ylesQuestionsCategories';

class YleKannat extends React.Component {
  state = {
    eit: false,
    jaat: false,
    yhteensa: false,
    kannat: false,
    red: '',
    green: '',
  }
  
  componentWillMount = () => {
    const puolueet = this.props.ylenKysymykset.puolueet
    const puolue = parseParties(this.props.puolue)
    console.log('puolue', this.state.puolue);
    
    if (this.props.puolue && this.props.kysymys) {
      const kannat = puolueet[puolue].map(x => (
        {
          edustaja: `${x.etunimi} ${x.sukunimi}`,
          kanta: x[this.props.kysymys],
        }))
      const eit = kannat.filter(x => x.kanta.toString() === 'jokseenkin eri mieltä'
    || x.kanta.toString() === 'täysin eri mieltä')
      const jaat = kannat.filter(x => x.kanta.toString() === 'jokseenkin samaa mieltä'
    || x.kanta.toString() === 'täysin samaa mieltä')
      const yhteensa = kannat.length
      if (eit.length > jaat.length) {
        this.setState({
          red: '#FFB6C1',
        })
      } if (eit.length < jaat.length) {
        this.setState({
          green: 'lightgreen',
        })
      }
      this.setState({
        eit,
        jaat,
        yhteensa,
        kannat,
      })
    }
  }

  render() {
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Ylen vaalikoneen kysymys</h2>
        { this.props.show &&
        <h2 style={{ background: '#ffc180', textAlign: 'center' }}>{this.props.puolue}</h2>
          }
        <h3>{this.props.kysymys}</h3>
        <p><b>Ylen vaalikoneeseen vastanneet edustajat: </b>{this.state.yhteensa}</p>
        <p style={{ background: this.state.green }}><b>Jaa: </b>
          {this.state.jaat.length}
          ({Math.round((this.state.jaat.length / this.state.yhteensa) * 100)}%)
        </p>
        <p style={{ background: this.state.red }}>
          <b>Ei: </b> {this.state.eit.length}
          ({Math.round((this.state.eit.length / this.state.yhteensa) * 100)}%)
        </p>
        { this.props.show &&
        <Table celled striped id="table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell positive>Edustaja</Table.HeaderCell>
              <Table.HeaderCell>
              Kanta
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.kannat.map(x =>
           (
             <Table.Row key={x.edustaja}>
               <Table.Cell> {x.edustaja}</Table.Cell>
               <Table.Cell>{x.kanta}</Table.Cell>
             </Table.Row>))}
          </Table.Body>
        </Table>
        }
      </div>
    )
  }
}
const mapStateToProps = state => ({
  ylenKysymykset: state.ylenKysymykset,
});

export default connect(mapStateToProps)(YleKannat);

