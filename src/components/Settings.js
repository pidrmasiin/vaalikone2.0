import React from 'react'
import { Button, Checkbox } from 'semantic-ui-react'
import Machine from './Machine'

class Settings extends React.Component {
    state = {
      renderMachine: false,
      hotQuestions: false,
    }


    handleHotquestions = () => {
      this.setState({
        hotQuestions: !this.state.hotQuestions,
      })
    }

    renderMachine = () => {
      this.setState({
        renderMachine: true,
      })
    }

    render() {
      if (this.state.renderMachine) {
        return (
          <Machine />
        )
      }
      return (
        <div>
          <h1>Valitse sinua kiinnostavat aihealueet</h1>
          <p>Voit myös valita vaalikauden
            polttavat kysymykset.
          </p>
          <Checkbox
            style={{ padding: '1em', marginBottom: '1em', background: 'lightblue' }}
            toggle
            label="Polttavat puheenaiheet"
            checked={this.state.hotQuestions}
            onChange={() => this.handleHotquestions()}
          />
          <br />
          <Button size="big" inverted color="blue" onClick={() => this.renderMachine()}>Vaalikoneeseen</Button>
        </div>
      )
    }
}

export default Settings
