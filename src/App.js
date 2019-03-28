import React from 'react';
import { Grid } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import HtmlForm from './components/form/HtmlForm';
import Home from './components/Home';
import Settings from './components/Settings';
import NolansMap from './components/nolansMap/NolansMap';
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
import { Button, TransitionablePortal, Segment, Icon } from 'semantic-ui-react';



import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      yle: []
    };
  }

  componentDidMount = async () => {
    this.props.getKysymykset();
    this.props.getKategoriat();
    this.props.getYlenKysymykset();
  }

  kysymysById = id => (
    this.props.kysymykset.find(k => k.id === id)
  )

  kategoriaById = id => (
    this.props.kategoriat.find(k => k.id === id)
  )


  logout = () => {
    window.localStorage.removeItem('loggedUser');
    window.location.assign('/')
  }

  show = () => {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    const desktop = window.innerWidth > 1000
    console.log('desk', this.history);
    const white = { color: '#004d99', padding: '1px'} 
    const animation = 'slide down'
    const duration = 200
    const active = {fontWeight: "bold"}
    
    return (
      <Router>
        <Grid>
        {desktop && <Grid.Row style={{padding: "0.5em", paddingTop: "0em"}}/>}
          <Grid.Row>
            {desktop && <Grid.Column width={3} />}
            <Grid.Column 
              width={desktop ? 10 : 16}
              style={{
                background: 'white',
                minHeight: desktop ? '70vh' : '100vh',
                padding: 0,
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)" 
              }}
              >
              <div style={{ background: '#004d99', padding: '1.5em', }}>
              <a onClick={() => window.location.href = '/'}>
                <img 
                  src="https://i.imgur.com/tQ6HhoS.png" 
                  style={{display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    height: "6em"}}
                />
              </a>
                {window.localStorage.getItem('loggedUser') &&
                <div style={{display: "inline-block", right: "0", position: "absolute", top: "0", paddingTop: "2em", paddingRight: "2em"}}>
                    <Icon name='bars' style={{color: "white"}} size="big" onClick={() => this.show()}/>
                    <TransitionablePortal
                      open={this.state.show} 
                      transition={{ animation, duration }}
                      onClose={() => this.show()}>
                      <Segment 
                      style={{textAlign: "center", padding: "0.1em",
                      right: desktop ? '18%' : "0%",
                      position: 'fixed',
                      top: desktop ? '4.5%' : "0%",
                      border: "1px solid #919499",
                      height: window.localStorage.getItem('loggedUser') ? '35em' : "24.5em",
                      width: "15em"
                      }} 
                      >
                      <img 
                          src="https://i.imgur.com/tQ6HhoS.png" 
                          height="50px"
                          style={{display: "block", paddingTop: "1em",
                            margin: "0 auto"}}
                          
                        />
                      <NavLink style={white} exact activeStyle={active} to="/">
                        <p>Etusivu</p>
                      </NavLink>
                      <NavLink style={white}  activeStyle={active} to="/kone">
                        <p ref="kone">Vaalikausikone</p>
                      </NavLink>
                      <NavLink style={white} activeStyle={active} to="/kysymykset">
                        <p ref="kysymykset">Yksittäiset kysymykset</p>
                      </NavLink>
                      <NavLink style={white} activeStyle={active} to="/vastaukset">
                        <p ref="vastaukset">Vuoden 2015 vaalikone vastaukset</p>
                      </NavLink>
                      <NavLink style={white} activeStyle={active} to="/kategoriat">
                        <p ref="kategoriat">Kategoriat</p>
                      </NavLink>
                      {window.localStorage.getItem('loggedUser') &&
                        <NavLink style={white} activeStyle={active} to="/lisaa">
                        <p ref="lisaa">Uusi kysymys</p>
                      </NavLink>
                      }
                      {window.localStorage.getItem('loggedUser') &&
                        <div style={{ padding: '1em' }}>
                      <Button onClick={() => this.logout()} size="tiny" type="submit"> Kirjaudu ulos</Button>
                        </div>
                      }
                      </Segment>
                    </TransitionablePortal>
                  </div>
                      }

                <h1 style={{
                  fontSize: '2.3em',
                  color: 'white',
                  textAlign: 'center',
                  verticalAlign: 'bottom',
                }}
                >Vaalikausikone
                </h1>
              </div>
              <div
                id="routet"
                style={{paddingTop: "5%", paddingLeft:"10%", marginRight:"10%", paddingBottom: "5%"}}
              >
                <Route exact path="/" render={(history) => <Home history={history}/>} />
                <Route exact path="/kategoriat" render={history => <Kategoriat history={history} />} />
                <Route exact path="/kysymykset" render={history => <Questions history={history}/>} />
                <Route exact path="/kone" render={history => <Settings history={history}/>} />
                <Route exact path="/vastaukset" render={history => <EtsiVastaus history={history}/>} />
                <Route exact path="/graaffit" render={history => <NolansMap history={history}/>} />
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
           {desktop && <Grid.Column width={3} />}
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
