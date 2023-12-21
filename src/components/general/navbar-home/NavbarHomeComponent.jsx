import React, { useContext, useEffect, useRef, useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import { changeLanguage } from '../../../translations/i18n'
import { withTranslation } from 'react-i18next';
import './navbar-home.scoped.scss'
import ContainerComponent from '../container/ContainerComponent';
import BrandLogo from './../../../images/brands/logo.png'
import { NavLink, useLocation, Link } from 'react-router-dom';
import { IconAlignLeft, IconArrowRight, IconMapPin, IconSearch, IconShoppingCartFilled, IconUserCircle, IconX } from '@tabler/icons-react';
import StringUtil from '../../../utils/StringUtil';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Api from '../../../utils/Api';
import SidebarComponent from '../sidebar/SidebarComponent';
import { AuthUserContext } from '../../../context/AuthUserContext';
import { LanguageContext } from '../../../context/LanguageContext';
import NoPhoto from './../../../images/icons/no-photo.png'
import FloatingCartComponent from '../floating-cart/FloatingCartComponent';

const useReactPath = () => {
    const [path, setPath] = useState(window.location.pathname);
    const listenToPopstate = () => {
        const winPath = window.location.pathname;
        setPath(winPath);
    };
    useEffect(() => {
        window.addEventListener("popstate", listenToPopstate);
        return () => {
            window.removeEventListener("popstate", listenToPopstate);
        };
    }, []);
    return path;
};

function NavbarHomeComponent({ t }) {

    /**
     * Hooks
     * 
     */
    const path = useReactPath();

    /**
     * Refs
     * 
     */
    const navRef = useRef()
    const actionsWrapperRef = useRef()

    /**
     * Context
     * 
     */
    const { user } = useContext(AuthUserContext)

    /**
     * Main State
     * 
     */
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [aboutUs, setAboutUs] = useState({})
    const {language, setLanguage} = useContext(LanguageContext)

    useEffect(() => {
        loadBrands()
        loadCategories()
        loadAboutUs()
    }, [])

    useEffect(() => {
        startFuncNavbarDynamicStyle()
    }, [])

    const loadBrands = () => {
        Api.get('/brand')
            .then((res) => {
                if (res) {
                    setBrands(res.data.data)
                }
            })
    }

    const loadCategories = () => {
        Api.get('/product-category')
            .then((res) => {
                if (res) {
                    setCategories(res.data.data)
                }
            })
    }

    const loadAboutUs = () => {
        Api.get('/about-us')
            .then((res) => {
                setAboutUs(res.data.data[0])
            })
    }

    const startFuncNavbarDynamicStyle = () => {
        console.log(window.location)
        if (path == '/') {
            navRef.current.classList.remove('bg-white')

            window.addEventListener('scroll', () => {
                console.log(path)

                if (navRef.current) {
                    if (window.scrollY >= 10) {
                        navRef.current.classList.add('bg-white')

                        actionsWrapperRef.current.querySelectorAll('li svg').forEach((svgIcon) => {
                            if (svgIcon.getAttribute('stroke') != '#E4A951') {
                                svgIcon.setAttribute('stroke', '#000000')
                            }
                        })
                    } else {
                        if (navRef.current.classList.contains('bg-white')) {
                            navRef.current.classList.remove('bg-white')
                        }

                        actionsWrapperRef.current.querySelectorAll('li svg').forEach((svgIcon) => {
                            if (svgIcon.getAttribute('stroke') != '#E4A951') {
                                svgIcon.setAttribute('stroke', '#FFFFFF')
                            }
                        })
                    }
                }
            })
        } else {
            navRef.current.classList.add('bg-white')

            document.querySelectorAll('.actions-wrapper li svg').forEach((svgIcon) => {
                if (svgIcon.getAttribute('stroke') != '#E4A951') {
                    svgIcon.setAttribute('stroke', '#000000')
                }
            })
        }
    }

    const handleLanguageChange = (lng) => {
        changeLanguage(lng);
        setLanguage(lng)
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <div>
            <div className='nav-container' ref={navRef}>
                <ContainerComponent>
                    <nav className='navbar-olshop'>
                        <NavLink to={'/'} onClick={() => {
                            window.location.reload()
                        }} className='brand-wrapper'>
                            <img src={BrandLogo} alt="brand-logo" />
                        </NavLink>
                        <div className='hamburger' onClick={() => {
                            toggleSidebar()
                        }}>
                            {
                                sidebarOpen ? <IconX size={30} /> : <IconAlignLeft size={30} />
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
                        <div className='actions-wrapper' ref={actionsWrapperRef}>
                            <ul>
                                <li className='search-act'>
                                    <IconSearch color='#FFFFFF' />
                                </li>
                                <li>
                                    <a href={aboutUs.maps} target='_blank'>
                                        <IconMapPin color='#FFFFFF' />
                                    </a>
                                </li>
                                <li>
                                    <Dropdown>
                                        <Dropdown.Toggle size="sm" variant="transparent" id="dropdown-basic">
                                            {language === "id" ? <span className='circle-flag fi fi-id'></span> : <span className='circle-flag fi fi-us'></span>}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item style={{ display: 'flex', alignItems: 'center', gap: '.7rem', fontFamily: "'Nunito Sans', sans-serif", fontSize: '14px', fontWeight: '600' }} onClick={() => handleLanguageChange('en')}><span className='circle-flag fi fi-us'></span>English</Dropdown.Item>
                                            <Dropdown.Item style={{ display: 'flex', alignItems: 'center', gap: '.7rem', fontFamily: "'Nunito Sans', sans-serif", fontSize: '14px', fontWeight: '600' }} onClick={() => handleLanguageChange('id')}><span className='circle-flag fi fi-id'></span>Indonesia</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                                <li>
                                    {
                                        user ?
                                            <NavLink to={user ? '/account' : '/login'}>
                                                <img className='photo-profile' src={user.image ? user.image : NoPhoto} />
                                            </NavLink>
                                            : <Link to={'/login'} className='btn-login'>Login</Link>
                                    }
                                </li>
                            </ul>
                            <button className='cart-box-btn' onClick={() => {
                                window.location.href = '/shopping/cart'
                            }}>
                                <IconShoppingCartFilled />

                                <div className='floating-cart'>
                                    <FloatingCartComponent />
                                </div>
                            </button>

                        </div>
                    </nav>
                </ContainerComponent>
            </div>
            <SidebarComponent sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} categories={categories} brands={brands} />
        </div>
    )
}

export default withTranslation()(NavbarHomeComponent);
