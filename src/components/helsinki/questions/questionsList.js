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
      let tampereQuestions = this.state.questions.filter(q => q.city == 'tampere')
      let helsinkiQuestions = this.state.questions.filter(q => q.city == 'helsinki')

      return (
        <div>
          <h2>Tampere</h2>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell positive>Kysymys</Table.HeaderCell>
                {window.localStorage.getItem('loggedUser') &&
                <Table.HeaderCell>Poisto</Table.HeaderCell>}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tampereQuestions.map(k =>
                    (
                      <Table.Row key={k.id}>
                        <Table.Cell selectable><Link style={linkStyle} to={`/regionalQuestions/${k.id}`}>{k.question}</Link></Table.Cell>
                        <Table.Cell>{window.localStorage.getItem('loggedUser') === null ?
                  null : <form onSubmit={this.remove(k)}><Button inverted color="red" type="submit">Delete</Button></form>}
                        </Table.Cell>
                      </Table.Row>))}
            </Table.Body>
          </Table>
          <h2>Helsinki</h2>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell positive>Kysymys</Table.HeaderCell>
                {window.localStorage.getItem('loggedUser') &&
                <Table.HeaderCell>Poisto</Table.HeaderCell>}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {helsinkiQuestions.map(k =>
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
