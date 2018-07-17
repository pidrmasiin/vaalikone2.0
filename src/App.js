import React from 'react';
import { Grid } from 'semantic-ui-react';
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
    return (
      <Router>
        <Grid>
          <Grid.Row style={{ paddingBottom: '0rem', background: 'white' }}>
            <Grid.Column width={2} />
            <Grid.Column width={10} >
              <p style={{ padding: '1em' }}> Politiikkatieto </p>
            </Grid.Column>
            <Grid.Column width={4} >
            <Menu />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: '0rem' }}>
            <Grid.Column style={{ background: '#004d99', padding: '2em' }}>
              <h1 style={{
                fontSize: '250%',
                color: 'white',
                textAlign: 'center',
                verticalAlign: 'bottom',
            }}
              >Vaalikone
              </h1>
            </Grid.Column>
          </Grid.Row>
          <Notification />
          <Grid.Row >
            <Grid.Column width={3} />
            <Grid.Column width={10}>


              <div style={{
                    padding: '3em',
                    boxShadow: '1px 1px #888888',
                    background: 'white',
                    margin: '-2em',
                  }}
              >
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

            </Grid.Column>
            <Grid.Column width={3} />
          </Grid.Row>

        </Grid>
      </Router>
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
