import React from 'react'
import { connect } from 'react-redux';
import { Accordion, Icon, Checkbox } from 'semantic-ui-react'
import Machine from './Machine'

class Settings extends React.Component {
    state = {
      renderMachine: false,
      hotQuestions: true,
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
            <h1>Asetukset</h1>
            <p>
              Oletuksena sinulle valitaan 20 kysymystä
              polttavien aiheiden joukosta. Halutessasi voit
              muuttaa kysymysten määrää ja valita sinua kiinnostavat
              kategoriat.
            </p>
            <Accordion style={{paddingTop: "1em", paddingBottom:"1em"}}>
              <Accordion.Title active={!this.state.hotQuestions} onClick={this.handleHotquestions}>
                <Icon name='dropdown' />
                <b>Valitsen itse kategoriat </b>
              </Accordion.Title>
              <Accordion.Content active={!this.state.hotQuestions} style={{marginLeft: "2em"}}>
                <div>
                  {this.props.kategoriat.map(kateg => 
                    <Checkbox
                      key={kateg.id}
                      label={{ children: kateg.nimi }} 
                      style={{padding: "0.8em"}}
                      checked={this.state.categories.includes(kateg.nimi)}
                      onChange={() => this.handleCategories(kateg.nimi)} />
                    )}
                </div>
              </Accordion.Content>
            </Accordion>
          <br />
          <button className="button" onClick={() => this.renderMachine()}>Aloita</button>
      </div>
      )
    }
}

const mapStateToProps = state => ({
  kategoriat: state.kategoriat,
});

export default connect(mapStateToProps)(Settings);
