import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';
import { Button } from 'semantic-ui-react'

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = editorState => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command, editorState) {
    
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }


  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  convertRaw () {
    return convertToRaw(this.state.editorState.getCurrentContent());
  }

  render() {
    return (
        <div>
          <label><b>{this.props.label}</b></label>
          <br />
            <Button type='button' onClick={this._onBoldClick.bind(this)}>Maala teksit ja boldaa/unboldaa</Button>
        <div  style={{borderStyle: 'dotted'}}>
           
            <Editor
            handleKeyCommand={this.handleKeyCommand}
            editorState={this.state.editorState} onChange={this.onChange} />
            <input readOnly name={this.props.label == 'Selitys' ? 'muutos' : 'explain'} value={JSON.stringify(this.convertRaw())} hidden />
        </div>
        </div>

    );
  }
}

export default MyEditor