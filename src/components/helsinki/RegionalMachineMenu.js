import React from 'react'
import { Image, Checkbox, Grid } from 'semantic-ui-react'
import RegionalMachine from './RegionalMachine'

class RegionalMachineMenu extends React.Component {
    state = {
      region: 'Helsinki'
    }


    renderMachine = () => {
      this.setState({
        renderMachine: true,
      })
    }

    handleRegion = (region) => {
      this.setState({
        region
      })
    }

    render() {
      if (this.state.renderMachine) {
        return (
          <RegionalMachine region={this.state.region} />
        )
      }
      return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={9}>
                    <h1>Kuntavaalit</h1>
                        <p>
                        Valitse alta valtuusto, jossa tehtyihin aloitteisiin haluat vastata.
                        </p>
                            <div>
                            {['Helsinki', 'Tampere'].map(region => 
                                <Checkbox
                                key={region}
                                label={{ children: region }} 
                                style={{padding: "1em"}}
                                checked={this.state.region == region}
                                onChange={() => this.handleRegion(region)} />
                                )}
                            </div>
                    <button className="button" style={{marginBottom: "1em", marginTop: "2em", width: '15em'}} onClick={() => this.renderMachine()}>Aloita</button>

                    </Grid.Column>
                    <Grid.Column width={7}>
                        <Image
                            style={{marginTop: '1em'}}
                            src="https://www.kuntavaalit.fi/sites/default/files/styles/medium_cropped/public/public-image-bank/Kuntavaalit-logo_valk_tunnus.png?itok=eCRxDW-d"
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
      </div>
      )
    }
}

export default RegionalMachineMenu;