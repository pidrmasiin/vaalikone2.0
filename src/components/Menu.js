import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { slide as Burger } from 'react-burger-menu'
import { Menu, Button } from 'semantic-ui-react';

class Nav extends React.Component {
    logout = () => {
      window.localStorage.removeItem('loggedUser');
    }

    render() {
      const linkStyle = {
        color: 'pink',
      };


      return (
        <Burger>
          <Menu>
            <Menu.Item>
              <Link style={linkStyle} to="/"> Etusivu</Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                style={linkStyle}
                to="/kone"
              >Vaalikone
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link style={linkStyle} to="/kysymykset">Kysymykset</Link>
            </Menu.Item>
            <Menu.Item>
              <Link style={linkStyle} to="/vastaukset">Vastaukset</Link>
            </Menu.Item>
            <Menu.Item>
              <Link style={linkStyle} to="/kategoriat">Kategoriat</Link>
            </Menu.Item>
            {window.localStorage.getItem('loggedUser') &&
            <Menu.Item>
              <Link style={linkStyle} to="/lisaa">Uusi kysymys</Link>
            </Menu.Item>
          }
            <Menu.Menu position="right">
              {window.localStorage.getItem('loggedUser') &&
              <Menu.Item>
                <form onSubmit={this.logout}>
                  <Button size="tiny" type="submit"> Kirjaudu ulos</Button>
                </form>
              </Menu.Item>
      }
            </Menu.Menu>
          </Menu>
        </Burger>

      );
    }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
