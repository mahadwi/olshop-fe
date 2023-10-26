import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./indexNavbar1.css"
import Logo from "../../images/logo.svg"
import Cart from "../../images/cart&bg.svg"
import Search from "../../images/search.svg"
import Profile from "../../images/profile.svg"
import Search2 from "../../images/search2.svg"
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { changeLanguage } from '../../translations/i18n'
import { MDBIcon } from 'mdb-react-ui-kit';
import {Us, Id} from 'react-flags-select'

class IndexNavbar extends Component {
  handleLanguageChange = (lng) => {
    changeLanguage(lng);
  };
  render() {
    const { t } = this.props;
    return (
      <div className='Navbar'>
      <Navbar expand="lg" className="container-fluid">
      <Navbar.Brand href="#home"><img src={Logo}></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav >
            <Nav.Link className='navbar' href="#shop">{t('shop')}</Nav.Link>
            <Nav.Link className='navbar' href="#collective">{t('collective')}</Nav.Link>
            <Nav.Link className='navbar' href="#designers">{t('designers')}</Nav.Link>
            <Nav.Link className='navbar' href="#aboutus">{t('aboutus')}</Nav.Link>
            <Nav.Link className='navbar' href="#contact">{t('contact')}</Nav.Link>
            <Nav.Link href="#event">{t('event')}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
            <Nav.Link  style={{marginRight : 10}} href="#search2"><img src={Search2}></img></Nav.Link>
            <Nav.Link style={{marginRight : 10}} href="/"><img src={Profile}></img></Nav.Link>
            <Nav.Link  style={{marginRight : 10}} href="#search"><img src={Search}></img></Nav.Link>
            <Nav.Link  style={{marginRight : 10}}  onClick={() => this.handleLanguageChange('en')}><Us/></Nav.Link>
            <Nav.Link  style={{marginRight : 10}} onClick={() => this.handleLanguageChange('id')}><Id /></Nav.Link>
            <Nav.Link><img src={Cart}></img></Nav.Link>
        </Navbar.Collapse>
    </Navbar>
    </div>
    )
  }
}

export default withTranslation()(IndexNavbar);
