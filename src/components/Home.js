import React from 'react';
import { Accordion, Icon, Label, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import InfoBar from './general/InfoBar'
import NewestQuestions from './general/NewstQuestions'
import '../css/Home.css'


ReactGA.initialize('UA-137723152-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class Home extends React.Component {
  state = {
    activeIndex: false
  }

  render() {
    return(
    <div>
      <InfoBar 
        title="Vaalikausikoneen avulla voit seurata eduskunnan toimintaa"
        text="Vaalikausikone tarjoaa selkeän ja helpon mahdollisuuden seurata
        eduskunnan toimintaa. Palvelun avulla voit vertailla omia näkemyksiäsi
        eduskunnan puolueiden ja edustajien käyttäytymiseen. Lisäksi voit tarkastella,
        kuinka edustajien ja puolueen käyttäytyminen suhteutuu Ylen vuoden 2019 vaalikoneen 
        vastauksiin."
      />
      <NewestQuestions />
    </div>
    )
  }
}

export default Home