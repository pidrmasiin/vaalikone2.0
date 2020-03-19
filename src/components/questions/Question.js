import React from 'react';
import { Link } from 'react-router-dom';
import { Item, Container, List, Button, Grid, Checkbox, TextArea, Divider, Table, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import kysymysService from './../../services/kysymys'
import TextEditor from '../form/TextEditon'

class Kysymys extends React.Component {
  state = {
    kategoriat: false,
    muokkaa: false,
    muokattava: null,
    show: false,
    puolueet: false,
    edustajat: false,
    hot: false,
    asettelu: false,
    booleans: false,
    jaaLeftist: null,
    jaaLiberal: null,
    green: null,
    kysymys: this.props.kysymys
  }

  componentDidMount = () => {
    if (this.props.kysymys) {
      this.setState({
        hot: this.props.kysymys.hot,
        asettelu: this.props.kysymys.kysymyksenAsettelu,
        jaaLeftist: this.props.kysymys.jaaLeftist,
        jaaLiberal: this.props.kysymys.jaaLiberal,
        green: this.props.kysymys.green,
      })
    }
  }

  onSubmit = async (e) => {
    let kysymys = this.props.kysymys
    if (this.state.muokattava === 'kysymys') {
      kysymys.kysymys = e.target.muutos.value
    } if (this.state.muokattava === 'selitys') {
      kysymys.selitys = e.target.muutos.value
    } if (this.state.muokattava === 'explain') {
      kysymys['explain'] = e.target.muutos.value
    } 
    if (this.state.muokattava === 'tunniste') {
      kysymys.tunniste = e.target.muutos.value
    } if (this.state.muokattava === 'url') {
      kysymys.url = e.target.muutos.value
    } if (this.state.muokattava === 'yle') {
      kysymys.vastaus = this.state.yleQuestion
    } 
    
    
    if (typeof this.state.jaaLeftist === 'boolean') {
      kysymys.jaaLeftist = this.state.jaaLeftist
    } else {
      kysymys.jaaLeftist = null
    } 
    
     if (typeof this.state.jaaLiberal === 'boolean') {
      kysymys.jaaLiberal = this.state.jaaLiberal
    } 
    else {
      kysymys.jaaLiberal = null
    } 
    if (typeof this.state.green === 'boolean') {
      kysymys.green = this.state.green
    } else {
      kysymys.green = null
    } 

    kysymys.hot = this.state.hot
    kysymys.kysymyksenAsettelu = this.state.asettelu

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
      booleans: false,
    })
  }

  show = () => {
    this.setState({
      show: !this.state.show,
    });
  }

  showBooleans = () => {
    this.setState({
      hot: this.props.kysymys.hot,
      asettelu: this.props.kysymys.kysymyksenAsettelu,
      jaaLeftist: this.props.kysymys.jaaLeftist,
      jaaLiberal: this.props.kysymys.jaaLiberal,
      green: this.props.kysymys.green,
    })
    this.setState({
      booleans: !this.state.booleans,
      muokkaa: false,
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

  handleHot = () => {
    this.setState({
      hot: !this.state.hot,
    });
  }

  handleAsettelu = () => {
    this.setState({
      asettelu: !this.state.asettelu,
    });
  }

  handleJaaLiberal = (value) => {
    this.setState({
      jaaLiberal: value,
    });
  }

  handleJaaLeftist = (value) => {
    this.setState({
      jaaLeftist: value,
    });
  }

  handleGreen = (value) => {
    this.setState({
      green: value,
    });
  }

  disClick = (field) => {
    this.setState({
      [field]: null 
    })
  }

  showYle = () => {
    this.setState({
      yle: true,
      muokattava: "yle"
    })
  }

  handleYle = (e, data) => {
    this.setState({
      yleQuestion: data.value
    })
  }


  render() {
    console.log('sate', this.state);
    
    if (this.props.kysymys) {
      const yles = this.props.yle.kysymykset.map(x => { return {text: x, value: x}})
      return (
        <Container>
          <Grid>

            {window.localStorage.getItem('loggedUser') &&
            <div>
              <Grid.Row>
                <Grid.Column width={4} />
                <Grid.Column width={12}>
                  <Button.Group inverted color="blue">
                    <Button onClick={() => this.muokkaa('kysymys')}>Kysymys</Button>
                    <Button.Or />
                    <Button onClick={() => this.muokkaa('tunniste')}>Tunniste</Button>
                    <Button.Or />
                    <Button onClick={() => this.muokkaa('selitys')}>Selitys</Button>
                    <Button.Or />
                    <Button onClick={() => this.muokkaa('explain')}>Muotoiltu selitys</Button>
                    <Button.Or />
                    <Button onClick={() => this.showYle()}>Yle</Button>
                    <Button.Or />
                    <Button onClick={this.kategoriat}>Kategoriat</Button>
                    <Button.Or />
                    <Button onClick={() => this.muokkaa('url')}>Linkki</Button>
                    <Button.Or />
                    <Button onClick={() => this.showBooleans()}>
                      Tärkeys,ristiriita, vihreys, Vas-Oik ja Kons-Lib
                    </Button>
                  </Button.Group>
                </Grid.Column>
              </Grid.Row>
              {this.state.yle &&
              <form onSubmit={this.onSubmit}>
              <Dropdown placeholder='Valitse ylen kysymys' fluid selection onChange={(e, d) => this.handleYle(e, d)} options={yles} />
                  <Button type="submit" color="green">Muokkaa</Button>
                </form>
            }

              {this.state.booleans &&
              <div>
                <br />
                <Checkbox
                  toggle
                  onChange={() => this.handleHot()}
                  defaultChecked={this.state.hot}
                  label="Keskeinen kysymys tällä hallituskaudella"
                />
                <br />
                <Checkbox
                  defaultChecked={this.state.asettelu}
                  toggle
                  onChange={() => this.handleAsettelu()}
                  label="Kysymyksen asettelu ristiriitainen ylen kysymykseen nähden"
                />
                <br />
                <Checkbox
                  radio
                  name="liberalRadioGroup"
                  checked={this.state.jaaLiberal === true}
                  label="Jaa vastaus liberaali"
                  onChange={() => this.handleJaaLiberal(true)}
                />
                <Checkbox
                  radio
                  name="liberalRadioGroup"
                  checked={this.state.jaaLiberal === false}
                  label="Jaa vastaus konservatiivinen"
                  onChange={() => this.handleJaaLiberal(false)}
                />
                <Checkbox
                    radio
                    name="liberalRadioGroup"
                    checked={this.state.jaaLiberal === null}
                    label="Ei sovi"
                    onChange={() => this.disClick("jaaLiberal")}
                  />
                <br />
                <Checkbox
                  radio
                  checked={this.state.jaaLeftist === true}
                  label="Jaa vastaus vasemmistolainen"
                  onChange={() => this.handleJaaLeftist(true)}
                />
                <Checkbox 
                  radio
                  checked={this.state.jaaLeftist === false}
                  label="Jaa vastaus oikeistolainen"
                  onChange={() => this.handleJaaLeftist(false)}
                />
                  <Checkbox
                    radio
                    name="liberalRadioGroup"
                    checked={this.state.jaaLeftist === null}
                    label="Ei sovi"
                    onChange={() => this.disClick("jaaLeftist")}
                  />
                 <br />
                <Checkbox
                  radio
                  checked={this.state.green === true}
                  label="Jaa vastaus vihreä"
                  onChange={() => this.handleGreen(true)}
                />
                <Checkbox
                  radio
                  checked={this.state.green === false}
                  label="Ei vastaus vihreä"
                  onChange={() => this.handleGreen(false)}
                />
                  <Checkbox
                    radio
                    name="liberalRadioGroup"
                    checked={this.state.green === null}
                    label="Ei sovi"
                    onChange={() => this.disClick("green")}
                  />
                <br />
                <br />
                <form onSubmit={this.onSubmit}>
                  <Button type="submit" color="green">Muokkaa tärkeys ja asettelu</Button>
                </form>
              </div>
              }
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
                  {this.state.muokattava == 'explain' ?
                  <TextEditor label='Selitys' /> :
                  <TextArea name="muutos" />}
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
                        {this.state.show && 
                        <div>
                          <br/>
                        <b>Jaa vastaus liberaali:</b> {typeof this.props.kysymys.jaaLiberal === 'boolean' && this.props.kysymys.jaaLiberal.toString()}
                        <br />
                        <b>Jaa vastaus vasemmistolainen:</b> {typeof this.props.kysymys.jaaLeftist == 'boolean' && this.props.kysymys.jaaLeftist.toString()}
                        <br />
                          <b>Jaa vastaus vihreä:</b> {typeof this.props.kysymys.green == 'boolean' && this.props.kysymys.green.toString()}
                          <br />
                       <br/>
                       <h3> {this.props.kysymys.tunniste}</h3>
                        
                        {this.props.kysymys.selitys}
                      
                        </div>}
                      </Item.Description>
                      <br />
                      <b>Kysymykseen linkitetty ylen vaalikoneen kysymys</b>
                      <br />
                      <br />
                      <p>{this.props.kysymys.vastaus}</p>
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
                        <Table>
                          <Table.Body>
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
                          <Table.Body>
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
                        <a target="_blank" rel="noopener noreferrer" href={this.props.kysymys.url}>Linkki eduskunnan sivuille</a>
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
  yle: state.ylenKysymykset
})

export default connect(
  mapStateToProps,
  {
  },
)(Kysymys)
