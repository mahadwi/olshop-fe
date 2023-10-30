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
import { Dropdown } from 'react-bootstrap';
import { default as ProfileV2 } from '../../images/profilev2.svg'

class IndexNavbar extends Component {
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
    const { t } = this.props;
    const { languages } = this.state;
    return (
      <div className='Navbar'>
      <Navbar expand="lg" className="container-fluid">
      <Navbar.Brand href="/"><img src={Logo}></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav >
            <Nav.Link className='navbar' href="/shop">{t('shop')}</Nav.Link>
            <Nav.Link className='navbar' href="/collective">{t('collective')}</Nav.Link>
            <Nav.Link className='navbar' href="#designers">{t('designers')}</Nav.Link>
            <Nav.Link className='navbar' href="#aboutus">{t('aboutus')}</Nav.Link>
            <Nav.Link className='navbar' href="#contact">{t('contact')}</Nav.Link>
            <Nav.Link href="#event">{t('event')}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
            <Nav.Link  style={{marginRight : 10}} href="#search2"><img src={Search2}></img></Nav.Link>
            <Nav.Link style={{marginRight : 10}} href="/login"><img src={ProfileV2}></img></Nav.Link>
            <Nav.Link  style={{marginRight : 10}} href="#search"><img src={Search}></img></Nav.Link>
            <Nav.Link  style={{marginRight : 10}} >
            <Dropdown style={{ background: 'none' }}>
                <Dropdown.Toggle size ="sm" variant="success" id="dropdown-basic" style={{ background: 'none' , border:'none' }}>
                {languages === "id" ? <Id style={{borderRadius:'50%', width:'70%', height:'70%'}}/> : <Us style={{borderRadius:'50%', width:'70%', height:'70%'}}/> }
                </Dropdown.Toggle>
                    <Dropdown.Menu>
                     <Dropdown.Item className='w-10' style={{ background: 'none' }} onClick={() => this.handleLanguageChange('en')}><Us/>English</Dropdown.Item>
                     <Dropdown.Item style={{ background: 'none' }} onClick={() => this.handleLanguageChange('id')}><Id/>Indonesia</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </Nav.Link>
            <Nav.Link><img src={Cart}></img></Nav.Link>
        </Navbar.Collapse>
    </Navbar>
    </div>
    )
  }
}

export default withTranslation()(IndexNavbar);
