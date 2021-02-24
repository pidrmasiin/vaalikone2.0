import React from 'react';
import _ from 'lodash'
import { Input, Checkbox, Button } from 'semantic-ui-react'
import { members } from '../members/members.js'
import { partiesCount } from '../members/partiesInfo.js'
import regionalQuestionService from '../../../services/regionalQuestion.js';


class HelsinkiForm extends React.Component {
    state = {
        city: 'helsinki',
        parties: [

        ]
    }

    handleChange = (e, opinion) => {
        const trimmed = e.target.value.split(',').map(x => x.trim().toLowerCase())
        
        
        let selected = members.filter(memb => trimmed.includes(memb.name.trim().toLowerCase()))

        const trimmedMembers = members.map(x => x.name.trim().toLowerCase())
        let out = trimmed.filter(memb => !trimmedMembers.includes(memb))

        console.log(selected);
        

        let partiesOpinons = _.chain(selected).groupBy("party").value()
        const opinionForm = {
            total: selected.length,
            parties: partiesOpinons,
            all: selected,
            out: out
        }

        switch(opinion) {
            case 'no':
              this.setState({no: opinionForm})
              break;
            case 'yes':
              this.setState({yes: opinionForm})
              break;
            case 'empty':
              this.setState({empty: opinionForm})
              break;
            case 'out':
              this.setState({out: opinionForm})
              break;
            default:
              break;
          }
    }

    change = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleBooleans = (name, value) => {
        this.setState({
          [name]: value,
        });
      }
    
      disClick = (field) => {
        this.setState({
          [field]: null
        })
      }

      handlecity = (city) => {
        this.setState({
          city
        });
      }

      formatParties = () => {
        let parties = {}
        console.log(partiesCount);
        
        Object.keys(partiesCount).forEach(party => {
            console.log(party);
            
            if(party !== 'total') {
                parties[party] = {
                    jaa: 0,
                    ei: 0,
                    tyhjia: 0,
                    poissa: 0
                }
                if(this.state.yes.parties[party]) {
                    parties[party].jaa =  this.state.yes.parties[party].length
                }
                if(this.state.no.parties[party]) {
                    parties[party].ei = this.state.no.parties[party].length
                }
                if(this.state.empty && this.state.empty.parties[party]) {
                    parties[party].tyhjia = this.state.empty.parties[party].length
                }
                if(this.state.out && this.state.out.parties[party]) {
                    parties[party].poissa = this.state.out.parties[party].length
                }
                parties[party].kanta = Object.keys(parties[party]).reduce((a, b) => (parties[party][a] > parties[party][b] ? a : b));
                parties[party].name = party
                
              }

        })
        return parties
      }

      onSubmit = async (e) => {
        const parties = this.formatParties()
        let body = this.state
        body.parties = parties
        try {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        regionalQuestionService.setToken(JSON.parse(loggedUserJSON).token)
        await regionalQuestionService.addRegionalQuestion(body)
        // this.props.history.push('/')
        } catch (exception) {
        this.props.notifyCreation('Tapahtui virhe', 5)
        }
      }
    

    render() {
        console.log(this.state);
        
        return(
            <div>
                <h1>Lisää kysymyksiä Helsinkikoneeseen</h1>
                <Input type="textbox" label='Kysymys' className="form-control" name="question" onChange={(e) => this.change(e)} />
                <br/>
                <br/>
                <Input type="text" label='Linkki tarkempiin tietoihin' className="form-control" name="url" onChange={(e) => this.change(e)} />
                <br/>
                <br/>
                <Input type="text" label='Kyllä äänet' className="form-control" onChange={(e) => this.handleChange(e, 'yes')} />
                <br/>
                <br/>
                <Input type="text" label='Ei äänet' className="form-control"  onChange={(e) => this.handleChange(e, 'no')} />
                <br/>
                <br/>
                <Input type="text" label='Tyhjät äänet' className="form-control" onChange={(e) => this.handleChange(e, 'empty')} />
                <br/>
                <br/>
                <Input type="text" label='Poissa' className="form-control"  onChange={(e) => this.handleChange(e, 'out')} />
                <br/>
                <br/>
                <Checkbox
                  radio
                  name="jaaLiberal"
                  checked={this.state.jaaLiberal === true}
                  label="Jaa vastaus liberaali"
                  onChange={() => this.handleBooleans('jaaLiberal', true)}
                  />
                  <Checkbox
                    radio
                    name="jaaLiberal"
                    checked={this.state.jaaLiberal === false}
                    label="Jaa vastaus konservatiivinen"
                    onChange={() => this.handleBooleans('jaaLiberal', false)}
                  />
                  <Checkbox
                    radio
                    name="jaaLiberal"
                    checked={this.state.jaaLiberal === ""}
                    label="Ei sovi"
                    onChange={() => this.disClick("jaaLiberal")}
                  />
                  <br/>
                  <br/>
                  <Checkbox
                  radio
                  name="jaaLeftist"
                  checked={this.state.jaaLeftist === true}
                  label="Jaa vastaus vasemmistolainen"
                  onChange={() => this.handleBooleans('jaaLeftist', true)}
                  />
                  <Checkbox
                    radio
                    name="jaaLeftist"
                    checked={this.state.jaaLeftist === false}
                    label="Jaa vastaus oikeistolainen"
                    onChange={() => this.handleBooleans('jaaLeftist', false)}
                  />
                  <Checkbox
                    radio
                    name="jaaLeftist"
                    checked={this.state.jaaLeftist === ""}
                    label="Ei sovi"
                    onChange={() => this.disClick("jaaLeftist")}
                  />
                  <br/>
                  <br/>
                  <Checkbox
                  radio
                  name="jaaGreen"
                  checked={this.state.jaaGreen === true}
                  label="Jaa vastaus vihreä"
                  onChange={() => this.handleBooleans('jaaGreen', true)}
                  />
                  <Checkbox
                    radio
                    name="jaaGreen"
                    checked={this.state.jaaGreen === false}
                    label="Ei vastaus vihreä"
                    onChange={() => this.handleBooleans('jaaGreen', false)}
                  />
                  <Checkbox
                    radio
                    name="jaaGreen"
                    checked={this.state.jaaGreen === ""}
                    label="Ei sovi"
                    onChange={() => this.disClick("jaaGreen")}
                  />

                <br/>
                  <br/>
                  <Checkbox
                  radio
                  name="city"
                  checked={this.state.city === 'helsinki'}
                  label="Helsinki"
                  onChange={() => this.handlecity('helsinki')}
                  />
                  <Checkbox
                    radio
                    name="city"
                    checked={this.state.city === 'tampere'}
                    label="Tampere"
                    onChange={() => this.handlecity('tampere')}
                  />
                 
                <p><Button positive className="fluid ui button" onClick={() => this.onSubmit()}>create</Button></p>

            </div>

        )
    }
}

export default HelsinkiForm