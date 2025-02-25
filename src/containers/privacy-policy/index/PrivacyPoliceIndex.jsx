import { useContext, useEffect, useState } from "react";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import './privacy-police.scoped.scss'
import './privacy-police.css'
import { useLocation } from "react-router-dom";
import Api from "../../../utils/Api";
import { LoadingContext } from "../../../context/LoadingContext";
import { LanguageContext } from "../../../context/LanguageContext";

export default function PrivacyPoliceIndex() {

    /**
     * Hooks
     * 
     */
    const { pathname } = useLocation();

    /**
     * Context
     * 
     */
    const { setLoading } = useContext(LoadingContext)
    const { language } = useContext(LanguageContext)
    const suffix = language == 'id' ? '' : '_en';

    /**
     * Main State
     * 
     */
    const [breadcrumb, setBreadcrumb] = useState([])
    const [privacyPoliceObject, setPrivacyPoliceObject] = useState({})

    useEffect(() => {
        loadBreadcrumb()
        loadPrivacyPoliceObject()
    }, [])

    useEffect(() => {
        setBreadcrumb([
            {
                label: 'Home',
                url: '/'
            },
            {
                label: privacyPoliceObject['title' + suffix]
            }
        ])
    }, [language, privacyPoliceObject]);

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const loadPrivacyPoliceObject = () => {
        setLoading(true)
        Api.get('/privacy-police')
            .then((res) => {
                if (res) {
                    setPrivacyPoliceObject(res.data.data[0])
                }
            }).finally(() => {
                setLoading(false)
            })
    }

    const loadBreadcrumb = () => {
        setBreadcrumb([
            {
                label: 'Home',
                url: '/'
            },
            {
                label: 'Privacy Police',
            }
        ])
    }

    return (
        <div>
            <div className="privacy-police" data-id="sdfsdf">
                <ContainerComponent>
                    <BreadCrumbComponent lists={breadcrumb} />
                </ContainerComponent>

                <div className="hero">
                    <img src={privacyPoliceObject.image_url} alt="" />
                </div>
                <ContainerComponent>
                    <div className="body">
                        <p dangerouslySetInnerHTML={{ __html: privacyPoliceObject['description'+suffix] }}>
                        </p>
                    </div>
                </ContainerComponent>
            </div>
        </div>
    )
}
