import React from 'react';
import { connect } from 'react-redux';
import { Container, Button, Input, Dropdown } from 'semantic-ui-react'
import Vastaukset from './Answers';
import YleKannat from '../yleParties/YleKannat';
import { puolueet as valuesP } from './ylesQuestionsCategories';
import { addEdustaja } from '../../reducers/edustajaReducer';
import { notifyCreation } from '../../reducers/notifyReducer'
import { getYlenKysymykset  } from '../../reducers/ylenKysymyksetReducer';

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
    if (!this.props.ylenKysymykset.kysymykset) { window.location.assign('/') }
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
        const kannat = puolueet[this.state.puolue].map(x => (
          {
            edustaja: `${x.etunimi} ${x.sukunimi}`,
            kanta: x[this.state.kysymys],
          }))
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

    // tietokantaan = async () => {
    //   console.log('haloo', 
    //   this.props.kysymykset[0].edustajat.map(c => c.nimi));
      
      
    //   const yle = await this.props.getYlenKysymyksetFromCSV(
    //     this.props.kysymykset[0].edustajat.map(c => c.nimi));
      
    //     setTimeout(function(){ console.log('yle', yle);
    //      }, 5000);
     
    // }

    render() {
      if (this.props.ylenKysymykset) {
      /*eslint-disable */
      const values = this.props.ylenKysymykset.kysymykset.map(x => x = { text: x, value: x })
       /* eslint-enable */
        return (
          <Container>
            <h1>Mitä vuonna 2015 tuli luvattua?</h1>
            <p>Alta voit tarkastaa, mitä ylen vaalikoneessa kysyttiin vuonna 2015 ja miten puolueet ja edustajat kysymyksiin vastasivat.</p>
            <div style={{ background: 'AliceBlue'}}>
              <h2>Puolueet</h2>
              <p>
           Täältä löydät puolueiden vastaukset yksittäisiin ylen vaalikoneessa vuonna 2015 kysyttyihin kysymyksiin.
              </p>
              <Dropdown type="text" name="puolue" placeholder="Valitse puolue" onChange={this.handleChange.bind(this)} fluid search selection options={valuesP} />
              <Dropdown type="text" name="kysymys" placeholder="Valitse kysymys" onChange={this.handleChange.bind(this)} fluid search selection options={values} />
              <br />
              <p><Button positive onClick={this.muodosta}>Tarkastele vastauksia</Button></p>
              <br />
              { this.state.kannat &&
              <div>
                <Button onClick={this.piilotaKannat}>Piilota {this.state.puolue} kannat</Button>
                <YleKannat puolue={this.state.puolue} kysymys={this.state.kysymys} show />
              </div>
            }
            </div>
            <br />
            <div style={{ background: 'AliceBlue' }}>
              <h1>Edustajat</h1>
              <p>
          Täältä voit etsiä yksittäisten kansanedustajien/ehdokkaiden vastauksia ylen vaalikoneeseen,
              </p>
              <Input type="text" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Juha" name="etunimi" label="Etunimi" />
              <Input type="text" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Sipilä" name="sukunimi" label="Sukunimi" />
              <br />
              <br />
              <p><Button positive color="black" onClick={this.etsi}>Tarkastele vastauksia</Button></p>
              <br />
              <Vastaukset />
            </div>
          </Container>
        )
      }
      return null
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
    getYlenKysymykset
  },
)(EtsiVastaus);
