import React from 'react';
import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import '../App.css'

ReactGA.initialize('UA-137723152-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class MachineMenu extends React.Component {
  render() {
    return(
    <div style={{textAlign: 'center', paddingLeft: '0.5em'}}>
     <Card.Group centered fluid>
        <Link to="/euroinfo" style={{margin: "1em"}}>
        <Card>
            <Card.Content>
            <Image centered height='150em' style={{margin: '1em', marginTop: '0em'}} src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/1280px-Flag_of_Europe.svg.png' />
            <Card.Header>Euroopan parlamentti</Card.Header>
            <Card.Meta>
                <span className='date'>2014-2019</span>
            </Card.Meta>
            <Card.Description>
            Eurovaalikausikoneesta löydät Euroopan parlamentissa kaudella 2014-2019 käsiteltyjä keskeisiä kysymyksiä.
            </Card.Description>
            </Card.Content>
        </Card>
        </Link>
        <Link to="/vaalikausi" style={{margin:"1em"}}>
        <Card>
            <Card.Content>
            <Image centered height='150em' src='https://i.imgur.com/tQ6HhoS.png' style={{background: '#004d99', margin: '1em', marginTop: '0em', padding: '1em', paddingRight: '2em', paddingLeft: '2em'}}/>
            <Card.Header>Suomen eduskunta</Card.Header>
            <Card.Meta>
                <span className='date'>2015-2019</span>
            </Card.Meta>
            <Card.Description>
            Kauden 2015-2019 vaalikausikoneesta löydät Sipilän hallituksen kaudella tehdyjä päätöksiä.
            </Card.Description>
            </Card.Content>
        </Card>
        </Link>
        <Link to="/kuntavaalit2021" style={{margin:"1em"}}>
        <Card>
            <Card.Content>
            <Image centered height='150em' src='https://i.imgur.com/tQ6HhoS.png' style={{background: '#004d99', margin: '1em', marginTop: '0em', padding: '1em', paddingRight: '2em', paddingLeft: '2em'}}/>
            <Card.Header>Kuntavaalit 2021</Card.Header>
            <Card.Meta>
                <span className='date'>2017-2021</span>
            </Card.Meta>
            <Card.Description>
            Kuntavaalikauden 2017-2021 kuntavaalikausikoneesta löydät Helsingin ja Tampereen kaupunginvaltuustojen päätöksiä.
            </Card.Description>
            </Card.Content>
        </Card>
        </Link>
    </Card.Group>
        <br />
        <br />
    </div>
    )
  }
}

export default MachineMenu