import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from "../../../images/logo.svg"
import { default as SearchIcon } from '../../../images/searchHome.svg'
import { default as AccountIcon } from '../../../images/accountHome.svg'
import { default as MapIcon } from '../../../images/mapHome.svg'
import { Us, Id } from 'react-flags-select'
import { Dropdown } from 'react-bootstrap';
import { changeLanguage } from '../../../translations/i18n'
import { withTranslation } from 'react-i18next';
import { GetBrand, GetCategory } from '../../../config/api';
import axios from 'axios';
import './navbar.scoped.scss'
import ContainerComponent from '../../general/container/ContainerComponent';
import BrandLogo from './../../../images/brands/logo.png'
import { NavLink } from 'react-router-dom';
import MdiCart from './../../../images/icons/mdi_cart.svg'
import { IconMapPin, IconSearch, IconUserCircle } from '@tabler/icons-react';
import StringUtil from '../../../utils/StringUtil';

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

        this.navRef = React.createRef()
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

        window.addEventListener('scroll', () => {
            if (this.navRef.current) {
                if (window.scrollY >= 10) {
                    this.navRef.current.classList.add('bg-white')

                    document.querySelectorAll('.actions-wrapper li svg').forEach((svgIcon) => {
                        console.log(svgIcon)
                        svgIcon.setAttribute('stroke', '#000000')
                    })
                } else {
                    this.navRef.current.classList.remove('bg-white')

                    document.querySelectorAll('.actions-wrapper li svg').forEach((svgIcon) => {
                        svgIcon.setAttribute('stroke', '#FFFFFF')
                    })
                }
            }
        })
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
            <div className='nav-container' ref={this.navRef}>
                <ContainerComponent>
                    <nav className='navbar-olshop'>
                        <div className='brand-wrapper'>
                            <img src={BrandLogo} alt="brand-logo" />
                        </div>
                        <ul className='links-wrapper'>
                            <li>
                                <NavLink to={'/shop'}>{t('shop')}</NavLink>
                            </li>
                            <li>
                                <NavLink>{t('collective')}</NavLink>
                                <ul class="dropdown-content">
                                    <li className='dropdown-content-title'>{StringUtil.capitalizeFirstLetter(t('collective').toLowerCase())}</li>
                                    {categories.map((data, index) =>
                                        <li key={index}><a href={`/collective/${data.id}`}>{data.name}</a></li>
                                    )}
                                </ul>
                            </li>
                            <li>
                                <NavLink>{t('designers')}</NavLink>
                                <ul class="dropdown-content">
                                    <li className='dropdown-content-title'>{StringUtil.capitalizeFirstLetter(t('designers').toLowerCase())}</li>
                                    {brands.map((data, index) =>
                                        <li key={index}><a href={`/designers/${data.id}`}>{data.name}</a></li>
                                    )}
                                </ul>
                            </li>
                            <li><NavLink to={'/about-us'}>{t('aboutus')}</NavLink></li>
                            <li><NavLink to={'/contact'}>{t('contact')}</NavLink></li>
                            <li><NavLink to={'/event'}>{t('event')}</NavLink></li>
                        </ul>
                        <div className='actions-wrapper'>
                            <ul>
                                <li>
                                    <IconSearch color='#FFFFFF' />
                                </li>
                                <li>
                                    <IconUserCircle color='#FFFFFF' />
                                </li>
                                <li>
                                    <IconMapPin color='#FFFFFF' />
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <g clip-path="url(#clip0_970_3622)">
                                            <path d="M8.94373 17.4375C13.6125 17.4375 17.3812 13.6688 17.3812 9H0.506226C0.506226 13.6688 4.27498 17.4375 8.94373 17.4375Z" fill="#F9F9F9" />
                                            <path d="M8.94373 0.5625C4.27498 0.5625 0.506226 4.33125 0.506226 9H17.3812C17.3812 4.33125 13.6125 0.5625 8.94373 0.5625Z" fill="#ED4C5C" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_970_3622">
                                                <rect width="18" height="18" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </li>
                            </ul>
                            <button>
                                <img src={MdiCart} alt="" />
                            </button>
                        </div>
                    </nav>
                </ContainerComponent>
            </div>





            // <nav className='navbar'>
            // <ContainerComponent>
            // <Navbar expand="lg" className="container-fluid">
            // <Navbar.Brand href="/"><img src={Logo}></img></Navbar.Brand>
            // <Navbar.Toggle aria-controls="basic-navbar-nav" />
            // <Navbar.Collapse className="justify-content-end">
            //     <Nav >
            //         <Nav.Link style={{ color: "white" }} className='navbar' href="/shop">{t('shop')}</Nav.Link>
            //         <Nav.Link style={{ color: "white" }} className='navbar' href="/collective">
            //             <NavDropdown
            //                 id="nav-dropdown"
            //                 title={t('collective')}
            //                 show={this.state.showNavbar}
            //                 onMouseEnter={this.showDropdown}
            //                 onMouseLeave={this.hideDropdownCol}
            //             >
            //                 <NavDropdown.Item href="/collective/null">{t('collective')}</NavDropdown.Item>
            //                 <NavDropdown.Divider />
            //                 {categories.map((data, index) => {
            //                     return (
            //                         <NavDropdown.Item key={index} href={`/collective/${data.id}`}>{data.name}</NavDropdown.Item>
            //                     )
            //                 })}
            //             </NavDropdown>
            //         </Nav.Link>
            //         <Nav.Link style={{ color: "white" }} className='navbar' href="/designers">
            //             <NavDropdown
            //                 id="nav-dropdown"
            //                 title={t('designers')}
            //                 show={this.state.showNavbarDesign}
            //                 onMouseEnter={this.showDropdownDesign}
            //                 onMouseLeave={this.hideDropdownDes}
            //             >
            //                 <NavDropdown.Item href="/designers/null">{t('designers')}</NavDropdown.Item>
            //                 <NavDropdown.Divider />
            //                 {brands.map((data, index) => {
            //                     return (
            //                         <NavDropdown.Item key={index} href={`/designers/${data.id}`}>{data.name}</NavDropdown.Item>
            //                     )
            //                 })}
            //             </NavDropdown>
            //         </Nav.Link>
            //         <Nav.Link style={{ color: 'white' }} className='navbar' href="/about-us">{t('aboutus')}</Nav.Link>
            //         <Nav.Link style={{ color: "white" }} className='navbar' href="/contact">{t('contact')}</Nav.Link>
            //         <Nav.Link style={{ color: "white" }} className='navbar' href="/event">{t('event')}</Nav.Link>
            //     </Nav>
            // </Navbar.Collapse>
            // <Navbar.Collapse className="justify-content-end">
            //     <Nav.Link style={{ marginRight: 10 }} href="#search2"><img src={SearchHome}></img></Nav.Link>
            //     <Nav.Link disabled style={{ marginRight: 10 }} href="#search2">{userName}</Nav.Link>
            //     <Nav.Link style={{ marginRight: 10 }} href="/login"><img src={accHome}></img></Nav.Link>
            //     <Nav.Link style={{ marginRight: 10 }} href="#search"><img src={mapHome}></img></Nav.Link>
            //     <Dropdown style={{ background: 'none', border: 'none', borderRadius: '25px' }}>
            //         <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic" style={{ background: 'none', border: 'none', borderRadius: '25px' }}>
            //             {languages === "id" ? <Id style={{ borderRadius: '50%', width: '70%', height: '70%' }} /> : <Us style={{ borderRadius: '50%', width: '70%', height: '70%' }} />}
            //         </Dropdown.Toggle>
            //         <Dropdown.Menu>
            //             <Dropdown.Item className='w-10' style={{ background: 'none' }} onClick={() => this.handleLanguageChange('en')}><Us />English</Dropdown.Item>
            //             <Dropdown.Item style={{ background: 'none' }} onClick={() => this.handleLanguageChange('id')}><Id />Indonesia</Dropdown.Item>
            //         </Dropdown.Menu>
            //         </Dropdown>
            //         <Nav.Link><img src={Cart}></img></Nav.Link>
            //     </Navbar.Collapse>
            // </Navbar> */}
            // </ContainerComponent> 
            // </nav >
        )
    }
}

export default withTranslation()(navbarHome);
