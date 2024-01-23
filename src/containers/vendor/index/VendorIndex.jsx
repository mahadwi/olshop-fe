import { useEffect } from "react";
import './vendor.scoped.scss'
import { useLocation } from 'react-router-dom'
import 'react-responsive-modal/styles.css';
import WelcomeImage from '../../../images/online shopping app.png';
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function VendorIndex() {

    /**
     * Hooks
     * 
     */
    const { pathname } = useLocation();
    const { t } = useTranslation();
    const navigate = useNavigate()

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='vendor'>
            <ContainerComponent>
                <div className='bg-white'>
                    <div className='welcome'>
                        <div className='img-wrapper'>
                            <img src={WelcomeImage} alt='ilustrator' />
                        </div>
                        <div className='title'>{t('welcometoluxi')}</div>
                        <div className='description'>{t('startregistrationcontent')}</div>
                        <button onClick={() => navigate('1')} >{t('startregistration')}</button>
                    </div>
                </div>
            </ContainerComponent>
        </div>
    )
}
