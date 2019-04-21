import React from 'react';
import Machine from '../Machine';

class EuroSettings extends React.Component {

    render(){
    return (
    <Machine hots={true} selected_categories={[]} howMany={20}/>
    )
    }
}

export default EuroSettings