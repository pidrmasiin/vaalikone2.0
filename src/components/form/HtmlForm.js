import React from 'react';
import { Button, Checkbox, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import FormInput from './FormInput'
import TextArea from './TextArea'
import { htmlEdustajat, htmlPuolueet } from '../../reducers/htmlReducer'
import { addPuolueet, addDetails, addEdustajat, addKategoriat } from '../../reducers/kysymysReducer'
import { notifyCreation } from '../../reducers/notifyReducer'
import Notification from '../Notification'
import kysymysService from './../../services/kysymys'
import { addYlePuolueet, getYlenKysymykset } from '../../reducers/ylenKysymyksetReducer';

class HtmlForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vastaus: '',
    };
  }
  componentWillMount = async () => {
    if (!this.props.addYlePuolueet.edustajat
      && this.props.kysymykset[0]) {
      const nimet = this.props.kysymykset[0].edustajat.map(x => x.nimi)
      await this.props.getYlenKysymykset()
      setTimeout(() => {
        this.props.addYlePuolueet(nimet, this.props.ylenKysymykset.data)
      }, 1000);
    } else {
      window.location.assign('/')
    }
  }
  onSubmit = async (e) => {
    this.handleDetails(e)
    await this.handleHtml(e)
    this.handlePuolueet()
    this.handleEdustajat()
    this.addKatet(e)
    if (this.props.notify !== 'Tapahtui virhe') {
      try {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        kysymysService.setToken(JSON.parse(loggedUserJSON).token)
        await kysymysService.addKysymys(this.props.kysymys)
        this.props.history.push('/')
      } catch (exception) {
        this.props.notifyCreation('Tapahtui virhe', 5)
      }
    }
  }

  handlePuolueet = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(this.props.html.puolueet, 'text/html');
    const puolueet = []
    if (this.props.html.puolueet !== '') {
      // eslint-disable-next-line
      const rows = doc.getElementsByTagName('TBODY')[0].rows;
      for (let i = 1; i < rows.length; i = i + 1) {
        const puolue = {
          nimi: rows[i].cells[0].innerHTML,
          jaa: Number(rows[i].cells[1].innerHTML.replace(/\s/g, '')),
          ei: Number(rows[i].cells[2].innerHTML.replace(/\s/g, '')),
          tyhjia: Number(rows[i].cells[3].innerHTML.replace(/\s/g, '')),
        };
        puolue.kanta = Object.keys(puolue).reduce((a, b) => (puolue[a] > puolue[b] ? a : b));
        puolue.poissa = Number(rows[i].cells[4].innerHTML.replace(/\s/g, ''))
        puolue.yhteensa = Number(rows[i].cells[5].innerHTML.replace(/\s/g, ''));
        if (puolueet.filter(p => p.nimi === puolue.nimi).length === 0) {
          puolueet.push(puolue)
        }
      }
    }
    if (puolueet.length > 5 && puolueet.length < 20) {
      this.props.notifyCreation('Kannat lisätty', 5)
      this.props.addPuolueet(puolueet)
    } else {
      console.log('puolueet')
      this.props.notifyCreation('Tapahtui virhe', 5)
    }
  }

  handleEdustajat = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(this.props.html.edustajat, 'text/html');
    const edustajat = []
    if (this.props.html.edustajat !== '') {
      // eslint-disable-next-line
      const rows = doc.getElementsByTagName('TBODY')[0].rows 
      for (let i = 1; i < rows.length; i = i + 1) {
        const edustaja = {
          nimi: rows[i].cells[0].innerHTML.replace(/\s/g, ''),
          kanta: rows[i].cells[1].innerHTML.replace(/\s/g, ''),

        };
        if (edustajat.filter(p => p.nimi === edustaja.nimi).length === 0) {
          edustajat.push(edustaja)
        }
      }
    } if (edustajat.length > 190 && edustajat.length < 201) {
      this.props.notifyCreation('Kannat lisätty', 5)
      this.props.addEdustajat(edustajat)
    } else {
      console.log('edustajat')
      this.props.notifyCreation('Tapahtui virhe', 5)
    }
  }

  handleHtml = (e) => {
    e.preventDefault()
    const edustajat = e.target.htmlEdustajat.value
    this.props.htmlEdustajat(edustajat)
    const puolueet = e.target.htmlPuolueet.value
    this.props.htmlPuolueet(puolueet)
    e.target.htmlPuolueet.value = ''
    e.target.htmlEdustajat.value = ''
  }

  handleDetails = (e) => {
    e.preventDefault()
    const details = {
      url: e.target.url.value,
      selitys: e.target.selitys.value,
      kysymys: e.target.kysymys.value,
      vuosi: e.target.vuosi.value,
      vastaus: this.state.vastaus,
    }
    this.props.addDetails(details)
    e.target.url.value = ''
    e.target.selitys.value = ''
    e.target.kysymys.value = ''
    e.target.vuosi.value = ''
  }


  addKatet = () => {
    // eslint-disable-line no-use-before-define
    const kategoriat = []
    this.props.kategoriat.map(k => (document.getElementById(k.nimi).checked
      ? kategoriat.push(k) : null))
    const idt = kategoriat.map(k => k.id)
    this.props.addKategoriat(idt)
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
  }
  render() {
    /*eslint-disable */
   const values = this.props.ylenKysymykset.kysymykset.map(x => x = { text: x, value: x })
   /* eslint-enable */
    return (
      <div className="container">
        <form onSubmit={this.onSubmit} id="htmlform">
          <h2>Lisää kysymys</h2>
          <FormInput label="Kirjoita alle äänestyksen kohteen oleva kysymys" placeholder="kysymys" name="kysymys" />
          <FormInput label="Tapahtuma vuosi" placeholder="2018" name="vuosi" />
          <FormInput label="Linkki edukunnan sivuille" placeholder="url" name="url" />
          <TextArea label="Tarkempi kuvaus kysymyksestä" placeholder="selitys" name="selitys" />
          <b>Kategoriat</b>
          <br />
          {this.props.kategoriat.map(k =>
            (<Checkbox
              key={k.nimi}
              label={k.nimi}
              name="kategoriat"
              id={k.nimi}
            />))}
          <br />
          <br />
          <b>Valitse osuvin kysymys ylen vaalikoneesta</b>
          <Dropdown type="text" name="vastaus" placeholder="Valitse kysymys" onChange={this.handleChange.bind(this)} fluid search selection options={values} />
          <Notification />
          <TextArea
            placeholder="<table><tbody>...</tbody></table>"
            name="htmlPuolueet"
            label="Kopio alle eduskunnan sivuilta html-muotoinen table-elementti, jossa tiedot äänestyksen tuloksista eduskuntaryhmittäin."
          />
          <br />
          <TextArea
            placeholder="<table><tbody>...</tbody></table>"
            name="htmlEdustajat"
            label="Kopio alle eduskunnan sivuilta html-muotoinen table-elementti, jossa tiedot äänestyksen tuloksista edustajittain."
          />
          <br />

          <p><Button positive type="submit" className="fluid ui button">create</Button></p>
          <br />
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  html: state.html,
  kysymys: state.kysymys,
  kysymykset: state.kysymykset,
  notify: state.notify,
  kategoriat: state.kategoriat,
  ylenKysymykset: state.ylenKysymykset,
})

export default connect(
  mapStateToProps,
  {
    htmlEdustajat,
    htmlPuolueet,
    addPuolueet,
    addEdustajat,
    addDetails,
    notifyCreation,
    addKategoriat,
    addYlePuolueet,
    getYlenKysymykset,
  },
)(HtmlForm)
