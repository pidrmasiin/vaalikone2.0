import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Card, Icon} from 'semantic-ui-react';
import { addKysymys, addVastaus } from '../reducers/kayttajaReducer';
import { notifyCreation } from '../reducers/notifyReducer'
import AnswersTable from './AnswersTable';
import './Machine.css';

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
    const questions = this.filterQuestions(this.props.kysymykset)
    const satunnainenKysymys = this.shuffle(questions)
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

  filterQuestions = (questions) => {
    let handledQuestions = questions
    const selected_categories = this.props.selected_categories
    if (this.props.hots) {
      handledQuestions = questions.filter( question => question.hot)
    } if (selected_categories.length > 0){
      handledQuestions = questions.filter( q => selected_categories.some(cat => q.kategoriat.map(k => k.nimi).includes(cat)))
      if (handledQuestions.length === 0) {
        this.props.notifyCreation('Antamillasi ehdoilla ei löytynyt yhtään kysymystä. Kokeile valita hieman vähemmän kategorioita.', 15)
      }
    }
    return handledQuestions
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
    console.log("state", this.state)
    if (document.getElementById('discardHover')) {
      const element = document.getElementById('discardHover')
      console.log(element)
    }
    const visible = { display: this.state.show ? '' : 'none' };

    if (this.props.kayttaja.kysymykset.length === this.state.kysymykset.length) {
      return (
        <div>
          <h1 >Tulokset</h1>
          <Button onClick={() => window.location.assign('/kone')} basic color="blue">
            Valitse uudet kategoriat ja vastaa taas kysymyksiin
          </Button>
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
          <Header as="h1" >  
            <span> Äänestä!</span></Header>
        </Grid.Row>
        <Grid.Row>
            <p style={{fontSize: "1.2em"}}> {this.props.kayttaja.kysymykset.length + 1}. {this.state.kysymys.kysymys}</p>
         </Grid.Row>

        <Grid.Row>
          <Button onClick={() => this.vastaus('jaa')} size="big" color='green'> 
            <Icon name='checkmark' />
            Jaa
          </Button>
          <Button onClick={() => this.vastaus('eos')} size="big">
            <Icon name='question' />
            EOS
          </Button>
          <Button onClick={() => this.vastaus('ei')} size="big" color="red">
            <Icon name="close" />
            Ei
          </Button>
        </Grid.Row>
        <Grid.Row style={{marginTop: "0.5em"}}>
        <Card style={{width: "800px"}}>
          <Card.Header style={{background: "#cecece", padding: "0.5em"}}><h3>Lisätietoja</h3></Card.Header>
          <Card.Content> 
           <h3>H{this.state.kysymys.tunnus}</h3> 
            <p>{this.state.kysymys.selitys}</p> 
           <h3>Äänestysvuosi</h3>
           {this.state.kysymys.vuosi}
           <h3>Kategoriat</h3>
           {this.state.kysymys.kategoriat.map(x => (
                <p style={{padding: "0", margin: "0"}} key={x._id}>{x.nimi}</p>
          ))}
          </Card.Content>
          <Card.Content extra>
          <a target="_blank" rel="noopener noreferrer" href={this.state.kysymys.url} style={{color:"blue"}}>Eduskunnan sivuille</a>
          </Card.Content>
        </Card>
       
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
    notifyCreation,
  },
)(Machine);

