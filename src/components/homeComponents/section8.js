import React, { Component } from 'react'
import {default as Section8} from '../../images/Section8.svg'
import { Button } from 'react-bootstrap'
import './section8.css'
import { Card } from 'react-bootstrap'

export default class section8 extends Component {
  render() {
    return (
      <div className='image-container' style={{marginBottom:"3rem"}}>
         <img style={{width:"100%"}} src={Section8}/>
          <div className='overlay'>
             <Card bg="dark" text="white" className='card-overlay' style={{opacity:"60%"}}>
                <Card.Body style={{marginTop:"26%"}}>
                </Card.Body>
             </Card>
          </div>
      </div>
    )
  }
}
