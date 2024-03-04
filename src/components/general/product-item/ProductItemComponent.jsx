import { IconStarFilled, IconHeart, IconHeartFilled, IconCircleX } from "@tabler/icons-react";
import "./product-item.scoped.scss";
import { Link, useNavigate } from "react-router-dom";
import NoPhotoProduct from "./../../../images/product-item/no-photo-product.png";
import StringUtil from "../../../utils/StringUtil";
import Api from "../../../utils/Api";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { LoadingContext } from "../../../context/LoadingContext";
import { CartContext } from "../../../context/CartContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { CurrencyContext } from "../../../context/CurrencyContext";
import { ModalAddressContext } from "../../../context/ModalAddressContext";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export default function ProductItemComponent({ product, className, blur, wishlistId }) {
    /**
     * Refs
     *
     */
    const productItemRef = useRef();

    /**
     * Context
     *
     */
    const { user } = useContext(AuthUserContext);
    const { setLoading } = useContext(LoadingContext);
    const { refreshCarts } = useContext(CartContext);
    const { language } = useContext(LanguageContext);
    const { currency } = useContext(CurrencyContext);
    const { carts } = useContext(CartContext);
    const formater = new Intl.NumberFormat(currency == "id" ? "id-ID" : "en-EN", {
        style: "currency",
        currency: currency == "id" ? "IDR" : "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
    const { setShowModalAddress } = useContext(ModalAddressContext);

    /**
     * State
     *a
     */
    const [tempProduct, setTempProduct] = useState(product);

    /**
     * Hooks
     *
     */
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        setTempProduct(product);
    }, [product]);

    const toggleWishlist = () => {
        if (!user) {
            navigate("/login");
        } else {
            if (wishlistId) {
                Api.delete("/wishlist/" + wishlistId, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("apiToken")
                    }
                }).then(res => {
                    if (res) {
                        let objProduct = Object.assign({}, tempProduct);
                        objProduct.is_wishlist = false;

                        setTempProduct(objProduct);
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
                                <div className="mt-3">{t("deletefromwishlistsuccess")}</div>
                            </div>
                        );
                        productItemRef.current.remove();
                    }
                });
            } else if (!tempProduct.is_wishlist) {
                Api.post(
                    "/wishlist",
                    {
                        product_id: tempProduct.id
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("apiToken")
                        }
                    }
                ).then(res => {
                    if (res) {
                        let objProduct = Object.assign({}, tempProduct);
                        objProduct.is_wishlist = true;
                        objProduct.wishlist = {
                            id: res.data.data.id
                        };

                        setTempProduct(objProduct);
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
                                <div className="mt-3">{t("addtowishlistsuccess")}</div>
                            </div>
                        );
                    }
                });
            } else {
                Api.delete("/wishlist/" + tempProduct.wishlist.id, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("apiToken")
                    }
                }).then(res => {
                    if (res) {
                        let objProduct = Object.assign({}, tempProduct);
                        objProduct.is_wishlist = false;

                        setTempProduct(objProduct);
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
                                <div className="mt-3">{t("deletefromwishlistsuccess")}</div>
                            </div>
                        );
                    }
                });
            }
        }
    };

    const doAddToCart = () => {
        if (user) {
            setLoading(true);
            Api.post(
                "/cart",
                {
                    product_id: tempProduct.id,
                    qty: 1
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
            if (user.addresses.length == 0) {
                setShowModalAddress(true);
                return;
            }
            setLoading(true);
            Api.post(
                "/cart",
                {
                    product_id: tempProduct.id,
                    qty: 1
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
                        console.log(JSON.stringify(p));

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
                                qty: 1
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
        <div className={`product-item ${className ? className : ""}`} ref={productItemRef}>
            <div className="product-image">
                <img src={tempProduct.images.length > 0 ? tempProduct.images[0] : NoPhotoProduct} alt="" />

                <div className="product-action">
                    <button
                        type="button"
                        className="btn-cart"
                        onClick={() => {
                            doAddToCart();
                        }}
                    >
                        {t("addtocart")}
                    </button>
                    <button className="btn-buy" onClick={() => doBuyNow(tempProduct)}>
                        {t("buynow")}
                    </button>
                </div>

                <span className="love-wrap" onClick={toggleWishlist}>
                    {wishlistId ? (
                        <IconHeartFilled style={{ color: "#F44336" }} />
                    ) : tempProduct.is_wishlist ? (
                        <IconHeartFilled style={{ color: "#F44336" }} />
                    ) : (
                        <IconHeart />
                    )}

                    <IconHeartFilled className="heart-red-filled" style={{ color: "#F44336" }} />
                </span>
            </div>
            <div className="product-body">
                <h3>
                    <Link to={"/shop/" + tempProduct.id}>{tempProduct.name}</Link>
                </h3>
                <div>
                    <div className="price-area">
                        <h4 className={`${blur ? "blur" : ""}`}>
                            {blur
                                ? "Rpxxx.xxx"
                                : formater.format(currency == "id" ? tempProduct.sale_price : tempProduct.sale_usd)}
                        </h4>

                        {blur ? (
                            <button
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                {t("checkprices")}
                            </button>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="recap">
                        <div className="rate">
                            <span>{5}</span>
                            <IconStarFilled style={{ color: "#FFAC33" }} size={12} />
                        </div>
                        <div className="selled">
                            <span>
                                ({0}) {t("sold")}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
