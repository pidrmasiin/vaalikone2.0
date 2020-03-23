import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Button } from 'semantic-ui-react';
import speakService from '../../../services/speak';
import AddSpeak from './AddSpeak';

const linkStyle = {
  color: 'black',
  fontSize: 14,
  fontWeight: 'normal',
};

class Speaks extends React.Component {
    state = {
    }

    componentDidMount = async () => {
        const speak = await speakService.getOne(this.props.speakId)
        this.setState({speak})
        document.getElementById('speakHtml').innerHTML = speak.html
    }

    render() {
        
      return (
        <div>
          {this.state.speak && <AddSpeak speak={this.state.speak} />}
          <div id='speakHtml'></div>
          <pre>
          {JSON.stringify(this.state.speak, undefined, 2)}
          </pre>
        </div>
      );
    }
}

export default Speaks