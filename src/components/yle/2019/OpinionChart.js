import React from 'react';
import { Loader, Dimmer, Dropdown } from 'semantic-ui-react'
import Papa from 'papaparse'
import csv from './avoin_2019.csv'
import {Pie} from 'react-chartjs-2';



class OpinionChart extends React.Component {
    constructor(props) {
        // Call super class
        super(props);
    this.update = this.update.bind(this);

  this.state = {
    parties: ["Kokoomus", "Suomen Kommunistinen Puolue", "Perussuomalaiset", "RKP", "Seitsemän tähden liike", "SDP", "Kansalaispuolue", "Kommunistinen Työväenpuolue", "Feministinen puolue", "Keskusta", "Kristillisdemokraatit", "Itsenäisyyspuolue", "Sitoutumaton", "Sininen tulevaisuus", "Vasemmistoliitto", "Suomen Kansa Ensin", "Vihreät", "Piraattipuolue", "Liberaalipuolue", "Eläinoikeuspuolue", "Liike Nyt", "Kansanliike Suomen Puolesta"],
    done: false,
    }
}

  componentDidMount = async () => {
    await Papa.parse(csv, {
        header: true,
        download: true,
        complete: this.update
    })

  }

  update(results) {
    const parties = this.state.parties
    const partiesData = {}
    parties.forEach(party => {
        partiesData[party] = results.data.filter(x => x['puolue'] === party)
    })
    results.data.forEach(x => {
        if(!parties.includes(x['puolue'])) {
            parties.push(x['puolue'])
        }
    })
    
    this.setState({
        partiesData,
        questions: results.meta.fields.filter(x => x != 'puolue' && x != 'vaalipiiri')
    })
}

    dataByParty = (party) => {
        let counts = {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0
        }
        if (!this.state.partiesData[party]){
            return false
        }

        const question = this.state.selectedQuestion
        let data = this.state.partiesData[party]
        data.forEach(x => {
            counts[x[question]] = counts[x[question]] + 1
        })
        return [counts['1'], counts['2'], counts['3'],counts['4'],counts['5']]
    }

    handleQuestion = (e, data) => {
        this.setState({selectedQuestion: data.value})
    }
  
  render() {
    const desktopStyle = window.innerWidth > 1100 ? { maxWidth: '600px',  margin: 'auto', width: '50%'} : {}
        
    if (!this.state.questions){
       return  (
        <Dimmer active>
            <Loader indeterminate>Preparing Files</Loader>
        </Dimmer>
       )

    }
    return(
    <div style={{minHeight:"800px"}}>
        <h1>Hajontakaavio</h1>
        Täällä voit tarkastella, kuinka eri puolueiden antamat vastaukset
        ovat Ylen vaalikonekysymyksissä hajonneet. 
        <br />
        <br />   Jos esimerkiksi jokin Ylen kysymyksistä on sinulle kynnyskysymys puolueen valinnassa, voit valita sen
        alla olevasta valikosta. Tämän jälkeen voit tarkistaa, kuinka yhtenäisesti eri puolueet
        ovat kysymykseen vastanneet.
        <br/>
        <br/>
        <Dropdown
            text='Valitse kysymys'
            selection
            fluid
            options={this.state.questions.map(x => {return {key: x, value: x, text: x}})}
            onChange={(e, data) => this.handleQuestion(e, data)}
        />
        <br/>
        <h3 style={{background: 'white', textAlign: 'center', padding: '1em', position: "-webkit-sticky", position: "sticky", top: "0"}}>{this.state.selectedQuestion}</h3>
     
        {this.state.selectedQuestion &&
            this.state.parties.map(party => 
                <div 
                key={party}
                style={{textAlign: 'center'}}
                >
                {party}
            <div style={desktopStyle}>
            <Pie
                data = {{
                    labels: [
                        'Varmasti eri mieltä (' + this.dataByParty(party)[0] +')',
                        'Eri mieltä (' + this.dataByParty(party)[1] +')',
                        'EOS (' + this.dataByParty(party)[2] +')',
                        'Samaa mieltä (' + this.dataByParty(party)[3] +')',
                        'Varmasti samaa mieltä (' + this.dataByParty(party)[4] +')'
                    ],
                    datasets: [{
                        data: this.dataByParty(party),
                        backgroundColor: [ "rgb(255, 51, 0)", "rgb(255, 183, 183)", "rgb(165, 165, 165)", "rgb(194, 240, 194)","rgb(51, 204, 51)"]
                    }
                    ],
                }}
                style={{margin: '1em'}}
            />
            </div>
            <hr style={{marginTop: '1em', marginBottom: '1em'}}/>
                </div>

             )
            }
    </div>
    )
  }
}

export default OpinionChart