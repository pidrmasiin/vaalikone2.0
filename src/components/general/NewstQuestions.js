import React from 'react';
import { connect } from 'react-redux';
import { Transition, Icon, Image, Grid, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import InfoAccordion from './InfoAccordion'
import InfoBar from './InfoBar'
import SingleQuestionData from '../parliament2019/SingleQuestionData';
import Parties from '../parliament2019/parties/Parties'
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import './../../css/NewestQuestions.css'
import SpeakExpoler from './SpeakExploer';

class NewestQuestions extends React.Component {
  state = {
    questionIndex: 0,
    question: false,
    visible: true,
  }

  componentDidMount = () => {
    this.setQuestions(0)
    
    if(window.innerWidth < 600) {
      setTimeout(() => 
      document.getElementById('twitter-widget-0').setAttribute("style", "width: 14em;"), 1500)
    }
    
  }
    

  answer = (result) => {
    this.setState({result})
  }

  nextQuestion = (backward) => {
    this.setState({visible: false})
    setTimeout(() => this.updateQuestion(backward), 500)
  }

  setQuestions = (questionIndex) => {
    let questions = this.props.questions.filter(q => q.createdAt)
    questions = questions.sort(function(a,b){
      return new Date(b.createdAt) - new Date(a.createdAt);
    }).slice(0,3)
    this.setState({question: questions[questionIndex]})
  }

  updateQuestion = (backward) => {
    
    const questionIndex = this.updateQuestionIndex(backward)
    
    this.setQuestions(questionIndex)
    this.setState({visible: true})
  }

  updateQuestionIndex = (backward) => {
    let questionIndex = this.state.questionIndex
    if (backward) {
      if (questionIndex == 0) {
        questionIndex = 2
      } else {
        questionIndex = questionIndex - 1
      }
      this.setState({questionIndex})
    } else {
      if (questionIndex == 2) {
        questionIndex = 0
      } else {
        questionIndex = questionIndex + 1
      }
      this.setState({questionIndex})
    }
    return questionIndex
  }

  render() {
    let desktop = window.innerWidth > 600 
    const buttonSize = desktop ? 'large' : 'tiny'

    if(this.state.result) {

      return(
        <SingleQuestionData question={this.state.question} userOpinion={this.state.result}/>
      )
    }
    
    return(
      <div>
        <div className='answers-show'>
        <div style={{textAlign: 'center', marginBottom: '3em'}}>
            <h2>Ajankohtaiset vaalikausikoneet</h2>
            <p>
              Vaalikausikoneilla pääset vertailemaan poliitikkojen käyttätymistä omiin näkemyksiisi.
            </p>
            <Card.Group centered fluid>
            <Link to="/kuntavaalit2021" style={{margin:"1em"}}>
            <Card>
                <Card.Content>
                <Image centered height='150em' 
                    style={{marginTop: '0em', marginBottom: '1em'}}
                    src="https://www.kuntavaalit.fi/sites/default/files/styles/medium_cropped/public/public-image-bank/Kuntavaalit-logo_valk_tunnus.png?itok=eCRxDW-d"
                />
                <Card.Header>Kuntavaalit 2021</Card.Header>
                <Card.Meta>
                    <span className="date">2017-2021</span>
                </Card.Meta>
                <Card.Description>
                Kuntavaalikauden 2017-2021 kuntavaalikausikoneesta löydät Helsingin ja Tampereen kaupunginvaltuustojen päätöksiä
                <br/>
                <br/>
                <Icon name="log out" size="large" color="blue" style={{marginLeft: '0.2em'}}/>
                </Card.Description>
                </Card.Content>
            </Card>
            </Link>
            <Link to="/vaalikausi-marin" style={{margin:"1em"}}>
                <Card>
                    <Card.Content>
                    <Image centered height='150em' 
                        src='https://i.imgur.com/tQ6HhoS.png' 
                        style={{background: '#004d99', margin: '1em', marginTop: '0em', padding: '1em', paddingRight: '2em', paddingLeft: '2em'}}
                    />
                    <Card.Header>Suomen eduskunta</Card.Header>
                    <Card.Meta>
                        <span className='date'>2019 -> </span>
                    </Card.Meta>
                    <Card.Description>
                    Kauden 2019 -> vaalikausikoneesta löydät Rinteen ja Marinin hallituksen kaudella tehdyjä päätöksiä.
                    <br />
                    <br />
                    <Icon name="log out" size="large" color="blue" style={{marginLeft: '0.2em'}}/>
                    </Card.Description>
                    </Card.Content>
                </Card>
            </Link>
        </Card.Group>
        </div>
        <hr />
          <div className='title-party'>
            <h1 style={{marginTop:'2em'}}>Eduskunta</h1>
          </div>
          <Parties />
          <br />
            <Grid>
            <Grid.Column width={16} >
              <hr />
            </Grid.Column>
              <Grid.Row style={{paddingBottom: '0em'}}>
                <Grid.Column width={2} />
                <Grid.Column width={14}>
                <h3 className='question-title'>Uusimmat kysymykset ({this.state.questionIndex + 1 }/3)</h3>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
          
            </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2}>
                  <Icon className='arrow-icon' name='chevron left' onClick={() => this.nextQuestion(true)} />
                </Grid.Column>
                <Grid.Column width={12} style={{paddingTop: '0em', paddingRight: '0em'}}>
                  {this.state.question.kysymys &&
                  <Transition visible={this.state.visible} animation='fade' duration={300}>
                  <div className='question-div'>
                    <a className='question-link' onClick={() => this.answer('click')}>{this.state.question.kysymys}</a>
                    <span className='question-text'>
                      <InfoAccordion 
                        text={this.state.question.selitys}
                        question={this.state.question}
                        title='Lisätietoja'
                        iconSize='small'
                        explain={this.state.question.explain}
                        />
                    </span>

                  </div>
                  </Transition>
                  }
                </Grid.Column>
                <Grid.Column width={2}  style={{textAlign: 'right'}}>
                  <Icon className='arrow-icon' name='chevron right' style={{paddingTop: '1em', paddingBottom: '4em'}}  onClick={() => this.nextQuestion()} />
                </Grid.Column>
              </Grid.Row>
                
              {/* <Grid.Row className='answer-buttons'>
               {desktop && <Grid.Column width={2} />}
                <Grid.Column width={desktop ? 14 : 16}>
                    <Button onClick={() => this.answer('jaa')} size={buttonSize} color='green'> 
                      <Icon name='checkmark' />
                      Jaa
                    </Button>
                    <Button onClick={() => this.answer('eos')} size={buttonSize} >
                      <Icon name='question' />
                      EOS
                    </Button>
                    <Button onClick={() => this.answer('ei')} size={buttonSize} color="red">
                      <Icon name="close" />
                      Ei
                    </Button>
                </Grid.Column>
              </Grid.Row> */}
            <Grid.Row>
              <Grid.Column width={16} >
                <hr />
              </Grid.Column>
            </Grid.Row>
            
            {/* <Grid.Row style={{paddingBottom: '0em'}}>
                <Grid.Column width={2} />
                <Grid.Column width={14}>
                <h3 className='question-title'>Uusin lähetekeskustelu</h3>
                </Grid.Column>
            </Grid.Row>
          
            <Grid.Row style={{paddingBottom: '0em'}}>
                <Grid.Column width={2} />
                <Grid.Column width={12}>
                  <SpeakExpoler />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={16} >
                <hr />
              </Grid.Column>
            </Grid.Row> */}
          
              <Grid.Row>
                <Grid.Column width={2} />
                <Grid.Column width={13} >

                  <InfoBar 
                    title="Mikä ihmeen vaalikausikone?"
                    text="Vaalikausikone tarjoaa selkeän ja helpon mahdollisuuden seurata
                    eduskunnan toimintaa. Palvelun avulla voit vertailla omia näkemyksiäsi
                    eduskunnan puolueiden ja edustajien käyttäytymiseen. Lisäksi voit tarkastella,
                    kuinka edustajien ja puolueiden käyttäytyminen suhteutuu Ylen vaalikoneen 
                    vastauksiin."
                  />
                  </Grid.Column>
              </Grid.Row>
            <Grid.Row />
            <Grid.Row>
              <Grid.Column width={2} />
                <Grid.Column width={12} >
                  <div className='twitter-widget'>
                  <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="vaalikausikone"
                  />
                  </div>
                </Grid.Column>
                
            </Grid.Row>
            </Grid>
           
        </div>
      </div>

    )
  }
}

const mapStateToProps = state => ({
    yle2019: state.yle2019
  });
  
export default connect(
  mapStateToProps,
  null
)(NewestQuestions)