import { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import BannerComponent from "../../../components/pages/shop/index/banner/BannerComponent";
import TopFilterComponent from "../../../components/pages/shop/index/top-filter/TopFilterComponent";
import './shop-index.scoped.scss'
import LeftFilterComponent from "../../../components/pages/shop/index/left-filter/LeftFilterComponent";
import ProductsWrapperComponent from "../../../components/pages/shop/index/products-wrapper/ProductsWrapperComponent";
import Api from "../../../utils/Api";
import { useLocation, useSearchParams } from 'react-router-dom';
import { LoadingContext } from "../../../context/LoadingContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { useTranslation } from "react-i18next";

export default function ShopIndex() {

    const [searchParams] = useSearchParams();
    const currentPage = searchParams.get('page');
    const { pathname, search } = useLocation();

    const { setLoading } = useContext(LoadingContext)
    const { language } = useContext(LanguageContext)
    const { user } = useContext(AuthUserContext)
    const { t } = useTranslation();

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
    ].map(({ value, label }) => ({ value, label: t(label) }));
    const [selectedSortOption, setSelectedSortOption] = useState({ value: 'name_asc', label: t('ALphabetical, A - Z') })
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [showLoadMore, setLoadMore] = useState(false);

    // Automatically scrolls to top whenever pathname or search changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname, search]);

    useEffect(() => {
        loadBreadcrumbs()
        loadFirstTimeSelectedSortOption()
    }, [])

    const loadFirstTimeSelectedSortOption = () => {
        const sortOption = sortOptions.find((sortOption) => sortOption.value == searchParams.get('sort_option'));
        if (sortOption) {
            setSelectedSortOption({ value: searchParams.get('sort_option'), label: t(sortOption.label) })
        }
    }

    const loadBreadcrumbs = () => {
        setBreadcrumbs([
            {
                label: language == 'id' ? 'Beranda' : 'Home',
                url: '/'
            },
            {
                label: language == 'id' ? 'Toko' : 'Shop',
            }
        ])
    }

    useEffect(() => {
        loadBreadcrumbs()
    }, [language])

    useEffect(() => {
        loadProducts()
        loadBrands()
        loadProductCategories()
        loadProductColors()
        loadBanners()
    }, [])

    useEffect(() => {
        loadProducts()
    }, [selectedBrands, selectedProductCategories, selectedPriceMinAndMax, selectedFilterColor, searchParams, selectedSortOption, user])

    const loadProducts = () => {
        if (user !== false) {
            setLoading(true)
            Api.get('/product', {
                params: {
                    user_id: user ? user.id : null,
                    brand_id: selectedBrands,
                    category_id: selectedProductCategories,
                    price_min: selectedPriceMinAndMax.price_min,
                    price_max: selectedPriceMinAndMax.price_max,
                    color_id: selectedFilterColor,
                    itemPerpage: 12,
                    page: currentPage ? currentPage : 1,
                    is_new_arrival: selectedSortOption.value == 'is_new_arrival' ? 1 : 0,
                    sort_by: selectedSortOption.value != 'is_new_arrival' ? selectedSortOption.value : null
                }
            })
                .then((res) => {
                    setProducts(res.data.data)
                    setMetaPagination(res.data.meta)
                    setLoading(false)
                    setLoadMore(true)
                })
        }
    }

    const loadMoreProducts = () => {
        if (user !== false) {
            setLoading(true)
            setLoadMore(false)
            Api.get('/product', {
                params: {
                    user_id: user ? user.id : null,
                    brand_id: selectedBrands,
                    category_id: selectedProductCategories,
                    price_min: selectedPriceMinAndMax.price_min,
                    price_max: selectedPriceMinAndMax.price_max,
                    color_id: selectedFilterColor,
                    itemPerpage: 12,
                    page: metaPagination.nextPage,
                    is_new_arrival: selectedSortOption.value == 'is_new_arrival' ? 1 : 0,
                    sort_by: selectedSortOption.value != 'is_new_arrival' ? selectedSortOption.value : null
                }
            })
                .then((res) => {
                    setProducts((c) => [...c, ...res.data.data])
                    setMetaPagination(res.data.meta)
                    setLoading(false)
                    setLoadMore(true)
                })
        }
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

    return (
        <div className="shop-index-page">

            <ContainerComponent>
                <BreadCrumb lists={breadcrumbs} />
                <BannerComponent bannerObj={bannerObj} />
                <TopFilterComponent productResultAmount={products.length} sortOptions={sortOptions} selectedSortOption={selectedSortOption} setSelectedSortOption={setSelectedSortOption} setShowMobileFilter={setShowMobileFilter} />
                <div className="content-wrapper">
                    <LeftFilterComponent
                        showMobileFilter={showMobileFilter}
                        setShowMobileFilter={setShowMobileFilter}
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
                    <ProductsWrapperComponent user={user} products={products} metaPagination={metaPagination} setMetaPagination={setMetaPagination} showLoadMore={showLoadMore} loadMoreProducts={loadMoreProducts} />
                </div>
            </ContainerComponent>
        </div>
    )
}
