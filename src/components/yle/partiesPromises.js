import React from 'react';
import { connect } from 'react-redux';
import { parseParties } from '../yle/ylesQuestionsCategories';
import { Table } from 'semantic-ui-react'
import PromiseShow from './promiseShow'


class Promises extends React.Component {
  render() {
    if (this.props.ylenKysymykset){
      console.log('this.props', this.props.ylenKysymykset);
      
      return <PromiseShow puolue={this.props.ylenKysymykset.puolueet.kd} />
    }
      console.log('asd', this.props.ylenKysymykset);
    const parties = this.props.ylenKysymykset.puolueet
    return (
      <div>
          {Object.keys(parties).map(key => 
          
         
            <Table>
                <Table.Header>{key}</Table.Header>
           
             
          {parties[key].map(edustaja => 
           <Table.Body>
           <Table.Row>
             <Table.Cell>
             {edustaja.etunimi} {edustaja.sukunimi}
             </Table.Cell>
             <Table.Cell>
                {edustaja['Vaalilupaus 1']}
             </Table.Cell>
           </Table.Row>
            </Table.Body>
          )} 
          </Table> 
        )}
          
      </div>
    )
  }
}
const mapStateToProps = state => ({
  ylenKysymykset: state.ylenKysymykset,
});

export default connect(mapStateToProps)(Promises);
