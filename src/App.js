import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import HtmlForm from "./components/form/HtmlForm";
import SipilaHome from "./components/SipilaHome";
import MarinHome from "./components/MarinSettings";
import Home from "./components/Home";
import Info from "./components/Info";
import MachineMenu from "./components/MachineMenu";
import SipilaSettings from "./components/SipilaSettings";
import EuroSettings from "./components/europa/euroSettings";
import NolansMap from "./components/nolansMap/NolansMap";
import Questions from "./components/questions/Questions";
import EtsiVastaus from "./components/yle/FindAnswer";
import Dispersion from "./components/yle/2019/OpinionChart";
import HeadsUpYle from "./components/yle/2019/HeadsUpYle";
import Promises from "./components/yle/partiesPromises";
import Kategoriat from "./components/kategoriat/Kategoriat";
import Kategoria from "./components/kategoriat/Kategoria";
import Question from "./components/questions/Question";
import Eu2019 from "./components/europa/Eu2019";
import Login from "./components/Login";
import kysymysService from "./services/kysymys";
import { getKysymykset } from "./reducers/kysymyksetReducer";
import { getYle2019 } from "./reducers/yle2019Reducer";
import { getKategoriat } from "./reducers/kategoriatReducer";
import { getYlenKysymykset } from "./reducers/ylenKysymyksetReducer";
import { Grid, Dropdown } from "semantic-ui-react";
import FinnishMembers from "./components/europa/FinnishMembers";
import EuroInfo from "./components/europa/EuroInfo";
import "./App.css";
import "./css/BasicMenu.css";

