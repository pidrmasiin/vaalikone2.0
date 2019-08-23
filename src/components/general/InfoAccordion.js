import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react'
import '../../css/Home.css'

class InfoAccordion extends React.Component {
  state = {
    activeIndex: false
  }

  render() {
    return(
        <Accordion>
            <Accordion.Title className="info-accordion-title" active={this.state.activeInfo} onClick={() => this.setState({activeInfo: !this.state.activeInfo})}>
            {this.props.iconSize &&
                <div className="info-icon">
                    <Icon name="info circle" size={this.props.iconSize} />
                </div>
            }
            <span className='info-title' style={this.props.endLink && {color: 'white'}} >
                {this.props.title}
                <Icon name='dropdown' className='info-dropdown'/>
            </span>
            </Accordion.Title>
            <Accordion.Content active={this.state.activeInfo} style={{marginLeft: "2em"}}>
            {this.props.question &&
            <div>
              <b>{this.props.question.tunniste}</b>
              <br/>
              <a href={this.props.question.url} target="_blank">Linkki eduskunnan sivuille</a>
              <br/>
              <b>Selitys</b>
            </div>
            }
            <p>
                {this.props.text} {this.props.endLink && <a href={this.props.endLink} target="_blank">tästä</a>}
            </p>
            </Accordion.Content>
        </Accordion>
    )
  }
}

export default InfoAccordion