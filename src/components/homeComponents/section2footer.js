import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import './section2footer.css'

export default class section2footer extends Component {
  render() {
    const dataBanner = this.props.dataBanner
    return (
      <div className='section2footer'>
            <div style={{ marginBottom:'10px'}}><b>{dataBanner && dataBanner[1].title}</b></div>
            <div style={{ marginBottom:'20px'}}>{dataBanner && dataBanner[1].description}</div>
            <div><Button href="/shop">Learn More</Button></div>
      </div>
    )
  }
}
