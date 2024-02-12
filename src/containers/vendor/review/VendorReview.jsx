import { useContext, useEffect, useRef, useState } from "react";
import "./vendorreview.scoped.scss";
import { useLocation } from "react-router-dom";
import "react-responsive-modal/styles.css";
import Api from "../../../utils/Api";
import { LoadingContext } from "../../../context/LoadingContext";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { CurrencyContext } from "../../../context/CurrencyContext";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function VendorReview() {
    /**
     * Hooks
     *
     */
    const { pathname } = useLocation();
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();

    /**
     * Context
     *
     */
    const { setLoading } = useContext(LoadingContext);
    const { user, refreshUser } = useContext(AuthUserContext);

    /**
     * Main State
     *
     */
    const [reviewObj, setReviewObj] = useState({});
    const [banks, setBanks] = useState([]);
    const inputFile = useRef(null);

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        loadReviewObj();
    }, []);

    const loadReviewObj = () => {
        setLoading(false);
        const vp = Api.get("/vendor-product/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("apiToken")
            }
        }).then(res => {
            setReviewObj(res.data.data);
        }).catch(err => {
            console.log(err);
        });
        const r = Api.get(`/rekening`).then(res => {
            setBanks(res.data.data.map((bank, i) => ({...bank, open: i == 0})));
        }).catch(err => {
            console.log(err);
        });
        Promise.all([vp, r]).finally(() => {
            setLoading(false);
        });
    };

    const inputFileOnChange = (event) => {
        const file = event.currentTarget.files[0];
        const form_data_insert = new FormData();
        form_data_insert.append("vendor_product_id", id);
        form_data_insert.append("type", reviewObj?.approve_file?.status == "Approved" ? "approve" : reviewObj?.approve_file?.status?.toLowerCase() ?? "");
        // form_data_insert.append("type", reviewObj?.approve_file?.status.toLowerCase());
        // form_data_insert.append("type", "approve");
        form_data_insert.append("file", file);

        const postFile = Api.post("/vendor-product-upload", form_data_insert, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("apiToken")
            }
        });

        toast.promise(postFile, {
            loading: `${t("upload")} ${"document"}...`,
            success: t("uploadsuccess"),
            error: "Error validations",
        });
    }

    return (
        <div className="vendor">
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
                            <div className="step" onClick={() => navigate("../productinformation")}>
                                {t("productinformation")}
                            </div>
                            <div className="step active">{t("reviewvendor")}</div>
                            <div className="step">{t("agreement")}</div>
                            <div className="step">{t("listingproduct")}</div>
                        </div>
                    </div>
                    <div className="step-1-main review-item">
                        <div className="item bg-white">
                            <div className="top" onClick={() => navigate("../productinformation")}>
                                <button type="button">
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
                                <h2>{t("reviewvendor")}</h2>
                            </div>
                            <div className="body">
                                <img src={reviewObj?.images?.at(0) ?? ""} alt="review" />
                                <div className="detail">
                                    <div className="status" data-status={reviewObj?.status?.toLowerCase()}>
                                        {t(reviewObj?.status?.toLowerCase())} .
                                    </div>
                                    <div className="title">{reviewObj?.name}</div>
                                </div>
                                <div className="detail">
                                    <div className="title">{t("price")}</div>
                                    <div>
                                        {Number(reviewObj?.price)?.toLocaleString("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                            maximumFractionDigits: 0
                                        })}{" "}
                                        |{" "}
                                        {Number(reviewObj?.price_usd)?.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            maximumFractionDigits: 0
                                        })}
                                    </div>
                                </div>
                                <div className="detail">
                                    <div className="title">{t("saleprice")}</div>
                                    <div>
                                        {Number(reviewObj?.sale_price)?.toLocaleString("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                            maximumFractionDigits: 0
                                        })}{" "}
                                        |{" "}
                                        {Number(reviewObj?.sale_usd)?.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            maximumFractionDigits: 0
                                        })}
                                    </div>
                                </div>
                                <div className="detail">
                                    <div className="title">{t("offeredon")}</div>
                                    <div>{reviewObj.offered_date}</div>
                                </div>
                            </div>
                        </div>

                        {true ? (
                            <div className="appointment bg-white">
                                <div className="wrapper">
                                    {reviewObj?.status != "Not Approved" ?
                                    <div className="detail">
                                        <div className="title">{t("schedulemeeting")} :</div>
                                        <div>{reviewObj?.confirm_date ?? "-"}</div>
                                    </div>
                                    : null}
                                    {reviewObj?.status != "Not Approved" ? (
                                        <div className="detail">
                                            <div className="title">{t("priceforentrustinggoods")} :</div>
                                            <div>
                                                {Number(reviewObj?.consignment_price)?.toLocaleString("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                    maximumFractionDigits: 0
                                                })}{" "}
                                                |{" "}
                                                {Number(reviewObj?.consignment_usd)?.toLocaleString("en-US", {
                                                    style: "currency",
                                                    currency: "USD",
                                                    maximumFractionDigits: 0
                                                })}
                                            </div>
                                        </div>
                                    ) : null}
                                    <div className="detail">
                                        <div className="title">{t("note")} :</div>
                                        <div>{reviewObj?.note ?? "-"}</div>
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        {reviewObj?.status != "Not Approved" ? (
                            <div className="file-information bg-white">
                                <div>{t("fileinformation")}</div>
                                <div className="table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>{t("title")}</td>
                                                <td>{t("action")}</td>
                                                <td>
                                                    {t("upload")} {t("document")}
                                                </td>
                                                <td>Status</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{reviewObj?.approve_file?.name}</td>
                                                <td>
                                                    <a
                                                        href={reviewObj?.approve_file?.approve_file}
                                                        target="_blank"
                                                    >
                                                        {t("agreementview")}
                                                    </a>{" "}
                                                    | <a href={reviewObj?.approve_file?.draft} target="_blank">{t("download")}</a>
                                                </td>
                                                <td><input ref={inputFile} type="file" accept="application/pdf" hidden onChange={inputFileOnChange}   /><button onClick={() => inputFile.current?.click()}>{t("upload")}</button></td>
                                                <td className="text-center">{t(reviewObj?.approve_file?.status)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : null}

                        {reviewObj?.status == "Approved" ? (
                            <div className="bank bg-white">
                                <div>{t("depositmoneypaymentaccountinformation")}</div>
                                <div className="hud">{t("vendorreviewproof")}</div>
                                <div className="banks-accordion">
                                { banks.map((bank, i) => {
                                    return (
                                        <div className="bank-info">
                                            <button className="bank-name" onClick={() => {
                                                setBanks((c) => {
                                                    return c.map((b, j) => ({ ...b, open: j == i ? !b.open : b.open}))
                                                })
                                            }}>
                                                <div className="wrapper">
                                                    <img
                                                        src={bank.logo_url}
                                                        alt={bank.bank}
                                                        width="38"
                                                        height="13"
                                                    />
                                                </div>
                                                <div>Bank {bank.bank}</div>
                                            </button>
                                            <div className={`bank-content ${!bank.open ? "hide" : ""}`}>
                                                <div className="bank-message">
                                                    {t("accountnumber")} ({t("onbehalfof")} {bank.bank_account_holder})
                                                </div>
                                                <div className="bank-number">
                                                    <div>{bank.bank_account_number}</div>
                                                    <button onClick={() => navigator.clipboard.writeText(bank.bank_account_number)}>
                                                        {t("copy")}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                </div>
                            </div>
                        ) : null}

                        <div className="review-item-footer">
                            {reviewObj?.status == "Not Approved" ? (
                                <button
                                    className="preview"
                                    type="button"
                                    onClick={() => navigate(`../productinformation/edit/${id}`)}
                                >
                                    {t("backto")} {t("productinformation")}
                                </button>
                            ) : null}
                            {/* reviewObj?.status == "Not Approved" ? (
                                <button className="next" type="button">
                                    {t("canceltransaction")}
                                </button>
                            ) : null */}
                            {reviewObj?.status == "Approved" ? (
                                <button className="next" onClick={() => navigate(`../agreement/${id}`)}>
                                    {t("next")}
                                </button>
                            ) : null}
                        </div>
                    </div>
                </>
            </ContainerComponent>
        </div>
    );
}
