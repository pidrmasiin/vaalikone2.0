import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Button } from 'semantic-ui-react';
import speakService from '../../../services/speak';

const linkStyle = {
  color: 'black',
  fontSize: 14,
  fontWeight: 'normal',
};

class Speaks extends React.Component {
    state = {
        speaks: []
    }

    componentDidMount = async () => {
        const speaks = await speakService.getAll()
        this.setState({speaks})
    }

    remove = k => () => {
      const ok = window.confirm(`Poistetaanko ${k.speak} kysymys`);

      if (!ok) {
        return;
      }
      try {
        const loggedUserJSON = window.localStorage.getItem('loggedUser');
        speakService.setToken(JSON.parse(loggedUserJSON).token);
        speakService.remove(k.id);
      } catch (error) {
        console.log('jotain meni vikaan');
      }
    }

    render() {
      return (
        <div>
            <Table celled>
            <Table.Header>
                <Table.Row>
                <Table.HeaderCell positive>Keskustelu</Table.HeaderCell>
                {window.localStorage.getItem('loggedUser') &&
                <Table.HeaderCell>Poisto</Table.HeaderCell>}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {this.state.speaks.map(k =>
                    (
                        <Table.Row key={k.id}>
                        <Table.Cell selectable><Link style={linkStyle} to={`/speaks/${k.id}`}>{k.explainQuestion}</Link></Table.Cell>
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

export default Speaks