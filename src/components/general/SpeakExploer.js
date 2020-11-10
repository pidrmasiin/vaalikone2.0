import React from 'react';
import ReactTextTransition, { presets } from "react-text-transition";
import speakService from '../../services/speak';

class SpeakExplorer extends React.Component {
    state = {
    }

    componentDidMount = async () => {
        let speak = {}
        if (this.props.speakId) {
            speak = await speakService.getOne(this.props.speakId)
        } else {
            const all = await speakService.getAll()
            speak = all.sort(function(a,b){
                return new Date(b.createdAt) - new Date(a.createdAt);
              })[0]
        }

        const speakerIndex = Math.floor(Math.random() * speak.data.length)
        const speakIndex = Math.floor(Math.random() * speak.data[speakerIndex].speaks.length)
        this.setState({speak, speakerIndex, speakIndex})
        let intervalId = setInterval(() => {
            const speakerIndex = Math.floor(Math.random() * this.state.speak.data.length)
            this.setState({
              speakerIndex,
              speakIndex: Math.floor(Math.random() * this.state.speak.data[speakerIndex].speaks.length)
            });
          }, 15000);
        
        this.setState({ intervalId: intervalId })
    }

    componentWillUnmount(){
        clearInterval(this.state.intervalId)
    }


    render() {
        const personSpeak =  this.state.speak ? this.state.speak.data[this.state.speakerIndex] : {}
        const detail = personSpeak.party ? personSpeak.party : personSpeak.status
        const nameParty = this.state.speak && `${personSpeak.first} ${personSpeak.last} (${detail})`
        
      return (
        <div>
            {!this.state.speak
            ?  <h3>Haetaan dataa</h3>
            :<div style={{padding: '2em', paddingTop: '1em'}}>
                <h3>
                    <a href={this.state.speak.url} target="_blank">{this.state.speak.explainQuestion}</a>
                </h3>
                <h4 style={{color: 'grey'}}>Satunnainen puheenvuoro</h4>
                <section>
                    <h4>
                        {nameParty.split('').map((n, i) => (
                        <span key={i}>
                            <ReactTextTransition
                                text={n}
                                delay={i * 100}
                                inline
                                /> </span>
                        ))}
                    </h4>
                    <span>
                        {this.state.speak.data[this.state.speakerIndex].speaks[this.state.speakIndex]}
                    </span>
                </section>
            </div>
        }
        </div>

      );
    }
}

export default SpeakExplorer