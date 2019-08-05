import React from 'react';
import Papa from 'papaparse'
import csv from './rahoitus.csv'
import { aliases } from '../../general/memberAliases'
import BubbleChart from './BubbleChart'

class  ParseFunds extends React.Component {
    constructor(props) {
        // Call super class
        super(props);
    this.update = this.update.bind(this);

  this.state = {
    parties: ["Kokoomus", "Perussuomalaiset", "RKP", "SDP", "Keskusta", "Kristillisdemokraatit","Vasemmistoliitto", "Vihreät", "Liike Nyt" ],
    done: false
    }
}

  componentDidMount = async () => {
    if (this.props.question) {
      await Papa.parse(csv, {
        header: true,
        download: true,
        complete: this.update
      })
    }
   
}


  update(results) {
      this.setState({data: results.data})
      this.handelFunds(results.data)
      
  }

  handelFunds = (results) => {
      // const q = this.props.questions.find(x => x.tunniste == 'heu')
      // const edustajat = this.props.question.edustajat.map(x => x.nimi.split('/')[0].replace("'", "").toLowerCase())
      const fundPersons = results.map(
          x => {return {
          nimi: (x["'Tuen saajan Sukunimi'"].substring(1, x["'Tuen saajan Sukunimi'"].length-1) +
          x["'Tuen saajan etunimet'"].substring(1, x["'Tuen saajan etunimet'"].length-1))
          .toLowerCase(), data: x}}
          )


      const parsedFunds = aliases.map(x => this.parseFunds(x, fundPersons.filter(y => y.nimi == x)))
      this.setState({funds: parsedFunds})
  }

  parseFunds = (member, memberFunds) => {
    const parsedFunds = memberFunds.map(x => this.selectFunder(x.data))
    let copy = parsedFunds
    let sum = 0
    copy.forEach(element => {
        sum = sum + parseInt(element.sum)
    });
    return { 
        alias: member,
        sum: sum,
        funds: parsedFunds,
        party: memberFunds.length > 0 ? this.removeDots(memberFunds[0].data["'Tuen saajan puolue'"]) : 'no money',
    }
  }

  selectFunder = (fund) => {
    if (fund["'Lainan nimi'"].length > 2) {
        return {funder: this.removeDots(fund["'Lainan nimi'"]), sum: this.removeDots(fund["'Tuen maara'"])}
    } if (fund["'Tukija'"].length > 2) {
        return {funder: this.removeDots(fund["'Tukija'"]), sum: this.removeDots(fund["'Tuen maara'"])}
    } else {
        return {funder: `${this.removeDots(fund["'Tukijan sukunimi'"])} ${this.removeDots(fund["'Tukijan etunimet'"])}`, sum: this.removeDots(fund["'Tuen maara'"])}
    }
  }

  removeDots = (str) => {
    str = str.replace(/\s/g, '')
    return str.substring(1, str.length-1)
  }

 
  render() {
    console.log('state', this.state);

      
    return(
   <div>
      {this.state.funds && <BubbleChart question={this.props.question} funds={this.state.funds}/>}
   </div>
    )
  }
}

export default ParseFunds