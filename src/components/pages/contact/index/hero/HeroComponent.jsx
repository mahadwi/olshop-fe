import contactHeroImage from './../../../../../images/contact-hero.png'
import './hero.scoped.scss'
import { useTranslation } from "react-i18next";

export default function HeroComponent() {
    /**
     * Hooks
     * 
     */
    const { t } = useTranslation();

    return (
        <div className='hero' style={{ backgroundImage: `url(${contactHeroImage})` }}>
            <h1>{t('contact')}</h1>
        </div>
    )
}
