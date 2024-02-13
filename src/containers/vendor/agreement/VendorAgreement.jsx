import { useContext, useEffect, useState } from "react";
import "./vendoragreement.scoped.scss";
import { useLocation } from "react-router-dom";
import "react-responsive-modal/styles.css";
import Api from "../../../utils/Api";
import { LoadingContext } from "../../../context/LoadingContext";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { CurrencyContext } from "../../../context/CurrencyContext";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function VendorAgreement() {
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
    const [agreement, setAgreement] = useState(null);
    const [agreementsArr, setAgreementsArr] = useState([]);

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        loadReviewObj();

        loadAgrementShow();
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

    const loadAgrementShow = () => {
        setLoading(true);

        Api.get("/agreement?vendor_product_id=" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("apiToken")
            }
        })
            .then(res => {
                setAgreementsArr(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const doUploadAgreement = (event, targetId) => {
        if (event.target.files.length > 0) {
            setLoading(true);
            const file = event.target.files[0];

            const formData = new FormData();

            formData.append("id", targetId);
            formData.append("file", file);

            Api.post("/agreement", formData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("apiToken")
                }
            })
                .then(res => {
                    toast.success("Agreement has been uploaded");
                    const ob = res.data.data;
                    setAgreementsArr(c => {
                        return c.map(obj => {
                            if (ob.id == obj.id) {
                                return ob;
                            }
                            return obj;
                        });
                    });
                })
                .catch(err => {
                    toast.error("Error validations");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
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
                            <div className="step" onClick={() => navigate(`../review/${id}`)}>
                                {t("reviewvendor")}
                            </div>
                            <div className="step active">{t("agreement")}</div>
                            <div className="step">{t("listingproduct")}</div>
                        </div>
                    </div>
                    <div className="step-1-main review-item">
                        <div className="item bg-white">
                            <div className="top" onClick={() => navigate(`../review/${id}`)}>
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
                                <h2>{t("agreement")}</h2>
                            </div>
                            <div className="body">
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
                                        {agreementsArr.map(agreementObj => (
                                            <tr>
                                                <td>{agreementObj.name}</td>
                                                <td>
                                                    {agreementObj.file ? (
                                                        <a href={agreementObj.file} target="_blank">
                                                            {t("agreementview")}
                                                        </a>
                                                    ) : (
                                                        <></>
                                                    )}

                                                    {agreementObj.draft && agreementObj.file ? " | " : <></>}

                                                    {agreementObj.draft ? (
                                                        <a href={agreementObj.draft} target="_blank">
                                                            {t("download")}
                                                        </a>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </td>
                                                <td>
                                                    <span
                                                        onClick={() => {
                                                            document
                                                                .getElementById("uploadAgreement" + agreementObj.id)
                                                                .click();
                                                        }}
                                                    >
                                                        {t("upload")}
                                                    </span>
                                                    <input
                                                        id={"uploadAgreement" + agreementObj.id}
                                                        type="file"
                                                        name=""
                                                        accept="application/pdf"
                                                        style={{ display: "none" }}
                                                        onChange={event => {
                                                            doUploadAgreement(event, agreementObj.id);
                                                        }}
                                                    />
                                                </td>
                                                <td style={{ textAlign: "center" }}>{agreementObj.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {reviewObj.status == "Completed" ? (
                                <div className="agreement-footer">
                                    <button className="next" onClick={() => navigate(`../listingproduct/${id}`)}>
                                        {t("next")}
                                    </button>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </>
            </ContainerComponent>
        </div>
    );
}
