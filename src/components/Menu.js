import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { slide as Burger } from 'react-burger-menu'
import { Button } from 'semantic-ui-react';

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
      return (
        <div>
          <Button onClick={this.show}> Menu </Button>
          {this.state.show &&
          <Burger right width="20%" isOpen={false} pageWrapId="page-wrap">
            <Link to="/"> Etusivu</Link>
            <Link
              to="/kone"
            >Vaalikone
            </Link>
            <Link to="/kysymykset">Kysymykset</Link>
            <Link to="/vastaukset">Vastaukset</Link>
            <Link to="/kategoriat">Kategoriat</Link>
            {window.localStorage.getItem('loggedUser') &&
            <Link to="/lisaa">Uusi kysymys</Link>
          }
            {window.localStorage.getItem('loggedUser') &&
            <form onSubmit={this.logout}>
              <Button size="tiny" type="submit"> Kirjaudu ulos</Button>
            </form>
      }
            <a onClick={this.show} className="menu-item--small" href="">Settings</a>
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
