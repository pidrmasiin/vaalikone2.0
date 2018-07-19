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
    }

    show = (event) => {
      event.preventDefault();
      this.setState({
        show: !this.state.show,
      });
    }

    render() {
      const white = { color: 'white' }
      return (
        <div>
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
                }}
              name="arrow alternate circle right outline"
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
            <form onSubmit={this.logout}>
              <Button size="tiny" type="submit"> Kirjaudu ulos</Button>
            </form>
      }
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
