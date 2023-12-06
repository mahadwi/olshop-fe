import { useEffect, useState } from "react";
import FooterComponent from "../../../components/footer/FooterComponent";
import BreadCrumb from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import NavbarComponent from "../../../components/general/navbar/NavbarComponent";
import ScreenContainerComponent from "../../../components/general/screen-container/ScreenContainerComponent";
import BannerComponent from "../../../components/pages/shop/index/banner/BannerComponent";
import TopFilterComponent from "../../../components/pages/shop/index/top-filter/TopFilterComponent";
import './shop-index.scoped.scss'
import LeftFilterComponent from "../../../components/pages/shop/index/left-filter/LeftFilterComponent";
import ProductsWrapperComponent from "../../../components/pages/shop/index/products-wrapper/ProductsWrapperComponent";
import Api from "../../../utils/Api";
import LoadingComponent from "../../../components/general/loading/LoadingComponent";
import { useLocation, useSearchParams } from 'react-router-dom';

export default function ShopIndex() {

    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = searchParams.get('page');

    const { pathname } = useLocation();
    const [loading, setLoading] = useState(true)
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const [products, setProducts] = useState([])
    const [productCategories, setProductCategories] = useState([])
    const [productColors, setProductColors] = useState([])
    const [brands, setBrands] = useState([])
    const [selectedBrands, setSelectedBrands] = useState([])
    const [selectedProductCategories, setSelectedProductCategories] = useState([])
    const [selectedPriceMinAndMax, setSelectedPriceMinAndMax] = useState({
        price_min: 1000000,
        price_max: 150000000,
    })
    const [selectedFilterColor, setSelectedFilterColor] = useState([])
    const [metaPagination, setMetaPagination] = useState({})
    const [bannerObj, setBannerObj] = useState({})
    const sortOptions = [
        { value: 'is_new_arrival', label: 'New Arrival' },
        { value: 'price_asc', label: 'Price, low to high' },
        { value: 'price_desc', label: 'Price, high to low' },
        { value: 'name_asc', label: 'ALphabetical, A - Z' },
        { value: 'name_desc', label: 'ALphabetical, Z - A' },
        { value: 'date_desc', label: 'Date, old to new' },
        { value: 'date_asc', label: 'Date, new to old' },
    ];
    const [selectedSortOption, setSelectedSortOption] = useState({ value: 'is_new_arrival', label: 'New Arrival' })
    const [user, setUser] = useState(null)

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

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

    useEffect(() => {
        loadProducts()
        loadBrands()
        loadProductCategories()
        loadProductColors()
        loadBanners()
        loadUser()
    }, [])

    useEffect(() => {
        loadProducts()
    }, [selectedBrands, selectedProductCategories, selectedPriceMinAndMax, selectedFilterColor, searchParams, selectedSortOption])

    const loadProducts = () => {
        setLoading(true)
        Api.get('/product', {
            params: {
                brand_id: selectedBrands,
                category_id: selectedProductCategories,
                price_min: selectedPriceMinAndMax.price_min,
                price_max: selectedPriceMinAndMax.price_max,
                color_id: selectedFilterColor,
                itemPerpage: 10,
                page: currentPage ? currentPage : 1,
                is_new_arrival: selectedSortOption.value == 'is_new_arrival' ? 1 : 0,
                sort_by: selectedSortOption.value != 'is_new_arrival' ? selectedSortOption.value : null
            }
        })
            .then((res) => {
                setProducts(res.data.data)
                setMetaPagination(res.data.meta)
                setLoading(false)
            })
    }

    const loadBrands = () => {
        Api.get('/brand')
            .then((res) => {
                setBrands(res.data.data)
            })
    }

    const loadProductCategories = () => {
        Api.get('/product-category')
            .then((res) => {
                setProductCategories(res.data.data)
            })
    }

    const loadProductColors = () => {
        Api.get('/color')
            .then((res) => {
                setProductColors(res.data.data)
            })
    }

    const loadBanners = () => {
        Api.get('/banner')
            .then((res) => {
                setBannerObj(res.data.data.find((e) => e.section == 'Shop'))
            })
    }

    const loadUser = () => {
        Api.get('/user', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apiToken')
            }
        }).then((res) => {
            if (res) {
                setUser(res.data.data)
            }
        }).catch((err) => {

        })
    }

    return (
        <div className="shop-index-page">

            <LoadingComponent loading={loading} />

            <NavbarComponent />
            <ScreenContainerComponent>
                <ContainerComponent>
                    <BreadCrumb lists={breadcrumbs} />
                    <BannerComponent bannerObj={bannerObj} />
                    <TopFilterComponent productResultAmount={products.length} sortOptions={sortOptions} selectedSortOption={selectedSortOption} setSelectedSortOption={setSelectedSortOption} />
                    <div className="content-wrapper">
                        <LeftFilterComponent
                            brands={brands}
                            productCategories={productCategories}
                            productColors={productColors}
                            selectedBrands={selectedBrands}
                            setSelectedBrands={setSelectedBrands}
                            selectedProductCategories={selectedProductCategories}
                            setSelectedProductCategories={setSelectedProductCategories}
                            selectedPriceMinAndMax={selectedPriceMinAndMax}
                            setSelectedPriceMinAndMax={setSelectedPriceMinAndMax}
                            selectedFilterColor={selectedFilterColor}
                            setSelectedFilterColor={setSelectedFilterColor}
                        />
                        <ProductsWrapperComponent user={user} products={products} metaPagination={metaPagination} setMetaPagination={setMetaPagination} />
                    </div>
                </ContainerComponent>
            </ScreenContainerComponent>
            <FooterComponent />
        </div>
    )
}