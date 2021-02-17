import React from 'react';
import _ from 'lodash'
import { Input } from 'semantic-ui-react'
import { members } from '../members/members.js'


class HelsinkiForm extends React.Component {
    state = {
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

    render() {
        console.log(this.state);
        
        return(
            <div>
                <h1>Lisää kysymyksiä Helsinkikoneeseen</h1>
                <Input type="text" label='Kysymys' className="form-control" name="question" />
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
            </div>

        )
    }
}

export default HelsinkiForm