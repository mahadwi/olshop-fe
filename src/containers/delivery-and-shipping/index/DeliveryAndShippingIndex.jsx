import { useEffect, useState } from "react";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import ShippingInformationComponent from "../../../components/pages/delivery-and-shipping/index/shipping-information/ShippingInformationComponent";
import CardComponent from "../../../components/pages/delivery-and-shipping/index/card-component/CardComponent";
import ReturnPoliceComponent from "../../../components/pages/delivery-and-shipping/index/return-police/ReturnPoliceComponent";
import { useLocation } from "react-router-dom";

export default function DeliveryAndShippingIndex() {

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

    useEffect(() => {
        loadBreadcrumb()
    }, [])

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const loadBreadcrumb = () => {
        setBreadcrumb([
            {
                label: 'Home',
                url: '/'
            },
            {
                label: 'Delivery And Shipping'
            }
        ])
    }

    return (
        <div>
            <ContainerComponent>
                <BreadCrumbComponent lists={breadcrumb} />

                <ShippingInformationComponent />
                <CardComponent />
                <ReturnPoliceComponent />
            </ContainerComponent>
        </div>
    )
}