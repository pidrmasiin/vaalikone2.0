import React from 'react';
import { Table } from 'semantic-ui-react'

class YleKannat extends React.Component {
  componentWillMount = () => {
  }
  render() {
    const eit = this.props.state.kannat.filter(x => x.kanta.toString() === 'jokseenkin eri mieltä'
    || x.kanta.toString() === 'täysin eri mieltä')
    const jaat = this.props.state.kannat.filter(x => x.kanta.toString() === 'jokseenkin samaa mieltä'
    || x.kanta.toString() === 'täysin samaa mieltä')
    const yhteensa = this.props.state.kannat.length
    return (
      <div>
        <h2 style={{ background: '#ffc180', textAlign: 'center' }}>{this.props.state.puolue}</h2>
        <h3>{this.props.state.kysymys}</h3>
        <p><b>Vaalikoneeseen vastanneet edustajat: </b>{yhteensa}</p>
        <p style={{ background: 'green' }}><b>Jaa: </b>
          {jaat.length} ({Math.round((jaat.length / yhteensa) * 100)}%)
        </p>
        <p style={{ background: 'red' }}>
          <b>Ei:</b> {eit.length}({Math.round((eit.length / yhteensa) * 100)}%)
        </p>
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
            {this.props.state.kannat.map(x =>
           (
             <Table.Row key={x.edustaja}>
               <Table.Cell> {x.edustaja}</Table.Cell>
               <Table.Cell>{x.kanta}</Table.Cell>
             </Table.Row>))}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default YleKannat
