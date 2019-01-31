import React from 'react'
import { connect } from 'react-redux';
import { Button, Checkbox } from 'semantic-ui-react'
import Machine from './Machine'

class Settings extends React.Component {
    state = {
      renderMachine: false,
      hotQuestions: false,
      categories: []
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

    handleCategories = (categ) => {
      if (this.state.categories.includes(categ)) {
        this.setState({
          categories: this.state.categories.filter(cat => cat !== categ)
        })
      } else {
        const copy = this.state.categories
        copy.push(categ)
        this.setState({
          categories: copy
        })
      }
    }

    render() {
      if (this.state.renderMachine) {
        return (
          <Machine hots={this.state.hotQuestions} selected_categories={this.state.categories}/>
        )
      }
      return (
        <div>
          <h1>Valitse sinua kiinnostavat aihealueet</h1>
          <p>Voit myös valita vaalikauden
            polttavat kysymykset.
          </p>
          <Checkbox
            style={{ padding: '1em', marginBottom: '1em' }}
            toggle
            label="Polttavat puheenaiheet"
            checked={this.state.hotQuestions}
            onChange={() => this.handleHotquestions()}
          />
          {!this.state.hotQuestions &&
          <div style={{padding: "2em", margin: "2em", borderColor: "#004d99", borderStyle: "solid"}}>
            <h3>Kategoriat</h3>
            {this.props.kategoriat.map(kateg => 
              <Checkbox
                key={kateg.id}
                label={{ children: kateg.nimi }} 
                style={{padding: "0.8em"}}
                checked={this.state.categories.includes(kateg.nimi)}
                onChange={() => this.handleCategories(kateg.nimi)} />
              )}
          </div>
          }
          <br />
          <Button size="big" inverted color="blue" onClick={() => this.renderMachine()}>Vaalikausikoneeseen</Button>
        </div>
      )
    }
}

const mapStateToProps = state => ({
  kategoriat: state.kategoriat,
});

export default connect(mapStateToProps)(Settings);
