import React from 'react';
import { Item } from 'semantic-ui-react'
import Kysymys from '../kysymykset/Kysymys'
import YleKategoriat from './YleKategoriat';

class Kategoria extends React.Component {
  componentDidMount = () => {
  }
  render() {
    if (this.props.kategoria) {
      return (
        <div className="container">
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header><h1>{this.props.kategoria.nimi}</h1></Item.Header>
                <br />
                <YleKategoriat vastaukset={this.props.kategoria} />
              </Item.Content>
            </Item>
            {this.props.kategoria.kysymykset.map(k =>
        (
          <Item.Group key={k} divided unstackable>
            <Kysymys kysymys={this.props.kysymykset.find(x => x.id === k)} />
          </Item.Group>))}
          </Item.Group>
        </div>
      )
    }
    return (
      null
    )
  }
}


export default Kategoria
