import React from 'react';
import { connect } from 'react-redux';
import { Table, Modal } from 'semantic-ui-react'
import { parseParties } from '../yle/ylesQuestionsCategories';
import AnswersPopup from './AnswersPopup';

class OneResult extends React.Component {
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
          red: '#ffcccc',
        })
      } if (eit.length < jaat.length) {
        this.setState({
          green: '#e6ffe6',
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
    if (this.state.red) {
      return (
        <Table.Row >
        <Table.Cell>Yle</Table.Cell>
        <Table.Cell>
          {this.props.kysymys.slice(4)}
        </Table.Cell>
        <Table.Cell  style={{ background: this.state.red, padding: "1em" }}>
             Ei ({Math.round((this.state.eit.length / this.state.yhteensa) * 100)}%)
          </Table.Cell>
          <Table.Cell />
          <Table.Cell>
          <Modal.Actions>
            <AnswersPopup answers={this.state.kannat} question={this.props.kysymys} puolue={this.props.puolue}  />
          </Modal.Actions>
           </Table.Cell>
      </Table.Row>
        
      )
    } if (this.state.green) {
      return (
        <Table.Row >
        <Table.Cell>Yle</Table.Cell>
        <Table.Cell>
          {this.props.kysymys.slice(4)}
        </Table.Cell>
        <Table.Cell style={{ background: this.state.green, padding: "1em"  }}>
          Jaa ({Math.round((this.state.jaat.length / this.state.yhteensa) * 100)}%)
          </Table.Cell>
          <Table.Cell />
          <Table.Cell>
          <Modal.Actions>
            <AnswersPopup answers={this.state.kannat} question={this.props.kysymys} puolue={this.props.puolue}  />
          </Modal.Actions>
           </Table.Cell>
      </Table.Row>

      )
    }
    return (
      <Table.Row >
      <Table.Cell>Yle</Table.Cell>
      <Table.Cell>
        {this.props.kysymys.slice(4)}
      </Table.Cell>
      <Table.Cell style={{ background: this.state.green, padding: "1em"  }}>
        EOS (ei/jaa {Math.round((this.state.jaat.length / this.state.yhteensa) * 100)}%)
        </Table.Cell>
        <Table.Cell />
        <Table.Cell>
          <Modal.Actions>
            <AnswersPopup answers={this.state.kannat} question={this.props.kysymys} puolue={this.props.puolue}  />
          </Modal.Actions>

        </Table.Cell>
      </Table.Row>
    )
      
  }
}
const mapStateToProps = state => ({
  ylenKysymykset: state.ylenKysymykset,
});

export default connect(mapStateToProps)(OneResult);

