import React from 'react'
import { connect } from 'react-redux';
import { Accordion, Icon, Checkbox } from 'semantic-ui-react'
import Machine from './Machine'

class Settings extends React.Component {
    state = {
      renderMachine: false,
      hotQuestions: true,
      howMany: false,
      categories: [],
      number: 20
    }


    handleHotquestions = () => {
      this.setState({
        hotQuestions: !this.state.hotQuestions,
      })
    }

    showHowMany = () => {
      this.setState({
        howMany: !this.state.howMany,
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

    handleNumber = (number) => {
      this.setState({
        number
      })
    }

    render() {
      if (this.state.renderMachine) {
        return (
          <Machine hots={false} selected_categories={this.state.categories} howMany={this.state.number}/>
        )
      }
      return (
        <div>
            <h1>Asetukset</h1>
            <p>
              Oletuksena sinulle arvotaan 20 kysymystä. Halutessasi voit
              valita kysymysten määrän ja  sinua kiinnostavat kategoriat.
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
              <Accordion.Title active={this.state.howMany} onClick={this.showHowMany}>
                <Icon name='dropdown' />
                <b>Valitsen itse kysymysten määrän </b>
              </Accordion.Title>
              <Accordion.Content active={this.state.howMany} style={{marginLeft: "2em"}}>
                <div>
                  {[10, 20, 30, this.props.kysymykset.length].map(number => 
                    <Checkbox
                      key={number}
                      label={{ children: number }} 
                      style={{padding: "0.8em"}}
                      checked={this.state.number == number}
                      onChange={() => this.handleNumber(number)} />
                    )}
                </div>
              </Accordion.Content>
            </Accordion>
          <br />
          <button className="button" style={{marginBottom: "1em"}} onClick={() => this.renderMachine()}>Aloita</button>
      </div>
      )
    }
}

const mapStateToProps = state => ({
  kategoriat: state.kategoriat,
  kysymykset: state.kysymykset
});

export default connect(mapStateToProps)(Settings);
