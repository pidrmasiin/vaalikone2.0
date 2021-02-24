import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'semantic-ui-react';
import regionalQuestionService from '../../../services/regionalQuestion';

const linkStyle = {
  color: 'black',
  fontSize: 14,
  fontWeight: 'normal',
};

class RegionalQuestions extends React.Component {
    state = {

    }

    componentWillMount = async () => {
       const questions = await regionalQuestionService.getAllWithDisabled();
       this.setState({
         questions
       })
       
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
      let questions = this.state.questions

      if(!questions) {
        return(
          <div>ODOTA</div>
        )
      }
      questions = this.state.questions.filter(q => q.tunniste != 'eu2019')
      return (
        <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell positive>Kysymys</Table.HeaderCell>
              {window.localStorage.getItem('loggedUser') &&
              <Table.HeaderCell>Poisto</Table.HeaderCell>}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {questions.map(k =>
                  (
                    <Table.Row key={k.id}>
                      <Table.Cell selectable><Link style={linkStyle} to={`/regionalQuestions/${k.id}`}>{k.question}</Link></Table.Cell>
                      <Table.Cell>{window.localStorage.getItem('loggedUser') === null ?
                null : <form onSubmit={this.remove(k)}><Button inverted color="red" type="submit">Delete</Button></form>}
                      </Table.Cell>
                    </Table.Row>))}
          </Table.Body>
        </Table>
        </div>
      );
    }
}

export default RegionalQuestions;
