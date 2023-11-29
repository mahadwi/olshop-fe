import React, { Component } from 'react'
import './verification-labels.scooped.scss'
import { Row } from 'react-bootstrap'

class VerificationLabelsComponent extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Row style={{background:'linear-gradient(90deg, #E4A951 0%, #E4E4EA 30.62%, #FFF 48.93%)', width:'100%'}}>
        <div className='Section1'>Verification your account</div>
        </Row>
        <div className='Section2'>Input your code verification</div>
        <div className='Section3'>The verification code has been sent via e-mail to Non_471@gmail.com</div>
      </div>
    )
  }
}

export default VerificationLabelsComponent
