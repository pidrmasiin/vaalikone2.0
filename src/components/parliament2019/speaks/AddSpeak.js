import React from 'react';
import { Input, TextArea, Button, Dropdown } from 'semantic-ui-react'
import kysymysService from '../../../services/kysymys'
import speakService from '../../../services/speak'


class AddSpeak extends React.Component {
    state = {
        explainQuestion: '',
        speakHtml: '',
        data: [],
        questions: [],
        question: null
    }

    componentWillMount = async () => {
        const questions = await kysymysService.getAll()
        this.setState({questions})
    }

    handleChange = (e) => {
        console.log('e', e);
        
        this.setState({[e.target.name]: e.target.value })
    }

    handleQuestionChange(e, { name, value }) {
        this.setState({ [name]: value })
    }

    saveSpeak = async () => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(this.state.speakHtml, 'text/html');
        console.log('doc', doc);
        const questionExplain = doc.getElementById('KohtaNimeke').children[0].innerHTML

        let data = []
        const speaks = doc.getElementsByClassName("PuheenvuoroToimenpide")
        for (let i = 0; i < speaks.length; i = i + 1) {
            const htmlSpeak = parser.parseFromString( speaks[i].innerHTML, 'text/html');
            let speaksOutsArray = []
            const speaksOut = htmlSpeak.getElementsByClassName('KappaleKooste')
            for (let i = 0; i < speaksOut.length; i = i + 1) {
                speaksOutsArray.push(speaksOut[i].innerHTML);
            }
            let speak = {
                first: htmlSpeak.getElementById("EtuNimi").innerHTML,
                last: htmlSpeak.getElementsByClassName("SukuNimi")[0].innerHTML,
                party: htmlSpeak.getElementById("LisatietoTeksti") && htmlSpeak.getElementById("LisatietoTeksti").innerHTML,
                status: htmlSpeak.getElementById("AsemaTeksti") && htmlSpeak.getElementById("AsemaTeksti").innerHTML,
                speaks: speaksOutsArray
            }
            
            data.push(speak)
        }

        const speakToAdd = {
            question: this.state.question,
            explainQuestion: questionExplain,
            details: '',
            data: data
        }
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        speakService.setToken(JSON.parse(loggedUserJSON).token)
        await speakService.addSpeak(speakToAdd)

    }
    
    render() {
        console.log('e', this.state);
        let questions = this.state.questions.map(x => x = { value: x.id, text: x.kysymys})
        questions.push({text: 'Ei sovi', value: null})
        
        return(
            <div>
                <h2>Lisää keskustelu</h2>

                <Input placeholder='Avaa aihe' name='explainQuestion' onChange={(e) => this.handleChange(e)} />

                <Dropdown 
                    type="text" 
                    name="question" 
                    placeholder="Valitse kysymys" 
                    onChange={this.handleQuestionChange.bind(this)} 
                    fluid
                    search 
                    selection 
                    options={questions} 
                />

                <div style={{marginTop: '2em'}}>
                    <TextArea placeholder='Html element' name='speakHtml' onChange={(e) => this.handleChange(e)} />
                </div>
                <Button onClick={() => this.saveSpeak()}>Lisää keskustelu</Button>
            </div>
        )
    }
}

export default AddSpeak