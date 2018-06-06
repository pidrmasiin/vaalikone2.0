import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  componentDidMount = () => {
  }
  render() {
    if (this.props.notify === '') {
      return null
    }
    const divStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }
    if (this.props.notify === 'Tapahtui virhe') {
      divStyle.color = 'red'
    }
    return (
      <div style={divStyle}>
        <p>{this.props.notify}</p>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  notify: store.notify,
})

const ConnectedNotification = connect(mapStateToProps)(Notification)


export default ConnectedNotification
