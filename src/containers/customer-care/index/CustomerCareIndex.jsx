import { useEffect, useState } from "react";
import FooterComponent from "../../../components/footer/FooterComponent";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import NavbarComponent from "../../../components/general/navbar/NavbarComponent";
import ScreenContainerComponent from "../../../components/general/screen-container/ScreenContainerComponent";
import CardComponent from "../../../components/pages/customer-care/index/card-component/CardComponent";
import ReturnPoliceComponent from "../../../components/pages/customer-care/index/return-police/ReturnPoliceComponent";
import ShippingInformationComponent from "../../../components/pages/customer-care/index/shipping-information/ShippingInformationComponent";
import TitleDescriptionComponent from "../../../components/pages/customer-care/index/title-description/TitleDescriptionComponent";

export default function CustomerCareIndex() {
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
                label: 'Customer Care'
            }
        ])
    }

    return (
        <div>
            <NavbarComponent />
            <ScreenContainerComponent>
                <ContainerComponent>
                    <BreadCrumbComponent lists={breadcrumb} />

                    <TitleDescriptionComponent />
                    <ShippingInformationComponent />
                    <CardComponent />
                    <ReturnPoliceComponent />
                </ContainerComponent>
            </ScreenContainerComponent>
            <FooterComponent />
        </div>
    )
}