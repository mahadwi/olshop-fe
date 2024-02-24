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
import { ModalAddressContext } from "../../../context/ModalAddressContext";
import toast from "react-hot-toast";

export default function ShopShow() {
    /**
     * Hooks
     *
     */
    const { pathname } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    /**
     * Context
     *
     */
    const { user } = useContext(AuthUserContext);
    const { setLoading } = useContext(LoadingContext);
    const { refreshCarts, carts } = useContext(CartContext);
    const { setShowModalAddress } = useContext(ModalAddressContext);

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
            Api.post("/ongkir", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("apiToken")
                },
                courier: selectedCourier.value,
                destination: shipTo.value,
                weight: productObj.weight
            })
                .then(res => {
                    setShippingFees(res.data.data);
                    setSelectedShippingFees(-1);
                })
                .catch(error => console.log(error));
        }
    }, [selectedCourier, shipTo]);

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
                        alert("Berhasil dimasukan cart");
                    }
                })
                .catch(err => {
                    if (err.response.data.message == "Out Of Stock") {
                        toast.error(err.response.data.message);
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
            if (user.addresses.length == 0) {
                setShowModalAddress(true);
                return;
            }
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
