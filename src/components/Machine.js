import React from 'react';
import { connect } from 'react-redux';
import { Button, Item, Grid, Header } from 'semantic-ui-react';
import { addVastaus, addKysymys } from '../reducers/kayttajaReducer';
import AnswersTable from './form/AnswersTable';
import './Machine.css'

class Machine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kysymykset: [],
      monesko: 0,
      kysymys: null,
      show: false,
      tulokset: false,
      naytaKysymys: false,
    };
  }

  componentWillMount = async () => {
    const satunnainenKysymys = this.shuffle(this.props.kysymykset)
    if (satunnainenKysymys > 9) {
      satunnainenKysymys.slice(9);
    }
    this.setState({
      kysymykset: satunnainenKysymys,
    });
    if (!this.state.kysymys) {
      this.setState({
        kysymys: satunnainenKysymys[this.state.monesko],
      })
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
      show: false,
    })
  }

  render() {
    if (document.getElementById('discardHover')) {
      const element = document.getElementById('discardHover')
      console.log(element)
    }
    const visible = { display: this.state.show ? '' : 'none' };

    if (this.props.kayttaja.kysymykset.length === this.props.kysymykset.length) {
      return (
        <div>
          <h1 >Tulokset</h1>
          <Button onClick={() => window.location.assign('/')}>Uudelleenlataa sivu vastataksesi taas kysymyksiin</Button>
          <AnswersTable />
        </div>
      );
    }
    if (!this.state.kysymys) {
      window.location.assign('/')
    }
    return (
      <Grid >
        <Grid.Row>
          <Header as="h1" ><p style={{ paddingLeft: '0.5em' }}> Äänestä!</p></Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={7} />
          <Grid.Column width={9} textAlign="center" verticalAlign="middle">
            <p className="circleQuestion">{this.props.kayttaja.kysymykset.length + 1}</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Item>
              <Item.Content>
                <Item.Header><p style={{ fontSize: '1.5em' }}>{this.state.kysymys.kysymys}<br /></p><Button onClick={this.show} size="mini" basic>Lisätietoja...</Button></Item.Header>
                <Item.Description style={visible}>
                  <ul>
                    <li>{this.state.kysymys.selitys}</li>
                    <li>Äänestys vuosi: {this.state.kysymys.vuosi}</li>
                    <li> <a target="_blank" rel="noopener noreferrer" href={this.state.kysymys.url}>Eduskunnan sivuille</a></li>
                  </ul>
                </Item.Description>

              </Item.Content>
            </Item>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Button fluid onClick={() => this.vastaus('jaa')} size="big" color="green">Jaa</Button>
        </Grid.Row>
        <Grid.Row>
          <Button fluid onClick={() => this.vastaus('eos')} size="big" color="brown">EOS/tyhjä</Button>
        </Grid.Row>
        <Grid.Row>
          <Button fluid onClick={() => this.vastaus('ei')} size="big" color="red">Ei</Button>
        </Grid.Row>
        <Grid.Row>
          <div>
            <h3>Kategoriat</h3>
            <ul>
              {this.state.kysymys.kategoriat.map(x => (
                <li key={x._id}>{x.nimi}</li>
          ))}
            </ul>
          </div>
        </Grid.Row>
      </Grid>
    );
  }
}


const mapStateToProps = state => ({
  kysymykset: state.kysymykset,
  kayttaja: state.kayttaja,
});

export default connect(
  mapStateToProps,
  {
    addVastaus,
    addKysymys,
  },
)(Machine);

