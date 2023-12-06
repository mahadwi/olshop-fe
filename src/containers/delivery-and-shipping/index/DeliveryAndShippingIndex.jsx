import { useEffect, useState } from "react";
import FooterComponent from "../../../components/footer/FooterComponent";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import NavbarComponent from "../../../components/general/navbar/NavbarComponent";
import ScreenContainerComponent from "../../../components/general/screen-container/ScreenContainerComponent";
import ShippingInformationComponent from "../../../components/pages/delivery-and-shipping/index/shipping-information/ShippingInformationComponent";
import CardComponent from "../../../components/pages/delivery-and-shipping/index/card-component/CardComponent";
import ReturnPoliceComponent from "../../../components/pages/delivery-and-shipping/index/return-police/ReturnPoliceComponent";

export default function DeliveryAndShippingIndex() {
    const [breadcrumb, setBreadcrumb] = useState([])

    useEffect(() => {
        loadBreadcrumb()
    }, [])

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
            <NavbarComponent />
            <ScreenContainerComponent>
                <ContainerComponent>
                    <BreadCrumbComponent lists={breadcrumb} />

                    <ShippingInformationComponent />
                    <CardComponent />
                    <ReturnPoliceComponent />
                </ContainerComponent>
            </ScreenContainerComponent>
            <FooterComponent />
        </div>
    )
}