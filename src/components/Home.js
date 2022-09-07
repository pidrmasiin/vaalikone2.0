import React from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader, Image, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import NewestQuestions from './general/NewstQuestions'
import '../css/Home.css'


ReactGA.initialize('UA-137723152-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class Home extends React.Component {
  state = {
    activeIndex: false
  }

  render() {

    if (this.props.questions.length == 0){
      return (
        <Dimmer active>
          <Loader indeterminate>searching data</Loader>
        </Dimmer>
      )
    }
    return(
      <div> 
      <NewestQuestions questions={this.props.questions}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  questions: state.kysymykset,
  yle2019: state.yle2019
});

export default connect(
  mapStateToProps,
  null
)(Home)