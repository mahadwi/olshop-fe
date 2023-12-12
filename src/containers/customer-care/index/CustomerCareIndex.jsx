import { useEffect, useState } from "react";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import CardComponent from "../../../components/pages/customer-care/index/card-component/CardComponent";
import ReturnPoliceComponent from "../../../components/pages/customer-care/index/return-police/ReturnPoliceComponent";
import ShippingInformationComponent from "../../../components/pages/customer-care/index/shipping-information/ShippingInformationComponent";
import TitleDescriptionComponent from "../../../components/pages/customer-care/index/title-description/TitleDescriptionComponent";
import { useLocation } from "react-router-dom";
import Api from "../../../utils/Api";

export default function CustomerCareIndex() {

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
    const [customerCareObject, setCustomerCareObject] = useState({})

    useEffect(() => {
        loadBreadcrumb()
        loadCustomerCareObject()
    }, [])

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const loadCustomerCareObject = () => {
        Api.get('/customer-care')
            .then((res) => {
                if (res) {
                    setCustomerCareObject(res.data.data[0])
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

                <TitleDescriptionComponent />
                <ShippingInformationComponent />
                <CardComponent />
                <ReturnPoliceComponent />
            </ContainerComponent>
        </div>
    )
}