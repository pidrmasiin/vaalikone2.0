import React from 'react';
import Papa from 'papaparse'
// import csv from './2019.csv'
import { connect } from 'react-redux';

// import { getYle2019 } from './../../../reducers/yle2019Reducer';
import yle2019 from './../../../services/yle2019';




class  XlsxParser extends React.Component {
    constructor(props) {
        // Call super class
        super(props);
    this.update = this.update.bind(this);

  this.state = {
    parties: ["Kokoomus", "Perussuomalaiset", "RKP", "SDP", "Keskusta", "Kristillisdemokraatit","Vasemmistoliitto", "Vihreät", "Liike Nyt" ],
    done: false,
    }
}

  componentDidMount = async () => {
    // this.props.getYle2019()
    
    // await Papa.parse(csv, {
    //     header: true,
    //     download: true,
    //     complete: this.update
    // })

  }

  update(results) {
      console.log('results', results);
      
      this.setState({
          members: results.data.slice(0, 200)
      })
    console.log(results);
    
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

 
  render() {
    
    if(this.state.members && this.state.questions) {
        const data = {members: this.state.members, parties: this.state.partiesData, headers: this.state.questions}
        
        // yle2019.addYle(data)

    }
      
    return(
   <div>moi</div>
    )
  }
}

const mapStateToProps = state => ({
    // yle2019: state.yle2019,
  });
  
  export default connect(
    mapStateToProps,
    {
        // getYle2019
      }
  )(XlsxParser);