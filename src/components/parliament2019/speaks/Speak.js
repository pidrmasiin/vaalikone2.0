import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Button } from 'semantic-ui-react';
import speakService from '../../../services/speak';

const linkStyle = {
  color: 'black',
  fontSize: 14,
  fontWeight: 'normal',
};

class Speaks extends React.Component {
    state = {
        speak: {
            explainQuestion: ''
        }
    }

    componentDidMount = async () => {
        const speak = await speakService.getOne(this.props.speakId)
        this.setState({speak})
    }

    render() {
        console.log('state', this.statestate);
        
      return (
        <div>
            {this.state.speak.explainQuestion}
        </div>
      );
    }
}

export default Speaks