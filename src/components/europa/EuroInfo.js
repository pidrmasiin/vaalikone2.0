import React from 'react';
import { Accordion, Icon, Label, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import '../../App.css'

ReactGA.initialize('UA-137723152-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class EuroInfo extends React.Component {
  state = {
    activeIndex: ""
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state
    return(
    <div>
      <h1>Tervetuloa</h1>
      Eurovaalikausikoneella selvität mikä puolue on äänestänyt Euroopan parlamentissa lähimmäksi omia näkemyksiäsi.
      <br/>
      <br/>

      Eurovaalikausikoneen kysymykset on valittu parlamentin äänestyksistä. Vastauksesi rinnastuvat puolueiden todelliseen äänestyskäyttäytymiseen.  
      <br/>
      <br/>
      Varsinainen vaalikone ei tarjoa mahdollisuutta yksittäisten meppien äänestyskäyttäytymisen tarkasteluun. Voit kuitenkin tarkastella
      eurovaalikoneesta löytyvien kysymysten vastauksia suomalaisten meppien osalta erillisessä osiossa.
      <br/>
      <br/>

      Kysymysten ja datan lähteenä toimii <a target="_blank" rel="noopener noreferrer" href="https://www.votewatch.eu">VoteWatch Europe AISBL</a> 
      <br/>
      <br/>
        <Link
          to="/eurovaalit"
        >
          <button className="button" style={{display: 'inline', marginBottom: '0.5em'}}>Eurovaalikausikone </button>
        </Link>
        <Link
          to="/suomalaiset"
        >
          <button className="button" style={{display: 'inline', marginBottom: '0.5em'}}>Meppien vastaukset</button>
        </Link>
        <br />
        <br />
    </div>
    )
  }
}

export default EuroInfo
