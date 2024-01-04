import { Link, useLocation } from 'react-router-dom'
import './sidebar.scoped.scss'
import { IconX } from '@tabler/icons-react'
import { useRef, useContext } from 'react'
import { LanguageContext } from '../../../context/LanguageContext'
import { changeLanguage } from '../../../translations/i18n'

export default function SidebarComponent({ toggleSidebar, sidebarOpen, categories, brands }) {
    /**
     * Hooks
     * 
     */
    const { pathname } = useLocation()

    const { language, setLanguage } = useContext(LanguageContext)

    const sidebarRef = useRef()

    const handleLanguageChange = (lng) => {
        changeLanguage(lng);
        setLanguage(lng)
    };

    return (
        <aside className={`${sidebarOpen ? 'show' : ''}`} ref={sidebarRef}>
            <ul className='side-links-wrapper'>
                <li className='side-link-item'>
                    <Link to={'/'} onClick={() => {
                        if (pathname == '/') {
                            window.location.reload()
                        }
                    }} className='side-link-item-a'>HOME</Link>
                </li>
                <li className='side-link-item'>
                    <Link to={'/shop'} className='side-link-item-a'>SHOP</Link>
                </li>
                <li className='side-link-item dropdown' onClick={(e) => {
                    e.currentTarget.classList.toggle('show-dropdown')
                }}>
                    <Link className='side-link-item-a'>COLLECTIVE</Link>

                    <ul className='dropdown-content'>
                        {categories.map((data, index) =>
                            <li key={index}><a href={`/collective/${data.id}`}>{data.name}</a></li>
                        )}
                    </ul>
                </li>
                <li className='side-link-item dropdown' onClick={(e) => {
                    e.currentTarget.classList.toggle('show-dropdown')
                }}>
                    <Link className='side-link-item-a'>DESIGNERS</Link>

                    <ul className='dropdown-content'>
                        {brands.map((data, index) =>
                            <li key={index}><a href={`/collective/${data.id}`}>{data.name}</a></li>
                        )}
                    </ul>
                </li>
                <li className='side-link-item'>
                    <Link to={'/about-us'} className='side-link-item-a'>ABOUT US</Link>
                </li>
                <li className='side-link-item'>
                    <Link to={'/contact'} className='side-link-item-a'>CONTACT</Link>
                </li>
                <li className='side-link-item event'>
                    <Link to={'/event'} className='side-link-item-a'>EVENT</Link>
                </li>
                <li className='side-link-item'>
                    <Link to={'/profile'} className='side-link-item-a'>PROFILE</Link>
                </li>
                <li className='side-link-item'>
                    <Link className='side-link-item-a'>LOCATION STORE</Link>
                </li>
                <li className='side-link-item dropdown'>
                    <Link className='side-link-item-a' onClick={(e) => e.currentTarget.parentElement.classList.toggle('show-dropdown')}>LANGUAGE <span className='flag'><span className={`circle-flag fi fi-${language == 'id' ? 'id' : 'us' }`}></span> {language == 'id' ? 'ID' : 'ENGLISH (US)'}</span></Link>
                    <ul className='dropdown-content languages'>
                        <li><a href={`javascript:void(0)`} className={`${language == 'id' ? 'active' : ''}`} onClick={() => handleLanguageChange('id')}><span className='circle-flag fi fi-id'></span> ID</a></li>
                        <li><a href={`javascript:void(0)`} className={`${language != 'id' ? 'active' : ''}`} onClick={() => handleLanguageChange('en')}><span className='circle-flag fi fi-us'></span> ENGLISH (US)</a></li>
                    </ul>
                </li>
                <li className='side-link-item'>
                    <Link className='side-link-item-a'>LOG OUT</Link>
                </li>
            </ul>
            <button className='close-sidebar-btn' onClick={() => {
                toggleSidebar()
            }}><IconX /></button>
        </aside>
    )
}
