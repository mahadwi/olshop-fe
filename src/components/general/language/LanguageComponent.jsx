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
                <div className='languages'>
                    <button className='close-modal' type='button' onClick={() => {
                        setShowLanguage(false);
                    }}><IconX /></button>
                    <div className='language'>
                        <img src='https://flagicons.lipis.dev/flags/4x3/us.svg' alt='US flag' />
                        English
                        <button onClick={() => {
                            localStorage.setItem('popupLanguage', 'true')
                            setShowLanguage(false);
                            changeLanguage('en')
                            setLanguage('en')
                        }}>Choose Language</button>
                    </div>
                    <div className='language'>
                        <img src='https://flagicons.lipis.dev/flags/4x3/id.svg' alt='Indonesia flag' />
                        Indonesia
                        <button className='secondary' onClick={() => {
                            localStorage.setItem('popupLanguage', 'true')
                            setShowLanguage(false);
                            changeLanguage('id')
                            setLanguage('id')
                        }}>Pilih Bahasa</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
