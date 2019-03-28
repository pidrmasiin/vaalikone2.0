import React from 'react';
import { Table, Modal, Button, Pagination, Icon } from 'semantic-ui-react'

class AnswersPopup extends React.Component {
    state = { 
        activePage: 1,
        totalPages: Math.round(this.props.answers.length / 10),
        open: false
    }


    handleInputChange = (e, { value }) => this.setState({ activePage: value })

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    opinion = (opinion) => {
        if (opinion === 'jokseenkin samaa mieltä' || opinion === 'täysin samaa mieltä') {
          return 'jaa'
        } if  (opinion === 'jokseenkin eri mieltä' || opinion === 'täysin eri mieltä') {
          return 'ei'
        }
        return opinion
    }

    color = (jaa) => {
        if (jaa === 'jaa') {
          return '#e6ffe6'
        } if (jaa === 'ei') {
          return '#ffcccc'
        }
        return null
      }

      open = () => this.setState({ open: true })
      close = () => this.setState({ open: false })

  render() {
    const activePage = this.state.activePage
    const sliceIndex = (activePage-1)*10
    const open = this.state.open

    if (!this.props.answers) {
      return <div>Ei sopivaa kysymystä</div>
    }
    
    return(
        <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size='tiny'
        trigger={
          <Button primary icon>
            <Icon name='add' />
          </Button>
        }
      >
        <Modal.Header>
        <h2>{this.props.puolue}</h2>
        </Modal.Header>
        <Modal.Content>
        <h4>{this.props.question.slice(4)}</h4>
        <Pagination
            activePage={activePage}
            onPageChange={this.handlePaginationChange}
            totalPages={this.state.totalPages}
            firstItem={null}
            lastItem={null}
            prevItem={null}
            nextItem={null}
          /> 
        <Table celled striped id="table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell positive>Edustaja</Table.HeaderCell>
              <Table.HeaderCell>
              Kanta
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.answers.slice(sliceIndex, sliceIndex+10).map(x =>
          (
            <Table.Row key={x.edustaja}>
              <Table.Cell> {x.edustaja}</Table.Cell>
              <Table.Cell style={{background: this.color(this.opinion(x.kanta))}}>{this.opinion(x.kanta)}</Table.Cell>
            </Table.Row>))}
          </Table.Body>
        </Table>
        </Modal.Content>
        </Modal>
    )
  }
}

export default AnswersPopup
