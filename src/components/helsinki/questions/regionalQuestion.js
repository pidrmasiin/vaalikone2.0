import React from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Button, TextArea, Input } from 'semantic-ui-react';
import regionalQuestionService from '../../../services/regionalQuestion';


class RegionalQuestion extends React.Component {
    state = {

    }

    componentWillMount = async () => {
      const q = await regionalQuestionService.getRegionalQuestion(this.props.id);
      this.setState({q})
    }

    change = (e) => {
      let question = this.state.q

      question[e.target.name] = e.target.value
      this.setState({q: question})
    }

    handleBooleans = (name, value) => {
      let question = this.state.q

      question[name] = value
      this.setState({
        q: question
      });
    }

    disClick = (field) => {
      let question = this.state.q

      question[field] = null
      this.setState({
        q: question
      })
    }

    onSubmit = async (e) => {
      try {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      regionalQuestionService.setToken(JSON.parse(loggedUserJSON).token)
      await regionalQuestionService.modifyRegionalQuestion(this.state.q.id, this.state.q)
      window.location.assign(window.location.origin + '/kuntaLista')
      } catch (exception) {
        console.log('VIRHE');
        
      }
    }

    render() {
      if(this.state.q) {
        const question = this.state.q
        return (
          <div>
              <TextArea type="textbox" style={{ minHeight: 200, minWidth: 500 }} className="form-control" name="question" value={this.state.q.question} onChange={(e) => this.change(e)} />
              <br/>
              <br/>
              <label>Selitys</label>
              <br/>
              <TextArea type="textbox" className="form-control" style={{ minHeight: 200, minWidth: 500 }} name="explain" value={this.state.q.explain}  onChange={(e) => this.change(e)} />
              <br/>
              <br/>
              <Input type="text" label='Linkki tarkempiin tietoihin' className="form-control" name="url" value={this.state.q.url} onChange={(e) => this.change(e)} />
              <br/>
              <br/>
              <Checkbox
                radio
                name="jaaLiberal"
                checked={this.state.q.jaaLiberal === true}
                label="Jaa vastaus liberaali"
                onChange={() => this.handleBooleans('jaaLiberal', true)}
                />
                <Checkbox
                  radio
                  name="jaaLiberal"
                  checked={this.state.q.jaaLiberal === false}
                  label="Jaa vastaus konservatiivinen"
                  onChange={() => this.handleBooleans('jaaLiberal', false)}
                />
                <Checkbox
                  radio
                  name="jaaLiberal"
                  checked={this.state.q.jaaLiberal === ""}
                  label="Ei sovi"
                  onChange={() => this.disClick("jaaLiberal")}
                />
                <br/>
                <br/>
                <Checkbox
                radio
                name="jaaLeftist"
                checked={this.state.q.jaaLeftist === true}
                label="Jaa vastaus vasemmistolainen"
                onChange={() => this.handleBooleans('jaaLeftist', true)}
                />
                <Checkbox
                  radio
                  name="jaaLeftist"
                  checked={this.state.q.jaaLeftist === false}
                  label="Jaa vastaus oikeistolainen"
                  onChange={() => this.handleBooleans('jaaLeftist', false)}
                />
                <Checkbox
                  radio
                  name="jaaLeftist"
                  checked={this.state.q.jaaLeftist === ""}
                  label="Ei sovi"
                  onChange={() => this.disClick("jaaLeftist")}
                />
                <br/>
                <br/>
                <Checkbox
                radio
                name="jaaGreen"
                checked={this.state.q.jaaGreen === true}
                label="Jaa vastaus vihreä"
                onChange={() => this.handleBooleans('jaaGreen', true)}
                />
                <Checkbox
                  radio
                  name="jaaGreen"
                  checked={this.state.q.jaaGreen === false}
                  label="Ei vastaus vihreä"
                  onChange={() => this.handleBooleans('jaaGreen', false)}
                />
                <Checkbox
                  radio
                  name="jaaGreen"
                  checked={this.state.q.jaaGreen === ""}
                  label="Ei sovi"
                  onChange={() => this.disClick("jaaGreen")}
                />

              <br/>
                <br/>
              
                
              <p><Button positive className="fluid ui button" onClick={() => this.onSubmit()}>create</Button></p>
          </div>
        );
      }
      return (
        <div>
        </div>
      );
    }
}

export default RegionalQuestion;
