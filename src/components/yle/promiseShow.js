import React from 'react'
import { Button, Icon, Modal, Transition } from 'semantic-ui-react'

class PromiseShow extends React.Component {
  state = {
    index: 0,
    visible: true,
    animation: "fly right",
    open: false
    }

  next = (previous) => {
    const plus = previous ? -1 : 1

    if (!this.props.puolue[this.state.index + plus] ){
      this.setState({
        index: 0,
        open: false
      })
    } else {
      this.setState({
        visible: false,
        animation: previous ? "fly right" : "fly left"
      })

      setTimeout(() => {
        this.setState({
          visible: true,
          index: this.state.index + plus,
        })
      }, 400);

      setTimeout(() => {
        this.setState({
          animation: "scale"
        })
      }, 450);
    }
  }


toggleModal = () => {
  this.setState({
    open: !this.state.open,
    index: 0
  })
}

  
  render () {

    const desktop = window.innerWidth > 1000

    if(!this.props.puolue || !this.props.puolue[this.state.index]) {
      return <div>Done/ odoto hetki tieotkanta yhteytä</div>
    }

    const member = this.props.puolue[this.state.index]
    return (
      <Transition duration={400} animation={this.state.animation} visible={this.state.visible}>

      <Modal trigger={<Button onClick={() => this.toggleModal()} fluid color="blue" style={{marginRight: "5em",  textAlign: 'center'}} circular>{desktop ? 'Selaa lupauksia' : <Icon name="comment" />}</Button>} open={this.state.open} size='tiny'>
      <Modal.Content>
        <Modal.Header> <Icon name="close" size='large' style={{right: "2%", position: 'absolute'}} onClick={() => this.toggleModal()} /> </Modal.Header>
        <Modal.Description  style={{ padding: "2em", fontSize: "1.2em"}}>
            <div>
            <h1 style={{textAlign:'center'}}>{member.etunimi} {member.sukunimi}</h1>
            <p><b>1.</b> {member["Vaalilupaus 1"]}</p>
           
            <p><b>2.</b> {member["Vaalilupaus 2"]}
            </p>
            <p><b>3.</b> {member["Vaalilupaus 3"]}</p>
            </div>
        </Modal.Description>
        <br/>
          <Icon  onClick={() => this.next(true)} color='blue' size='large' circular name="arrow left" />
          <Icon name="arrow right"  style={{right: "2%", position: 'absolute'}} onClick={() => this.next()} color='blue' size='large' circular />
      </Modal.Content>
    </Modal>
    </Transition>

    )
  }
   
  }

export default PromiseShow
