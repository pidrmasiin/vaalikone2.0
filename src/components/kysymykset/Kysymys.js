import React from 'react';
import { Link } from 'react-router-dom';
import { Item, Container, List, Button, Grid, Checkbox, TextArea, Divider, Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import kysymysService from './../../services/kysymys'

class Kysymys extends React.Component {
  state = {
    kategoriat: false,
    muokkaa: false,
    muokattava: null,
    show: false,
    puolueet: false,
    edustajat: false,
  }


  onSubmit = async (e) => {
    const kysymys = this.props.kysymys
    if (this.state.muokattava === 'kysymys') {
      kysymys.kysymys = e.target.muutos.value
    } if (this.state.muokattava === 'selitys') {
      kysymys.selitys = e.target.muutos.value
    } if (this.state.muokattava === 'url') {
      kysymys.url = e.target.muutos.value
    }
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    kysymysService.setToken(JSON.parse(loggedUserJSON).token)
    await kysymysService.modifyKysymys(kysymys.id, kysymys)
    this.setState({
      kategoriat: false,
      muokkaa: false,
      muokattava: null,
    })
  }
  onKategoriat = async () => {
    const kategoriat = []
    this.props.kategoriat.map(k => (document.getElementById(k.nimi).checked
      ? kategoriat.push(k) : null))

    const kysymys = this.props.kysymys
    kysymys.kategoriat = kategoriat.map(x => x.id)
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    kysymysService.setToken(JSON.parse(loggedUserJSON).token)
    await kysymysService.modifyKysymys(kysymys.id, kysymys)
  }

  kategoriat = () => {
    this.setState({
      kategoriat: true,
      muokkaa: false,
    })
  }

  muokkaa = (x) => {
    this.setState({
      muokkaa: true,
      kategoriat: false,
      muokattava: x,
    })
  }

  show = () => {
    this.setState({
      show: !this.state.show,
    });
  }

  puolueet = () => {
    this.setState({
      puolueet: !this.state.puolueet,
    });
  }
  edustajat = () => {
    this.setState({
      edustajat: !this.state.edustajat,
    });
  }
  render() {
    if (this.props.kysymys) {
      return (
        <Container style={{ background: '#eff5f5' }}>
          <Grid>

            {window.localStorage.getItem('loggedUser') &&
            <div>
              <Grid.Row>
                <Grid.Column width={4} />
                <Grid.Column width={12}>
                  <Button.Group inverted color="blue">
                    <Button onClick={() => this.muokkaa('kysymys')}>Kysymys</Button>
                    <Button.Or />
                    <Button onClick={() => this.muokkaa('selitys')}>Selitys</Button>
                    <Button.Or />
                    <Button onClick={this.kategoriat}>Kategoriat</Button>
                    <Button.Or />
                    <Button onClick={() => this.muokkaa('url')}>Linkki</Button>
                  </Button.Group>
                </Grid.Column>
              </Grid.Row>

              {this.state.kategoriat &&
              <Grid.Row>
                <form onSubmit={this.onKategoriat}>
                  {this.props.kategoriat.map(k =>
                  (<Checkbox
                    key={k.nimi}
                    label={k.nimi}
                    name="kategoriat"
                    id={k.nimi}
                  />))}
                  <br />
                  <Button type="submit" color="green">Muokkaa</Button>
                </form>
              </Grid.Row>}
              {this.state.muokkaa &&
              <form onSubmit={this.onSubmit}>
                <Grid.Row>
                  <TextArea name="muutos" />
                </Grid.Row>
                <Button type="submit" color="green">Muokkaa {this.state.muokattava}</Button>
              </form>}
            </div>}
            <Grid.Row>
              <Grid.Column width={12}>
                <Item.Group divided>
                  <Divider>Kysymys</Divider>
                  <Item>
                    <Item.Content>
                      <Item.Header>{this.props.kysymys.kysymys} </Item.Header>
                      <Item.Description>
                        <Button size="mini" basic onClick={this.show}>Lisätietoja</Button>
                        {this.state.show && <div>{this.props.kysymys.selitys}<br /></div>}
                      </Item.Description>
                      <List>
                        <b>Kategoriat</b>
                        <List.List>
                          {this.props.kysymys.kategoriat.map(x =>
                            (
                              <List.Item as="li" key={x._id}><Link to={`/kategoriat/${x._id}`}>{x.nimi}</Link>
                              </List.Item>))}
                        </List.List>
                      </List>
                      <List>
                        <b>Puolueiden ja edustajien kannat</b>
                        <br />
                        <Button size="mini" basic onClick={this.puolueet}>{this.state.puolueet ? 'Piilota' : 'Näytä'}</Button>
                        {this.state.puolueet &&
                        <Table celled>
                          <Table.Body style={{ background: '#fff3e6' }}>
                            {this.props.kysymys.puolueet.map(x =>
                            (
                              <Table.Row key={x.nimi}>
                                <Table.Cell>{x.nimi}</Table.Cell>
                                <Table.Cell>{x.kanta}</Table.Cell>
                              </Table.Row>))}
                          </Table.Body>
                          <Table.Body>
                            <Table.Row>
                              <Table.Cell>
                                <Button size="mini" basic onClick={this.edustajat}>Edustajien kannat</Button>
                              </Table.Cell>
                            </Table.Row>
                          </Table.Body>
                          {this.state.edustajat &&
                          <Table.Body style={{ background: 'AliceBlue' }}>
                            {this.props.kysymys.edustajat.map(x =>
                            (
                              <Table.Row key={x.nimi}>
                                <Table.Cell>{x.nimi}</Table.Cell>
                                <Table.Cell>{x.kanta}</Table.Cell>
                              </Table.Row>))}
                            <Table.Row>
                              <Table.Cell>
                                <Button size="mini" basic onClick={this.edustajat}>Piilota edustajien kannat</Button>
                              </Table.Cell>
                            </Table.Row>
                          </Table.Body>
                          }

                        </Table>
                        }
                      </List>
                      <Item.Extra>
                        <a href={this.props.kysymys.url}>Linkki eduskunnan sivuille</a>
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Grid.Column>
              <Grid.Column width={3}>
                <Grid.Row />

              </Grid.Column>
            </Grid.Row>
            <Grid.Row />
          </Grid>
        </Container>
      )
    }
    return (
      <div />
    )
  }
}

const mapStateToProps = state => ({
  kategoriat: state.kategoriat,
  kayttaja: state.kayttaja,
})

export default connect(
  mapStateToProps,
  {
  },
)(Kysymys)
