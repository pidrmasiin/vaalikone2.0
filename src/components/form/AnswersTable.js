import _ from 'lodash'
import React from 'react';
import { Table, Button, Popup, TransitionablePortal, Segment, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addPuolue } from '../../reducers/kayttajaReducer'


class AnswersTable extends React.Component {
  state = {
    monta: this.props.kayttaja.kysymykset.length,
    show: false,
    puolue: 'Keskustan eduskuntaryhmä',
  }

  show = (puolue) => {
    if (puolue) {
      this.setState({
        puolue,
      });
    }
    this.setState({
      show: !this.state.show,
    });
  }
color = (jaa) => {
  if (jaa === 'jaa') {
    return '#e6ffe6'
  } if (jaa === 'ei') {
    return '#ffcccc'
  }
  return null
}

render() {
  console.log(this.props.kayttaja)
  console.log(this.props.ylenKysymykset)
  const animation = 'horizontal flip'
  const duration = 500
  return (
    <div style={{ padding: '1em', paddingLeft: '0em' }} >
      <TransitionablePortal open={this.state.show} transition={{ animation, duration }}>
        <Segment style={{
                  left: '10%',
                  position: 'fixed',
                  top: '20%',
                  padding: '1em',
                }}
        >
          <Button floated="right" color="red" inverted onClick={() => this.show()}>Piilota vastaukset</Button>
          <Header style={{ textDecoration: 'underline' }}>{this.state.puolue}
          </Header>
          <Table striped celled id="table">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Kysymys</Table.HeaderCell>
                <Table.HeaderCell>Puolueen kanta</Table.HeaderCell>
                <Table.HeaderCell>Vertaa vastausta ylen koneeseen</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.kayttaja.kysymykset.map(x =>
              (
                <Table.Row key={x.id}>
                  <Table.Cell>
                    {x.kysymys}
                  </Table.Cell>
                  <Table.Cell
                    style={{
                      background:
                        this.color(x.puolueet.find(y => y.nimi === this.state.puolue).kanta),
                      }}
                  >
                    {x.puolueet.find(y => y.nimi === this.state.puolue).kanta}
                  </Table.Cell>
                  <Table.Cell>
                    <Popup
                      trigger={<Button color="blue" icon="add" />}
                      content={x.vastaus}
                    />
                  </Table.Cell>
                </Table.Row>))}
            </Table.Body>
          </Table>
        </Segment>
      </TransitionablePortal>
      <Table striped celled id="table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell positive>Logo</Table.HeaderCell>
            <Table.HeaderCell positive>Eduskuntaryhmä</Table.HeaderCell>
            <Table.HeaderCell>
                  Kuinka sopiva puolue ({this.state.monta} kysymykseen vastattu)
            </Table.HeaderCell>
            <Table.HeaderCell positive>Tarkastele vastauksia</Table.HeaderCell>
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
                  <Table.Cell>
                    {x.name !== 'Liike Nyt-eduskuntaryhmä' && x.name !== 'Sininen eduskuntaryhmä' ?
                      <Button color="blue" inverted onClick={() => this.show(x.name)}>Näytä vastaukset</Button>
                    : <p>Ei mukana koko kautta</p>}
                  </Table.Cell>
                </Table.Row>))}
        </Table.Body>
      </Table>
    </div>
  )
}
}

const mapStateToProps = state => ({
  kayttaja: state.kayttaja,
  ylenKysymykset: state.ylenKysymykset,
})

export default connect(
  mapStateToProps,
  { addPuolue },
)(AnswersTable)
