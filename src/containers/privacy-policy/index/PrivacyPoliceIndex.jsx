import { useEffect, useState } from "react";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import './privacy-police.scoped.scss'
import './privacy-police.css'
import { useLocation } from "react-router-dom";
import Api from "../../../utils/Api";

export default function PrivacyPoliceIndex() {

    /**
     * Hooks
     * 
     */
    const { pathname } = useLocation();

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

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const loadPrivacyPoliceObject = () => {
        Api.get('/privacy-police')
            .then((res) => {
                if (res) {
                    console.log(res.data.data[0])
                    setPrivacyPoliceObject(res.data.data[0])
                }
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
                        <h3>PRIVACY POLICY PT LUXI AS LUXI</h3>

                        <p dangerouslySetInnerHTML={{ __html: privacyPoliceObject.description }}>
                        </p>
                    </div>
                </ContainerComponent>
            </div>
        </div>
    )
}