import React from 'react'
import { Image, Radio, Grid } from 'semantic-ui-react'
import RegionalMachine from './RegionalMachine'
import ReactGA from 'react-ga';

ReactGA.initialize('UA-137723152-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class RegionalMachineMenu extends React.Component {
    state = {
      region: 'Helsinki'
    }


    renderMachine = () => {
      this.setState({
        renderMachine: true,
      })
    }

    handleRegion = (region) => {
      this.setState({
        region
      })
    }

    render() {
      if (this.state.renderMachine) {
        return (
          <RegionalMachine region={this.state.region} />
        )
      }
      return (
        <div>
                  <div>
                  <Image
                    size={window.innerWidth > 800 ? 'medium' : 'tiny'}
                    floated='right'
                    verticalAlign='top'
                    src="https://www.kuntavaalit.fi/sites/default/files/styles/medium_cropped/public/public-image-bank/Kuntavaalit-logo_valk_tunnus.png?itok=eCRxDW-d"
                    />
                    <h1>Kuntavaalit</h1>

                    <p>
                    Kuntavaalikausikone tarjoaa helpon väylän valtuustoaloitteiden tarkasteluun.
                    Valitse siis alta valtuusto ja selvitä, mitä kaupunginvaltuustoissa tapahtuu.
                    </p>
                    <h3>Valitse valtuusto</h3>
                    
                    {['Helsinki', 'Tampere'].map(region => 
                      <Radio
                      key={region}
                      label={{ children: region }} 
                      style={{padding: "1em"}}
                      checked={this.state.region == region}
                      onChange={() => this.handleRegion(region)} />
                      )}
                      <br/>
                    <button className="button" style={{marginBottom: "1em", marginTop: "1em", width: '15em'}} onClick={() => this.renderMachine()}>Aloita</button>
                    <hr style={{marginTop: "2em"}} />
                    <h3>Tietoa koneesta</h3>
                   <p>
                      Vaalikausikoneissa puoleita ja ryhmiä käsitellään aina kokonaisuutena.
                      Tulosten kannalta tämä tarkoittaa sitä, että puolueen katsotaan kussakin kysymyksessä edustavan 100 prosenttisesti enemmistönsä linjaa.
                    </p>
                    <p>
                      Koneen tuloksissa saataa myös olla puutteita johtuen siitä, ettei kaikkia valtuutettuja ja varavaltuutettuja ole välttämättä tunnistettu.
                      Kysymyksien selkiyttämisen vuoksi alkuperäistä äänestyskysymystä on usein myös muotoiltu uudelleen.
                    </p>
                   
                  </div>
                  <h4>Miksi vain muutama valtuusto?</h4>
                  <p>
                    Valitettavasti joidenkin kaupunkien (ainakin Turun ja Oulun) osalta aloitteiden käsittelystä valtuustoissa ei löytynyt äänestystietoja.
                    Aloitteet onkin luultavasti käsitelty kaupungin hallituksessa tai lautakunnissa.
                    <br/>
                    <br/>
                    Tämä ei tietysti sinänsä ole huono asia. Ongelmalliseksi asia kuitenkin muuttui, kun yritti seurata aloitteiden kulkua läpi hallintoprosessin:
                    tämä kun ei onnistunut. Aloitteet siis kyllä löytyivät, mutta niiden kohtalo jäi mysteeriksi.
                    <br/>
                    <br/>
                    Vaalikausikone RY toivookin, että kunnan- ja kaunpungivaltuustoiden aloitteiden käsittelyprosessi olisi yleisesti nykyistä läpinäkyvämpää siten,
                    että eri aloitteiden kohtaloa voisi seurata vaivattomasti. 
                   
                  </p>
      </div>
      )
    }
}

export default RegionalMachineMenu;