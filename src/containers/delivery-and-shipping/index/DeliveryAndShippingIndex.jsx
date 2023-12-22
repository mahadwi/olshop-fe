import { useContext, useEffect, useState } from "react";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import ShippingInformationComponent from "../../../components/pages/delivery-and-shipping/index/shipping-information/ShippingInformationComponent";
import CardComponent from "../../../components/pages/delivery-and-shipping/index/card-component/CardComponent";
import ReturnPoliceComponent from "../../../components/pages/delivery-and-shipping/index/return-police/ReturnPoliceComponent";
import { useLocation } from "react-router-dom";
import Api from "../../../utils/Api";
import { LoadingContext } from "../../../context/LoadingContext";
import { LanguageContext } from "../../../context/LanguageContext";

export default function DeliveryAndShippingIndex() {

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
    const [deliveryShippingObject, setDeliveryShippingObject] = useState({})
    const [returnPoliceObject, setSeturnPoliceObject] = useState({})

    useEffect(() => {
        setLoading(true)

        loadBreadcrumb()
        loadDeliveryShippingObject()
        loadReturnPoliceObject()
    }, [])

    useEffect(() => {
        if (Object.keys(deliveryShippingObject).length > 0 && Object.keys(returnPoliceObject).length > 0) {
            setLoading(false)
        }
        setBreadcrumb([
            {
                label: 'Home',
                url: '/'
            },
            {
                label: deliveryShippingObject['title' + suffix]
            }
        ])
    }, [deliveryShippingObject, returnPoliceObject])

    useEffect(() => {
        setBreadcrumb([
            {
                label: 'Home',
                url: '/'
            },
            {
                label: deliveryShippingObject['title' + suffix]
            }
        ])
    }, [language]);

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

    const loadReturnPoliceObject = () => {
        Api.get('/return-police')
            .then((res) => {
                if (res) {
                    setSeturnPoliceObject(res.data.data[0])
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
                <ReturnPoliceComponent returnPoliceObject={returnPoliceObject} />
            </ContainerComponent>
        </div>
    )
}
