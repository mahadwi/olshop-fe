import { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import './contact.scoped.scss'
import HeroComponent from "../../../components/pages/contact/index/hero/HeroComponent";
import FormComponent from "../../../components/pages/contact/index/form/FormComponent";
import ContactComponent from "../../../components/pages/contact/index/contact/ContactComponent";
import { useLocation } from 'react-router-dom';
import Api from "../../../utils/Api";
import { LoadingContext } from "../../../context/LoadingContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { useTranslation } from "react-i18next";

export default function ContactIndex() {

    /**
     * Hooks
     * 
     */
    const { pathname } = useLocation();
    const { t } = useTranslation();


    /**
     * Context
     * 
     */
    const { setLoading } = useContext(LoadingContext)
    const { language } = useContext(LanguageContext)

    /**
     * Main State
     * 
     */
    const [contactObj, setContactObj] = useState({})

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        loadContact()
    }, [])

    const loadContact = () => {
        setLoading(true)

        Api.get('/contact')
            .then((res) => {
                setContactObj(res.data.data[0])

                setLoading(false)
            })
    }

    return (
        <div className="contact-page">
            <ContainerComponent>
                {/* Breadcrumb */}
                <BreadCrumb
                    lists={[{
                        label: language == 'id' ? 'Beranda' : 'Home',
                        url: '/'
                    }, {
                        label: language == 'id' ? 'Kontak' : 'Contact'
                    }]}
                />
                {/* Breadcrumb */}

                <HeroComponent />

                {/* Content */}
                <h1 className="title-love">{t('contactindextitle')}</h1>
                {/* End of Content */}

                <div className="horizontal-line"></div>

                <div className="form-and-contact-wrapper">
                    <FormComponent />
                    <ContactComponent contactObj={contactObj} />
                </div>

            </ContainerComponent>
        </div>
    )
}
