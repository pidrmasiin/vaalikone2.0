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
      Vaalikausikoneella selvität mikä puolue on äänestänyt eduskunnassa lähimmäksi omia näkemyksiäsi.
      <br/>
      <br/>

      Vaalikausikoneen kysymykset on valittu eduskunnan täysistunnon äänestyksistä. Vastauksesi rinnastuvat puolueiden todelliseen äänestyskäyttäytymiseen. Puolueiden antamat lupaukset eivät vaikuta vaalikoneen tuloksiin.
      <br/>
      <br/>

      Vaalikausikoneessa voit myös verrata puolueiden äänestyskäyttäytymistä suhteessa edustajien Ylen vaalikoneessa antamiin vastauksiin. Voit siis arvioida, kuinka hyvin ennen vaaleja annetut lupaukset ovat pitäneet.
      <br/>
      <br/>

        <Link
          to="/kone"
        >
          <button className="button">Aloita</button>
        </Link>
        <Accordion style={{paddingTop: "1em", paddingBottom:"1em"}}>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name='dropdown' />
            <b>Miksi puoleen valinta on tärkeää?</b>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0} style={{marginLeft: "2em"}}>
            <p>
             Suomessa on käytössä avoin listavaali, jossa äänesi menee ensisijassa
             puolueelle. Edustajan valinnalla vaikutat lähinnä hänen sijaintiinsa puolueen 
             sisäisessä listassa. Mikäli edustajasi ei mene läpi, äänesi auttaa jotakin
             toista äänestämäsi puolueen ehdokasta. 
            </p>
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
            <Icon name='dropdown' />
            <b>Kuinka poliittinen järjestelmä toimii?</b>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1} style={{marginLeft: "2em"}}>
            <p>
            Eduskunnassa puolueen edustajat äänestävät hyvin yhtenäisesti johtuen 
            ryhmäkurista. Lisäksi useimmissa äänestyksissä hallituspuolueet  
            äänestävät hallitusohjelman mukaisesti ja oppositiopuoleet 
            vastustavat hallituksen esityksiä. Tämä näkyy vaalikausikoneen antamissa tuloksissa.
            </p>
          </Accordion.Content>
          <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
            <Icon name='dropdown' />
            <b>Yhteystiedot</b>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2} style={{marginLeft: "2em"}}>
            <p>
            Vaalikausikonetta on työstetty kolmen yhteiskuntatietelijän voimin.
            Jos sinulla on kehitysideoita tai haluat kysyä vaalikausikoneesta jotakin,
            voit lähettää sähköpostia osoitteeseen: <i>vaalikausikone@gmail.com</i>
            <br/><br/>
        
            <b>Tekijät</b>
            <br/>
            Petteri Pääkkönen
            <br />
            Jari Hartzell
            <br />
            Joonas Hihnala
            </p>
          </Accordion.Content>
        </Accordion>
    </div>
    )
  }
}

export default Home
