import { useEffect, useState } from "react";
import IndexFooter from "../../../components/footer/indexFooter";
import BreadCrumb from "../../../components/general/breadcrumb/BreadCrumb";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import NavbarComponent from "../../../components/homeComponents/navbar/NavbarComponent";
import ScreenContainerComponent from "../../../components/general/screen-container/ScreenContainerComponent";
import BannerComponent from "../../../components/pages/shop/index/banner/BannerComponent";
import TopFilterComponent from "../../../components/pages/shop/index/top-filter/TopFilterComponent";
import './shop-index.scoped.scss'
import LeftFilterComponent from "../../../components/pages/shop/index/left-filter/LeftFilterComponent";
import ProductsWrapperComponent from "../../../components/pages/shop/index/products-wrapper/ProductsWrapperComponent";

export default function ShopIndex() {
    const [breadcrumbs, setBreadcrumbs] = useState([])

    useEffect(() => {
        loadBreadcrumbs()
    }, [])

    const loadBreadcrumbs = () => {
        setBreadcrumbs([
            {
                label: 'Home',
                url: '/'
            },
            {
                label: 'Shop'
            }
        ])
    }

    return (
        <div className="shop-index-page">
            <NavbarComponent />
            <ScreenContainerComponent>
                <ContainerComponent>
                    <BreadCrumb lists={breadcrumbs} />
                    <BannerComponent />
                    <TopFilterComponent />
                    <div className="content-wrapper">
                        <LeftFilterComponent />
                        <ProductsWrapperComponent />
                    </div>
                </ContainerComponent>
            </ScreenContainerComponent>
            <IndexFooter />
        </div>
    )
}