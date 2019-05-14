import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import HtmlForm from './components/form/HtmlForm';
import Home from './components/Home';
import Info from './components/Info';
import Menu from './components/Menu';
import Settings from './components/Settings';
import EuroSettings from './components/europa/euroSettings';
import NolansMap from './components/nolansMap/NolansMap';
import Questions from './components/questions/Questions';
import EtsiVastaus from './components/yle/FindAnswer'
import Dispersion from './components/yle/2019/OpinionChart'
import Promises from './components/yle/partiesPromises'
import Kategoriat from './components/kategoriat/Kategoriat';
import Kategoria from './components/kategoriat/Kategoria';
import Question from './components/questions/Question';
import Eu2019 from './components/europa/Eu2019';
import Login from './components/Login';
import { getKysymykset } from './reducers/kysymyksetReducer';
import { getKategoriat } from './reducers/kategoriatReducer';
import { getYlenKysymykset } from './reducers/ylenKysymyksetReducer';
import { Button, TransitionablePortal, Segment, Icon, Grid } from 'semantic-ui-react';
import FinnishMembers from './components/europa/FinnishMembers';
import EuroInfo from './components/europa/EuroInfo';
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
    const desktop = window.innerWidth > 800
    console.log('desk', this.history);
    const white = { color: '#004d99', padding: '1px'} 
    const animation = 'slide down'
    const duration = 200
    const active = {fontWeight: "bold"}
    let gridClass= desktop ? 'ui grid' : ''
    return (
      <Router>
        <div className={gridClass}>
        {desktop && <Grid.Row style={{padding: "0.5em", paddingTop: "0em"}}/>}
          <Grid.Row>
            {desktop && <Grid.Column width={2} />}
            <Grid.Column 
              width={desktop ? 12 : 16}
              style={{
                background: 'white',
                minHeight: desktop ? '70vh' : '100vh',
                padding: 0,
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)" 
              }}
              >
              <div style={{ background: '#004d99', padding: '1.5em'}}>
              <NavLink to='/info'>
                <Icon name='question' style={{color: "white", display: "inline-block", left: "0", position: "absolute", top: "0", paddingLeft: "0.3em", paddingTop: "0.3em"}}/>
              </NavLink>
              <a onClick={() => window.location.href = '/'}>
                <img 
                  src="https://i.imgur.com/mEEvD3i.png" 
                  style={{display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    height: "6em"
                  }}
                />
              </a>
                {window.localStorage.getItem('loggedUser') ?
                <div style={{display: "inline-block", right: "0", position: "absolute", top: "0", paddingTop: "2em", paddingRight: "2em"}}>
                    <Icon name='bars' style={{color: "white"}} size="large" onClick={() => this.show()}/>
                    <TransitionablePortal
                      open={this.state.show} 
                      transition={{ animation, duration }}
                      onClose={() => this.show()}>
                      <Segment 
                      style={{textAlign: "center", padding: "0.1em",
                      right: desktop ? '18%' : "0%",
                      position: 'fixed',
                      top: desktop ? '4.5%' : "0%",
                      height: window.localStorage.getItem('loggedUser') ? '50em' : "24.5em",
                      }} 
                      >
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
                      <NavLink style={white} activeStyle={active} to="/eurovaalit">
                        <p ref="euro">Eurovaalit</p>
                      </NavLink>
                      {window.localStorage.getItem('loggedUser') &&
                      <div>
                          <NavLink style={white} activeStyle={active} to="/eu2019">
                        <p ref="eu2019">Uusi euro kysymys</p>
                      </NavLink>
                      <NavLink style={white} activeStyle={active} to="/lisaa">
                        <p ref="lisaa">Uusi kysymys</p>
                      </NavLink>
                      </div>
                      }
                      {window.localStorage.getItem('loggedUser') &&
                        <div style={{ padding: '1em' }}>
                      <Button onClick={() => this.logout()} size="tiny" type="submit"> Kirjaudu ulos</Button>
                        </div>
                      }
                      </Segment>
                    </TransitionablePortal>
                  </div>
                   :
                    <Icon onClick={() => window.location.href = '/'} name='home' style={{color: "white", display: "inline-block", right: "0", position: "absolute", top: "0", paddingRight: "0.3em", paddingTop: "0.3em"}}/>
                  }
                {desktop && 
                <h1 style={{
                  fontSize: desktop ? '2.3em' : '1.7em',
                  color: 'white',
                  textAlign: 'center',
                  verticalAlign: 'bottom',
                }}
                >Vaalikausikone
                </h1>
                }
              </div>
              <div
                id="routet"
                className="routet"
              >
                <Route exact path="/" render={(history) => <Menu history={history}/>} />
                <Route exact path="/suomalaiset" render={(history) => <FinnishMembers history={history}/>} />
                <Route exact path="/info" render={(history) => <Info history={history}/>} />
                <Route exact path="/euroinfo" render={(history) => <EuroInfo history={history}/>} />
                <Route exact path="/vaalikausi" render={(history) => <Home history={history}/>} />
                <Route exact path="/lupaukset" render={({ history }) => <Promises history={history} />} />
                <Route exact path="/kategoriat" render={history => <Kategoriat history={history} />} />
                <Route exact path="/kysymykset" render={history => <Questions history={history}/>} />
                <Route exact path="/kone" render={history => <Settings history={history}/>} />
                <Route exact path="/vastaukset" render={history => <EtsiVastaus history={history}/>} />
                <Route exact path="/graaffit" render={history => <NolansMap history={history}/>} />
                <Route exact path="/login" render={({ history }) => <Login history={history} />} />
                <Route exact path="/hajontakaavio" render={({ history }) => <Dispersion history={history} />} />
                <Route exact path="/eu2019" render={({ history }) => <Eu2019 history={history} />} />
                <Route exact path="/eurovaalit" render={({ history }) => <EuroSettings history={history} />} />
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
           {desktop && <Grid.Column width={2} />}
          </Grid.Row>
         </div>
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
