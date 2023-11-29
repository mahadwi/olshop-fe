import IndexFooter from "../../../components/footer/indexFooter";
import BreadCrumb from "../../../components/general/breadcrumb/BreadCrumb";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import ScreenContainerComponent from "../../../components/general/screen-container/ScreenContainerComponent";
import NavbarComponent from "../../../components/homeComponents/navbar/NavbarComponent";
import OtherProductsComponent from "../../../components/pages/shop/show/other-products/OtherProductsComponent";
import ProductCartComponent from "../../../components/pages/shop/show/product-cart/ProductCartComponent";
import ProductDescriptionComponent from "../../../components/pages/shop/show/product-description/ProductDescriptionComponent";
import ProductImageComponent from "../../../components/pages/shop/show/product-images/ProductImageComponent";
import ReviewSectionComponent from "../../../components/pages/shop/show/review-section/ReviewSectionComponent";
import './shop-show.scoped.scss'

export default function ShopShow() {
    const breadcrumbs = [
        {
            label: 'Home',
            url: '/'
        },
        {
            label: 'Prada',
            url: '/'
        },
        {
            label: 'Mini Bag',
            url: '/'
        },
        {
            label: 'Prada Re-Edition 2005 Re-Nylon  mini bag',
        },
    ]

    return (
        <div className="shop-show-container">
            <NavbarComponent />
            <ScreenContainerComponent>
                <ContainerComponent>
                    <BreadCrumb lists={breadcrumbs} />
                    <div className="product-item-detail">
                        <ProductImageComponent />
                        <ProductDescriptionComponent />
                        <ProductCartComponent />
                    </div>
                    <hr />
                    <OtherProductsComponent />
                    <hr />
                    <ReviewSectionComponent />
                </ContainerComponent>
            </ScreenContainerComponent>
            <IndexFooter />
        </div>
    )
}