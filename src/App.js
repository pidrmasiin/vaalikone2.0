import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import HtmlForm from './components/form/HtmlForm';
import SipilaHome from './components/SipilaHome';
import Home from './components/Home';
import Info from './components/Info';
import MachineMenu from './components/MachineMenu';
import SipilaSettings from './components/SipilaSettings';
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
import { getYle2019 } from './reducers/yle2019Reducer';
import { getKategoriat } from './reducers/kategoriatReducer';
import { getYlenKysymykset } from './reducers/ylenKysymyksetReducer';
import { Button, TransitionablePortal, Segment, Icon, Grid } from 'semantic-ui-react';
import FinnishMembers from './components/europa/FinnishMembers';
import EuroInfo from './components/europa/EuroInfo';
import './App.css';
import './css/BasicMenu.css';

import XlsxParser from './components/parliament2019/yle2019/XlsxParser';



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
    this.props.getYle2019();
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
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
        document.getElementById("footer").style.bottom = "0";
      } else {
        document.getElementById("navbar").style.top = "-10em";
        document.getElementById("footer").style.bottom = "-4em";
      }
      prevScrollpos = currentScrollPos;
    }
    const active = {fontWeight: "bold"}
    return (
      <Router>
        <div>
          <Grid.Row>
            <Grid.Column 
              width={16}
              style={{
                background: 'white',
                minHeight: '100vh',
                padding: 0,
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)" 
              }}
              >
              <div>
                <div className='menu-content' id='navbar'>
                  <a className='logo-link' onClick={() => window.location.href = '/'}>
                    <img 
                      src="https://i.imgur.com/mEEvD3i.png" 
                      className='menu-logo'
                    />
                  </a>
                  <div className="menu-links">
                  <NavLink to='/koneet' className="menu-link">
                    Koneet
                  </NavLink>
                  <NavLink to='/info' className="menu-link">
                    Puolueet
                  </NavLink>
                  <NavLink to='/info' className="menu-link">
                    Edustajat
                  </NavLink>
                  <NavLink to='/info' className="menu-link">
                    Info
                  </NavLink>
                      {window.localStorage.getItem('loggedUser') &&
                      <span style={{marginTop: '1em'}}>
                            <NavLink className="menu-log" activeStyle={active} to="/kysymykset">
                              <span ref="kysymykset">Muokkaa kysymyksiä</span>
                            </NavLink>
                            <NavLink className="menu-log" activeStyle={active} to="/kategoriat">
                              Kategoriat
                            </NavLink>
                            <NavLink className="menu-log" activeStyle={active} to="/lisaa">
                             Uusi kysymys
                            </NavLink>
                            <button style={{marginLeft: '1em', marginTop: '1em'}} onClick={() => this.logout()} size="tiny" type="submit"> Kirjaudu ulos</button>
                        </span>
                        }
                    </div>
                </div>
                <div>
                  <div
                    id="routet"
                    className="routet"
                  >
                    <Route exact path="/" render={(history) => <Home history={history}/>} />
                    <Route exact path="/koneet" render={(history) => <MachineMenu history={history}/>} />
                    <Route exact path="/suomalaiset" render={(history) => <FinnishMembers history={history}/>} />
                    <Route exact path="/info" render={(history) => <Info history={history}/>} />
                    <Route exact path="/euroinfo" render={(history) => <EuroInfo history={history}/>} />
                    <Route exact path="/vaalikausi" render={(history) => <SipilaHome history={history}/>} />
                    <Route exact path="/lupaukset" render={({ history }) => <Promises history={history} />} />
                    <Route exact path="/kategoriat" render={history => <Kategoriat history={history} />} />
                    <Route exact path="/kysymykset" render={history => <Questions history={history}/>} />
                    <Route exact path="/kone" render={history => <SipilaSettings history={history}/>} />
                    <Route exact path="/vastaukset" render={history => <EtsiVastaus history={history}/>} />
                    <Route exact path="/graaffit" render={history => <NolansMap history={history}/>} />
                    <Route exact path="/login" render={({ history }) => <Login history={history} />} />
                    <Route exact path="/hajontakaavio" render={({ history }) => <Dispersion history={history} />} />
                    <Route exact path="/eu2019" render={({ history }) => <Eu2019 history={history} />} />
                    <Route exact path="/eurovaalit" render={({ history }) => <EuroSettings history={history} />} />
                    <Route exact path="/xls" render={({ history }) => <XlsxParser history={history} />} />
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
                  <div className='footer' id='footer'>
                    <div className='footer-left'>
                      Vaalikausikone Ry
                    </div>
                    <div className='footer-right'>
                      Twitter Facebook
                    </div>
                  </div>
                </div>
              </div>

            </Grid.Column>
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
  ylenKysymykset: state.ylenKysymykset
});

export default connect(
  mapStateToProps,
  {
    getKysymykset,
    getKategoriat,
    getYlenKysymykset,
    getYle2019
  },
)(App);
