import { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import OtherProductsComponent from "../../../components/pages/shop/show/other-products/OtherProductsComponent";
import ProductCartComponent from "../../../components/pages/shop/show/product-cart/ProductCartComponent";
import ProductDescriptionComponent from "../../../components/pages/shop/show/product-description/ProductDescriptionComponent";
import ProductDescriptionMobileComponent from "../../../components/pages/shop/show/product-description-mobile/ProductDescriptionMobileComponent";
import ProductImageComponent from "../../../components/pages/shop/show/product-images/ProductImageComponent";
import ReviewSectionComponent from "../../../components/pages/shop/show/review-section/ReviewSectionComponent";
import "./shop-show.scoped.scss";
import { useParams, useLocation } from "react-router-dom";
import Api from "../../../utils/Api";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../../context/LoadingContext";
import { CartContext } from "../../../context/CartContext";
import toast from "react-hot-toast";
import { IconCircleX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export default function ShopShow() {
    /**
     * Hooks
     *
     */
    const { pathname } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    /**
     * Context
     *
     */
    const { user } = useContext(AuthUserContext);
    const { setLoading } = useContext(LoadingContext);
    const { refreshCarts, carts } = useContext(CartContext);

    /**
     * Main State
     *
     */
    const [productObj, setProductObj] = useState({});
    const [productCategory, setProductCategory] = useState({});
    const [productsByCategory, setProductsByCategory] = useState([]);
    const [shippingFeeOpened, setShippingFeeOpened] = useState(false);
    const breadcrumbs = [
        {
            label: "Home",
            url: "/"
        },
        {
            label: "Prada",
            url: "/"
        },
        {
            label: "Mini Bag",
            url: "/"
        },
        {
            label: "Prada Re-Edition 2005 Re-Nylon  mini bag"
        }
    ];

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        loadCouriers();
        loadProductObj();
    }, []);

    useEffect(() => {
        loadProductCategories();
    }, [productObj]);

    useEffect(() => {
        if (Object.keys(productCategory ? productCategory : {}).length > 0) {
            loadProductsByCategory();
        }
    }, [productCategory]);

    const loadProductObj = () => {
        Api.get(`/product/${id}`).then(res => {
            setProductObj(res.data.data);
        });
    };

    const loadProductCategories = () => {
        Api.get("/product-category").then(res => {
            setProductCategory(res.data.data.find(e => (e.name = productObj.category)));
        });
    };

    const loadProductsByCategory = () => {
        Api.get(`/product`, {
            params: {
                category_id: [productCategory.id]
            }
        }).then(res => {
            setProductsByCategory(res.data.data);
        });
    };

    const loadCouriers = () => {
        Api.get(`/courier`).then(res => {
            const r = Object.entries(res.data.data).map(([key, value]) => ({ value: value, label: key }));
            setCouriers(r);
            // setSelectedCourier(r[0]);
        });
    };

    const [couriers, setCouriers] = useState([]);
    const [selectedCourier, setSelectedCourier] = useState("");

    const loadDistricts = (inputValue, cb) => {
        if (inputValue.length > 2) {
            setTimeout(async () => {
                try {
                    const response = await Api.get(`/kecamatan?name=${inputValue}`);

                    cb(
                        response.data.data.map(e => {
                            return {
                                value: e.id,
                                label: e.fullname
                            };
                        })
                    );
                } catch (error) {}
            }, 1000);
        }
    };
    const [shipTo, setShipTo] = useState("");

    const [qty, setQty] = useState(1);

    const doSubtractQty = () => {
        setQty(c => c - 1);
    };

    const doAddQty = () => {
        setQty(c => c + 1);
    };

    const [shippingFees, setShippingFees] = useState([]);
    const [selectedShippingFees, setSelectedShippingFees] = useState(-1);

    useEffect(() => {
        if (selectedCourier != "" && shipTo != "" && user) {
            setLoading(true);
            Api.post("/ongkir", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("apiToken")
                },
                courier: selectedCourier.value,
                destination: shipTo.value,
                weight: productObj.weight * qty
            })
                .then(res => {
                    setShippingFees(res.data.data);
                    setSelectedShippingFees((current) => {
                        if (res.data.data.length > current) {
                            return current;
                        } else {
                            return -1
                        }
                    });
                })
                .catch(error => console.log(error))
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [selectedCourier, shipTo, qty]);

    const doAddToCart = () => {
        if (user) {
            setLoading(true);
            Api.post(
                "/cart",
                {
                    product_id: productObj.id,
                    qty: qty
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("apiToken")
                    }
                }
            )
                .then(res => {
                    if (res) {
                        refreshCarts();
                        toast(
                            <div style={{textAlign: 'center'}}>
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="220"
                                        height="202.89"
                                        viewBox="0 0 90 83"
                                        fill="none"
                                    >
                                        <path
                                            d="M26.25 76.082H63.75"
                                            stroke="#00AE65"
                                            stroke-width="8"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M7.5 58.791V13.8327C7.5 11.9983 8.29018 10.239 9.6967 8.94186C11.1032 7.64473 13.0109 6.91602 15 6.91602H75C76.9891 6.91602 78.8968 7.64473 80.3033 8.94186C81.7098 10.239 82.5 11.9983 82.5 13.8327V58.791C82.5 60.6254 81.7098 62.3847 80.3033 63.6818C78.8968 64.979 76.9891 65.7077 75 65.7077H15C13.0109 65.7077 11.1032 64.979 9.6967 63.6818C8.29018 62.3847 7.5 60.6254 7.5 58.791Z"
                                            stroke="#00AE65"
                                            stroke-width="8"
                                        />
                                        <path
                                            d="M33.75 36.3112L41.25 43.2279L56.25 29.3945"
                                            stroke="#00AE65"
                                            stroke-width="8"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </div>
                                <div className="mt-3">{t("addtocartsuccess")}</div>
                            </div>
                        );
                    }
                })
                .catch(err => {
                    if (err.response.data.message == "Out Of Stock") {
                        toast(
                            <div style={{textAlign: 'center'}}>
                            <div>
                                <IconCircleX size={212} color={`#ff3333`} />
                            </div>
                                <div>
                                    {t("outofstock")}
                                </div>
                            </div>
                        );
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            navigate("/login");
        }
    };

    const doBuyNow = tempProduct => {
        if (user) {
            setLoading(true);
            Api.post(
                "/cart",
                {
                    product_id: tempProduct.id,
                    qty: qty
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("apiToken")
                    }
                }
            )
                .then(res => {
                    if (res) {
                        let p = {};

                        p[`${res.data.data.id}`] = {
                            qty: res.data.data.qty
                        };

                        localStorage.setItem("selectedObj", JSON.stringify(p));
                        localStorage.setItem("isDirect", "1");
                        window.location.href = "/shopping/checkout";
                    }
                })
                .catch(err => {
                    if (err.response.data.message == "Out Of Stock") {
                        const cartObjDirectSell = carts[carts.findIndex(val => val.product.id == tempProduct.id)];

                        if (cartObjDirectSell) {
                            let p = {};

                            p[`${cartObjDirectSell.id}`] = {
                                qty: qty
                            };

                            localStorage.setItem("selectedObj", JSON.stringify(p));
                            localStorage.setItem("isDirect", "1");

                            window.location.href = "/shopping/checkout";
                        }
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="shop-show-container">
            <ContainerComponent>
                <BreadCrumb lists={breadcrumbs} />
                <div className="product-item-detail">
                    <ProductImageComponent productImages={productObj.images ? productObj.images : []} />
                    <ProductDescriptionComponent productObj={productObj} />
                    <ProductCartComponent
                        onlyDesktop={true}
                        productObj={productObj}
                        qty={qty}
                        doSubtractQty={doSubtractQty}
                        doAddQty={doAddQty}
                        shipTo={shipTo}
                        setShipTo={setShipTo}
                        loadDistricts={loadDistricts}
                        couriers={couriers}
                        selectedCourier={selectedCourier}
                        setSelectedCourier={setSelectedCourier}
                        shippingFeeOpened={shippingFeeOpened}
                        setShippingFeeOpened={setShippingFeeOpened}
                        shippingFees={shippingFees}
                        selectedShippingFees={selectedShippingFees}
                        setSelectedShippingFees={setSelectedShippingFees}
                        doAddToCart={doAddToCart}
                        doBuyNow={doBuyNow}
                    />
                </div>
                <hr />
                <OtherProductsComponent user={user} productsByCategory={productsByCategory} />
                <hr className="only-mobile" />
                <ProductCartComponent
                    onlyMobile={true}
                    productObj={productObj}
                    qty={qty}
                    doSubtractQty={doSubtractQty}
                    doAddQty={doAddQty}
                    shipTo={shipTo}
                    setShipTo={setShipTo}
                    loadDistricts={loadDistricts}
                    couriers={couriers}
                    selectedCourier={selectedCourier}
                    setSelectedCourier={setSelectedCourier}
                    shippingFeeOpened={shippingFeeOpened}
                    setShippingFeeOpened={setShippingFeeOpened}
                    shippingFees={shippingFees}
                    selectedShippingFees={selectedShippingFees}
                    setSelectedShippingFees={setSelectedShippingFees}
                    doAddToCart={doAddToCart}
                    doBuyNow={doBuyNow}
                />
                <hr className="only-mobile" />
                <ProductDescriptionMobileComponent productObj={productObj} />
                <hr />
                <ReviewSectionComponent productObj={productObj} />
            </ContainerComponent>
        </div>
    );
}
