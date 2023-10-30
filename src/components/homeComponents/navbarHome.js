import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./indexNavbar.css"
import Logo from "../../images/logo.svg"
import Cart from "../../images/cart&bg.svg"
import { default as SearchHome } from '../../images/searchHome.svg'
import { default as cartHome } from '../../images/cartHome.svg'
import { default as accHome } from '../../images/accountHome.svg'
import { default as mapHome } from '../../images/mapHome.svg'
import {Us, Id} from 'react-flags-select'
import { Dropdown } from 'react-bootstrap';
import { changeLanguage } from '../../translations/i18n'
import { withTranslation } from 'react-i18next';

class navbarHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
     languages : "es"
    }
  }
  handleLanguageChange = (lng) => {
    changeLanguage(lng);
    this.setState({languages:lng})
  };
  render() {
    const {userName} = this.props;
    const { t } = this.props;
    const { languages } = this.state;
    return (
      <div className='navbarHome'>
        <Navbar expand="lg" className="container-fluid">
        <Navbar.Brand href="/"><img src={Logo}></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link style={{color:"white"}} className='navbar' href="/shop">{t('shop')}</Nav.Link>
              <Nav.Link style={{color:"white"}} className='navbar' href="/collective">{t('collective')}</Nav.Link>
              <Nav.Link style={{color:"white"}} className='navbar' href="#designers">{t('designers')}</Nav.Link>
              <Nav.Link style={{color:"white"}} className='navbar' href="#aboutus">{t('aboutus')}</Nav.Link>
              <Nav.Link style={{color:"white"}} className='navbar' href="#contact">{t('contact')}</Nav.Link>
              <Nav.Link style={{color:"white"}} href="#event">{t('event')}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
              <Nav.Link  style={{marginRight : 10}} href="#search2"><img src={SearchHome}></img></Nav.Link>
              <Nav.Link disabled  style={{marginRight : 10}} href="#search2">{userName}</Nav.Link>
              <Nav.Link style={{marginRight : 10}} href="/login"><img src={accHome}></img></Nav.Link>
              <Nav.Link  style={{marginRight : 10}} href="#search"><img src={mapHome}></img></Nav.Link>
              <Dropdown style={{ background: 'none', border:'none', borderRadius:'25px' }}>
                <Dropdown.Toggle size ="sm" variant="success" id="dropdown-basic" style={{ background: 'none', border:'none', borderRadius:'25px' }}>
                  {languages === "id" ? <Id style={{borderRadius:'50%', width:'70%', height:'70%'}}/> : <Us style={{borderRadius:'50%', width:'70%', height:'70%'}}/> }
                </Dropdown.Toggle>
                    <Dropdown.Menu>
                     <Dropdown.Item className='w-10' style={{ background: 'none' }} onClick={() => this.handleLanguageChange('en')}><Us/>English</Dropdown.Item>
                     <Dropdown.Item style={{ background: 'none' }} onClick={() => this.handleLanguageChange('id')}><Id/>Indonesia</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Nav.Link><img src={Cart}></img></Nav.Link>
          </Navbar.Collapse>
      </Navbar>
      </div>
    )
  }
}

export default withTranslation()(navbarHome);
