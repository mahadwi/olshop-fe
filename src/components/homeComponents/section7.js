import React, { Component } from 'react'
import { Button, Card, CardBody, CardGroup } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel';
import { default as Section7 } from '../../images/Section7.svg'
import './section7.css'

export default class section7 extends Component {
  render() {
    const productDesc = { longDesc : "Elegance and sleek lines give life to a leather mini-bag with a refined character. The versatile, structured design, carried by hand or worn with the detachable shoulder strap, is completed  with a double zipper closure and embellished with the enameled metal triangle logo."}
    return (
        <CardGroup className='cardBodySection7' style={{marginBottom:"3rem"}}>
        <Card variant='light' className='section7card2' style={{height:"460px", borderRadius:"0px", border:'none'}} bg="light" text="white">
            <Card.Body className='section6card2body'>
            <Card.Title style={{marginBottom:"3rem", color:'black'}}>NEW ARRIVAL - SPRING FALL 2023<p>
            Prada Odette leather mini-bag</p></Card.Title>
            <Card.Text style={{marginBottom:"3rem", color:'black'}}>{productDesc.longDesc}</Card.Text>
            <Button href="/shop" variant='primary'>Read More</Button>
        </Card.Body>
        </Card>
        <Card style={{border:"none"}}>
            <Card.Body style={{width:"420px", height:'630px'}}>
            <Carousel>
                <Carousel.Item>
                    <Card.Img src={Section7} />
                </Carousel.Item>
                <Carousel.Item>
                    <Card.Img src={Section7} />
                </Carousel.Item>
                <Carousel.Item>
                    <Card.Img src={Section7} />
                </Carousel.Item>
            </Carousel>
            </Card.Body>
        </Card>
      </CardGroup>
    )
  }
}
