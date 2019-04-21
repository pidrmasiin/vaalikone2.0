import _ from 'lodash'
import React from 'react';
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'



class EuroAnswers extends React.Component {
  state = {
    monta: this.props.kayttaja.kysymykset.length,
    show: false,
    order: _.orderBy(this.props.kayttaja.euroParties, ['aanet'], ['desc'])
  }

  render() {
    return(
    <Table id="table" textAlign='center'>
       <Table.Body>
         {this.state.order.map(x =>
               <Table.Row key={x.name}>
                 <Table.Cell>
                   <img src={x.url} alt={x.name} height="80em" width="120em" />
                 </Table.Cell>
                 <Table.Cell>
                   <p>{x.name}</p>
                 </Table.Cell>
                 <Table.Cell>{Math.round((x.aanet / this.state.monta) * 100)} %</Table.Cell>
            </Table.Row>
        )}
        </Table.Body>
    </Table>
    )
  }
}
const mapStateToProps = state => ({
    kayttaja: state.kayttaja,
  })
  
  export default connect(
    mapStateToProps,
  )(EuroAnswers)