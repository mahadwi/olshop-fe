import React, { Component } from 'react'
import { Button, Card, CardBody, CardGroup } from 'react-bootstrap'
import { default as Section6 } from '../../images/Section6.svg'
import Carousel from 'react-bootstrap/Carousel';
import './section6.css'

export default class section6 extends Component {
  render() {
    const productDesc = { longDesc : "Elegance and sleek lines give life to a leather mini-bag with a refined character. The versatile, structured design, carried by hand or worn with the detachable shoulder strap, is completed  with a double zipper closure and embellished with the enameled metal triangle logo."}
    return (
        <CardGroup className='cardSection6' style={{marginBottom:"3rem"}}>
        <Card style={{border:"none"}}>
            <Card.Body className='ImgBodySection6'>
            <Carousel>
                <Carousel.Item>
                    <Card.Img src={Section6} />
                </Carousel.Item>
                <Carousel.Item>
                    <Card.Img src={Section6} />
                </Carousel.Item>
                <Carousel.Item>
                    <Card.Img src={Section6} />
                </Carousel.Item>
            </Carousel>
            </Card.Body>
        </Card>
        <Card variant='light' className='section6card2' style={{height:"460px"}} bg="light" text="white">
            <Card.Body className='section6card2body'>
            <Card.Title style={{marginBottom:"3rem", color:'black'}}>NEW ARRIVAL - SPRING FALL 2023<p>
            Prada Odette leather mini-bag</p></Card.Title>
            <Card.Text style={{marginBottom:"3rem", color:'black'}}>{productDesc.longDesc}</Card.Text>
            <Button href="/shop" variant='primary'>Read More</Button>
        </Card.Body>
        </Card>
      </CardGroup>
    )
  }
}
