import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap';
import { changeLanguage } from '../../../translations/i18n'
import { withTranslation } from 'react-i18next';
import { GetBrand, GetCategory } from '../../../config/api';
import axios from 'axios';
import './navbar.scoped.scss'
import ContainerComponent from '../../general/container/ContainerComponent';
import BrandLogo from './../../../images/brands/logo.png'
import { Link, NavLink } from 'react-router-dom';
import MdiCart from './../../../images/icons/mdi_cart.svg'
import { IconMapPin, IconSearch, IconUserCircle } from '@tabler/icons-react';
import StringUtil from '../../../utils/StringUtil';
import "/node_modules/flag-icons/css/flag-icons.min.css";

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
                                        <li key={index}><Link to={`/collective/${data.id}`}>{data.name}</Link></li>
                                    )}
                                </ul>
                            </li>
                            <li>
                                <NavLink>{t('designers')}</NavLink>
                                <ul class="dropdown-content">
                                    <li className='dropdown-content-title'>{StringUtil.capitalizeFirstLetter(t('designers').toLowerCase())}</li>
                                    {brands.map((data, index) =>
                                        <li key={index}><Link to={`/designers/${data.id}`}>{data.name}</Link></li>
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
                                    <NavLink to={'/login'}>
                                        <IconUserCircle color='#FFFFFF' />
                                    </NavLink>
                                </li>
                                <li>
                                    <IconMapPin color='#FFFFFF' />
                                </li>
                                <li>
                                    <Dropdown>
                                        <Dropdown.Toggle size="sm" variant="transparent" id="dropdown-basic">
                                            {languages === "id" ? <span className='circle-flag fi fi-id'></span> : <span className='circle-flag fi fi-us'></span>}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item style={{ display: 'flex', alignItems: 'center', gap: '.7rem', fontFamily: "'Nunito Sans', sans-serif", fontSize: '14px', fontWeight: '600' }} onClick={() => this.handleLanguageChange('en')}><span className='circle-flag fi fi-us'></span>English</Dropdown.Item>
                                            <Dropdown.Item style={{ display: 'flex', alignItems: 'center', gap: '.7rem', fontFamily: "'Nunito Sans', sans-serif", fontSize: '14px', fontWeight: '600' }} onClick={() => this.handleLanguageChange('id')}><span className='circle-flag fi fi-id'></span>Indonesia</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                            </ul>
                            <button>
                                <img src={MdiCart} alt="" />
                            </button>
                        </div>
                    </nav>
                </ContainerComponent>
            </div>
        )
    }
}

export default withTranslation()(navbarHome);
