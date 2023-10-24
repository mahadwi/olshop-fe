import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./indexFooter.css"
import { Col , Row } from 'react-bootstrap';
import ClientServiceLogo from "../../images/client_service.svg"
import ConsignSellLogo from "../../images/consign&sell.svg"
import BuyLogo from "../../images/buy_footer.svg"
import LuxiLogo from "../../images/luxi_footer.svg"

export default class indexFooter extends Component {
  render() {
    return (
        <Card className='footer rounded-0'>
         <Row>
            <Col className='col-3' style={{marginRight : "60px"}}>
        <Card.Body>
          <Card.Title style={{color : "white"}}>Never Miss a Beat</Card.Title>
          <Card.Text style={{color : "white"}}>
          Be the first to hear about product launches, collaborations, and more when you sign up for our emails
          </Card.Text>
          <input className='inputEmail' placeholder='Enter Email Here'/>
          <Button variant="warning" className='buttonEmail' size='sm'>Submit</Button>
        </Card.Body>
        </Col>
        <Col className='col-2'>
        <Card.Body>
          <Card.Title style={{color : "white", fontSize : "18px"}}><img src={ClientServiceLogo}/> Client Service</Card.Title>
          <Card.Text style={{color : "white"}}>
           <a className='footerlink' href='#'>Delivery & Shipping</a>
            <br/>
            <a className='footerlink' href='#'>FAQ</a>
            <br/>
            <a className='footerlink' href='#'>Contact Us</a>
          </Card.Text>
        </Card.Body>
        </Col>
        <Col className='col-2'>
        <Card.Body>
          <Card.Title style={{color : "white", fontSize : "18px"}}><img src={ConsignSellLogo}/> Consign & Sell</Card.Title>
          <Card.Text style={{color : "white"}}>
          <a className='footerlink' href='#'>Consignment</a>
          <br/>
            <a className='footerlink' href='#'>Trade - In</a>
            <br/>
            <a className='footerlink' href='#'>Direct Selling</a>
          </Card.Text>
        </Card.Body>
        </Col>
        <Col className='col-2'>
        <Card.Body>
          <Card.Title style={{color : "white", fontSize : "18px"}}><img src={BuyLogo}/> Buy</Card.Title>
          <Card.Text style={{color : "white"}}>
          <a className='footerlink' href='#'>Order Tracking</a>
          <br/>
            <a className='footerlink' href='#'>Return Policy</a>
            <br/>
            <a className='footerlink' href='#'>Authentication</a>
          </Card.Text>
        </Card.Body>
        </Col>
        <Col className='col-2'>
        <Card.Body>
          <Card.Title style={{color : "white", fontSize : "18px"}}><img src={LuxiLogo}/> Luxi</Card.Title>
          <Card.Text style={{color : "white"}}>
          <a className='footerlink' href='#'>About Us</a>
          <br/>
            <a className='footerlink' href='#'>Work With Us</a>
            <br/>
            <a className='footerlink' href='#'>Review</a>
          </Card.Text>
        </Card.Body>
        </Col>
        </Row>
      </Card>
    )
  }
}
