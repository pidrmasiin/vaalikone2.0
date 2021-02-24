import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'semantic-ui-react';
import regionalQuestionService from '../../../services/regionalQuestion';


class RegionalQuestion extends React.Component {
    state = {

    }

    componentWillMount = async () => {
      const q = await regionalQuestionService.getRegionalQuestion(this.props.id);


      this.setState({q})
      
      
       
    }

    remove = k => () => {
      const ok = window.confirm(`Poistetaanko ${k.question} kysymys`);

      if (!ok) {
        return;
      }
      try {
        const loggedUserJSON = window.localStorage.getItem('loggedUser');
        regionalQuestionService.setToken(JSON.parse(loggedUserJSON).token);
        regionalQuestionService.remove(k.id);
      } catch (error) {
        console.log('jotain meni vikaan');
      }
    }

    render() {
      return (
        <div>
            {JSON.stringify(this.state.q)}
        </div>
      );
    }
}

export default RegionalQuestion;
