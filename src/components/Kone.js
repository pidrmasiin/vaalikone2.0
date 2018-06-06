import React from 'react';
import { connect } from 'react-redux';
import { Button, Item, Grid, Header, Dropdown } from 'semantic-ui-react';
import { addVastaus, addKysymys } from '../reducers/kayttajaReducer';
import VastausTable from './form/VastausTable';
import { puolueet as valuesP } from './vastaukset/vastausKategoriat';
import { addYlePuolueet, getYlenKysymykset } from '../reducers/ylenKysymyksetReducer';
import './Kone.css';

class Kone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kysymykset: [],
      monesko: 0,
      kysymys: null,
      show: false,
      tulokset: false,
      naytaKysymys: false,
      eit: null,
      jaat: null,
      yhteensa: null,
      puolueet: null,
    };
  }

  componentWillMount = async () => {
    const kys = this.shuffle(this.props.kysymykset)
    if (kys > 9) {
      kys.slice(9);
    }
    this.setState({
      kysymykset: kys,
    });
    if (!this.state.kysymys) {
      this.setState({
        kysymys: kys[this.state.monesko],
      })
    }
    if (!this.props.addYlePuolueet.edustajat
      && this.props.kysymykset[0]) {
      const nimet = this.props.kysymykset[0].edustajat.map(x => x.nimi)
      await this.props.getYlenKysymykset()
      setTimeout(() => {
        this.props.addYlePuolueet(nimet, this.props.ylenKysymykset.data)
      }, 1000);
    } else {
      window.location.assign('/')
    }
  }
