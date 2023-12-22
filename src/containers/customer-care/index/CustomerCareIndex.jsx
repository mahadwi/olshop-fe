import { useContext, useEffect, useState } from "react";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import CardComponent from "../../../components/pages/customer-care/index/card-component/CardComponent";
import ReturnPoliceComponent from "../../../components/pages/customer-care/index/return-police/ReturnPoliceComponent";
import ShippingInformationComponent from "../../../components/pages/customer-care/index/shipping-information/ShippingInformationComponent";
import TitleDescriptionComponent from "../../../components/pages/customer-care/index/title-description/TitleDescriptionComponent";
import { useLocation } from "react-router-dom";
import Api from "../../../utils/Api";
import { LoadingContext } from "../../../context/LoadingContext";
import { LanguageContext } from "../../../context/LanguageContext";

export default function CustomerCareIndex() {

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
    const [customerCareObject, setCustomerCareObject] = useState({})
    const [returnPoliceObject, setReturnPoliceObject] = useState({})

    useEffect(() => {
        setLoading(true)

        loadBreadcrumb()
        loadCustomerCareObject()
        loadReturnPoliceObject()
    }, [])

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        if (Object.keys(customerCareObject).length > 0 && Object.keys(returnPoliceObject).length > 0) {
            setLoading(false)
        }
        setBreadcrumb([
            {
                label: 'Home',
                url: '/'
            },
            {
                label: customerCareObject['title' + suffix]
            }
        ])
    }, [customerCareObject, returnPoliceObject])

    useEffect(() => {
        setBreadcrumb([
            {
                label: 'Home',
                url: '/'
            },
            {
                label: customerCareObject['title' + suffix]
            }
        ])
    }, [language]);

    const loadCustomerCareObject = () => {
        Api.get('/customer-care')
            .then((res) => {
                if (res) {
                    setCustomerCareObject(res.data.data[0])
                }
            })
    }

    const loadReturnPoliceObject = () => {
        Api.get('/return-police')
            .then((res) => {
                if (res) {
                    setReturnPoliceObject(res.data.data[0])
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
                label: 'Customer Care'
            }
        ])
    }

    return (
        <div>
            <ContainerComponent>
                <BreadCrumbComponent lists={breadcrumb} />

                <TitleDescriptionComponent customerCareObject={customerCareObject} />
                <CardComponent />
                <ReturnPoliceComponent returnPoliceObject={returnPoliceObject} />
            </ContainerComponent>
        </div>
    )
}
