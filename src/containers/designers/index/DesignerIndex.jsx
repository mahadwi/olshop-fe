import { useSearchParams, useParams } from "react-router-dom";
import FooterComponent from "../../../components/footer/FooterComponent";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import LoadingComponent from "../../../components/general/loading/LoadingComponent";
import ScreenContainerComponent from "../../../components/general/screen-container/ScreenContainerComponent";
import NavbarComponent from "../../../components/general/navbar/NavbarComponent";
import BannerComponent from "../../../components/pages/designer/index/banner/BannerComponent";
import ProductsWrapperComponent from "../../../components/pages/designer/index/products-wrapper/ProductsWrapperComponent";
import TopFilterComponent from "../../../components/pages/designer/index/top-filter/TopFilterComponent";
import { useContext, useEffect, useState } from "react";
import Api from "../../../utils/Api";
import { LoadingContext } from "../../../context/LoadingContext";
import { AuthUserContext } from "../../../context/AuthUserContext";

export default function DesignerIndex() {

    /**
     * Hooks
     * 
     */
    const [searchParams] = useSearchParams();
    const { id } = useParams();
    const currentPage = searchParams.get('page');

    /**
     * Context
     * 
     */
    const { setLoading } = useContext(LoadingContext)
    const { user } = useContext(AuthUserContext)

    /**
     * Page State
     * 
     */
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [searchNameProduct, setSearchNameProduct] = useState(null)
    const [selectedSortOption, setSelectedSortOption] = useState({ value: 'name_asc', label: 'ALphabetical, A - Z' })
    const [products, setProducts] = useState([])
    const [metaPagination, setMetaPagination] = useState({})
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const sortOptions = [
        { value: 'is_new_arrival', label: 'New Arrival' },
        { value: 'price_asc', label: 'Price, low to high' },
        { value: 'price_desc', label: 'Price, high to low' },
        { value: 'name_asc', label: 'ALphabetical, A - Z' },
        { value: 'name_desc', label: 'ALphabetical, Z - A' },
        { value: 'date_desc', label: 'Date, old to new' },
        { value: 'date_asc', label: 'Date, new to old' },
    ];
    const [bannerObj, setBannerObj] = useState({})

    useEffect(() => {
        loadBreadcrumbs()
        loadCategories()
        loadBannerObj()
    }, [])

    useEffect(() => {
        loadProducts()
    }, [id, selectedSortOption, searchNameProduct, selectedCategories])

    const loadProducts = () => {
        setLoading(true)

        Api.get('/product', {
            params: {
                search: searchNameProduct,
                category_id: selectedCategories,
                brand_id: [id],
                is_new_arrival: selectedSortOption.value == 'is_new_arrival' ? 1 : 0,
                sort_by: selectedSortOption.value != 'is_new_arrival' ? selectedSortOption.value : null,
                itemPerpage: 10,
                page: currentPage ? currentPage : 1,
            }
        })
            .then((res) => {
                setProducts(res.data.data)
                setMetaPagination(res.data.meta)
                setLoading(false)
            })
    }

    const loadBreadcrumbs = () => {
        setBreadcrumbs([
            {
                label: 'Home',
                url: '/'
            },
            {
                label: 'Collections',
            }
        ])
    }

    const loadCategories = () => {
        Api.get('/product-category')
            .then((res) => {
                setCategories(res.data.data)
            })
    }

    const loadBannerObj = () => {
        Api.get('/banner')
            .then((res) => {
                setBannerObj(res.data.data.find((e) => e.section == 'Designer'))
            })
    }

    return (
        <div>
            <ContainerComponent>
                <BreadCrumbComponent lists={breadcrumbs} />
            </ContainerComponent>
            <BannerComponent bannerObj={bannerObj} />
            <ContainerComponent>
                <TopFilterComponent categories={categories} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} searchNameProduct={searchNameProduct} setSearchNameProduct={setSearchNameProduct} productResultAmount={products.length} sortOptions={sortOptions} selectedSortOption={selectedSortOption} setSelectedSortOption={setSelectedSortOption} />
                <ProductsWrapperComponent user={user} products={products} metaPagination={metaPagination} setMetaPagination={setMetaPagination} />
            </ContainerComponent>
        </div>
    )
}