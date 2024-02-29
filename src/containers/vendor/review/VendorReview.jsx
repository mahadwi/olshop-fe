import { useContext, useEffect, useRef, useState } from "react";
import "./vendorreview.scoped.scss";
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
import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";

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
    const [selectedImage, setSelectedImage] = useState(0);
    const [modalCancel, setModalCancel] = useState(false);

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
        const r = Api.get(`/rekening`)
            .then(res => {
                setBanks(res.data.data.map((bank, i) => ({ ...bank, open: i == 0 })));
            })
            .catch(err => {
                console.log(err);
            });
        Promise.all([vp, r]).finally(() => {
            setLoading(false);
        });
    };

    const inputFileOnChange = event => {
        const file = event.currentTarget.files[0];
        const form_data_insert = new FormData();
        form_data_insert.append("vendor_product_id", id);

        if (reviewObj?.confirm_date) {
            const [day, month, year] = reviewObj?.confirm_date.split("-");

            form_data_insert.append(
                "type",
                reviewObj?.approve_file?.status == "Approved" ||
                    (reviewObj?.confirm_date ? new Date() >= new Date(`${year}-${month}-${day}`) : false)
                    ? "approve"
                    : reviewObj?.approve_file?.status?.toLowerCase() ?? ""
            );
        } else {
            form_data_insert.append("type", "");
        }

        // form_data_insert.append("type", reviewObj?.approve_file?.status.toLowerCase());
        // form_data_insert.append("type", "approve");
        form_data_insert.append("file", file);

        setLoading(true);

        Api.post("/vendor-product-upload", form_data_insert, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("apiToken")
            }
        })
            .then(() => {
                toast(
                    <div>
                        <div className="text-center">
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
                        <div className="mt-3">{t("toastuploaddocumentsuccess")}</div>
                    </div>
                );
                loadReviewObj();
            })
            .catch(err => {
                toast(
                    <div>
                        <div className="text-center">
                            <IconCircleX size={212} color={`#ff3333`} />
                        </div>
                        <div className="mt-3">{t("toastuploaddocumentfailed")}</div>
                    </div>
                );
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
                show={modalCancel}
                onHide={() => {
                    setModalCancel(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("confirmation")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-confirm-body">{t("canceltransactionconfirm")}</div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="modal-confirm-body-footer">
                        <button
                            type="button"
                            onClick={() => {
                                setModalCancel(false);
                            }}
                            className="cancel-button"
                        >
                            {t("cancel")}
                        </button>
                        <button
                            type="button"
                            className="send-button"
                            onClick={() => {
                                navigate(`../cancel/${id}`);
                            }}
                        >
                            {t("yes")}
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
                                {reviewObj?.images?.length != 1 ? (
                                    <div className="thumbnail">
                                        {reviewObj?.images?.map((u, i) => (
                                            <button onClick={() => setSelectedImage(i)}>
                                                <img src={u} alt="foo" />
                                            </button>
                                        ))}
                                    </div>
                                ) : null}
                                <div className="wrapper">
                                    <div className="detail">
                                        <div className="title">Status</div>
                                        <div className="status" data-status={reviewObj?.status?.toLowerCase()}>
                                            {t(reviewObj?.status?.toLowerCase())}
                                        </div>
                                    </div>
                                    <div className="detail">
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
                                    {reviewObj?.status != "Not Approved" ? (
                                        <div className="detail">
                                            <div className="title">{t("schedulemeeting")} :</div>
                                            <div>{reviewObj?.confirm_date ?? "-"}</div>
                                        </div>
                                    ) : null}
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
                                                    maximumFractionDigits: 2
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

                        {reviewObj?.status != "Not Approved" &&
                        (reviewObj?.confirm_date
                            ? new Date() >=
                              new Date(
                                  `${reviewObj?.confirm_date.split("-")[2]}-${reviewObj?.confirm_date.split("-")[1]}-${
                                      reviewObj?.confirm_date.split("-")[0]
                                  }`
                              )
                            : false) ? (
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
                                                    {reviewObj?.approve_file?.draft ? (
                                                        <>
                                                            <a
                                                                href={reviewObj?.approve_file?.draft}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                {t("agreementview")}
                                                            </a>

                                                            <span className="mx-1">|</span>
                                                            <a
                                                                href={
                                                                    process.env.REACT_APP_API_URL +
                                                                    "/download-file/" +
                                                                    reviewObj?.approve_file?.draft.split("/")[
                                                                        reviewObj?.approve_file?.draft.split("/")
                                                                            .length - 1
                                                                    ]
                                                                }
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                {t("download")}
                                                            </a>
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </td>
                                                <td>
                                                    <input
                                                        ref={inputFile}
                                                        type="file"
                                                        accept="application/pdf"
                                                        hidden
                                                        onChange={inputFileOnChange}
                                                    />
                                                    {reviewObj?.approve_file?.approve_file ? (
                                                        <>
                                                            <a
                                                                href={reviewObj?.approve_file?.approve_file}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                {t("agreementview")}
                                                            </a>
                                                            {" | "}
                                                        </>
                                                    ) : null}
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

                        {reviewObj?.status == "Approved" || reviewObj?.status == "Completed" ? (
                            <div className="bank bg-white">
                                <div>{t("depositmoneypaymentaccountinformation")}</div>
                                <div className="hud">{t("vendorreviewproof")}</div>
                                <div className="banks-accordion">
                                    {banks.map((bank, i) => {
                                        return (
                                            <div className="bank-info">
                                                <button
                                                    className="bank-name"
                                                    onClick={() => {
                                                        setBanks(c => {
                                                            return c.map((b, j) => ({
                                                                ...b,
                                                                open: j == i ? !b.open : b.open
                                                            }));
                                                        });
                                                    }}
                                                >
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
                                                        {t("accountnumber")} ({t("onbehalfof")}{" "}
                                                        {bank.bank_account_holder})
                                                    </div>
                                                    <div className="bank-number">
                                                        <div>{bank.bank_account_number}</div>
                                                        <button
                                                            onClick={() =>
                                                                navigator.clipboard.writeText(bank.bank_account_number)
                                                            }
                                                        >
                                                            {t("copy")}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
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
                                    {t("edit")} {t("productinformation")}
                                </button>
                            ) : null}
                            {reviewObj?.status == "Not Approved" ? (
                                <button className="next" type="button" onClick={() => setModalCancel(true)}>
                                    {t("canceltransaction")}
                                </button>
                            ) : null}
                            {reviewObj?.status == "Approved" || reviewObj?.status == "Completed" ? (
                                <button className="next" onClick={() => navigate(`../agreement/${id}`)}>
                                    {t("next")}
                                </button>
                            ) : null}
                            <button
                                className="preview list-product"
                                type="button"
                                onClick={() => navigate(`../productinformation/goodssales`)}
                            >
                                {t("listproduct")}
                            </button>
                        </div>
                    </div>
                </>
            </ContainerComponent>
        </div>
    );
}
