import { useEffect, useState } from "react";
import BreadCrumb from "../../../components/general/breadcrumb/BreadCrumb";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import './contact.scoped.scss'
import HeroComponent from "../../../components/pages/contact/index/hero/HeroComponent";
import FormComponent from "../../../components/pages/contact/index/form/FormComponent";
import ContactComponent from "../../../components/pages/contact/index/contact/ContactComponent";
import NavbarComponent from "../../../components/homeComponents/navbar/NavbarComponent";
import IndexFooter from "../../../components/footer/indexFooter";
import { useLocation } from 'react-router-dom';
import Api from "../../../utils/Api";
import LoadingComponent from "../../../components/general/loading/LoadingComponent";

export default function ContactIndex() {

    const { pathname } = useLocation();
    const [contactObj, setContactObj] = useState({})
    const [loading, setLoading] = useState(true)

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
        <div>
            <LoadingComponent loading={loading} />

            <div className="contact-page">

                <NavbarComponent />

                <ContainerComponent>
                    {/* Breadcrumb */}
                    <BreadCrumb
                        lists={[
                            {
                                label: 'Home',
                                url: '/'
                            }, {
                                label: 'Contact'
                            }]
                        }
                    />
                    {/* Breadcrumb */}

                    <HeroComponent />

                    {/* Content */}
                    <h1 className="title-love">We’d love to hear from you</h1>
                    {/* End of Content */}

                    <div className="horizontal-line"></div>

                    <div className="form-and-contact-wrapper">
                        <FormComponent />
                        <ContactComponent contactObj={contactObj} />
                    </div>

                </ContainerComponent>
            </div>
            <IndexFooter />
        </div>
    )
}