import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import '../App.css'

class Home extends React.Component {
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
      <p>
      Täällä voit tarkastella eduskunnan käyttäytymistä suhteessa omiin näkemyksiisi.
        <br />
        <br />
      Sivustolla on vaalikone, jonka avulla voit katsoa,
      mikä puolue on äänestänyt eduskunnassa lähimmäksi sinun näkemyksiäsi. Vaalikoneen kysymykset
      on otettu suoraan eduskunnan äänestyksistä, minkä vuoksi ne voivat tuntua vaikeilta.
      Näissä kysymyksissä on kuitenkin se etu, että vastaukset kuvaavat eduskuntaryhmien
      todellista käyttäytymistä sen sijaan, että tulos muodostuisi aiotun käyttäytymisen perusteella.
      Ennen vaaleja annetut lupaukset eivät siis vaikuta tämän vaalikoneen tuloksiin.
        <br />
        <br />
      Lisäksi vaalikone tarjoaa mahdollisuuden tarkastella eduskuntaryhmien äänestykäyttäytymistä
      eduskunnassa suhteessa
        <a target="_blank" rel="noopener noreferrer" href="https://yle.fi/uutiset/3-7869597"> ylen vaalikoneessa. </a>
      Vaalikoneen avulla voit siis arvioida myös sitä,
      kuinka hyvin ennen vaaleja annetut lupaukset ovat pitäneet.
      </p>
        <Link
          to="/kone"
        >
          <button className="button">Aloita</button>
        </Link>
        <button className="button" onClick={() => window.location.assign("/graaffit")}>Graaffit</button>
        <Accordion style={{paddingTop: "1em", paddingBottom:"1em"}}>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name='dropdown' />
            <b>Miksi puoleen valinta on tärkeitä?</b>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0} style={{marginLeft: "2em"}}>
            <p>
              Ryhmäkuri
            </p>
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
            <Icon name='dropdown' />
            <b>Kuinka poliittinen järjestelmä toimii?</b>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1} style={{marginLeft: "2em"}}>
            <p>
              Hallitus/oppositio
            </p>
          </Accordion.Content>
        </Accordion>
    </div>
    )
  }
}

export default Home
