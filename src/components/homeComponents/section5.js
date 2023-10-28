import React, { Component } from 'react'
import { Button, Card, CardBody, CardGroup } from 'react-bootstrap'
import {default as Section5 } from '../../images/Section5.svg'
import Carousel from 'react-bootstrap/Carousel';
import './section5.css'

export default class section5 extends Component {
  render() {
    const productDesc = { longDesc : "Elegance and sleek lines give life to a leather mini-bag with a refined character. The versatile, structured design, carried by hand or worn with the detachable shoulder strap, is completed  with a double zipper closure and embellished with the enameled metal triangle logo."}
    return (
        <CardGroup style={{marginBottom:"3rem"}}>
        <Card style={{height:"460px", borderRadius:"0px"}} bg="dark" text="white">
            <Card.Body className='cardBody'>
            <Card.Title style={{marginBottom:"3rem"}}>NEW ARRIVAL - SPRING FALL 2023<p>
            Prada Odette leather mini-bag</p></Card.Title>
            <Card.Text style={{marginBottom:"3rem"}}>{productDesc.longDesc}</Card.Text>
            <Button href="/shop" variant='light'>Shop Now</Button>
        </Card.Body>
        </Card>
        <Card>
            <Carousel>
                <Carousel.Item>
                    <Card.Img src={Section5} />
                </Carousel.Item>
                <Carousel.Item>
                    <Card.Img src={Section5} />
                </Carousel.Item>
                <Carousel.Item>
                    <Card.Img src={Section5} />
                </Carousel.Item>
            </Carousel>
        </Card>
      </CardGroup>
    )
  }
}
