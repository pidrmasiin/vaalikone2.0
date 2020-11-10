import React from 'react';
import { connect } from 'react-redux';
import { getYle2019 } from './../../../reducers/yle2019Reducer';

import { Table, Popup, Button, Dimmer, Loader } from 'semantic-ui-react'

class HeadsUpYle extends React.Component {
  state = {
    activeIndex: false
  }

  componentDidMount = () => {
    this.props.getYle2019()
  }

  opinonsHelper = (yleOpionNumber) => {
    let opinion = 'poissa/tyhjiä'
    switch (yleOpionNumber) {
      case '1':
        opinion = 'ei (varma)'
        break
      case '2':
        opinion = 'ei (ehkä)'
        break
      case '4':
        opinion = 'jaa (ehkä)'
        break
      case '5':
        opinion = 'jaa (varma)'
        break
      default:
        break
    }
    return opinion
  }

  backgroundColor = (ans) => {
    let opinion = 'poissa/tyhjiä'
    switch (ans) {
      case 'ei (varma)':
        opinion = '#ff4d4d'
        break
      case 'ei (ehkä)':
        opinion = '#ffcccc'
        break
      case 'jaa (ehkä)':
        opinion = '#c1f0c1'
        break
      case 'jaa (varma)':
        opinion = '#5cd65c'
        break
      default:
        break
    }
    return opinion
  }

  render() {
    if(this.props.yle.members.length > 0 && !this.state.saarikko) {

      const saarikko = this.props.yle.members.find(x => x.sukunimi == 'Saarikko')
      const kulmuni = this.props.yle.members.find(x => x.sukunimi == 'Kulmuni')

      const questions = this.props.yle.headers.slice(4,33).map(x => x = { text: x, value: x })

      this.setState({
        saarikko,
        kulmuni,
        questions
      })
    }

    

    if (this.state.saarikko) {
      return(
        <div>
          <h1>Saarikko vs. Kulmuni</h1>
          <p>Erot Ylen vaalikonevastauksissa</p>
          <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Kysymys</Table.HeaderCell>
              <Table.HeaderCell style={{width: '8em'}}>Saarikko</Table.HeaderCell>
              <Table.HeaderCell style={{width: '8em'}}>Kulmuni</Table.HeaderCell>
              <Table.HeaderCell>Saarikon selitys</Table.HeaderCell>
              <Table.HeaderCell>Kulmunin selitys</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
            {this.state.questions.map( question => 
              <Table.Row key={question.text}>
                <Table.Cell>{question.text}</Table.Cell>
                <Table.Cell style={{background: this.backgroundColor(this.opinonsHelper(this.state.saarikko[question.text]))}}>
                  {this.opinonsHelper(this.state.saarikko[question.text])}
                </Table.Cell>
                <Table.Cell style={{background: this.backgroundColor(this.opinonsHelper(this.state.kulmuni[question.text]))}}>
                  {this.opinonsHelper(this.state.kulmuni[question.text])}
                </Table.Cell>
                <Table.Cell>
                  <Popup 
                    content={this.state.saarikko['Explain ' + question.text]} 
                    trigger={<Button icon='talk' 
                      color={this.opinonsHelper(this.state.saarikko[question.text]).includes('jaa') ? 'green' : 'red'}
                    />}
                    size={window.innerWidth > 600 ? 'huge' : 'small'}
                    position={window.innerWidth > 600 ? 'left center' : 'right center'}
                    pinned
                    on='click'
                    wide='very'
                  />
                </Table.Cell>
                <Table.Cell>
                  <Popup 
                    content={this.state.kulmuni['Explain ' + question.text]} 
                    trigger={
                      <Button icon='talk' 
                        color={this.opinonsHelper(this.state.kulmuni[question.text]).includes('jaa') ? 'green' : 'red'}
                        />
                      }
                    size={window.innerWidth > 600 ? 'huge' : 'small'}
                    pinned
                    on='click'
                    position={window.innerWidth > 600 ? 'left center' : 'right center'}
                    wide='very'
                  />
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
      )

    }
   
    return(
      <Dimmer active style={{height: '20em'}}>
        <Loader indeterminate>
          Ladataan ylen dataa. Odota hetki niin pääset tarkastelamaan
          Keskustan jännittävän puheenjohtajavaalin
          kärkiehdokkaiden eroja.
        </Loader>
      </Dimmer>
    )
  }
}

const mapStateToProps = state => ({
    yle: state.yle2019
  });
  
  export default connect(
    mapStateToProps,  {
      getYle2019
    })(HeadsUpYle);