import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { slide as Burger } from 'react-burger-menu'
import { Button, Icon } from 'semantic-ui-react';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
    logout = () => {
      window.localStorage.removeItem('loggedUser');
      window.location.assign('/')
    }

    show = (event) => {
      event.preventDefault();
      this.setState({
        show: !this.state.show,
      });
    }

    render() {
      const white = { color: 'white', paddingTop: '1em' }
      return (
        <div style={{ fontSize: '2em' }}>
          <Icon
            onClick={this.show}
            style={{
                  margin: '1em',
                }}
            name="bars"
          />
          {this.state.show &&
          <Burger right width="15%" isOpen >
            <br />
            <Icon
              onClick={this.show}
              style={{
                  color: 'white',
                  paddingTop: '1em',
                  paddingBottom: '1em',
                }}
              name="arrow circle right outline"
            />
            <br />
            <Link style={white} to="/"> Etusivu</Link>
            <Link style={white} to="/kone">Vaalikone</Link>
            <Link style={white} to="/kysymykset">Kysymykset</Link>
            <Link style={white} to="/vastaukset">Vastaukset</Link>
            <Link style={white} to="/kategoriat">Kategoriat</Link>
            {window.localStorage.getItem('loggedUser') &&
            <Link style={white} to="/lisaa">Uusi kysymys</Link>
          }
            {window.localStorage.getItem('loggedUser') &&
            <div style={{ paddingTop: '2em' }}>
              <Button onClick={() => this.logout()} size="tiny" type="submit"> Kirjaudu ulos</Button>
            </div>}
          </Burger>
        }
        </div>
      );
    }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