/*eslint-disable */
  shuffle = (array) => {
    
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex = currentIndex - 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  /* eslint-enable */
  show = () => {
    this.setState({
      show: !this.state.show,
    });
  }

  naytaKysymys = () => {
    this.setState({
      naytaKysymys: !this.state.naytaKysymys,
    });
  }

  tulokset= () => {
    this.setState({
      tulokset: !this.state.tulokset,
    });
  }

  handleChange(e, { name, value }) {
    const puolueet = this.state.puolueet
    if (this.state.kysymys.vastaus) {
      /*eslint-disable */
        const kannat = puolueet[value].map(x => x =
          { edustaja: `${x.etunimi } ${x.sukunimi}`,
            kanta: x[this.state.kysymys.vastaus]
          })
           /* eslint-enable */

      const eit = kannat.filter(x => x.kanta.toString() === 'jokseenkin eri mieltä'
        || x.kanta.toString() === 'täysin eri mieltä')
      const jaat = kannat.filter(x => x.kanta.toString() === 'jokseenkin samaa mieltä'
        || x.kanta.toString() === 'täysin samaa mieltä')
      const yhteensa = kannat.length
      this.setState({
        [name]: value, jaat, eit, yhteensa,
      })
    }
  }

  vastaus = (vastaus) => {
    this.props.addKysymys(this.state.kysymys);
    const jaaPuolueet = this.state.kysymys.puolueet.filter(p => p.kanta === vastaus);
    const help = this.props.kayttaja.kysymykset.find(x => x.kysymys === this.state.kysymys.kysymys)
    if (!help) {
      for (let i = 0; i < jaaPuolueet.map(p => p.nimi).length; i = i + 1) {
        this.props.addVastaus(jaaPuolueet.map(p => p.nimi)[i]);
      }
    }
    this.setState({
      monesko: this.state.monesko + 1,
      kysymys: this.state.kysymykset[this.state.monesko + 1],
      naytaKysymys: false,
      yhteensa: false,
    })
  }

  render() {
    if (!this.state.puolueet && this.props.ylenKysymykset.puolueet.kesk) {
      this.setState({
        puolueet: this.props.ylenKysymykset.puolueet,
      })
    }
    const visible = { display: this.state.show ? '' : 'none' };
    const tulokset = { display: this.state.tulokset ? '' : 'none' };

    if (this.props.kayttaja.kysymykset.length === this.props.kysymykset.length) {
      return (
        <div>
          <h1>Kysymykset ja tulokset</h1>
          <VastausTable />
        </div>
      );
    }
    if (!this.state.kysymys) {
      window.location.assign('/')
    }
    return (
      <Grid className='tausta'>
        <Grid.Row />
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={3}>
            <Header as="h1" textAlign="justified">M i t ä</Header>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={3}>
            <Header as="h1" textAlign="justified"> o l e t</Header>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header as="h1" textAlign="justified"> m i e l t ä</Header>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header as="h1" textAlign="justified">?</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={14}>
            <Item>
              <Item.Content>
                <Item.Header><h2>{this.props.kayttaja.kysymykset.length + 1}. {this.state.kysymys.kysymys} <Button onClick={this.show} size="mini" basic>Lisätietoja</Button></h2></Item.Header>
                <Item.Description style={visible}>
                  <ul>
                    <li>{this.state.kysymys.selitys}</li>
                    <li>{this.state.kysymys.vuosi}</li>
                    <li><a href={this.state.kysymys.url}>{this.state.kysymys.url}</a></li>
                  </ul>
                </Item.Description>
                <Button onClick={this.naytaKysymys} size="mini" floated="right" basic>{this.state.naytaKysymys ? 'Piilota' : 'Näytä' } kysymystä parhaiten vastaava ylen vaalikoneen kysymys</Button>
                {this.state.naytaKysymys &&
                <div>
                  <p>{this.state.kysymys.vastaus ? this.state.kysymys.vastaus : 'Kysymykselle ei ole lisätty ylen koneesta vastaavaa kysymystä'}</p>
                  {this.state.kysymys.vastaus &&
                  <div>
                    <Dropdown type="text" name="puolue" placeholder="Valitse puolue, jonka vastauksen ylen kysymykseen haluat nähdä" onChange={this.handleChange.bind(this)} fluid search selection options={valuesP} />
                    {this.state.yhteensa &&
                    <div>
                      <p><b>Vaalikoneeseen vastanneet edustajat: </b>{this.state.yhteensa}</p>
                      <p style={{ background: 'green' }}><b>Jaa: </b>
                        {this.state.jaat.length}
                        ({Math.round((this.state.jaat.length / this.state.yhteensa) * 100)}%)
                      </p>
                      <p style={{ background: 'red' }}>
                        <b>Ei:</b>
                        {this.state.eit.length}
                        ({Math.round((this.state.eit.length / this.state.yhteensa) * 100)}%)
                      </p>
                    </div>
                    }
                  </div>
                  }
                </div>
                }
              </Item.Content>
            </Item>
          </Grid.Column>
          <Grid.Column width={1} />
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={4} />
          <Grid.Column width={12}>
            <Button onClick={() => this.vastaus('jaa')} size="big" inverted color="green">Jaa</Button>
            <Button onClick={() => this.vastaus('eos')} size="big" inverted color="brown">EOS/tyhjä</Button>
            <Button onClick={() => this.vastaus('ei')} size="big" inverted color="red">Ei</Button>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row >
          <Grid.Column width={1} />
          <Grid.Column width={12}>
            <Item>
              <Item.Content>
                <Button onClick={this.tulokset} fluid basic>Piilota/näytä tulokset</Button>
                <Item.Description style={tulokset}>
                  <VastausTable />
                </Item.Description>
              </Item.Content>
            </Item>
          </Grid.Column>
          <Grid.Column width={3} />
        </Grid.Row>
        <Grid.Row />
        <Grid.Row />
      </Grid>
    );
  }
}


const mapStateToProps = state => ({
  kysymykset: state.kysymykset,
  kayttaja: state.kayttaja,
  ylenKysymykset: state.ylenKysymykset,
});

export default connect(
  mapStateToProps,
  {
    addVastaus,
    addKysymys,
    addYlePuolueet,
    getYlenKysymykset,
  },
)(Kone);

