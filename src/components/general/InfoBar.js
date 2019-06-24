import React from 'react';
import { Accordion, Icon, Segment } from 'semantic-ui-react'
import '../../css/Home.css'
import InfoAccordion from './InfoAccordion';

class InfoBar extends React.Component {
  state = {
    activeIndex: false
  }

  render() {
    return(
        <Segment className="home-info">
            <InfoAccordion 
              text={this.props.text}
              title={this.props.title}
              iconSize='big'
            />
        </Segment>
    )
  }
}

export default InfoBar