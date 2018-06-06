import _ from 'lodash'
import React from 'react';
import { Table, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Kannat from '../puolueidenKannat/Kannat'
import { addPuolue } from '../../reducers/kayttajaReducer'


class VastausTable extends React.Component {
  state= {
    kannat: false,
    puolue: null,
  }
    kannat = (puolue) => {
      if (puolue) {
        const testDiv = document.getElementById('vastausTable')
        window.scrollTo(0, testDiv.offsetTop)
        this.props.addPuolue(puolue)
        this.setState({
          kannat: true,
          puolue,
        })
      } else {
        this.setState({
          kannat: false,
          puolue: null,
        })
      }
    }

    render() {
      const monta = this.props.kayttaja.kysymykset.length
      return (
        <div id="vastausTable">
          {this.state.kannat &&
          <div>
            <Button color="blue" onClick={() => this.kannat()}>
              Piilota kannat
            </Button>
            <Kannat puolue={this.state.puolue} />
            <Button color="blue" onClick={() => this.kannat()}>
              Piilota kannat
            </Button>
          </div>
            }
          <Table striped celled id="table">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell positive>Eduskuntaryhmä</Table.HeaderCell>
                <Table.HeaderCell>
                  Kuinka sopiva puolue ({monta} kysymykseen vastattu)
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.orderBy(this.props.kayttaja.puolueet, ['aanet'], ['desc']).map(x =>
              (
                <Table.Row key={x.name}>
                  <Table.Cell>
                    {x.name}
                    <Button size="mini" basic onClick={() => this.kannat(x.name)}>Kannat</Button>
                  </Table.Cell>
                  <Table.Cell>{Math.round((x.aanet / monta) * 100)} %</Table.Cell>
                </Table.Row>))}
            </Table.Body>
          </Table>
        </div>
      )
    }
}

const mapStateToProps = state => ({
  kayttaja: state.kayttaja,
})

export default connect(
  mapStateToProps,
  { addPuolue },
)(VastausTable)
