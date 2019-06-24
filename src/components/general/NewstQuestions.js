import React from 'react';
import { connect } from 'react-redux';
import { Transition, Icon, Button, Grid } from 'semantic-ui-react'
import InfoAccordion from './InfoAccordion'
import InfoBar from './InfoBar'
import SingleQuestionData from '../parliament2019/SingleQuestionChart';

class NewestQuestions extends React.Component {
  state = {
    questionIndex: 0,
    question: false,
    visible: true,
  }

  componentDidMount = () => {
    console.log('didmount');
    this.setQuestions(0)
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
  
   
    console.log('props', this.props);
    console.log('state', this.state);

    

    if(this.state.result) {
      return(
        <SingleQuestionData question={this.state.question} userOpinion={this.state.result}/>
      )
    }
    
    return(
      <div>
        <InfoBar 
          title="Vaalikausikoneen avulla voit seurata eduskunnan toimintaa"
          text="Vaalikausikone tarjoaa selkeän ja helpon mahdollisuuden seurata
          eduskunnan toimintaa. Palvelun avulla voit vertailla omia näkemyksiäsi
          eduskunnan puolueiden ja edustajien käyttäytymiseen. Lisäksi voit tarkastella,
          kuinka edustajien ja puolueiden käyttäytyminen suhteutuu Ylen vuoden 2019 vaalikoneen 
          vastauksiin."
        />
        <div className='answers-show'>
            <Grid>
              <Grid.Row style={{paddingBottom: '0em'}}>
                <Grid.Column width={2} />
                <Grid.Column width={14}>
                <h3>Uusimmat kysymykset ({this.state.questionIndex + 1 }/3)</h3>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2}>
                  <Icon name='chevron left' style={{paddingTop: '1em', paddingBottom: '4em'}} onClick={() => this.nextQuestion(true)} />
                </Grid.Column>
                <Grid.Column width={12} style={{paddingTop: '0em', paddingRight: '0em'}}>
                  {this.state.question.kysymys &&
                  <Transition visible={this.state.visible} animation='fade' duration={300}>
                  <div className='question-div'>
                    {this.state.question.kysymys}
                    <span className='question-text'>
                      <InfoAccordion 
                        text={this.state.question.selitys}
                        title='Lisätietoja'
                        iconSize='little'
                        />
                    </span>

                  </div>
                  </Transition>
                  }
                </Grid.Column>
                <Grid.Column width={2}>
                  <Icon name='chevron right' style={{paddingTop: '1em', paddingBottom: '4em'}}  onClick={() => this.nextQuestion()} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className='answer-buttons'>
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
              </Grid.Row>
            </Grid> 
        </div>
      </div>

    )
  }
}

const mapStateToProps = state => ({
    notyet: state.kysymykset
  });
  
export default NewestQuestions