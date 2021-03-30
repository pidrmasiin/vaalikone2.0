import React from 'react';
import { Input, Button } from 'semantic-ui-react'
import kysymysService from './../../services/kysymys'

class AddWithVaskiId extends React.Component {
    state = {

    }
    onSubmit = async (e) => {
        this.setState({resp: false})
        
        try {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        kysymysService.setToken(JSON.parse(loggedUserJSON).token)
        const resp = await kysymysService.addSingleVaski(this.state.vaskiId)
        console.log('resp', resp);
        if (resp._id) {
          // window.location.assign('/kysymykset/' + resp._id)
          window.location.assign('/allMarins')

        } else {
          this.setState({resp: resp})
        }
        } catch (exception) {
        this.props.notifyCreation('Tapahtui virhe', 5)
        }
    }
  render() {
      console.log(this.state);
      
    return (
        <div>
            {this.state.resp && <p style={{color: 'red'}}>{this.state.resp}</p>}
            Taulu = SaliDBanestys
            <br/>
            Sarake = AanestysValtiopaivaasia --------- Arvo = HE 79/2020 vp
            <br/>

            (Sarake = AanestysOtsikko ----- Arvo = Hyväksyminen / hylkääminen )
            <br/>

            <a href="https://avoindata.eduskunta.fi/#/fi/dbsearch" target="_blank">VaskiData</a>
            <br/>
            <Input type="text" className="form-control" placeholder="VaskiID" name='vaskiId' onChange={e => this.setState({vaskiId: e.target.value})}/>
            <Button positive className="fluid ui button" onClick={this.onSubmit}>Lisää</Button>
        </div>

    );
  }
}

export default AddWithVaskiId