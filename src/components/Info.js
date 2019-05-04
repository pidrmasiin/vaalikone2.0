import React from 'react';

class Info extends React.Component {
  render() {
    return(
        <div>
            <h2>Tietoa vaalikausikoneesta</h2>
            Vaalikausikonetta on työstetty kolmen yhteiskuntatieteilijän voimin. Palvelun
            moottorina toimii yleinen mielenkiinto politiikkaa ja demokratiaa kohtaan. 
            <br />
            <br />
            Vaalikausikoneella ei ole kytköksiä poliittisiin puolueisiin tai järjestöihin
            eikä mikään taho tue vaalikausikoneen toimintaa taloudellisesti.
            <br />
            <br />
            Jos sinulla on kehitysideoita tai haluat kysyä vaalikausikoneesta jotakin,
            voit lähettää sähköpostia osoitteeseen: <i>info@vaalikausikone.fi</i>
            <br />
            <br />
            <b>Tekijät</b>
            <br/>
            Petteri Pääkkönen
            <br />
            Jari Hartzell
            <br />
            Joonas Hihnala
            <br />
            <br />
        </div>
    )
  }
}

export default Info