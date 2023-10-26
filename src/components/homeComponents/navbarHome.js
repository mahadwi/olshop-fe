import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./indexNavbar.css"
import Logo from "../../images/logo.svg"
import Cart from "../../images/cart&bg.svg"
import Search from "../../images/search.svg"
import Profile from "../../images/profile.svg"
import Search2 from "../../images/search2.svg"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default class navbarHome extends Component {
  render() {
    const {userName} = this.props;
    return (
      <div className='navbarHome'>
        <Navbar expand="lg" className="container-fluid fixed-top">
        <Navbar.Brand href="#home"><img src={Logo}></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav >
              <Nav.Link className='navbar' href="#shop">SHOP</Nav.Link>
              <Nav.Link className='navbar' href="#collective">COLLECTIVE</Nav.Link>
              <Nav.Link className='navbar' href="#designers">DESIGNERS</Nav.Link>
              <Nav.Link className='navbar' href="#aboutus">ABOUT US</Nav.Link>
              <Nav.Link className='navbar' href="#contact">CONTACT</Nav.Link>
              <Nav.Link href="#event">EVENT</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
              <Nav.Link  style={{marginRight : 10}} href="#search2"><img src={Search2}></img></Nav.Link>
              <Nav.Link disabled  style={{marginRight : 10}} href="#search2">{userName}</Nav.Link>
              <Nav.Link disabled style={{marginRight : 10}} href="/"><img src={Profile}></img></Nav.Link>
              <Nav.Link  style={{marginRight : 10}} href="#search"><img src={Search}></img></Nav.Link>
              <Nav.Link><img src={Cart}></img></Nav.Link>
          </Navbar.Collapse>
      </Navbar>
      </div>
    )
  }
}
