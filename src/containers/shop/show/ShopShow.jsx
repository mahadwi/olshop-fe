import { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import OtherProductsComponent from "../../../components/pages/shop/show/other-products/OtherProductsComponent";
import ProductCartComponent from "../../../components/pages/shop/show/product-cart/ProductCartComponent";
import ProductDescriptionComponent from "../../../components/pages/shop/show/product-description/ProductDescriptionComponent";
import ProductDescriptionMobileComponent from "../../../components/pages/shop/show/product-description-mobile/ProductDescriptionMobileComponent";
import ProductImageComponent from "../../../components/pages/shop/show/product-images/ProductImageComponent";
import ReviewSectionComponent from "../../../components/pages/shop/show/review-section/ReviewSectionComponent";
import './shop-show.scoped.scss'
import { useParams, useLocation } from "react-router-dom";
import Api from "../../../utils/Api";
import { AuthUserContext } from "../../../context/AuthUserContext";

export default function ShopShow() {

    /**
     * Hooks
     * 
     */
    const { pathname } = useLocation();
    const { id } = useParams();

    /**
     * Context
     * 
     */
    const { user } = useContext(AuthUserContext)

    /**
     * Main State
     * 
     */
    const [productObj, setProductObj] = useState({})
    const [productCategory, setProductCategory] = useState({})
    const [productsByCategory, setProductsByCategory] = useState([])
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

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        loadProductObj()
    }, [])

    useEffect(() => {
        loadProductCategories()
    }, [productObj])

    useEffect(() => {
        if (Object.keys(productCategory ? productCategory : {}).length > 0) {
            loadProductsByCategory()
        }
    }, [productCategory])

    const loadProductObj = () => {
        Api.get(`/product/${id}`)
            .then((res) => {
                setProductObj(res.data.data)
            })
    }

    const loadProductCategories = () => {
        Api.get('/product-category')
            .then((res) => {
                setProductCategory(res.data.data.find((e) => e.name = productObj.category))
            })
    }

    const loadProductsByCategory = () => {
        Api.get(`/product`, {
            params: {
                category_id: [productCategory.id]
            }
        })
            .then((res) => {
                setProductsByCategory(res.data.data)
            })
    }

    return (
        <div className="shop-show-container">
            <ContainerComponent>
                <BreadCrumb lists={breadcrumbs} />
                <div className="product-item-detail">
                    <ProductImageComponent productImages={productObj.images ? productObj.images : []} />
                    <ProductDescriptionComponent productObj={productObj} />
                    <ProductCartComponent onlyDesktop={true} productObj={productObj} />
                </div>
                <hr />
                <OtherProductsComponent user={user} productsByCategory={productsByCategory} />
                <hr className='only-mobile' />
                <ProductCartComponent onlyMobile={true} productObj={productObj} />
                <hr className='only-mobile' />
                <ProductDescriptionMobileComponent productObj={productObj} />
                <hr />
                <ReviewSectionComponent />
            </ContainerComponent>
        </div>
    )
}
