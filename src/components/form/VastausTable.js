import _ from 'lodash'
import React from 'react';
import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addPuolue } from '../../reducers/kayttajaReducer'


class VastausTable extends React.Component {
  state = {
    monta: this.props.kayttaja.kysymykset.length,
  }
  render() {
    return (
      <Table striped celled id="table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell positive>Logo</Table.HeaderCell>
            <Table.HeaderCell positive>Eduskuntaryhmä</Table.HeaderCell>
            <Table.HeaderCell>
                  Kuinka sopiva puolue ({this.state.monta} kysymykseen vastattu)
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.orderBy(this.props.kayttaja.puolueet, ['aanet'], ['desc']).map(x =>
              (
                <Table.Row key={x.name}>
                  <Table.Cell>
                    <img src={x.url} alt={x.name} height="80em" width="120em" />
                  </Table.Cell>
                  <Table.Cell>
                    {x.name}
                  </Table.Cell>
                  <Table.Cell>{Math.round((x.aanet / this.state.monta) * 100)} %</Table.Cell>
                </Table.Row>))}
        </Table.Body>
      </Table>
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
