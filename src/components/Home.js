import React from 'react';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Tervetuloa</h1>
    <p style={{ fontSize: '1.5em' }}>
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
      <br />
      <Link
        to="/kone"
      >
        <br />
        <Button size="big" inverted color="blue">Vaalikausikoneeseen</Button>
      </Link>
      <Button size="big" inverted color="yellow" onClick={() => window.location.assign("/graaffit")}>Vaalikausigraaffit</Button>
    </p>
  </div>
)

export default Home
