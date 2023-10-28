import React, { Component } from 'react'
import { Button, Card, CardBody, CardGroup } from 'react-bootstrap'
import {default as Section41} from '../../images/Section4-1.svg'
import {default as Section42} from '../../images/Section4-2.svg'
import {default as Section43} from '../../images/Section4-3.svg'
import './section4.css'


export default class section4 extends Component {
  render() {
    return (
      <CardGroup style={{marginBottom:"3rem", border:'none'}}>
        <Card>
            <Card.Img src={Section41}/>
        </Card>
        <Card>
            <Card.Img src={Section42}/>
            <Card.Img src={Section43}/>
        </Card>
        <Card bg="dark" text="white">
            <Card.Body className='cardBodySect4'>
            <Card.Title>EXUDE THE LUXURY OF<p>
            YOUR OWN STYLE</p></Card.Title>
            <Button href="/shop" variant='light'>Shop Now</Button>
            </Card.Body>
        </Card>
      </CardGroup>
    )
  }
}
