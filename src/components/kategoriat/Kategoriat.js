import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Button } from 'semantic-ui-react';
import kategoriaService from './../../services/kategoria';
import UusiKategoria from './UusiKategoria';
import { getKategoriat } from './../../reducers/kategoriatReducer';

const linkStyle = {
  color: 'black',
  fontSize: 14,
  fontWeight: 'normal',
};

class Kategoriat extends React.Component {
    componentDidMount = async () => {
      this.props.getKategoriat();
    }

    remove =k => () => {
      const ok = window.confirm(`Poistetaanko ${k.nimi} kysymys`);

      if (!ok) {
        return;
      }
      try {
        const loggedUserJSON = window.localStorage.getItem('loggedUser');
        kategoriaService.setToken(JSON.parse(loggedUserJSON).token);
        kategoriaService.remove(k.id);
      } catch (error) {
        console.log('jotain meni vikaan');
      }
    }


    render() {
      return (
        <div>
          {window.localStorage.getItem('loggedUser') &&
          <UusiKategoria />
        }
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell positive>Kategoriat</Table.HeaderCell>
                {window.localStorage.getItem('loggedUser') === null ?
                  <Table.HeaderCell /> : <Table.HeaderCell>Poisto</Table.HeaderCell>}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.kategoriat.map(k =>
                  (
                    <Table.Row key={k.id}>
                      <Table.Cell selectable><Link style={linkStyle} to={`/kategoriat/${k.id}`}>{k.nimi}</Link></Table.Cell>
                      <Table.Cell>{window.localStorage.getItem('loggedUser') &&
                      <form onSubmit={this.remove(k)}><Button inverted color="red" type="submit">Delete</Button></form>}
                      </Table.Cell>
                    </Table.Row>))
                }
            </Table.Body>
          </Table>
        </div>
      );
    }
}
const mapStateToProps = state => ({
  kategoriat: state.kategoriat,
});
export default connect(
  mapStateToProps,
  { getKategoriat },
)(Kategoriat);

