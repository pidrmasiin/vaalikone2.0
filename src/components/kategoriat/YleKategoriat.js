import React from 'react';
import { Item, Button, Divider } from 'semantic-ui-react'

class YleKategoriat extends React.Component {
    state={
      yle: false,
    }
    nayta = () => {
      this.setState({
        yle: !this.state.yle,
      })
    }
    render() {
      if (this.props.vastaukset) {
        return (
          <div>
            <Button size="mini" inverted color="blue" onClick={this.nayta}>
              <p>{!this.state.yle ?
                <b>Näytä </b> : <b>Piilota </b>
                  } kategoriaan linkitetyt ylen vaalikoneen kysymykset
              </p>
            </Button>
            {this.state.yle &&
            <div>
              {this.props.vastaukset.vastaukset.map(k =>
                (
                  <Item style={{ background: 'AliceBlue' }}key={k}>{k}<Divider /></Item>))}
              <Button basic onClick={this.nayta}>
                Piilota kategoriaan linkitetyt ylen koneen kysymykset
              </Button>
            </div>
                }
          </div>
        )
      }
      return (
        null
      )
    }
}

export default YleKategoriat