import ParseFunds from "./components/parliament2019/funds/parseFundFile";
import PartiesHome from "./components/parliament2019/parties/PartiesHome";
import AddSpeak from "./components/parliament2019/speaks/AddSpeak";
import Speaks from "./components/parliament2019/speaks/Speaks";
import Speak from "./components/parliament2019/speaks/Speak";
import SpeakExpoler from "./components/general/SpeakExploer";
import HelsinkiForm from "./components/helsinki/form/newQuestionForm";
import RegionalQuestions from "./components/helsinki/questions/questionsList";
import RegionalQuestion from "./components/helsinki/questions/regionalQuestion";
import RegionalMachineMenu from "./components/helsinki/RegionalMachineMenu";
import AddWithVaskiId from "./components/form/AddWithVaskiId";
import MarinQuestions from "./components/questions/MarinQuestions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      yle: [],
    };
  }

  componentDidMount = async () => {
    this.props.getKysymykset();
    this.props.getKategoriat();
    this.props.getYle2019();
    this.props.getYlenKysymykset();
    const questions = await kysymysService.getAllWithDisabled();
    this.setState({
      questions,
    });
  };

  kategoriaById = (id) => this.props.kategoriat.find((k) => k.id === id);

  logout = () => {
    window.localStorage.removeItem("loggedUser");
    window.location.assign("/");
  };

  show = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (
        prevScrollpos > currentScrollPos &&
        document.getElementById("navbar") &&
        document.getElementById("footer")
      ) {
        document.getElementById("navbar").style.top = "0";
        document.getElementById("footer").style.bottom = "0";
      } else if (
        document.getElementById("navbar") &&
        document.getElementById("footer")
      ) {
        document.getElementById("navbar").style.top = "-10em";
        document.getElementById("footer").style.bottom = "-4em";
      }
      prevScrollpos = currentScrollPos;
    };
    const active = { fontWeight: "bold" };

    return (
      <Router>
        <div>
          <Grid.Row>
            <Grid.Column
              width={16}
              style={{
                background: "white",
                minHeight: "100vh",
                padding: 0,
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
              }}
            >
              <div>
                <div className="menu-content" id="navbar">
                  <a
                    className="logo-link"
                    onClick={() => (window.location.href = "/")}
                  >
                    <img
                      src="https://i.imgur.com/mEEvD3i.png"
                      className="menu-logo"
                    />
                  </a>
                  <div className="menu-links">
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => (window.location.href = "/koneet")}
                      className="menu-link"
                    >
                      Koneet
                    </a>
                    <NavLink to="/puolueet" className="menu-link">
                      Puolueet
                    </NavLink>

                    {/* <NavLink to='/info' className="menu-link">
                    Edustajat
                  </NavLink> */}
                    <NavLink to="/info" className="menu-link">
                      Info
                    </NavLink>
                    {window.localStorage.getItem("loggedUser") && (
                      <span style={{ marginTop: "1em" }}>
                        <Dropdown text="kysymyykset" className="menu-log">
                          <Dropdown.Menu>
                            <Dropdown.Header>Kuntavaalit</Dropdown.Header>
                            <Dropdown.Item>
                              <NavLink
                                className="menu-log"
                                activeStyle={active}
                                to="/lisaaHelsinki"
                              >
                                Uusi kysymys kuntakoneeseen
                              </NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <NavLink
                                className="menu-log"
                                activeStyle={active}
                                to="/kuntaLista"
                              >
                                Muokkaa kuntakysymyksiä
                              </NavLink>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Header>Marinin hallitus</Dropdown.Header>
                            <Dropdown.Item>
                              <NavLink
                                className="menu-log"
                                activeStyle={active}
                                to="/allMarins"
                              >
                                Marinin hallituksen kysymykset
                              </NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <NavLink
                                className="menu-log"
                                activeStyle={active}
                                to="/addWithVaski"
                              >
                                Lisää kysymys vaskiID:n perusteella
                              </NavLink>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Header>Vanhat</Dropdown.Header>
                            <Dropdown.Item>
                              <NavLink
                                className="menu-log"
                                activeStyle={active}
                                to="/kysymykset"
                              >
                                <span ref="kysymykset">Muokkaa kysymyksiä</span>
                              </NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <NavLink
                                className="menu-log"
                                activeStyle={active}
                                to="/kategoriat"
                              >
                                Kategoriat
                              </NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <NavLink
                                className="menu-log"
                                activeStyle={active}
                                to="/lisaa"
                              >
                                Uusi kysymys
                              </NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <NavLink
                                className="menu-log"
                                activeStyle={active}
                                to="/speaks"
                              >
                                <span ref="kysymykset">
                                  Muokkaa keskusteluja
                                </span>
                              </NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <NavLink
                                className="menu-log"
                                activeStyle={active}
                                to="/addSpeak"
                              >
                                Lisää keskustelu
                              </NavLink>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>

                        <button
                          style={{ marginLeft: "1em", marginTop: "1em" }}
                          onClick={() => this.logout()}
                          size="tiny"
                          type="submit"
                        >
                          {" "}
                          Kirjaudu ulos
                        </button>
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div id="routet" className="routet">
                    <Route
                      exact
                      path="/funds"
                      render={(history) => <ParseFunds history={history} />}
                    />
                    <Route
                      exact
                      path="/"
                      render={(history) => <Home history={history} />}
                    />
                    <Route
                      exact
                      path="/koneet"
                      render={(history) => <MachineMenu history={history} />}
                    />
                    <Route
                      exact
                      path="/suomalaiset"
                      render={(history) => <FinnishMembers history={history} />}
                    />
                    <Route
                      exact
                      path="/info"
                      render={(history) => <Info history={history} />}
                    />
                    <Route
                      exact
                      path="/euroinfo"
                      render={(history) => <EuroInfo history={history} />}
                    />
                    <Route
                      exact
                      path="/vaalikausi"
                      render={(history) => <SipilaHome history={history} />}
                    />
                    <Route
                      exact
                      path="/vaalikausi-marin"
                      render={(history) => <MarinHome history={history} />}
                    />
                    <Route
                      exact
                      path="/lupaukset"
                      render={({ history }) => <Promises history={history} />}
                    />
                    <Route
                      exact
                      path="/kategoriat"
                      render={(history) => <Kategoriat history={history} />}
                    />
                    <Route
                      exact
                      path="/kysymykset"
                      render={(history) => <Questions history={history} />}
                    />
                    <Route
                      exact
                      path="/kone"
                      render={(history) => <SipilaSettings history={history} />}
                    />
                    <Route
                      exact
                      path="/vastaukset"
                      render={(history) => <EtsiVastaus history={history} />}
                    />
                    <Route
                      exact
                      path="/graaffit"
                      render={(history) => <NolansMap history={history} />}
                    />
                    <Route
                      exact
                      path="/login"
                      render={({ history }) => <Login history={history} />}
                    />
                    <Route
                      exact
                      path="/hajontakaavio"
                      render={({ history }) => <Dispersion history={history} />}
                    />
                    <Route
                      exact
                      path="/eu2019"
                      render={({ history }) => <Eu2019 history={history} />}
                    />
                    <Route
                      exact
                      path="/eurovaalit"
                      render={({ history }) => (
                        <EuroSettings history={history} />
                      )}
                    />
                    <Route
                      exact
                      path="/puolueet"
                      render={({ history }) => (
                        <PartiesHome history={history} />
                      )}
                    />
                    <Route
                      exact
                      path="/kulmunivssaarikko"
                      render={({ history }) => <HeadsUpYle history={history} />}
                    />
                    <Route
                      exact
                      path="/addSpeak"
                      render={({ history }) => <AddSpeak history={history} />}
                    />
                    <Route
                      exact
                      path="/speaks"
                      render={({ history }) => <Speaks history={history} />}
                    />
                    <Route
                      exact
                      path="/kuntavaalit2021"
                      render={(history) => (
                        <RegionalMachineMenu history={history} />
                      )}
                    />

                    {window.localStorage.getItem("loggedUser") && (
                      <div>
                        <Route
                          path="/lisaa"
                          render={({ history }) => (
                            <HtmlForm history={history} />
                          )}
                        />
                        <Route
                          path="/lisaaHelsinki"
                          render={({ history }) => (
                            <HelsinkiForm history={history} />
                          )}
                        />
                        <Route
                          path="/kuntaLista"
                          render={({ history }) => (
                            <RegionalQuestions history={history} />
                          )}
                        />
                        <Route
                          path="/allMarins"
                          render={({ history }) => (
                            <MarinQuestions history={history} />
                          )}
                        />
                      </div>
                    )}
                    <Route
                      exact
                      path="/kysymykset/:id"
                      render={({ match }) => <Question id={match.params.id} />}
                    />
                    <Route
                      exact
                      path="/regionalQuestions/:id"
                      render={({ match }) => (
                        <RegionalQuestion id={match.params.id} />
                      )}
                    />
                    <Route
                      exact
                      path="/speaks/:id"
                      render={({ match }) => (
                        <Speak speakId={match.params.id} />
                      )}
                    />
                    <Route
                      exact
                      path="/keskustelu/:id"
                      render={({ match }) => (
                        <SpeakExpoler speakId={match.params.id} />
                      )}
                    />
                    <Route
                      exact
                      path="/addWithVaski"
                      render={({ match }) => (
                        <AddWithVaskiId id={match.params.id} />
                      )}
                    />
                    <Route
                      exact
                      path="/kategoriat/:id"
                      render={({ match }) => (
                        <Kategoria
                          kategoria={this.kategoriaById(match.params.id)}
                          kysymykset={this.props.kysymykset}
                        />
                      )}
                    />
                  </div>
                  <div className="footer" id="footer">
                    <div className="footer-left">Vaalikausikone RY</div>
                    <div className="footer-right">
                      <a
                        href="https://twitter.com/vaalikausikone"
                        target="_blank"
                      >
                        Twitter
                      </a>
                      <span style={{ marginLeft: "1em", marginRight: "1em" }}>
                        |
                      </span>
                      <a
                        href="https://www.facebook.com/vaalikausikone/"
                        target="_blank"
                      >
                        Facebook
                      </a>
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

const mapStateToProps = (state) => ({
  user: state.user,
  kysymykset: state.kysymykset,
  kategoriat: state.kategoriat,
  ylenKysymykset: state.ylenKysymykset,
});

export default connect(mapStateToProps, {
  getKysymykset,
  getKategoriat,
  getYlenKysymykset,
  getYle2019,
})(App);
