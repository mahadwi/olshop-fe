import { useContext, useEffect, useRef, useState } from "react";
import "./vendorcancel.scoped.scss";
import { useLocation } from "react-router-dom";
import "react-responsive-modal/styles.css";
import Modal from "react-bootstrap/Modal";
import Api from "../../../utils/Api";
import { LoadingContext } from "../../../context/LoadingContext";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { CurrencyContext } from "../../../context/CurrencyContext";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function VendorCancel() {
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
    const inputFile = useRef(null);
    const [selectedImage, setSelectedImage] = useState(0);

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
        })
            .then(res => {
                setReviewObj(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
        Promise.all([vp]).finally(() => {
            setLoading(false);
        });
    };

    const inputFileOnChange = event => {
        const file = event.currentTarget.files[0];
        const form_data_insert = new FormData();
        form_data_insert.append("vendor_product_id", id);

        const [day, month, year] = reviewObj?.confirm_date.split("-");

        // form_data_insert.append(
        //     "type",
        //     reviewObj?.approve_file?.status == "Approved" ||
        //         (reviewObj?.confirm_date ? new Date() >= new Date(`${year}-${month}-${day}`) : false)
        //         ? "approve"
        //         : reviewObj?.approve_file?.status?.toLowerCase() ?? ""
        // );
        // form_data_insert.append("type", reviewObj?.approve_file?.status.toLowerCase());
        form_data_insert.append("type", "cancel");
        form_data_insert.append("file", file);

        const postFile = Api.post("/vendor-product-upload", form_data_insert, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("apiToken")
            }
        });

        toast.promise(postFile, {
            loading: `${t("upload")} ${"document"}...`,
            success: () => {
                t("uploadsuccess");
                loadReviewObj();
            },
            error: "Error validations"
        });
    };

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
                                <img src={reviewObj?.images?.at(selectedImage) ?? ""} alt="review" className="main" />
                                {reviewObj?.images?.length != 1 ?
                                <div className="thumbnail">
                                    { reviewObj?.images?.map((u, i) => (
                                        <button onClick={() => setSelectedImage(i)}>
                                            <img src={u} alt="foo" />
                                        </button>
                                    )) }
                                </div>
                                : null}
                                <div className="wrapper">
                                    <div className="detail">
                                        <div className="status" data-status={reviewObj?.status?.toLowerCase()}>
                                            {t("canceltransactionstatus")} .
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
                                                maximumFractionDigits: 2
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
                                                maximumFractionDigits: 2
                                            })}
                                        </div>
                                    </div>
                                    <div className="detail">
                                        <div className="title">{t("offeredon")}</div>
                                        <div>{reviewObj.offered_date}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {true ? (
                            <div className="appointment bg-white">
                                <div className="wrapper">
                                    <div className="detail">
                                        <div className="title">{t("note")} :</div>
                                        <div>{reviewObj?.note ?? "-"}</div>
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        {true ? (
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
                                                <td>{reviewObj?.cancel_file?.name}</td>
                                                <td>
                                                    <a href={reviewObj?.cancel_file?.draft} target="_blank">
                                                        {t("agreementview")}
                                                    </a>{" "}
                                                    |{" "}
                                                    <a href={reviewObj?.cancel_file?.draft} target="_blank">
                                                        {t("download")}
                                                    </a>
                                                </td>
                                                <td>
                                                    <input
                                                        ref={inputFile}
                                                        type="file"
                                                        accept="application/pdf"
                                                        hidden
                                                        onChange={inputFileOnChange}
                                                    />
                                                    <button onClick={() => inputFile.current?.click()}>
                                                        {t("upload")}
                                                    </button>
                                                </td>
                                                <td className="text-center">{t(reviewObj?.approve_file?.status)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </>
            </ContainerComponent>
        </div>
    );
}
