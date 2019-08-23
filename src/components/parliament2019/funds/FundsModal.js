import React from 'react';
import ParseFunds from './parseFundFile'
import { Modal, Message } from 'semantic-ui-react'
import InfoAccordion from '../../general/InfoAccordion';
import '../../../css/FundsModal.css'

class FundModal extends React.Component {
 
  render() {
    
    return(
    <Modal trigger={<button className='button'>Vaalirahoitus</button>} basic size='small'>
        <div className='funds-container'>
          <h3 className='funds-title'>Vaalirahoitus</h3>
         
          <InfoAccordion 
            title="Tietoja vaalirahoituksen jakautumisesta alla olevassa kysymyksessä.
            Valitsemalla puolueen näet edustajien rahoituksen lähteet." 
            text="Tarkastelussa on otettu huomioon vain ehdokkaiden saama vaalirahoitus. Näin siitä syystä,
            että puolueiden oma rahoitus kanavoituu piirijärjestöille. 
            Lisäksi rahoitus tulee piirijärjestöille usein säätiöiden ja yhdistysten kautta, jolloin lähteen selvittäminen on hankalampaa.
            Voit tarkastella ajantaistaista puoluerahoitusta vaalirahoitusvalvonnan sivuilta"
            endLink="https://www.vaalirahoitusvalvonta.fi/fi/index/puoluetukiilmoituksia/ilmoituslistaus/ajantasaisetilmoitukset.html"
            />
          <br/>
          <b>{this.props.question.kysymys}</b>
          <br/>
          <br/>
          <Message
            content='Huomaathan hallitus­­­­—oppositio -jakolinjan tarkastellessasi vaalirahoitusta'
            color='yellow'
          />
          <ParseFunds question={this.props.question} />
        </div>
      </Modal>
    )
  }
}

export default FundModal