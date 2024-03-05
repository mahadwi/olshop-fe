import { useContext, useEffect, useState } from "react";
import "./vendorgoodssales.scoped.scss";
import { Link, useLocation } from "react-router-dom";
import "react-responsive-modal/styles.css";
import AsyncSelect from "react-select/async";
import Api from "../../../utils/Api";
import Modal from "react-bootstrap/Modal";
import { LoadingContext } from "../../../context/LoadingContext";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { CurrencyContext } from "../../../context/CurrencyContext";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { IconList, IconPlus, IconLayoutGrid, IconShoppingBag, IconClock } from "@tabler/icons-react";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function VendorGoodsSales() {
    /**
     * Hooks
     *
     */
    const { pathname } = useLocation();
    const { t } = useTranslation();
    const navigate = useNavigate();

    /**
     * Context
     *
     */
    const { setLoading } = useContext(LoadingContext);
    const { user, refreshUser } = useContext(AuthUserContext);
    const { currency } = useContext(CurrencyContext);
    const formater = new Intl.NumberFormat(currency == "id" ? "id-ID" : "en-EN", {
        style: "currency",
        currency: currency == "id" ? "IDR" : "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
    const [modalConfirm, setModalConfirm] = useState(false);

    /**
     * Main State
     *
     */
    const [layout, setLayout] = useState("list");
    const [products, setProducts] = useState([]);

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setLoading(true);
        Api.get("/vendor", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("apiToken")
            }
        })
            .then(res => {
                const data = res.data.data;
                if (data.length == 0) {
                    navigate("../");
                } else {
                    loadProducts();
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const loadProducts = () => {
        setLoading(true);
        Api.get("/vendor-product", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("apiToken")
            }
        })
            .then(res => {
                const data = res.data.data;
                setProducts(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="vendor">
            {/* Modal Confirm */}
            <Modal
                centered
                show={modalConfirm}
                onHide={() => {
                    setModalConfirm(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("confirmation")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-confirm-body">{t("thegoodsinstallationrate")}</div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="modal-confirm-body-footer">
                        <button
                            type="button"
                            onClick={() => {
                                setModalConfirm(false);
                            }}
                            className="cancel-button"
                        >
                            {t("cancel")}
                        </button>
                        <button
                            type="button"
                            className="send-button"
                            onClick={() => {
                                setModalConfirm(false);
                                navigate("../productinformation/sell");
                            }}
                        >
                            {t("agree")}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            {/* End of Modal Confirm */}

            <ContainerComponent>
                <>
                    <div className="tabs">
                        <button
                            onClick={() => {
                                navigate("../accountinformation");
                            }}
                        >
                            {t("accountinformation")}
                        </button>
                        <button className="active">{t("listproduct")}</button>
                    </div>
                    <div className="step-1 bg-white">
                        <div className="steps">
                            <div className="step active">{t("productinformation")}</div>
                            <div className="step">{t("reviewvendor")}</div>
                            <div className="step">{t("agreement")}</div>
                            <div className="step">{t("listingproduct")}</div>
                        </div>
                    </div>
                    <div className="step-main-mobile">
                        <button type="button" onClick={() => navigate("../productinformation")}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
                                    fill="#111111"
                                />
                            </svg>
                        </button>
                        <div className="title text-center">{t("youroffer")}</div>
                    </div>
                    <div className="step-1-main">
                        <div className="left">
                            <button
                                type="button"
                                onClick={() => {
                                    setModalConfirm(true);
                                }}
                            >
                                {t("sellgoods")} <IconPlus />
                            </button>
                            <div className="links">
                                <div className="active">{t("goodssales")}</div>
                                <Link to={"../productinformation/goodssaleshistory"}>{t("goodssaleshistory")}</Link>
                            </div>
                        </div>
                        <div className="right">
                            <div className="top">
                                <div className="name">{t("youroffer")}</div>
                                <div className="search">
                                    <div className="text">{t("search")}</div>
                                    <div>
                                        <input
                                            className="form-control input-desktop"
                                            type="text"
                                            name="q"
                                            id="search"
                                        />
                                        <input
                                            className="form-control input-mobile"
                                            type="text"
                                            name="q"
                                            id="search"
                                            placeholder={t("search")}
                                        />
                                    </div>
                                    <div className="layout">
                                        <button
                                            className={`${layout == "list" ? "active" : ""}`}
                                            onClick={() => setLayout("list")}
                                        >
                                            <IconList />
                                        </button>
                                        <button
                                            className={`${layout == "grid" ? "active" : ""}`}
                                            onClick={() => setLayout("grid")}
                                        >
                                            <IconLayoutGrid />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={`products ${layout == "grid" ? "grid" : ""}`}>
                                {products.map((c, i) => {
                                    return (
                                        <>
                                            <div
                                                className={`product ${layout == "grid" ? "grid" : ""}`}
                                                onClick={() => navigate(`../review/${c.id}`)}
                                            >
                                                <div className="image">
                                                    <img
                                                        className={`${layout == "grid" ? "grid" : ""}`}
                                                        src={c.images[0]}
                                                        alt="product"
                                                    />
                                                </div>
                                                <div className={`center ${layout == "grid" ? "grid" : ""}`}>
                                                    <div className="name">{c.name}</div>
                                                    <div className="price">
                                                        {formater.format(currency == "id" ? c.sale_price : c.sale_usd)}
                                                    </div>
                                                    {layout == "list" ? (
                                                        <div className="stock">Stock: {c.stock ? c.stock : "1"}</div>
                                                    ) : null}
                                                    <div className="date">
                                                        {t("offeredon")}{" "}
                                                        {c.offered_date ? c.offered_date : "belum ada data offered"}
                                                    </div>
                                                </div>
                                                <div
                                                    className={`status ${layout == "grid" ? "grid" : ""}`}
                                                    data-status={`${c.status.toLowerCase()}`}
                                                >
                                                    {t(c.status.toLowerCase())}
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                    </div>{" "}
                </>
            </ContainerComponent>
        </div>
    );
}
