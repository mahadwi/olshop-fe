import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import './section2footer.css'

export default class section2footer extends Component {
  render() {
    // const dataBanner = this.props
    // console.log('data banner props :',dataBanner)
    return (
      <div className='section2footer'>
            <div style={{ marginBottom:'10px'}}><b>THE RETURN OF THE WINTER EDITION OF THE SERIES - 2023</b></div>
            <div style={{ marginBottom:'20px'}}>THE THING HE HAD BEEN WAITING FOR SO LONG FINALLY RETURNED IN THE PRESENT</div>
            <div><Button href="/shop">Learn More</Button></div>
      </div>
    )
  }
}
