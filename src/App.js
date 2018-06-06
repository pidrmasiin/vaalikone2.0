import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import HtmlForm from './components/form/HtmlForm';
import Home from './components/Home';
import Menu from './components/Menu';
import Kysymykset from './components/kysymykset/Kysymykset';
import EtsiVastaus from './components/vastaukset/EtsiVastaus'
import Kategoriat from './components/kategoriat/Kategoriat';
import Kategoria from './components/kategoriat/Kategoria';
import Kysymys from './components/kysymykset/Kysymys';
import Kone from './components/Kone';
import Login from './components/Login';
import Notification from './components/Notification';
import { getKysymykset } from './reducers/kysymyksetReducer';
import { getKategoriat } from './reducers/kategoriatReducer';
import { getYlenKysymykset } from './reducers/ylenKysymyksetReducer';


import './App.css';

class App extends React.Component {
  componentWillMount = async () => {
    this.props.getKysymykset();
    this.props.getKategoriat();
    this.props.getYlenKysymykset()
  }

  kysymysById = id => (
    this.props.kysymykset.find(k => k.id === id)
  )

  kategoriaById = id => (
    this.props.kategoriat.find(k => k.id === id)
  )

  render() {
    const navStyle = {
      background: '#669999',
      color: 'white',
      marginTop: '2%',
    };

    return (
      <Container>
        <Header as="h1" block style={navStyle}>V A A L I K O N E</Header>
        <Notification />
        <Router>
          <div>
            <Menu />
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/kategoriat" render={history => <Kategoriat history={history} />} />
            <Route exact path="/kysymykset" render={() => <Kysymykset />} />
            <Route exact path="/kone" render={() => <Kone />} />
            <Route exact path="/vastaukset" render={() => <EtsiVastaus />} />
            <Route exact path="/login" render={({ history }) => <Login history={history} />} />
            {window.localStorage.getItem('loggedUser') &&
              <div>
                <Route path="/lisaa" render={({ history }) => <HtmlForm history={history} />} />
              </div>
                    }
            <Route
              exact
              path="/kysymykset/:id"
              render={({ match }) =>
                <Kysymys kysymys={this.kysymysById(match.params.id)} />}
            />
            <Route
              exact
              path="/kategoriat/:id"
              render={({ match }) =>
                (<Kategoria
                  kategoria={this.kategoriaById(match.params.id)}
                  kysymykset={this.props.kysymykset}
                />)
              }
            />
          </div>
        </Router>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  kysymykset: state.kysymykset,
  kategoriat: state.kategoriat,
  ylenKysymykset: state.ylenKysymykset,
});

export default connect(
  mapStateToProps,
  {
    getKysymykset,
    getKategoriat,
    getYlenKysymykset,
  },
)(App);
