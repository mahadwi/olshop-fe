import { useEffect, useState, useContext } from 'react'
import { IconX } from '@tabler/icons-react'
import {LanguageContext} from '../../../context/LanguageContext';
import './language.scoped.scss'
import { changeLanguage } from '../../../translations/i18n'

export default function LanguageComponent({ loading }) {
    /**
     * Main State
     * 
     */
    const [showLanguage, setShowLanguage] = useState(false)
    const { setLanguage } = useContext(LanguageContext)

    useEffect(() => {
        if (!loading && !localStorage.getItem("popupLanguage")) {
            setTimeout(() => {
                setShowLanguage(true)
            }, 200);
        }
    }, [loading])

    return (
        <div className={`language-component ${showLanguage ? 'show': ''}`}>
            <div className={`language-content ${showLanguage ? 'show': ''}`}>
                <button className='close-modal' type='button' onClick={() => {
                    setShowLanguage(false);
                }}><IconX /></button>
                <div className='title'>Looks like you’re shopping {!Intl.DateTimeFormat().resolvedOptions().locale.includes('id') ? 'not ' : null }from Indonesia</div>
                <div className='languages'>
                    <div className='language'>
                        <img src='https://flagicons.lipis.dev/flags/4x3/id.svg' alt='Indonesia flag' />
                        <div className='list'>
                            Indonesian
                            <ul>
                                <li>Prices and payment amounts are displayed in IDR</li>
                            </ul>
                        </div>
                        <button className='secondary' onClick={() => {
                            localStorage.setItem('popupLanguage', 'true')
                            setShowLanguage(false);
                            changeLanguage('id')
                            setLanguage('id')
                        }}>Select</button>
                    </div>
                    <div className='language'>
                        <img src='https://flagicons.lipis.dev/flags/4x3/us.svg' alt='US flag' />
                        <div className='list'>
                            English (US)
                            <ul>
                                <li>Prices and payment amounts are displayed in $</li>
                            </ul>
                        </div>
                        <button onClick={() => {
                            localStorage.setItem('popupLanguage', 'true')
                            setShowLanguage(false);
                            changeLanguage('en')
                            setLanguage('en')
                        }}>Select</button>
                    </div>
                </div>
                <div className='bottom'><a href='/contact'>Contact us</a> if you have question about choosing language</div>
            </div>
        </div>
    )
}
