import { useContext, useEffect, useState, useRef } from "react";
import { IconArrowLeft, IconArrowRight, IconChevronDown, IconChevronRight, IconCircle, IconCircleDot, IconLicense, IconMapPin, IconPencil } from "@tabler/icons-react";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import BagCurrentOrder from "./../../../images/temp/5c855532d5cc981711da2cd9d3b2c062.png";
import "./shopping-checkout.scoped.scss";
import Api from "../../../utils/Api";
import Modal from "react-bootstrap/Modal";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { LoadingContext } from "../../../context/LoadingContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { CurrencyContext } from "../../../context/CurrencyContext";
import StringUtil from "../../../utils/StringUtil";
import { Link } from "react-router-dom";
import Select from "react-select";
import Flickity from "react-flickity-component";
import Checkbox from "react-custom-checkbox";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom'

const subtractByPercent = (total, percent) => {
    return total - total * (percent / 100);
};

const PAYMENT_OPTIONS = [
    {
        title: "paymentnow",
        description: ""
    },
    {
        title: "paymentlater",
        description: "paymentlaterdescription"
    }
];

export default function ShoppingCheckout() {
    /**
     * Hooks
     *
     */
    const navigate = useNavigate();
    const { t } = useTranslation();

    /**
     * Context
     *
     */
    const { user } = useContext(AuthUserContext);
    const { setLoading } = useContext(LoadingContext);
    const { language } = useContext(LanguageContext);
    const { currency } = useContext(CurrencyContext);
    const formater = new Intl.NumberFormat(currency == "id" ? "id-ID" : "en-EN", {
        style: "currency",
        currency: currency == "id" ? "IDR" : "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });

    /**
     * Main State
     *
     */
    const [arrCarts, setArrCarts] = useState([]);
    const [selected, setSelected] = useState({});
    const [selectedAddress, setSelectedAddress] = useState(0);
    const [modalChangeCourier, setModalChangeCourier] = useState(false);
    const [modalChangeMethodPayment, setModalChangeMethodPayment] = useState(false);
    const [modalChangeAddresses, setModalChangeAddresses] = useState(false);
    const flkty = useRef();
    const [couriers, setCouriers] = useState([]);
    const [selectedCourier, setSelectedCourier] = useState("");
    const [selectedMethodPayment, setSelectedMethodPayment] = useState(-1);

    const [shippingFees, setShippingFees] = useState([]);
    const [selectedShippingFees, setSelectedShippingFees] = useState(-1);

    const [modalVoucher, setModalVoucher] = useState(false);

    useEffect(() => {
        setLoading(true);
        setSelected(JSON.parse(localStorage.getItem("selectedObj")));
        loadCarts();
        loadCouriers();
        loadOperational();

        // setSelectedCourier({ value: "pickup", label: t("pickituponthespot") });
    }, []);

    const loadCarts = () => {
        Api.get("/cart", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("apiToken")
            }
        })
            .then(res => {
                if (res) {
                    setArrCarts(res.data.data);
                }
            })
            .finally(() => {
                setLoading(false);
                setModalChangeCourier(true);
            });
    };

    const loadCouriers = () => {
        Api.get(`/courier`).then(res => {
            const r = [];
            // r.push({
            //     value: "pickup",
            //     label: t("pickituponthespot")
            // });

            Object.entries(res.data.data)
                .map(([key, value]) => ({ value: value, label: key }))
                .forEach(e => {
                    r.push(e);
                });

            setCouriers(r);
            // setSelectedCourier(r[0]);
        });
    };

    const [operationalDuration, setOperationalDuration] = useState(5);
    const [holiday, setHoliday] = useState([]);
    const [pickupDeadlineDate, setPickupDeadlineDate] = useState(new Date());
    const [pickupDeadlineClose, setPickupDeadlineClose] = useState("");

    const loadOperational = () => {
        Api.get(`/operational`).then(res => {
            const { duration, operational } = res.data.data;
            const h = [];
            for (const {is_open, day} of operational) {
                if (!is_open) {
                    h.push(day);
                }
            }
            setOperationalDuration(duration);
            setHoliday(h);


            const tmp = new Date();

            let deadline = tmp.getTime();
            let b = 0;
            let index = tmp.getDay();
            let c = "";
            while (b < duration) {
                const i = index % operational.length;
                const { is_open, close } = operational[i];
                c = close;
                if (is_open) {
                    b++;
                }
                index++;
                deadline += 1000 * 60 * 60 * 24;
            }
            setPickupDeadlineDate(new Date(deadline));
            setPickupDeadlineClose(c);
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (selectedCourier != "" && user) {
            // if (selectedCourier.value != "pickup") {
            setLoading(true);
            Api.post("/ongkir", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("apiToken")
                },
                courier: selectedCourier.value,
                destination: user.addresses[selectedAddress].subdistrict_id,
                weight: arrCarts.reduce((p, c) => {
                    const key = `${c.id}`;
                    if (key in selected) {
                        p += c.product.weight;
                    }
                    return p;
                }, 0)
            })
                .then(res => {
                    setShippingFees(res.data.data);
                    setSelectedShippingFees(0);
                })
                .catch(error => console.log(error))
                .finally(() => {
                    setLoading(false);
                    if (!modalChangeCourier) {
                        setModalChangeCourier(true);
                    }
                });
            // }
        } else {
            setModalChangeCourier(true);
        }
    }, [selectedCourier, selectedAddress]);

    const doOrder = (isMobile) => {
        if (!selectedCourier) {
            setModalChangeCourier(true);
            return;
        }

        if (selectedCourier?.value == "pickup" && selectedMethodPayment == -1) {
            setModalChangeMethodPayment(true);
            return;
        }

        setLoading(true);
        const ongkir =
            selectedShippingFees != -1
                ? Number(
                      currency == "id"
                          ? shippingFees[selectedShippingFees].cost[0].value
                          : shippingFees[selectedShippingFees].cost[0].value_usd
                  )
                : 0;
        const discount =
            selectedVoucher != null && selectedVoucher.type == "Price"
                ? Number(currency == "id" ? selectedVoucher.disc_price : selectedVoucher.disc_price_usd)
                : 0;
        let total = discount * -1;
        const details = [];

        for (const c of arrCarts) {
            const key = `${c.id}`;
            if (key in selected) {
                const { qty } = selected[key];
                const price = currency == "id" ? Number(c.product.sale_price) : Number(c.product.sale_usd);
                const t = price * qty;
                total += t;
                details.push({
                    product_id: c.product.id,
                    qty: qty,
                    price: price,
                    total: t
                });
            }
        }

        total = subtractByPercent(
            total,
            selectedVoucher != null && selectedVoucher.type == "Percent" ? selectedVoucher.disc_percent : 0
        );

        const isOffline = (selectedCourier?.value == "pickup" && selectedShippingFees != -1 && selectedMethodPayment == 1);

        const data = {
            user_id: user.id,
            courier: selectedCourier.value,
            ongkir: ongkir,
            address_id: user.addresses[selectedAddress].id,
            voucher: (selectedVoucher != null && selectedVoucher.code) || "",
            discount: discount,
            total: total + ongkir,
            note: "tes",
            is_offline: isOffline,
            is_direct: localStorage.getItem("isDirect") == "1",
            pickup_deadline: pickupDeadlineDate.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "-"),
            details: details
        };
        // console.log(data);
        Api.post(`/order`, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("apiToken")
            }
        })
            .then(res => {
                setLoading(false);

                if (isOffline) {
                    toast(
                        <div style={{textAlign: 'center'}}>
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="90"
                                    height="83"
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
                            <div className="mt-3">{t("orderofflinesuccess")}</div>
                        </div>
                    );
                    setTimeout(() => {
                        navigate(isMobile ? "/profile/orders" : "/account/orders")
                    }, 3000);
                } else {
                    window.location.href = res.data.data.payment.invoice_url;
                }
            })
            .catch(err => {
                setLoading(false);
            });
    };

    const [vouchers, setVouchers] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    const doLoadVouchers = () => {
        if (vouchers.length != 0) {
            setModalVoucher(true);
            return;
        }

        setLoading(true);
        Api.get(`/voucher/?use_for=Product`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("apiToken")
            }
        })
            .then(res => {
                setVouchers(res.data.data);
                setModalVoucher(true);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const [voucherCode, setVoucherCode] = useState("");

    const doApplyVoucherCode = () => {
        setLoading(true);
        Api.get(`/voucher/${voucherCode}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("apiToken")
            }
        })
            .then(res => {
                setSelectedVoucher(res.data.data);
                setModalVoucher(false);
            })
            .catch(err => {
                toast.error("Voucher Not Found");
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <ContainerComponent>
            {/* Modal Create */}
            <Modal
                show={modalChangeCourier}
                centered
                onHide={() => {
                    setModalChangeCourier(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("selectshippingoption")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-courier">
                        <div className="courier-option">
                            <div className="title">{t("shippingoption")}</div>
                            <div className="select">
                                <Select
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderColor: "#C4C4C4",
                                            borderWidth: "1px",
                                            boxShadow: "none",
                                            backgroundColor: state.isDisabled ? "transparent" : "transparent",
                                            "&:hover": {
                                                borderColor: "#C4C4C4"
                                            }
                                        }),
                                        container: (baseStyles, state) => ({
                                            ...baseStyles,
                                            width: "100%"
                                        }),
                                        input: (baseStyles, state) => ({
                                            ...baseStyles,
                                            color: "#545454",
                                            fontSize: "12px",
                                            fontWeight: "300",
                                            fontFamily: "'Inter', sans-serif"
                                        }),
                                        option: (baseStyles, state) => ({
                                            ...baseStyles,
                                            backgroundColor: state.isDisabled ? "transparent" : "transparent",
                                            color: "#000",
                                            fontSize: "12px",
                                            fontWeight: state.isDisabled ? "700" : "400",
                                            fontFamily: "'Inter', sans-serif",
                                            borderBottom: state.isDisabled ? "1px solid #C4C4C4;" : "0px",
                                            "&:hover": {
                                                backgroundColor: state.isDisabled ? "#FFF" : "#000",
                                                color: state.isDisabled ? "#000" : "#FFF"
                                            }
                                        })
                                    }}
                                    name="shipping_option"
                                    defaultOptions
                                    placeholder={t("courier").toUpperCase()}
                                    value={selectedCourier}
                                    onChange={setSelectedCourier}
                                    options={couriers}
                                />
                            </div>
                        </div>
                        <div className="shipping-fee-contents">
                            {shippingFees?.length != 0 ? (
                                <span className="title-list-options">{t("listoptions")}</span>
                            ) : null}
                            <>
                                {shippingFees?.map((c, i) => {
                                    return (
                                        <div
                                            className={`shipping-fee-content ${
                                                selectedShippingFees == i ? "active" : ""
                                            }`}
                                            onClick={() => {
                                                setSelectedShippingFees(i);
                                            }}
                                        >
                                            <div className="top">
                                                <div className="name">{c.service}</div>
                                                <div className="price">
                                                    {user
                                                        ? formater.format(
                                                              Number(
                                                                  currency == "id"
                                                                      ? c.cost[0].value
                                                                      : c.cost[0].value_usd
                                                              )
                                                          )
                                                        : null}
                                                </div>
                                            </div>
                                            <div className="bottom">
                                                {t("receive")}: {c.cost[0].etd}
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="modal-courier-bottom">
                        <button
                            onClick={() => {
                                setModalChangeCourier(false);
                            }}
                        >
                            {t("cancel").toUpperCase()}
                        </button>
                        <button
                            onClick={() => {
                                setModalChangeCourier(false);
                            }}
                        >
                            {t("save").toUpperCase()}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            {/* End of Modal Create */}
            {/* Modal Voucher */}
            <Modal
                show={modalVoucher}
                centered
                onHide={() => {
                    setModalVoucher(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("selectvoucher")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-courier">
                        <div className="courier-option">
                            <div className="title">{t("addvoucher")}</div>
                            <div className="input-text">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="voucher"
                                    id="voucher"
                                    onInput={e => setVoucherCode(e.currentTarget.value)}
                                />
                            </div>
                            <button onClick={doApplyVoucherCode}>{t("apply").toUpperCase()}</button>
                        </div>
                        <div className="voucher-contents">
                            {vouchers.map(c => {
                                return (
                                    <div className={`voucher-content`}>
                                        <div className="left">
                                            <div className="name">{c.name}</div>
                                            <div className="code">{c.code}</div>
                                            <div className="expiring">
                                                {t("expiring")}: {c.duration}
                                            </div>
                                        </div>
                                        <Checkbox
                                            borderColor={"#DADADA"}
                                            checked={selectedVoucher?.code == c.code}
                                            onChange={value => {
                                                setSelectedVoucher(value ? c : null);
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="modal-courier-bottom">
                        <button
                            onClick={() => {
                                setModalVoucher(false);
                            }}
                        >
                            {t("cancel")}
                        </button>
                        <button
                            onClick={() => {
                                setModalVoucher(false);
                            }}
                        >
                            {t("save")}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            {/* End of Modal Voucher */}
            {/* Modal Method Payment */}
            <Modal
                show={modalChangeMethodPayment}
                centered
                onHide={() => {
                    setModalChangeMethodPayment(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("paymentoptions")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-courier">
                        <div className="shipping-fee-contents m-0">
                            <span className="title-list-options">{t("listoptions")}</span>
                            <>
                                {PAYMENT_OPTIONS?.map((c, i) => {
                                    return (
                                        <div
                                            className={`shipping-fee-content ${
                                                selectedMethodPayment == i ? "active" : ""
                                            }`}
                                            onClick={() => {
                                                setSelectedMethodPayment(i);
                                            }}
                                        >
                                            <div className="top">
                                                <div className="name">{t(c.title)}</div>
                                            </div>
                                            {c.description != "" ? (
                                                <div className="bottom">{t(c.description)}</div>
                                            ) : null}
                                        </div>
                                    );
                                })}
                            </>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="modal-courier-bottom">
                        <button
                            onClick={() => {
                                setModalChangeMethodPayment(false);
                            }}
                        >
                            {t("cancel").toUpperCase()}
                        </button>
                        <button
                            onClick={() => {
                                setModalChangeMethodPayment(false);
                            }}
                        >
                            {t("submit").toUpperCase()}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            {/* End of Modal Method Payment */}
            {/* Modal Mobile Addresses */}
            <Modal
                show={modalChangeAddresses}
                centered
                onHide={() => {
                    setModalChangeAddresses(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("changeaddress")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-addresses">
                        <Link className="manageaddress" to={`/profile/address`}>
                            <IconPencil size={18} /> {t("manageaddress")}
                        </Link>
                        <div className="content-addresses">
                            {user.addresses?.map((addressObj, i) => (
                                <div
                                    className="address-item"
                                    onClick={() => {
                                        setSelectedAddress(i);
                                    }}
                                >
                                    <div>
                                        {selectedAddress == i ?
                                            <IconCircleDot size={22} color="#FFAC33" />
                                        : 
                                            <IconCircle size={22} color="#A2A3B1" />
                                        }
                                    </div>
                                    <div className="detail">
                                        <div className="tag">
                                            {addressObj.tag}
                                        </div>
                                        <div className="name-phone-number">
                                            {addressObj.name} | {addressObj.phone}
                                        </div>
                                        <div className="address">
                                            {addressObj.address} {addressObj.full_address}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="modal-courier-bottom">
                        <button
                            onClick={() => {
                                setModalChangeAddresses(false);
                            }}
                        >
                            {t("cancel").toUpperCase()}
                        </button>
                        <button
                            onClick={() => {
                                setModalChangeAddresses(false);
                            }}
                        >
                            {t("submit").toUpperCase()}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            {/* End of Modal Mobile Addresses */}
            <div className="shopping-checkout-wrapper">
                <h2 className="title-checkout">{t("checkout")}</h2>

                <div className="box-shipping-address">
                    <div className="action-box-shipping-address">
                        <div className="text-action-shipping-address">
                            <h4 className="text-select-shipping">{t("selectshippingaddress")}</h4>
                            <Link className="only-desktop" to={`/account/address`}>
                                <h4 className="manage-address">
                                    <IconPencil size={20} /> {t("manageaddress")}
                                </h4>
                            </Link>
                            <Link className="only-mobile" to={`/profile/address`}>
                                <h4 className="manage-address">
                                    <IconPencil size={20} /> {t("manageaddress")}
                                </h4>
                            </Link>
                        </div>
                        <div className="arrow-wrap">
                            <button onClick={() => flkty.current.previous()}>
                                <IconArrowLeft color="#828181" />
                            </button>
                            <button onClick={() => flkty.current.next()}>
                                <IconArrowRight color="#FFAC33" />
                            </button>
                        </div>
                    </div>
                    <div className="address-wrapper">
                        <Flickity
                            flickityRef={c => {
                                flkty.current = c;
                            }}
                            options={{
                                pageDots: false,
                                draggable: false,
                                prevNextButtons: false,
                                contain: true,
                                cellAlign: "left"
                            }}
                        >
                            {user.addresses?.map((addressObj, i) => (
                                <div
                                    className={`address-item ${i == selectedAddress ? "active" : ""}`}
                                    onClick={() => setSelectedAddress(i)}
                                >
                                    <h5 className="address-title">{addressObj.tag}</h5>
                                    <div className="name-phone-number">
                                        <h5 className="address-name">{addressObj.name}</h5>
                                        <h5 className="address-phone">{addressObj.phone}</h5>
                                    </div>
                                    <p>
                                        {addressObj.address} {addressObj.full_address}
                                    </p>
                                </div>
                            ))}
                        </Flickity>
                    </div>
                </div>

                <div className="box-shipping-address-mobile">
                    <div>
                        <IconMapPin size={22} color="#F24E1E" />
                    </div>
                    <div>
                        <div className="tag">
                            {user.addresses?.[selectedAddress].tag}
                        </div>
                        <div className="name-phone-number">
                            <div>{user.addresses?.[selectedAddress].name} | {user.addresses?.[selectedAddress].phone}</div>
                        </div>
                        <div className="address">
                            {user.addresses?.[selectedAddress].address} {user.addresses?.[selectedAddress].full_address}
                        </div>
                    </div>
                    <button onClick={() => setModalChangeAddresses(true)}>
                        <IconChevronRight />
                    </button>
                </div>
                <div className="box-shipping-address-mobile-border" />

                <hr />

                <div className="box-product-order">
                    <div className="head-row">
                        <div className="product-order-head">
                            <h4>{t("productorder")}</h4>
                        </div>
                        <div className="basc-order-head">
                            <span>{t("itemprice")}</span>
                        </div>
                        <div className="basc-order-head">
                            <span>{t("quantity")}</span>
                        </div>
                        <div className="basc-order-head">
                            <span>{t("price")}</span>
                        </div>
                    </div>
                    {arrCarts.reduce((p, c) => {
                        const key = `${c.id}`;
                        if (key in selected) {
                            const { qty } = selected[key];
                            p.push(
                                <div className="row-data">
                                    <div className="product-order-data">
                                        <img src={c.product.images[0]} alt="" />
                                        <div className="product-item-data-text">
                                            <h4>{c.product.name}</h4>
                                            <span>
                                                {qty} pcs (
                                                {StringUtil.numberingWithDotFormat(Math.ceil(c.product.weight * qty))}{" "}
                                                gr)
                                            </span>
                                            <div className="mobile-price-qty">
                                                <div>
                                                    {formater.format(
                                                        currency == "id" ? c.product.sale_price : c.product.sale_usd
                                                    )}
                                                </div>
                                                <div className="qty">x{qty}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="basic-row-data">
                                        <h4>
                                            {formater.format(
                                                currency == "id" ? c.product.sale_price : c.product.sale_usd
                                            )}
                                        </h4>
                                    </div>
                                    <div className="basic-row-data">
                                        <h4>{qty}</h4>
                                    </div>
                                    <div className="basic-row-data basic-row-data__price">
                                        <h4>
                                            {formater.format(
                                                (currency == "id"
                                                    ? Number(c.product.sale_price)
                                                    : Number(c.product.sale_usd)) * qty
                                            )}
                                        </h4>
                                    </div>
                                </div>
                            );
                        }
                        return p;
                    }, [])}
                </div>

                <div className="shippingoption-mobile">
                    <div className="inner">
                        <div>{t("shippingoption")}</div>
                        <div className="detail">
                            <div className="info">
                                <div>
                                    {selectedCourier?.value == "pickup" ? (
                                        t("pickituponthespot")
                                    ) : (
                                        <>
                                            {t("courier")}:{" "}
                                            {selectedShippingFees != -1
                                                ? `${selectedCourier.label} - ${
                                                      shippingFees[selectedShippingFees].service
                                                  }`
                                                : "-" }
                                        </>
                                    )}
                                </div>
                                <div>
                                    {selectedCourier?.value == "pickup" ? (
                                        null
                                    ) : (
                                        <>
                                            {t("receive")}:{" "}
                                            {selectedShippingFees != -1
                                                ? shippingFees[selectedShippingFees].cost[0].etd
                                                : "-"}
                                        </>
                                    )}
                                </div>
                            </div>
                            <div>
                                {formater.format(
                                    selectedShippingFees != -1
                                        ? Number(
                                              currency == "id"
                                                  ? shippingFees[selectedShippingFees].cost[0].value
                                                  : shippingFees[selectedShippingFees].cost[0].value_usd
                                          )
                                        : 0
                                )}
                            </div>
                            <button
                                onClick={() => {
                                    setModalChangeCourier(true);
                                }}
                            >
                                <IconChevronRight />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="note-mobile">
                    <div>
                        <div>
                            {t("note")} :
                        </div>
                        <input type="text" placeholder="Enter your note here" />
                    </div>
                    <div>
                        <div>
                            {t("totalorder")} ({Object.entries(selected).length} {t("product")})
                        </div>
                        <div className="price">
                            {formater.format(
                                arrCarts.reduce(
                                    (p, c) => {
                                        const key = `${c.id}`;
                                        if (key in selected) {
                                            const { qty } = selected[key];
                                            return (
                                                p +
                                                (currency == "id"
                                                    ? Number(c.product.sale_price)
                                                    : Number(c.product.sale_usd)) *
                                                    qty
                                            );
                                        }
                                        return p;
                                    },
                                    0
                                ),
                            )}
                        </div>
                    </div>
                </div>

                <div className="voucher-mobile">
                    <div>
                        <div className="title">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                            >
                                <path
                                    d="M14.8 8.01562L16 9.21562L9.2 16.0156L8 14.8156L14.8 8.01562ZM4 4.01562H20C21.11 4.01562 22 4.90562 22 6.01562V10.0156C21.4696 10.0156 20.9609 10.2263 20.5858 10.6014C20.2107 10.9765 20 11.4852 20 12.0156C20 12.5461 20.2107 13.0548 20.5858 13.4298C20.9609 13.8049 21.4696 14.0156 22 14.0156V18.0156C22 19.1256 21.11 20.0156 20 20.0156H4C3.46957 20.0156 2.96086 19.8049 2.58579 19.4298C2.21071 19.0548 2 18.5461 2 18.0156V14.0156C3.11 14.0156 4 13.1256 4 12.0156C4 11.4852 3.78929 10.9765 3.41421 10.6014C3.03914 10.2263 2.53043 10.0156 2 10.0156V6.01562C2 5.48519 2.21071 4.97648 2.58579 4.60141C2.96086 4.22634 3.46957 4.01563 4 4.01562ZM4 6.01562V8.55562C4.60768 8.90602 5.11236 9.41029 5.46325 10.0177C5.81415 10.6251 5.9989 11.3142 5.9989 12.0156C5.9989 12.7171 5.81415 13.4062 5.46325 14.0136C5.11236 14.621 4.60768 15.1252 4 15.4756V18.0156H20V15.4756C19.3923 15.1252 18.8876 14.621 18.5367 14.0136C18.1858 13.4062 18.0011 12.7171 18.0011 12.0156C18.0011 11.3142 18.1858 10.6251 18.5367 10.0177C18.8876 9.41029 19.3923 8.90602 20 8.55562V6.01562H4ZM9.5 8.01562C10.33 8.01562 11 8.68563 11 9.51562C11 10.3456 10.33 11.0156 9.5 11.0156C8.67 11.0156 8 10.3456 8 9.51562C8 8.68563 8.67 8.01562 9.5 8.01562ZM14.5 13.0156C15.33 13.0156 16 13.6856 16 14.5156C16 15.3456 15.33 16.0156 14.5 16.0156C13.67 16.0156 13 15.3456 13 14.5156C13 13.6856 13.67 13.0156 14.5 13.0156Z"
                                    fill="#E4A951"
                                />
                            </svg>
                            {t("platformvoucher")} :
                        </div>
                        <button className="entercode" onClick={doLoadVouchers}>
                            {selectedVoucher == null ? <>{t("entercode")} <IconChevronRight size={14} /></> : selectedVoucher.code}
                        </button>
                    </div>
                    {selectedCourier?.value == "pickup" && selectedShippingFees != -1 ? (
                        <div>
                            <div className="title">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M5.25 4.5C4.25544 4.5 3.30161 4.89509 2.59835 5.59835C1.89509 6.30161 1.5 7.25544 1.5 8.25V9H22.5V8.25C22.5 7.25544 22.1049 6.30161 21.4016 5.59835C20.6984 4.89509 19.7446 4.5 18.75 4.5H5.25ZM22.5 10.5H1.5V15.75C1.5 16.7446 1.89509 17.6984 2.59835 18.4017C3.30161 19.1049 4.25544 19.5 5.25 19.5H18.75C19.7446 19.5 20.6984 19.1049 21.4016 18.4017C22.1049 17.6984 22.5 16.7446 22.5 15.75V10.5ZM15.75 15H18.75C18.9489 15 19.1397 15.079 19.2803 15.2197C19.421 15.3603 19.5 15.5511 19.5 15.75C19.5 15.9489 19.421 16.1397 19.2803 16.2803C19.1397 16.421 18.9489 16.5 18.75 16.5H15.75C15.5511 16.5 15.3603 16.421 15.2197 16.2803C15.079 16.1397 15 15.9489 15 15.75C15 15.5511 15.079 15.3603 15.2197 15.2197C15.3603 15.079 15.5511 15 15.75 15Z"
                                        fill="#151B4F"
                                    />
                                </svg>
                                {t("paymentoption")}
                            </div>
                            <button
                                className="methodpayment"
                                onClick={() => {
                                    setModalChangeMethodPayment(true);
                                }}
                            >
                                {t(
                                    selectedMethodPayment == -1
                                        ? "choose"
                                        : PAYMENT_OPTIONS[selectedMethodPayment].title
                                )}{" "}
                                <IconChevronDown />
                            </button>
                        </div>
                    ) : null}
                </div>

                <div className="bills-mobile">
                    <div className="bills">
                        <div><IconLicense color="#E4A951" /> {t("bills")}</div>
                    </div>
                    <div>
                        <div>{t("totalorder")}</div>
                        <div>
                            {formater.format(
                                subtractByPercent(
                                    arrCarts.reduce(
                                        (p, c) => {
                                            const key = `${c.id}`;
                                            if (key in selected) {
                                                const { qty } = selected[key];
                                                return (
                                                    p +
                                                    (currency == "id"
                                                        ? Number(c.product.sale_price)
                                                        : Number(c.product.sale_usd)) *
                                                        qty
                                                );
                                            }
                                            return p;
                                        },
                                        0
                                    ),
                                    0
                                )
                            )}
                        </div>
                    </div>

                    <div>
                        <div>{t("shippingtotal")}</div>
                        <div>
                            {formater.format(
                                selectedShippingFees != -1
                                    ? Number(
                                          currency == "id"
                                              ? shippingFees[selectedShippingFees].cost[0].value
                                              : shippingFees[selectedShippingFees].cost[0].value_usd
                                      )
                                    : 0
                            )}
                        </div>
                    </div>

                    { selectedVoucher != null ?
                        <div>
                            <div>Voucher</div>
                            <div>
                                { selectedVoucher.type == "B1G1" ?
                                    t("b1g1")
                                    :
                                    formater.format(
                                        selectedVoucher.type == "Percent" ?
                                            arrCarts.reduce(
                                                (p, c) => {
                                                    const key = `${c.id}`;
                                                    if (key in selected) {
                                                        const { qty } = selected[key];
                                                        return (
                                                            p +
                                                            (currency == "id"
                                                                ? Number(c.product.sale_price)
                                                                : Number(c.product.sale_usd)) *
                                                                qty
                                                        );
                                                    }
                                                    return p;
                                                },
                                                0
                                            ) * (selectedVoucher.disc_percent / 100)
                                        : Number(
                                              currency == "id"
                                                  ? selectedVoucher.disc_price
                                                  : selectedVoucher.disc_price_usd
                                          )
                                    )
                                }
                            </div>
                        </div>
                    : null }

                    <div className="total">
                        <div>{t("totalpayment")}</div>
                        <div className="price">
                            {formater.format(
                                subtractByPercent(
                                    arrCarts.reduce(
                                        (p, c) => {
                                            const key = `${c.id}`;
                                            if (key in selected) {
                                                const { qty } = selected[key];
                                                return (
                                                    p +
                                                    (currency == "id"
                                                        ? Number(c.product.sale_price)
                                                        : Number(c.product.sale_usd)) *
                                                        qty
                                                );
                                            }
                                            return p;
                                        },
                                        selectedVoucher != null && selectedVoucher.type == "Price"
                                            ? Number(
                                                  currency == "id"
                                                      ? selectedVoucher.disc_price
                                                      : selectedVoucher.disc_price_usd
                                              ) * -1
                                            : 0
                                    ) +
                                        (selectedShippingFees != -1
                                            ? Number(
                                                  currency == "id"
                                                      ? shippingFees[selectedShippingFees].cost[0].value
                                                      : shippingFees[selectedShippingFees].cost[0].value_usd
                                              )
                                            : 0),
                                    selectedVoucher != null && selectedVoucher.type == "Percent"
                                        ? selectedVoucher.disc_percent
                                        : 0
                                )
                            )}
                        </div>
                    </div>
                </div>

                {selectedCourier?.value == "pickup" && selectedMethodPayment == 1 ? (
                <div className="operational-mobile">
                    <div>{t("information")} :</div>
                    <div>
                        Anda memiliki waktu untuk melakukan pick up barang selama {operationalDuration} hari, terhitung mulai besok (Hari Kerja Luxuryhub), Tenggat pengambilan barang pada tanggal {pickupDeadlineDate.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "-")}, pukul {pickupDeadlineClose} WIB . Store tutup pada hari libur nasional dan hari {holiday.join(", ")}
                    </div>
                </div>)
                : null }

                <div className="box-bottom-checkout-mobile">
                    <div className="body-price">
                        <div className="top-desc">
                            <span>Total</span>
                            <span>
                                {formater.format(
                                    subtractByPercent(
                                        arrCarts.reduce(
                                            (p, c) => {
                                                const key = `${c.id}`;
                                                if (key in selected) {
                                                    const { qty } = selected[key];
                                                    return (
                                                        p +
                                                        (currency == "id"
                                                            ? Number(c.product.sale_price)
                                                            : Number(c.product.sale_usd)) *
                                                            qty
                                                    );
                                                }
                                                return p;
                                            },
                                            selectedVoucher != null && selectedVoucher.type == "Price"
                                                ? Number(
                                                      currency == "id"
                                                          ? selectedVoucher.disc_price
                                                          : selectedVoucher.disc_price_usd
                                                  ) * -1
                                                : 0
                                        ),
                                        selectedVoucher != null && selectedVoucher.type == "Percent"
                                            ? selectedVoucher.disc_percent
                                            : 0
                                    ) +
                                        (selectedShippingFees != -1
                                            ? Number(
                                                  currency == "id"
                                                      ? shippingFees[selectedShippingFees].cost[0].value
                                                      : shippingFees[selectedShippingFees].cost[0].value_usd
                                              )
                                            : 0)
                                )}
                            </span>
                        </div>
                        <button type="button" onClick={() => {doOrder(true)}}>{t("placeorder")}</button>
                    </div>
                </div>


                <div className="box-order-transaction">
                    <div className="recap-text">
                        <div className="left">
                            <div className="inner">
                                <h4>{t("notes")}</h4>
                                <input type="text" name="" id="" />
                            </div>
                        </div>
                        <div className="right">
                            <div className="inner">
                                <div>
                                    <h4>{t("shippingoption")}</h4>
                                </div>
                                <div>
                                    <h4 className="courier">
                                        {selectedCourier?.value == "pickup" ? (
                                            t("pickituponthespot")
                                        ) : (
                                            <>
                                                {t("courier")}:{" "}
                                                {selectedShippingFees != -1
                                                    ? `${selectedCourier.label} - ${
                                                          shippingFees[selectedShippingFees].service
                                                      }`
                                                    : "-"}
                                            </>
                                        )}
                                    </h4>
                                    {selectedCourier?.value == "pickup" ? (
                                        <></>
                                    ) : (
                                        <span>
                                            {t("receive")}:{" "}
                                            {selectedShippingFees != -1
                                                ? shippingFees[selectedShippingFees].cost[0].etd
                                                : "-"}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <button
                                        className="change-shipping"
                                        onClick={() => {
                                            setModalChangeCourier(true);
                                        }}
                                    >
                                        {t("change")}
                                    </button>
                                </div>
                                <div>
                                    <h4>
                                        {formater.format(
                                            selectedShippingFees != -1
                                                ? Number(
                                                      currency == "id"
                                                          ? shippingFees[selectedShippingFees].cost[0].value
                                                          : shippingFees[selectedShippingFees].cost[0].value_usd
                                                  )
                                                : 0
                                        )}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="basic-row basic-row__voucher">
                        <div className="left">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                            >
                                <path
                                    d="M14.8 8.01562L16 9.21562L9.2 16.0156L8 14.8156L14.8 8.01562ZM4 4.01562H20C21.11 4.01562 22 4.90562 22 6.01562V10.0156C21.4696 10.0156 20.9609 10.2263 20.5858 10.6014C20.2107 10.9765 20 11.4852 20 12.0156C20 12.5461 20.2107 13.0548 20.5858 13.4298C20.9609 13.8049 21.4696 14.0156 22 14.0156V18.0156C22 19.1256 21.11 20.0156 20 20.0156H4C3.46957 20.0156 2.96086 19.8049 2.58579 19.4298C2.21071 19.0548 2 18.5461 2 18.0156V14.0156C3.11 14.0156 4 13.1256 4 12.0156C4 11.4852 3.78929 10.9765 3.41421 10.6014C3.03914 10.2263 2.53043 10.0156 2 10.0156V6.01562C2 5.48519 2.21071 4.97648 2.58579 4.60141C2.96086 4.22634 3.46957 4.01563 4 4.01562ZM4 6.01562V8.55562C4.60768 8.90602 5.11236 9.41029 5.46325 10.0177C5.81415 10.6251 5.9989 11.3142 5.9989 12.0156C5.9989 12.7171 5.81415 13.4062 5.46325 14.0136C5.11236 14.621 4.60768 15.1252 4 15.4756V18.0156H20V15.4756C19.3923 15.1252 18.8876 14.621 18.5367 14.0136C18.1858 13.4062 18.0011 12.7171 18.0011 12.0156C18.0011 11.3142 18.1858 10.6251 18.5367 10.0177C18.8876 9.41029 19.3923 8.90602 20 8.55562V6.01562H4ZM9.5 8.01562C10.33 8.01562 11 8.68563 11 9.51562C11 10.3456 10.33 11.0156 9.5 11.0156C8.67 11.0156 8 10.3456 8 9.51562C8 8.68563 8.67 8.01562 9.5 8.01562ZM14.5 13.0156C15.33 13.0156 16 13.6856 16 14.5156C16 15.3456 15.33 16.0156 14.5 16.0156C13.67 16.0156 13 15.3456 13 14.5156C13 13.6856 13.67 13.0156 14.5 13.0156Z"
                                    fill="#E4A951"
                                />
                            </svg>
                            <h4>{t("platformvoucher")}</h4>
                        </div>
                        <div className="right">
                            <h4 onClick={doLoadVouchers}>
                                {selectedVoucher == null ? t("entercode") : selectedVoucher.code}
                            </h4>
                        </div>
                    </div>
                    {selectedCourier?.value == "pickup" && selectedShippingFees != -1 ? (
                        <div className="basic-row basic-row__payment">
                            <div className="left">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M5.25 4.5C4.25544 4.5 3.30161 4.89509 2.59835 5.59835C1.89509 6.30161 1.5 7.25544 1.5 8.25V9H22.5V8.25C22.5 7.25544 22.1049 6.30161 21.4016 5.59835C20.6984 4.89509 19.7446 4.5 18.75 4.5H5.25ZM22.5 10.5H1.5V15.75C1.5 16.7446 1.89509 17.6984 2.59835 18.4017C3.30161 19.1049 4.25544 19.5 5.25 19.5H18.75C19.7446 19.5 20.6984 19.1049 21.4016 18.4017C22.1049 17.6984 22.5 16.7446 22.5 15.75V10.5ZM15.75 15H18.75C18.9489 15 19.1397 15.079 19.2803 15.2197C19.421 15.3603 19.5 15.5511 19.5 15.75C19.5 15.9489 19.421 16.1397 19.2803 16.2803C19.1397 16.421 18.9489 16.5 18.75 16.5H15.75C15.5511 16.5 15.3603 16.421 15.2197 16.2803C15.079 16.1397 15 15.9489 15 15.75C15 15.5511 15.079 15.3603 15.2197 15.2197C15.3603 15.079 15.5511 15 15.75 15Z"
                                        fill="#151B4F"
                                    />
                                </svg>
                                <h4>{t("paymentoption")}</h4>
                            </div>
                            <div className="right">
                                <h4
                                    onClick={() => {
                                        setModalChangeMethodPayment(true);
                                    }}
                                >
                                    {t(
                                        selectedMethodPayment == -1
                                            ? "choose"
                                            : PAYMENT_OPTIONS[selectedMethodPayment].title
                                    )}{" "}
                                    <IconChevronDown />
                                </h4>
                            </div>
                        </div>
                    ) : null}
                    <div className="price-row">
                        <div>
                            <h4>{t("totalorder")}</h4>
                            <h4>
                                {formater.format(
                                    subtractByPercent(
                                        arrCarts.reduce(
                                            (p, c) => {
                                                const key = `${c.id}`;
                                                if (key in selected) {
                                                    const { qty } = selected[key];
                                                    return (
                                                        p +
                                                        (currency == "id"
                                                            ? Number(c.product.sale_price)
                                                            : Number(c.product.sale_usd)) *
                                                            qty
                                                    );
                                                }
                                                return p;
                                            },
                                            0
                                        ),
                                        0
                                    )
                                )}
                            </h4>
                        </div>
                        <div>
                            <h4>{t("shippingtotal")}</h4>
                            <h4>
                                {formater.format(
                                    selectedShippingFees != -1
                                        ? Number(
                                              currency == "id"
                                                  ? shippingFees[selectedShippingFees].cost[0].value
                                                  : shippingFees[selectedShippingFees].cost[0].value_usd
                                          )
                                        : 0
                                )}
                            </h4>
                        </div>
                        { selectedVoucher != null ?
                            <div>
                                <h4>Voucher</h4>
                                <h4>
                                    { selectedVoucher.type == "B1G1" ?
                                        t("b1g1")
                                        :
                                        formater.format(
                                            selectedVoucher.type == "Percent" ?
                                                arrCarts.reduce(
                                                    (p, c) => {
                                                        const key = `${c.id}`;
                                                        if (key in selected) {
                                                            const { qty } = selected[key];
                                                            return (
                                                                p +
                                                                (currency == "id"
                                                                    ? Number(c.product.sale_price)
                                                                    : Number(c.product.sale_usd)) *
                                                                    qty
                                                            );
                                                        }
                                                        return p;
                                                    },
                                                    0
                                                ) * (selectedVoucher.disc_percent / 100)
                                            : Number(
                                                  currency == "id"
                                                      ? selectedVoucher.disc_price
                                                      : selectedVoucher.disc_price_usd
                                              )
                                        )
                                    }
                                </h4>
                            </div>
                        : null }
                        {/* <div>
                            <h4>Handling fee</h4>
                            <h4>
                                {formater.format(
                                    arrCarts.reduce((p, c) => {
                                        const key = `${c.id}`
                                        if (key in selected) {
                                            const { qty } = selected[key];
                                            return p + ((currency == 'id' ? Number(c.product.sale_price) : Number(c.product.sale_usd)) * qty)
                                        }
                                        return p;
                                    }, 0) * 0.01
                                )}
                            </h4>
                        </div> */}
                        <div className="total">
                            <h4>{t("totalpayment")}</h4>
                            <h4>
                                {formater.format(
                                    subtractByPercent(
                                        arrCarts.reduce(
                                            (p, c) => {
                                                const key = `${c.id}`;
                                                if (key in selected) {
                                                    const { qty } = selected[key];
                                                    return (
                                                        p +
                                                        (currency == "id"
                                                            ? Number(c.product.sale_price)
                                                            : Number(c.product.sale_usd)) *
                                                            qty
                                                    );
                                                }
                                                return p;
                                            },
                                            selectedVoucher != null && selectedVoucher.type == "Price"
                                                ? Number(
                                                      currency == "id"
                                                          ? selectedVoucher.disc_price
                                                          : selectedVoucher.disc_price_usd
                                                  ) * -1
                                                : 0
                                        ),
                                        selectedVoucher != null && selectedVoucher.type == "Percent"
                                            ? selectedVoucher.disc_percent
                                            : 0
                                    ) +
                                        (selectedShippingFees != -1
                                            ? Number(
                                                  currency == "id"
                                                      ? shippingFees[selectedShippingFees].cost[0].value
                                                      : shippingFees[selectedShippingFees].cost[0].value_usd
                                              )
                                            : 0)
                                )}
                            </h4>
                        </div>
                    </div>
                    <div className="btn-row">
                        {selectedCourier?.value == "pickup" && selectedMethodPayment == 1 ? (
                        <div className="operational">
                            <div>{t("information")} :</div>
                            <div>
                                Anda memiliki waktu untuk melakukan pick up barang selama {operationalDuration} hari, terhitung mulai besok (Hari Kerja Luxuryhub), Tenggat pengambilan barang pada tanggal {pickupDeadlineDate.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "-")}, pukul {pickupDeadlineClose} WIB . Store tutup pada hari libur nasional dan hari {holiday.join(", ")}
                            </div>
                        </div>)
                        : null }
                        <button onClick={() => {doOrder(false)}}>{t("placeorder")}</button>
                    </div>
                </div>
            </div>
        </ContainerComponent>
    );
}
