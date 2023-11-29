import React, { Component } from 'react'
import NavbarComponent from '../../components/homeComponents/navbar/NavbarComponent'
import ScreenContainerComponent from '../../components/general/screen-container/ScreenContainerComponent'
import IndexFooter from '../../components/footer/indexFooter'
import VerificationComponent from '../../components/register/VerificationComponent'
import './verification-index.scooped.scss'
import VerificationLabelsComponent from '../../components/register/VerificationLabelsComponent'
import VerificationTimer from '../../components/register/VerificationTimer'

export default class VerificationPage extends Component {
  render() {
    return (
      <div>
        <NavbarComponent/>
        <ScreenContainerComponent>
        <div className='VerificationComponent'>
         <div>
          <VerificationLabelsComponent/>
          </div>
          <div className='VerificationInput'>
          <VerificationComponent/>
          </div>
          <div>
          <VerificationTimer/>
          </div>
         </div>
        <IndexFooter/>
        </ScreenContainerComponent>
      </div>
    )
  }
}
