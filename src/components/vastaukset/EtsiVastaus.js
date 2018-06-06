import React from 'react';
import { connect } from 'react-redux';
import { Container, Button, Input, Dropdown } from 'semantic-ui-react'
import Vastaukset from './Vastaukset';
import YleKannat from '../puolueidenKannat/YleKannat';
import { puolueet as valuesP } from './vastausKategoriat';
import { addEdustaja } from '../../reducers/edustajaReducer';
import { notifyCreation } from '../../reducers/notifyReducer'
import { addYlePuolueet, getYlenKysymykset } from '../../reducers/ylenKysymyksetReducer';

class EtsiVastaus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      etunimi: '',
      sukunimi: '',
      kysymys: '',
      puolue: '',
      kannat: false,
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
    etsi = () => {
      /*eslint-disable */
      
      try {
      const edustaja = this.props.ylenKysymykset.edustajat.find(x => x.sukunimi.toLowerCase().replace(/\s/g, '') === this.state.sukunimi.toLowerCase().replace(/\s/g, ''))
      /* eslint-enable */
        if (edustaja.etunimi.toLowerCase().replace(/\s/g, '') === this.state.etunimi.toLowerCase().replace(/\s/g, '')) {
          this.props.addEdustaja(edustaja)
        }
      } catch (err) {
        this.props.notifyCreation('Henkilöä ei löydy. Syötitkö sekä etu- että sukunimen?', 5)
      }
    }

    muodosta = () => {
      const puolueet = this.props.ylenKysymykset.puolueet
      if (this.state.puolue && this.state.kysymys) {
        /*eslint-disable */
        const kannat = puolueet[this.state.puolue].map(x => x =
          { edustaja: `${x.etunimi } ${x.sukunimi}`,
            kanta: x[this.state.kysymys]
          })
           /* eslint-enable */
        this.setState({
          kannat,
        })
      } else {
        this.props.notifyCreation('Tietoja ei löydy. Syötitkö sekä puolueen- että kysymyksen?', 5)
      }
    }

    handleChange(e, { name, value }) {
      // If you are using babel, you can use ES 6 dictionary syntax
      // let change = { [e.target.name] = e.target.value }
      if (name && value) {
        this.setState({ [name]: value })
      } else {
        const change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
      }
    }

    piilotaKannat = () => {
      this.setState({
        kannat: false,
      })
    }

    render() {
      /*eslint-disable */
      const values = this.props.ylenKysymykset.kysymykset.map(x => x = { text: x, value: x })
       /* eslint-enable */
      return (
        <Container>
          <div style={{ background: 'AliceBlue' }}>
            <h1>Mitä Kysyttiin?</h1>
            <p>
           Täältä löydät puolueiden vastaukset yksittäisiin kysymyksiin
            </p>
            <Dropdown type="text" name="puolue" placeholder="Valitse puolue" onChange={this.handleChange.bind(this)} fluid search selection options={valuesP} />
            <Dropdown type="text" name="kysymys" placeholder="Valitse kysymys" onChange={this.handleChange.bind(this)} fluid search selection options={values} />
            <br />
            <p><Button positive onClick={this.muodosta}>Tarkastele vastauksia</Button></p>
            { this.state.kannat &&
            <div>
              <Button onClick={this.piilotaKannat}>Piilota {this.state.puolue} kannat</Button>
              <YleKannat state={this.state} />
            </div>
            }
          </div>
          <br />
          <div style={{ background: 'AliceBlue' }}>
            <h1>Mitä tuli luvattua?</h1>
            <p>
          Täältä voit etsiä yksittäisten kansanedustajien/ehdokkaiden vastauksia ylen vaalikoneeseen
            </p>
            <Input type="text" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Juha" name="etunimi" label="Etunimi" />
            <Input type="text" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Sipilä" name="sukunimi" label="Sukunimi" />
            <br />
            <p><Button positive color="black" onClick={this.etsi}>Tarkastele vastauksia</Button></p>
            <br />
            <Vastaukset />
          </div>
        </Container>
      )
    }
}

const mapStateToProps = state => ({
  edustaja: state.edustaja,
  kysymykset: state.kysymykset,
  ylenKysymykset: state.ylenKysymykset,
});

export default connect(
  mapStateToProps,
  {
    addEdustaja,
    notifyCreation,
    addYlePuolueet,
    getYlenKysymykset,
  },
)(EtsiVastaus);
