import React from 'react';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Tervetuloa</h2>
    Täällä voit tarkastella eduskunnan käyttäytymistä suhteessa omiin näkemyksiisi.
    <br />
    <br />
    Sivustolla on vaalikone, jonka avulla voit katsoa,
    mikä puolue on äänestänyt eduskunnassa lähimmäksi sinun näkemyksiäsi.
    <br />
    <br />
    Lisäksi voit tarkastella eduskuntaryhmien äänestykäyttäytymistä
    eduskunnassa sen jäsenten antamiin vastauksiin
    <a target="_blank" rel="noopener noreferrer" href="https://yle.fi/uutiset/3-7869597"> ylen vaalikoneessa.</a>
    <br />
    <Link
      to="/kone"
    >
      <br />
      <Button inverted color="blue">Vaalikoneeseen</Button>
    </Link>
  </div>
)

export default Home
