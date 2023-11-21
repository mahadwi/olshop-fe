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
import { Us, Id } from 'react-flags-select'
import { Dropdown } from 'react-bootstrap';
import { changeLanguage } from '../../translations/i18n'
import { withTranslation } from 'react-i18next';
import { GetBrand, GetCategory } from '../../config/api';
import axios from 'axios';

const storedLanguage = localStorage.getItem('selectedLanguage');

class navbarHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: storedLanguage,
            showNavbar: false,
            showNavbarDesign: false,
            brands: [],
            categories: [],
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


    componentDidMount() {
        this.handleDropDownDesign()
        this.handleDropDownCollective()
    }

    async handleDropDownDesign() {
        try {
            const response = await axios.get(GetBrand)
            this.setState({ brands: response.data.data })
        } catch (error) {
            console.log(error)
        }
    }

    async handleDropDownCollective() {
        try {
            const response = await axios.get(GetCategory)
            this.setState({ categories: response.data.data })
        } catch (error) {
            console.log(error)
        }
    }


    handleLanguageChange = (lng) => {
        changeLanguage(lng);
        this.setState({ languages: lng })
    };
    render() {
        const { userName } = this.props;
        const { t } = this.props;
        const { languages, categories, brands } = this.state;
        return (
            <div className='navbarHome'>
                <Navbar expand="lg" className="container-fluid">
                    <Navbar.Brand href="/"><img src={Logo}></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav >
                            <Nav.Link style={{ color: "white" }} className='navbar' href="/shop">{t('shop')}</Nav.Link>
                            <Nav.Link style={{ color: "white" }} className='navbar' href="/collective">
                                <NavDropdown
                                    id="nav-dropdown"
                                    title={t('collective')}
                                    show={this.state.showNavbar}
                                    onMouseEnter={this.showDropdown}
                                    onMouseLeave={this.hideDropdownCol}
                                >
                                    <NavDropdown.Item href="/collective/null">{t('collective')}</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    {categories.map((data, index) => {
                                        return (
                                            <NavDropdown.Item key={index} href={`/collective/${data.id}`}>{data.name}</NavDropdown.Item>
                                        )
                                    })}
                                </NavDropdown>
                            </Nav.Link>
                            <Nav.Link style={{ color: "white" }} className='navbar' href="/designers">
                                <NavDropdown
                                    id="nav-dropdown"
                                    title={t('designers')}
                                    show={this.state.showNavbarDesign}
                                    onMouseEnter={this.showDropdownDesign}
                                    onMouseLeave={this.hideDropdownDes}
                                >
                                    <NavDropdown.Item href="/designers/null">{t('designers')}</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    {brands.map((data, index) => {
                                        return (
                                            <NavDropdown.Item key={index} href={`/designers/${data.id}`}>{data.name}</NavDropdown.Item>
                                        )
                                    })}
                                </NavDropdown>
                            </Nav.Link>
                            <Nav.Link style={{ color: 'white' }} className='navbar' href="#about-us">{t('aboutus')}</Nav.Link>
                            <Nav.Link style={{ color: "white" }} className='navbar' href="#contact">{t('contact')}</Nav.Link>
                            <Nav.Link style={{ color: "white" }} className='navbar' href="/event">{t('event')}</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link style={{ marginRight: 10 }} href="#search2"><img src={SearchHome}></img></Nav.Link>
                        <Nav.Link disabled style={{ marginRight: 10 }} href="#search2">{userName}</Nav.Link>
                        <Nav.Link style={{ marginRight: 10 }} href="/login"><img src={accHome}></img></Nav.Link>
                        <Nav.Link style={{ marginRight: 10 }} href="#search"><img src={mapHome}></img></Nav.Link>
                        <Dropdown style={{ background: 'none', border: 'none', borderRadius: '25px' }}>
                            <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic" style={{ background: 'none', border: 'none', borderRadius: '25px' }}>
                                {languages === "id" ? <Id style={{ borderRadius: '50%', width: '70%', height: '70%' }} /> : <Us style={{ borderRadius: '50%', width: '70%', height: '70%' }} />}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item className='w-10' style={{ background: 'none' }} onClick={() => this.handleLanguageChange('en')}><Us />English</Dropdown.Item>
                                <Dropdown.Item style={{ background: 'none' }} onClick={() => this.handleLanguageChange('id')}><Id />Indonesia</Dropdown.Item>
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
