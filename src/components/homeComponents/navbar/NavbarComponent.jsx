import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap';
import { changeLanguage } from '../../../translations/i18n'
import { withTranslation } from 'react-i18next';
import { GetBrand, GetCategory } from '../../../config/api';
import axios from 'axios';
import './navbar.scoped.scss'
import ContainerComponent from '../../general/container/ContainerComponent';
import BrandLogo from './../../../images/brands/logo.png'
import { NavLink } from 'react-router-dom';
import { IconAlignLeft, IconMapPin, IconSearch, IconShoppingCartFilled, IconUserCircle, IconX } from '@tabler/icons-react';
import StringUtil from '../../../utils/StringUtil';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Api from '../../../utils/Api';
import SidebarComponent from '../../general/sidebar/SidebarComponent';

const storedLanguage = localStorage.getItem('selectedLanguage');

class navbarHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aboutUs: {},
            languages: storedLanguage,
            showNavbar: false,
            showNavbarDesign: false,
            brands: [],
            categories: [],
            sidebarOpen: false
        }

        this.navRef = React.createRef()
        this.toggleSidebar = this.toggleSidebar.bind(this)
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

        if (window.location.pathname == '/') {
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
        } else {
            this.navRef.current.classList.add('bg-white')

            document.querySelectorAll('.actions-wrapper li svg').forEach((svgIcon) => {
                svgIcon.setAttribute('stroke', '#000000')
            })
        }

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

        Api.get('/about-us')
            .then((res) => {
                this.setState({ aboutUs: res.data.data[0] })
            })
    }

    toggleSidebar() {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        })
    }


    handleLanguageChange = (lng) => {
        changeLanguage(lng);
        this.setState({ languages: lng })
    };
    render() {
        const { t } = this.props;
        const { languages, categories, brands, aboutUs } = this.state;

        return (
            <div>
                <div className='nav-container' ref={this.navRef}>
                    <ContainerComponent>
                        <nav className='navbar-olshop'>
                            <NavLink to={'/'} className='brand-wrapper'>
                                <img src={BrandLogo} alt="brand-logo" />
                            </NavLink>
                            <div className='hamburger' onClick={() => {
                                this.toggleSidebar()
                            }}>
                                {
                                    this.state.sidebarOpen ? <IconX size={30} /> : <IconAlignLeft size={30} />
                                }
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
                                    <li className='search-act'>
                                        <IconSearch color='#FFFFFF' />
                                    </li>
                                    <li>
                                        <NavLink to={'/login'}>
                                            <IconUserCircle color='#FFFFFF' />
                                        </NavLink>
                                    </li>
                                    <li>
                                        <a href={aboutUs.maps} target='_blank'>
                                            <IconMapPin color='#FFFFFF' />
                                        </a>
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
                                    <IconShoppingCartFilled />
                                </button>
                            </div>
                        </nav>
                    </ContainerComponent>
                </div>
                <SidebarComponent sidebarOpen={this.state.sidebarOpen} toggleSidebar={this.toggleSidebar} categories={categories} brands={brands} />
            </div>
        )
    }
}

export default withTranslation()(navbarHome);
