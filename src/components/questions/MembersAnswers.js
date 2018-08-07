import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

class Members extends React.Component {
  state = {
    edustajat: [],
  }
  componentWillMount = () => {
    console.log('edustajat', this.props)
    const edustajat = this.props.edustajat.map(x => ({
      nimi: x.nimi.split('/')[0],
      puolue: this.parseParties(x.nimi.split('/')[1]),
      kanta: x.kanta,
    }))
    const out = edustajat.filter(x => x.puolue === this.props.puolue)
    this.setState({
      edustajat: out,
    })
  }

 parseParties = (party) => {
   let puolue = party
   switch (party) {
     case 'kesk':
       puolue = 'Keskustan eduskuntaryhmä'
       break
     case 'ps':
       puolue = 'Perussuomalaisten eduskuntaryhmä'
       break
     case 'kok':
       puolue = 'Kansallisen kokoomuksen eduskuntaryhmä'
       break
     case 'sd':
       puolue = 'Sosialidemokraattinen eduskuntaryhmä'
       break
     case 'vihr':
       puolue = 'Vihreä eduskuntaryhmä'
       break
     case 'vas':
       puolue = 'Vasemmistoliiton eduskuntaryhmä'
       break
     case 'r':
       puolue = 'Ruotsalainen eduskuntaryhmä'
       break
     case 'kd':
       puolue = 'Kristillisdemokraattinen eduskuntaryhmä'
       break
     default:
       break
   }
   return puolue
 }

 color = (jaa) => {
   if (jaa === 'Jaa') {
     return '#e6ffe6'
   } if (jaa === 'Ei') {
     return '#ffcccc'
   }
   return null
 }

 render() {
   return (
     <div>
       <h2>{this.props.puolue}</h2>
       <Table celled>
         <Table.Header>
           <Table.Row>
             <Table.HeaderCell>Nimi</Table.HeaderCell>
             <Table.HeaderCell>Kanta</Table.HeaderCell>
           </Table.Row>
         </Table.Header>
         <Table.Body>
           {this.state.edustajat.map(x => (
             <Table.Row key={x.nimi}>
               <Table.Cell>{x.nimi}</Table.Cell>
               <Table.Cell style={{
                      background:
                        this.color(x.kanta),
                      }}
               >{x.kanta}
               </Table.Cell>
             </Table.Row>
               ))}
         </Table.Body>
       </Table>
     </div>
   )
 }
}

const mapStateToProps = state => ({
  kysymykset: state.kysymykset,
});
export default connect(
  mapStateToProps,
  null,
)(Members);
