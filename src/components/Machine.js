import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Card, Icon, Dimmer, Loader} from 'semantic-ui-react';
import { addKysymys, addVastaus, addEuroVastaus } from '../reducers/kayttajaReducer';
import { notifyCreation } from '../reducers/notifyReducer'
import AnswersTable from './AnswersTable';
import EuroAnswers from './europa/euroAnswers';
import './Machine.css';
import MarinAnswersTable from './MarinAnswersTable';
import NolansMap from './nolansMap/NolansMap';

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

  componentDidMount = async () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;

    if(this.props.kysymykset) {
      const questions = this.filterQuestions(this.props.kysymykset)
      const satunnainenKysymys = this.shuffle(questions)
      let kysymykset = satunnainenKysymys
      if (satunnainenKysymys.length > 9) {
        kysymykset = satunnainenKysymys.slice(0, this.props.howMany);
      }
      
      this.setState({
        kysymykset
      });
      if (!this.state.kysymys) {
        this.setState({
          kysymys: kysymykset[this.state.monesko],
        })
      } else {
        window.location.assign('/')
      }
    }
  }

  filterQuestions = (questions) => {
    const selected_categories = this.props.selected_categories
    let handledQuestions = this.selectedMachineQuestions(this.props.selection, questions)
    if (selected_categories.length > 0){
      handledQuestions = questions.filter( q => selected_categories.some(cat => q.kategoriat.map(k => k.nimi).includes(cat)))
      if (handledQuestions.length === 0) {
        this.props.notifyCreation('Antamillasi ehdoilla ei löytynyt yhtään kysymystä. Kokeile valita hieman vähemmän kategorioita.', 15)
      }
    }
    return handledQuestions
  }

  selectedMachineQuestions = (selection, questions) => {
    let handledQuestions = questions.filter(q => q.tunniste != 'eu2019')
    if (selection == 'eu2019') {
      handledQuestions =  questions.filter(q => q.tunniste == 'eu2019')
    }
    
    switch(selection) {
      case 'eu2019':
        return handledQuestions
      case 'sipila':

        return handledQuestions.filter(x => x.createdAt == null)
      case 'marin':
        return handledQuestions.filter(x => x.createdAt)
      default:
        return []
    }
  }
/*eslint-disable */
  shuffle = (array) => {
    
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex = currentIndex - 1;

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
    console.log(this.state.kysymys);
    
    let q = this.state.kysymys
    q.user = q.tunniste == 'eu2019' && vastaus === 'eos' ? 'tyhjia' : vastaus
    this.props.addKysymys(q);
    const jaaPuolueet = this.state.kysymys.puolueet.filter(p => p.kanta === q.user);
    const help = this.props.kayttaja.kysymykset.find(x => x.kysymys === this.state.kysymys.kysymys)
    if (!help) {
      for (let i = 0; i < jaaPuolueet.map(p => p.nimi).length; i = i + 1) {
        (this.props.selection == 'eu2019') ? this.props.addEuroVastaus(jaaPuolueet.map(p => p.nimi)[i]) : this.props.addVastaus(jaaPuolueet.map(p => p.nimi)[i]);
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
    const buttonSize = window.innerWidth > 600 ? 'big' : 'medium'
    if (this.state.kysymykset.length > 0 && this.props.kayttaja.kysymykset.length === this.state.kysymykset.length && (this.props.selection != 'eu2019')) {
      return (
        <div>
          <h1 >Tulokset</h1>
          Taulukosta voit katsoa kuinka hyvin antamasi vastaukset vastaavat eduskunnan todellisia äänestystuloksia. 
          Taulukon alla olevasta kuviosta näet puolueiden kannat arvokartalla.
          {this.props.selection == 'marin' ?
            <MarinAnswersTable />
            : <AnswersTable />
          }
          
          <NolansMap user={this.props.kayttaja}/>
          <Button onClick={() => window.location.assign('/kone')} basic fluid color="blue" size='massive' style={{marginTop: "3em", margin: "1em"}}>
            Valitse uudet kategoriat ja vastaa taas kysymyksiin
          </Button>
        </div>
      );
    }
    if((this.props.selection == 'eu2019') && this.props.kayttaja.kysymykset.length === this.state.kysymykset.length) {
      return <EuroAnswers />
    }
    if (!this.state.kysymys) {
      return(
      <Dimmer active>
        <Loader indeterminate>Preparing Files</Loader>
      </Dimmer>
      )
    }
    return (
      <Grid style={{marginLeft: "0.2em" }}>
        <Grid.Row>
          <Header as="h1" >  
            <span> Äänestä!</span></Header>
        </Grid.Row>
        <Grid.Row>
            <p> {this.props.kayttaja.kysymykset.length + 1}. {this.state.kysymys.kysymys}</p>
         </Grid.Row>

        <Grid.Row>
          <Button onClick={() => this.vastaus('jaa')} size={buttonSize} color='green'> 
            <Icon name='checkmark' />
            Jaa
          </Button>
          <Button onClick={() => this.vastaus('eos')} size={buttonSize} >
            <Icon name='question' />
            EOS
          </Button>
          <Button onClick={() => this.vastaus('ei')} size={buttonSize} color="red">
            <Icon name="close" />
            Ei
          </Button>
        </Grid.Row>
        <Grid.Row style={{marginTop: "0.5em", marginBottom: "0.5em"}}>
        <Card style={{width: "100%"}}>
          <Card.Header style={{background: "#cecece", padding: "0.5em"}}><h3>Lisätietoja</h3></Card.Header>
          <Card.Content> 
           <h3>{this.state.kysymys.tunniste !== 'eu2019' && this.state.kysymys.tunniste}</h3> 
            <p style={{whiteSpace: "pre-line"}}>{this.state.kysymys.selitys}</p> 
           <h3>Äänestysvuosi</h3>
           {this.state.kysymys.vuosi}
           <h3>Kategoriat</h3>
           {this.state.kysymys.kategoriat.map(x => (
                <p style={{padding: "0", margin: "0"}} key={x._id}>{x.nimi}</p>
          ))}
          </Card.Content>
          <Card.Content extra>
          <a target="_blank" rel="noopener noreferrer" href={this.state.kysymys.url} style={{color:"blue"}}>Asiakirjat</a>
          </Card.Content>
        </Card>
       
        </Grid.Row>
      
      </Grid>
    );
  }
}


const mapStateToProps = state => ({
  kayttaja: state.kayttaja,
});

export default connect(
  mapStateToProps,
  {
    addVastaus,
    addKysymys,
    addEuroVastaus,
    notifyCreation,
  },
)(Machine);

