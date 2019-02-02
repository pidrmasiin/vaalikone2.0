import React from 'react';
import { Button, Checkbox, Dropdown, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import FormInput from './FormInput'
import TextArea from './TextArea'
import { htmlEdustajat, htmlPuolueet } from '../../reducers/htmlReducer'
import { addPuolueet, addDetails, addEdustajat, addKategoriat } from '../../reducers/kysymysReducer'
import { notifyCreation } from '../../reducers/notifyReducer'
import Notification from '../Notification'
import kysymysService from './../../services/kysymys'
import { getYlenKysymykset } from '../../reducers/ylenKysymyksetReducer';

class HtmlForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vastaus: '',
      kysymyksenAsettelu: false,
      hot: false,
      jaaLeftist: '',
      jaaLiberal: '',
      green: ""
    };
  }
  componentWillMount = async () => {
    if (!this.props.ylenKysymykset.kysymykset) { window.location.assign('/') }
  }

  onSubmit = async (e) => {
    this.handleDetails(e)
    await this.handleHtml(e)
    this.handlePuolueet()
    this.handleEdustajat()
    this.addKatet(e)
    if (!this.props.notify.includes('ei ole validi')) {
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
    if (this.props.html.puolueet !== '' && doc.getElementsByTagName('TBODY')[0]) {
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
    } else {
      this.props.notifyCreation('Puolue html-elementti ei ole validi', 5)
    }
    if (puolueet.length > 5 && puolueet.length < 20) {
      this.props.notifyCreation('Kannat lisätty', 5)
      this.props.addPuolueet(puolueet)
    } else {
      this.props.notifyCreation('Puolue html-elementti ei ole validi', 5)
    }
  }

  handleEdustajat = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(this.props.html.edustajat, 'text/html');
    const edustajat = []
    if (this.props.html.edustajat !== '' && doc.getElementsByTagName('TBODY')[0]) {
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
    } else {
      this.props.notifyCreation('Edustajat html-elementti ei ole validi', 5)
    }
    
    if (edustajat.length > 180 && edustajat.length < 201) {
      this.props.notifyCreation('Kannat lisätty', 5)
      this.props.addEdustajat(edustajat)
    } else {
      this.props.notifyCreation('Edustajat html-elementti ei ole validi', 5)
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
      kysymyksenAsettelu: this.state.kysymyksenAsettelu,
      hot: this.state.hot,
    }
    if (typeof this.state.jaaLeftist === 'boolean') {
      details.jaaLeftist = this.state.jaaLeftist
    } if (typeof this.state.jaaLiberal === 'boolean') {
      details.jaaLiberal = this.state.jaaLiberal
    } if (typeof this.state.green === 'boolean') {
      details.green = this.state.green
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

  handleRistiriita() {
    this.setState({ kysymyksenAsettelu: !this.state.kysymyksenAsettelu })
  }

  handleHot() {
    this.setState({ hot: !this.state.hot })
  }

  handleJaaLiberal = (value) => {
    this.setState({
      jaaLiberal: value,
    });
  }

  handleJaaLeftist = (value) => {
    this.setState({
      jaaLeftist: value,
    });
  }

  handleGreen = (value) => {
    this.setState({
      green: value,
    });
  }

  disClick = (field) => {
    this.setState({
      [field]: ""
    })
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
          <Segment compact style={{ background: '#d4eff9' }}>
            <Checkbox toggle onChange={() => this.handleHot()} />
            Keskeinen kysymys tällä hallituskaudella
            <table>
              <tr>
                <td>
                <Checkbox
                  radio
                  name="liberalRadioGroup"
                  checked={this.state.jaaLiberal === true}
                  label="Jaa vastaus liberaali"
                  onChange={() => this.handleJaaLiberal(true)}
                  />
                  </td>
                  <td>
                  <Checkbox
                    radio
                    name="liberalRadioGroup"
                    checked={this.state.jaaLiberal === false}
                    label="Jaa vastaus konservatiivinen"
                    onChange={() => this.handleJaaLiberal(false)}
                  />
                  </td>
                  <td>
                  <Checkbox
                    radio
                    name="liberalRadioGroup"
                    checked={this.state.jaaLiberal === ""}
                    label="Ei sovi"
                    onChange={() => this.disClick("jaaLiberal")}
                  />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checkbox
                      radio
                      checked={this.state.jaaLeftist === true}
                      label="Jaa vastaus vasemmistolainen"
                      onChange={() => this.handleJaaLeftist(true)}
                    />
                    </td>
                    <td>
                    <Checkbox
                      radio
                      checked={this.state.jaaLeftist === false}
                      label="Jaa vastaus oikeistolainen"
                      onChange={() => this.handleJaaLeftist(false)}
                    />
                    </td>
                    <td>
                    <Checkbox
                      radio
                      checked={this.state.jaaLeftist === ""}
                      label="Ei sovi"
                      onChange={() => this.disClick("jaaLeftist")}
                    />
                    </td>

                </tr>
                 <tr>

                      <td>
                    <Checkbox
                      radio
                      checked={this.state.green === true}
                      label="Jaa vastaus vihreä"
                      onChange={() => this.handleGreen(true)}
                    />
                    </td>
                    <td>
                    <Checkbox
                      radio
                      checked={this.state.green === false}
                      label="Ei vastaus vihreä"
                      onChange={() => this.handleGreen(false)}
                    />
                    </td>
                    <td>
                    <Checkbox
                      radio
                      checked={this.state.green === ""}
                      label="Ei sovi"
                      onChange={() => this.disClick("green")}
                    />
                    </td>
                </tr>
              </table>
              
          </Segment>
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
          <Segment compact style={{ background: '#d4eff9' }}>
            <Checkbox toggle onChange={() => this.handleRistiriita()} />
            Ylen ja eduskunnan kysymyksenasettelu ristiriitainen
          </Segment>
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
    getYlenKysymykset,
  },
)(HtmlForm)
