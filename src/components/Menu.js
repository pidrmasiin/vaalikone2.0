import React from 'react';
import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import '../App.css'

ReactGA.initialize('UA-137723152-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class Menu extends React.Component {
  render() {
    return(
    <div style={{textAlign: 'center', paddingLeft: '0.8em'}}>
     <Card.Group centered>
        <Link to="/eurovaalit" style={{margin: "1em"}}>
        <Card>
            <Image height='200em' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/1280px-Flag_of_Europe.svg.png' />
            <Card.Content>
            <Card.Header>Euroopan Unioni</Card.Header>
            <Card.Meta>
                <span className='date'>2014-2019</span>
            </Card.Meta>
            <Card.Description>
            Eurovaalikausikoneesta löydät Euroopan parlamentin kauden 2014-2019 keskeisiä kysymyksiä.
            </Card.Description>
            </Card.Content>
        </Card>
        </Link>
        <Link to="/" style={{margin:"1em"}}>
        <Card>
            <Image height='200em' src='https://i.imgur.com/tQ6HhoS.png' />
            <Card.Content>
            <Card.Header>Eduskunta</Card.Header>
            <Card.Meta>
                <span className='date'>2015-2019</span>
            </Card.Meta>
            <Card.Description>
            Kauden 2015-2019 vaalikausikoneesta löydät Sipilän hallituksen ajamia asioita.
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

export default Menu