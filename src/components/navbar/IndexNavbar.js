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
import { Us, Id } from 'react-flags-select'
import { Dropdown } from 'react-bootstrap';
import { default as ProfileV2 } from '../../images/profilev2.svg'
import { default as CartMobileIco } from '../../images/cartMobile.svg'
import { default as SearchMobileIco } from '../../images/searchMobile.svg'
import { default as LuxiMobileIco } from '../../images/LuxiIconMobile.svg'

const storedLanguage = localStorage.getItem('selectedLanguage');

class IndexNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: storedLanguage,
            showNavbar: false,
            showNavbarDesign: false,
            defaultParam: null,
        }
    }

    showDropdown = (e) => {
        const show = this.state.showNavbar
        this.setState({ showNavbar: !show });
    }
    hideDropdownCol = (e) => {
        this.setState({ showNavbar: false });
    }

    hideDropdownDes = (e) => {
        this.setState({ showNavbarDesign: false });
    }

    showDropdownDesign = (e) => {
        const show = this.state.showNavbarDesign
        this.setState({ showNavbarDesign: !show });
    }
    hideDropdownDesign = (e) => {
        this.setState({ showNavbarDesign: false });
    }

    handleLanguageChange = (lng) => {
        changeLanguage(lng);
        this.setState({ languages: lng })
    };

    render() {
        const { t, brands, categories, windowWidth } = this.props;
        const { languages } = this.state;
        console.log('data brand drop', brands)
        return (
            <div>
            {windowWidth > 900 ? (
              <div className='Navbar'>
                <Navbar expand="lg" className="container-fluid">
                    <Navbar.Brand href="/"><img src={Logo}></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav >
                            <Nav.Link className='navbar' href="/shop">{t('shop')}</Nav.Link>
                            <Nav.Link className='navbar' href="/collective">
                                <NavDropdown
                                    title={t('collective')}
                                    show={this.state.showNavbar}
                                    onMouseEnter={this.showDropdown}
                                    onMouseLeave={this.hideDropdownCol}
                                >
                                    <NavDropdown.Item href="#" style={{ fontWeight: 'bold' }}>{t('collective')}</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    {categories.map((data, index) => {
                                        return (
                                            <NavDropdown.Item key={index} href={`/collective/${data.id}`}>{data.name}</NavDropdown.Item>
                                        )
                                    })}
                                </NavDropdown>
                            </Nav.Link>
                            <Nav.Link className='navbar' href="/designers">
                                <NavDropdown
                                    title={t('designers')}
                                    show={this.state.showNavbarDesign}
                                    onMouseEnter={this.showDropdownDesign}
                                    onMouseLeave={this.hideDropdownDes}
                                >
                                    <NavDropdown.Item href='#' style={{ fontWeight: 'bold' }}>{t('designers')}</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    {brands.map((data, index) => {
                                        return (
                                            <NavDropdown.Item key={index} href={`/designers/${data.id}`}>{data.name}</NavDropdown.Item>
                                        )
                                    })}
                                </NavDropdown>
                            </Nav.Link>
                            <Nav.Link className='navbar' href="/about-us">{t('aboutus')}</Nav.Link>
                            <Nav.Link className='navbar' href="/contact">{t('contact')}</Nav.Link>
                            <Nav.Link className='navbar' href="/event">{t('event')}</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link style={{ marginRight: 10 }} href="#search2"><img src={Search2}></img></Nav.Link>
                        <Nav.Link style={{ marginRight: 10 }} href="/login"><img src={ProfileV2}></img></Nav.Link>
                        <Nav.Link style={{ marginRight: 10 }} href="#search"><img src={Search}></img></Nav.Link>
                        <Nav.Link style={{ marginRight: 10 }} >
                            <Dropdown style={{ background: 'none' }}>
                                <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic" style={{ background: 'none', border: 'none' }}>
                                    {languages === "id" ? <Id style={{ borderRadius: '50%', width: '70%', height: '70%' }} /> : <Us style={{ borderRadius: '50%', width: '70%', height: '70%' }} />}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item className='w-10' style={{ background: 'none' }} onClick={() => this.handleLanguageChange('en')}><Us />English</Dropdown.Item>
                                    <Dropdown.Item style={{ background: 'none' }} onClick={() => this.handleLanguageChange('id')}><Id />Indonesia</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav.Link>
                        <Nav.Link><img src={Cart}></img></Nav.Link>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            ):(
                <div class="pos-f-t">
                <div class="collapse" id="navbarToggleExternalContent">
                  <div class="bg-dark p-4">
                    <h4 class="text-white">Collapsed content</h4>
                    <span class="text-muted">Toggleable via the navbar brand.</span>
                  </div>
                </div>
                <nav class="navbar navbar-light bg-light">
                  {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button> */}
                    <img style={{float:'left'}} src={LuxiMobileIco}/>
                  <div style={{float:'right'}}>
                  <img style={{margin:'7px'}} src={SearchMobileIco}/>
                  <img src={CartMobileIco} />
                  </div>
                </nav>
              </div>)}
          </div>
        )
    }
}

export default withTranslation()(IndexNavbar);
