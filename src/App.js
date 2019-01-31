import React from 'react';
import { Grid } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import HtmlForm from './components/form/HtmlForm';
import Home from './components/Home';
import Settings from './components/Settings';
import Menu from './components/Menu';
import Questions from './components/questions/Questions';
import EtsiVastaus from './components/yle/FindAnswer'
import Kategoriat from './components/kategoriat/Kategoriat';
import Kategoria from './components/kategoriat/Kategoria';
import Question from './components/questions/Question';
import Login from './components/Login';
import Notification from './components/Notification';
import { getKysymykset } from './reducers/kysymyksetReducer';
import { getKategoriat } from './reducers/kategoriatReducer';
import { getYlenKysymykset } from './reducers/ylenKysymyksetReducer';


import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

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
          <Grid.Row
            fixed="true"
            style={{
            paddingBottom: '0rem',
            background: 'white',
            }}
          >
            <Grid.Column width={1} />
            <Grid.Column width={3} style={{ paddingRight: '0rem' }}>
              <div style={{ padding: '1em', paddingTop: '1.2em', fontSize: '1.5em' }}>
                Politiikkatieto
                <p style={{
                  borderRadius: '50%',
                  width: '1.1em',
                  height: '0.1em',
                  background: '#4679BD',
                  padding: '0.4em',
                  marginLeft: '6em',
                }}
                />
              </div>
            </Grid.Column>
            <Grid.Column width={9}>
              <Notification />
            </Grid.Column>
            <Grid.Column width={3}>
              <Menu isOpen={this.state.show} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: '0rem' }}>
            <Grid.Column style={{ background: '#004d99', padding: '2em' }}>
              <h1 style={{
                fontSize: '4em',
                color: 'white',
                textAlign: 'center',
                verticalAlign: 'bottom',
            }}
              >Vaalikausikone
              </h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row >
            <Grid.Column width={3} />
            <Grid.Column width={10}>
              <div
                id="routet"
                style={{
                    padding: '3em',
                    boxShadow: '1px 1px #888888',
                    background: 'white',
                    margin: '-2em',
                  }}
              >
                <Route exact path="/" render={() => <Home />} />
                <Route exact path="/kategoriat" render={history => <Kategoriat history={history} />} />
                <Route exact path="/kysymykset" render={() => <Questions />} />
                <Route exact path="/kone" render={() => <Settings />} />
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
                    <Question kysymys={this.kysymysById(match.params.id)} />}
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
