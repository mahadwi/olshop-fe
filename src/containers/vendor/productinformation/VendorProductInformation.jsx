import { useContext, useEffect, useState } from "react";
import "./vendorproductinformation.scoped.scss";
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

export default function VendorProductInformation() {
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
                                navigate("sell");
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
                        <button className="active">{t("productinformation")}</button>
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
                        <div className="sell">
                            <img src={user.image} alt={user.name} />
                            <button
                                type="button"
                                onClick={() => {
                                    setModalConfirm(true);
                                }}
                            >
                                {t("sellgoods")} <IconPlus />
                            </button>
                        </div>
                        <div className="divider" />
                        <div className="nav">
                            <div className="title">Overview</div>
                            <div className="cards">
                                <Link to={`./goodssales`}>
                                    <div className="count">
                                        4
                                        <IconShoppingBag size={22} />
                                    </div>
                                    <div>{t("goodssales")}</div>
                                </Link >
                                <Link to={`./goodssaleshistory`}>
                                    <div className="count">
                                        1
                                        <IconClock size={22} />
                                    </div>
                                    <div>{t("goodssaleshistory")}</div>
                                </Link >
                            </div>
                        </div>
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
                                <Link to={"./goodssaleshistory"}>{t("goodssaleshistory")}</Link>
                            </div>
                        </div>
                        <div className="right">
                            <div className="top">
                                <div className="name">{t("youroffer")}</div>
                                <div className="search">
                                    <div>{t("search")}</div>
                                    <div>
                                        <input className="form-control" type="text" name="q" id="search" />
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
                                                        <div className="stock">
                                                            Stock: {c.stock ? c.stock : "belum ada data be"}
                                                        </div>
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
