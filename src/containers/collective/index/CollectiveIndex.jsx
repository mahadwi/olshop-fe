import { useContext, useEffect, useState } from "react";
import FooterComponent from "../../../components/footer/FooterComponent";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import ScreenContainerComponent from "../../../components/general/screen-container/ScreenContainerComponent";
import NavbarComponent from "../../../components/general/navbar/NavbarComponent";
import BannerComponent from "../../../components/pages/collective/index/banner/BannerComponent";
import TopFilterComponent from "../../../components/pages/collective/index/top-filter/TopFilterComponent";
import ProductsWrapperComponent from "../../../components/pages/collective/index/products-wrapper/ProductsWrapperComponent";
import { useParams, useSearchParams } from "react-router-dom";
import Api from "../../../utils/Api";
import LoadingComponent from "../../../components/general/loading/LoadingComponent";
import { LoadingContext } from "../../../context/LoadingContext";

export default function CollectiveIndex() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { id } = useParams();
    const { setLoading } = useContext(LoadingContext)

    const [brands, setBrands] = useState([])
    const [selectedBrands, setSelectedBrands] = useState([])
    const [searchNameProduct, setSearchNameProduct] = useState(null)
    const [selectedSortOption, setSelectedSortOption] = useState({ value: 'name_asc', label: 'ALphabetical, A - Z' })
    const [products, setProducts] = useState([])
    const currentPage = searchParams.get('page');
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
    const [user, setUser] = useState(null)

    useEffect(() => {
        loadBannerObj()
        loadBreadcrumbs()
        loadBrands()
        loadUser()
    }, [])

    useEffect(() => {
        loadProducts()
    }, [id, selectedSortOption, searchNameProduct, selectedBrands])

    const loadProducts = () => {
        setLoading(true)

        Api.get('/product', {
            params: {
                search: searchNameProduct,
                brand_id: selectedBrands,
                category_id: [id],
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

    const loadBrands = () => {
        Api.get('/brand')
            .then((res) => {
                setBrands(res.data.data)
            })
    }

    const loadBannerObj = () => {
        Api.get('/banner')
            .then((res) => {
                setBannerObj(res.data.data.find((e) => e.section == 'Collective'))
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
        <div>
            <ContainerComponent>
                <BreadCrumbComponent lists={breadcrumbs} />
            </ContainerComponent>
            <BannerComponent bannerObj={bannerObj} />
            <ContainerComponent>
                <TopFilterComponent brands={brands} selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands} searchNameProduct={searchNameProduct} setSearchNameProduct={setSearchNameProduct} productResultAmount={products.length} sortOptions={sortOptions} selectedSortOption={selectedSortOption} setSelectedSortOption={setSelectedSortOption} />
                <ProductsWrapperComponent user={user} products={products} metaPagination={metaPagination} setMetaPagination={setMetaPagination} />
            </ContainerComponent>
        </div>
    )
}