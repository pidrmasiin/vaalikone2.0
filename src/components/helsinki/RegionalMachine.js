import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Card, Icon, Dimmer, Loader} from 'semantic-ui-react';
import { addQuestion, addAnswer } from '../../reducers/regionalUserReducer';
import { notifyCreation } from '../../reducers/notifyReducer'
import regionalQuestionService from '../../services/regionalQuestion';
import RegionalAnswers from './regionalAnswers';
import _ from 'lodash'
import './../Machine.css';

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
    
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;

    const questions = await regionalQuestionService.getAllRegion(this.props.region)

   
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
    let q = this.state.kysymys
    q.regionalUser = vastaus === 'eos' ? 'tyhjia' : vastaus

    this.props.addQuestion(q);

    const jaaPuolueet = _.values(this.state.kysymys.parties).filter(p => p.kanta === q.regionalUser);

    const help = this.props.regionalUser.questions.find(x => x.question === this.state.kysymys.question)
    
    if (!help) {
      for (let i = 0; i < jaaPuolueet.map(p => p.name).length; i = i + 1) {
        this.props.addAnswer(jaaPuolueet.map(p => p.name)[i]);
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
    if(this.state.monesko > 0 && this.props.regionalUser.questions.length === this.state.kysymykset.length) {
      return <RegionalAnswers region={this.props.region} />
    }
    if (!this.state.kysymys) {
      return(
      <Dimmer active>
        <Loader indeterminate>Valmistellaan kysymyksiä</Loader>
      </Dimmer>
      )
    }
    return (
      <Grid style={{marginLeft: "0.2em" }}>
        <Grid.Row>
          <Header as="h1" >  
            <span> Äänestä!</span> {this.state.monesko + 1}/{this.state.kysymykset.length}</Header>
        </Grid.Row>
        <Grid.Row>
          <p>{this.state.kysymys.question}</p>
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
          <Card.Content style={{whiteSpace: "pre-line"}}> 
            {this.state.kysymys.explain}
          </Card.Content>
          <Card.Content extra>
          <a target="_blank" rel="noopener noreferrer" href={this.state.kysymys.url} style={{color:"blue"}}>Tarkempia tietoja</a>
          </Card.Content>
        </Card>
       
        </Grid.Row>
      
      </Grid>
    );
  }
}


const mapStateToProps = state => ({
  regionalUser: state.regionalUser,
});

export default connect(
  mapStateToProps,
  {
    addQuestion,
    addAnswer,
    notifyCreation
  },
)(Machine);

