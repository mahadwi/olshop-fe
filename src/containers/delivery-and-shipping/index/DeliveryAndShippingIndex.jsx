import { useEffect, useState } from "react";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import ShippingInformationComponent from "../../../components/pages/delivery-and-shipping/index/shipping-information/ShippingInformationComponent";
import CardComponent from "../../../components/pages/delivery-and-shipping/index/card-component/CardComponent";
import ReturnPoliceComponent from "../../../components/pages/delivery-and-shipping/index/return-police/ReturnPoliceComponent";
import { useLocation } from "react-router-dom";
import Api from "../../../utils/Api";

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
    const [deliveryShippingObject, setDeliveryShippingObject] = useState({})

    useEffect(() => {
        loadBreadcrumb()
        loadDeliveryShippingObject()
    }, [])

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const loadDeliveryShippingObject = () => {
        Api.get('/delivery-shipping')
            .then((res) => {
                if (res) {
                    setDeliveryShippingObject(res.data.data[0])
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
                label: 'Delivery And Shipping'
            }
        ])
    }

    return (
        <div>
            <ContainerComponent>
                <BreadCrumbComponent lists={breadcrumb} />

                <ShippingInformationComponent deliveryShippingObject={deliveryShippingObject} />
                <CardComponent />
                <ReturnPoliceComponent />
            </ContainerComponent>
        </div>
    )
}