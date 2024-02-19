import { useContext, useEffect, useState } from "react";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import BannerComponent from "../../../components/pages/collective/index/banner/BannerComponent";
import TopFilterComponent from "../../../components/pages/collective/index/top-filter/TopFilterComponent";
import ProductsWrapperComponent from "../../../components/pages/collective/index/products-wrapper/ProductsWrapperComponent";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import Api from "../../../utils/Api";
import { LoadingContext } from "../../../context/LoadingContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { useTranslation } from "react-i18next";

export default function CollectiveIndex() {
    /**
     * Hooks
     *
     */
    const [searchParams] = useSearchParams();
    const { id } = useParams();
    const currentPage = searchParams.get("page");
    const { pathname, search } = useLocation();
    const { t } = useTranslation();

    /**
     * Context
     *
     */
    const { setLoading } = useContext(LoadingContext);
    const { language } = useContext(LanguageContext);
    const { user } = useContext(AuthUserContext);

    /**
     * Page State
     *
     */
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [searchNameProduct, setSearchNameProduct] = useState(null);
    const [selectedSortOption, setSelectedSortOption] = useState({
        value: "name_asc",
        label: t("ALphabetical, A - Z")
    });
    const [products, setProducts] = useState([]);
    const [metaPagination, setMetaPagination] = useState({});
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const sortOptions = [
        { value: "is_new_arrival", label: "New Arrival" },
        { value: "price_asc", label: "Price, low to high" },
        { value: "price_desc", label: "Price, high to low" },
        { value: "name_asc", label: "ALphabetical, A - Z" },
        { value: "name_desc", label: "ALphabetical, Z - A" },
        { value: "date_desc", label: "Date, old to new" },
        { value: "date_asc", label: "Date, new to old" }
    ].map(({ value, label }) => ({ value, label: t(label) }));
    const [bannerObj, setBannerObj] = useState({});
    const [showLoadMore, setLoadMore] = useState(false);

    useEffect(() => {
        loadBannerObj();
        loadBreadcrumbs();
        loadBrands();
    }, []);

    // Automatically scrolls to top whenever pathname or search changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname, search]);

    useEffect(() => {
        loadProducts();
    }, [id, selectedSortOption, searchNameProduct, selectedBrands, user]);

    const loadProducts = () => {
        if (user !== false) {
            setLoading(true);

            Api.get("/product", {
                params: {
                    user_id: user ? user.id : null,
                    search: searchNameProduct,
                    brand_id: selectedBrands,
                    category_id: [id],
                    is_new_arrival: selectedSortOption.value == "is_new_arrival" ? 1 : 0,
                    sort_by: selectedSortOption.value != "is_new_arrival" ? selectedSortOption.value : null,
                    itemPerpage: 12,
                    page: currentPage ? currentPage : 1
                }
            }).then(res => {
                setProducts(res.data.data);
                setMetaPagination(res.data.meta);
                setLoading(false);
                setLoadMore(true);
            });
        }
    };

    const loadMoreProducts = () => {
        if (user !== false) {
            setLoading(true);
            setLoadMore(false);

            Api.get("/product", {
                params: {
                    user_id: user ? user.id : null,
                    search: searchNameProduct,
                    brand_id: selectedBrands,
                    category_id: [id],
                    is_new_arrival: selectedSortOption.value == "is_new_arrival" ? 1 : 0,
                    sort_by: selectedSortOption.value != "is_new_arrival" ? selectedSortOption.value : null,
                    itemPerpage: 12,
                    page: metaPagination.nextPage
                }
            }).then(res => {
                setProducts(c => [...c, ...res.data.data]);
                setMetaPagination(res.data.meta);
                setLoading(false);
                setLoadMore(true);
            });
        }
    };

    const loadBreadcrumbs = () => {
        setBreadcrumbs([
            {
                label: language == "id" ? "Beranda" : "Home",
                url: "/"
            },
            {
                label: language == "id" ? "Kolektif" : "Collective"
            }
        ]);
    };

    useEffect(() => {
        loadBreadcrumbs();
    }, [language]);

    const loadBrands = () => {
        Api.get("/brand?is_valid=true").then(res => {
            setBrands(res.data.data);
        });
    };

    const loadBannerObj = () => {
        Api.get("/banner").then(res => {
            setBannerObj(res.data.data.find(e => e.section == "Collective"));
        });
    };

    return (
        <div>
            <ContainerComponent>
                <BreadCrumbComponent lists={breadcrumbs} />
            </ContainerComponent>
            <BannerComponent bannerObj={bannerObj} />
            <ContainerComponent>
                <TopFilterComponent
                    brands={brands}
                    selectedBrands={selectedBrands}
                    setSelectedBrands={setSelectedBrands}
                    searchNameProduct={searchNameProduct}
                    setSearchNameProduct={setSearchNameProduct}
                    productResultAmount={products.length}
                    sortOptions={sortOptions}
                    selectedSortOption={selectedSortOption}
                    setSelectedSortOption={setSelectedSortOption}
                />
                <ProductsWrapperComponent
                    user={user}
                    products={products}
                    metaPagination={metaPagination}
                    setMetaPagination={setMetaPagination}
                    showLoadMore={showLoadMore}
                    loadMoreProducts={loadMoreProducts}
                />
            </ContainerComponent>
        </div>
    );
}
