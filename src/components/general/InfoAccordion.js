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
            <span className='info-title' >
                {this.props.title}
                <Icon name='dropdown' className='info-dropdown'/>
            </span>
            </Accordion.Title>
            <Accordion.Content active={this.state.activeInfo} style={{marginLeft: "2em"}}>
            <p>
                {this.props.text}
            </p>
            </Accordion.Content>
        </Accordion>
    )
  }
}

export default InfoAccordion