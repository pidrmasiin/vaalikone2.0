import React from 'react';
import { connect } from 'react-redux';
import { Accordion, Icon, Segment } from 'semantic-ui-react'
import '../../css/Home.css'

class NewestQuestions extends React.Component {
  state = {
    activeIndex: false
  }

  componentDidMount = () => {

  }

  render() {
    return(
        <div>
            {this.props.questions.filter(q => q.createdAt).map(question =>
            <p>{question.kysymys}</p>
            )}
        </div>
    )
  }
}

const mapStateToProps = state => ({
    questions: state.kysymykset
  });
  
export default connect(
    mapStateToProps,
    null
)(NewestQuestions)