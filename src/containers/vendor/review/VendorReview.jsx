import { useContext, useEffect, useState } from "react";
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

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        loadReviewObj();
    }, []);

    const loadReviewObj = () => {
        setLoading(false);
        Api.get("/vendor-product/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("apiToken")
            }
        }).then(res => {
            setReviewObj(res.data.data);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
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

                        {reviewObj?.status != "Review" ? (
                            <div className="appointment bg-white">
                                {reviewObj?.status == "Approved" ? (
                                    <div className="hud">{t("vendorreviewproof")}</div>
                                ) : null}
                                <div className="detail">
                                    <div className="title">{t("schedulemeeting")} :</div>
                                    <div>{reviewObj?.schedulemeeting}</div>
                                </div>
                                {reviewObj?.status != "Not Approved" ? (
                                    <div className="detail">
                                        <div className="title">{t("priceforentrustinggoods")} :</div>
                                        <div>
                                            {Number(reviewObj?.priceforentrustinggoods)?.toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                                maximumFractionDigits: 0
                                            })}{" "}
                                            |{" "}
                                            {Number(reviewObj?.priceforentrustinggoods_usd)?.toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                                maximumFractionDigits: 0
                                            })}
                                        </div>
                                    </div>
                                ) : null}
                                <div className="detail">
                                    <div className="title">{t("note")} :</div>
                                    <div>{reviewObj?.note}</div>
                                </div>
                            </div>
                        ) : null}

                        {reviewObj?.status == "Approved" ? (
                            <div className="bank bg-white">
                                <div>{t("depositmoneypaymentaccountinformation")}</div>
                                <div className="bank-info">
                                    <div className="bank-name">
                                        <div>Bank BCA</div>

                                        <svg
                                            width="38"
                                            height="13"
                                            viewBox="0 0 38 13"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g id="Group 80">
                                                <path
                                                    id="path20"
                                                    d="M5.59899 9.86779C5.59899 9.34966 5.60415 7.96474 5.59245 7.7941C5.60265 5.7333 4.22999 4.27958 3.3628 4.39291C2.76274 4.44976 2.25985 4.71684 1.98983 5.48519C1.73956 6.20126 1.96331 7.15373 2.79538 7.37723C3.68511 7.61725 4.20465 7.81695 4.58064 8.09869C5.04134 8.44361 5.41744 9.1026 5.42743 9.86861"
                                                    fill="#0060AF"
                                                />
                                                <path
                                                    id="path22"
                                                    d="M5.95434 13C4.38552 13 2.77323 12.5782 1.16308 11.744L1.12357 11.7228L1.10468 11.6788C0.382111 10.0139 0 8.19292 0 6.41129C0 4.63234 0.366436 2.88926 1.08954 1.22659L1.1094 1.1824L1.14966 1.16037C2.63913 0.39015 4.24144 0 5.91354 0C7.47118 0 9.13469 0.434333 10.7235 1.25823L10.7643 1.27804L10.7831 1.32304C11.5195 3.01865 11.9078 4.8392 11.9078 6.5913C11.9078 8.33661 11.5349 10.0812 10.7977 11.7758L10.7782 11.8203L10.7372 11.8409C9.27051 12.5988 7.61645 13 5.95434 13ZM1.3121 11.5157C2.8763 12.3189 4.43631 12.7245 5.95434 12.7245C7.56395 12.7245 9.16475 12.3404 10.5897 11.6124C11.2976 9.97033 11.6564 8.28035 11.6564 6.5913C11.6564 4.89545 11.2819 3.1314 10.5735 1.48571C9.03162 0.694511 7.42137 0.274945 5.91354 0.274945C4.29469 0.274945 2.74306 0.649742 1.29858 1.38914C0.605215 3.00072 0.252307 4.68942 0.252307 6.41129C0.252307 8.13643 0.619065 9.90119 1.3121 11.5157Z"
                                                    fill="#0060AF"
                                                />
                                                <path
                                                    id="path24"
                                                    d="M5.22725 9.86898C5.23015 9.20482 4.89056 8.61755 4.44671 8.30193C4.053 8.023 3.52445 7.8397 2.67176 7.60367C2.40818 7.53007 2.13246 7.36658 2.04711 7.1582C1.82132 7.40654 1.78031 7.96487 1.82003 8.29115C1.8662 8.66876 2.27043 9.29107 2.87908 9.31546C3.25077 9.33174 3.72071 9.22814 3.94607 9.17588C4.33484 9.08422 4.94993 9.35003 5.04784 9.86816"
                                                    fill="#0060AF"
                                                />
                                                <path
                                                    id="path26"
                                                    d="M5.91339 1.18164C4.8814 1.18164 3.98995 1.92455 3.99317 3.21009C3.9964 4.29112 4.79283 4.86984 5.07702 5.2832C5.50648 5.9061 5.73892 6.64339 5.76308 7.77153C5.78187 8.66938 5.7809 9.55598 5.78509 9.87018H6.01292C6.00895 9.54145 5.99864 8.60024 6.01044 7.74376C6.0259 6.61526 6.26672 5.9061 6.6964 5.2832C6.98306 4.86984 7.77885 4.29112 7.78056 3.21009C7.78443 1.92455 6.89352 1.18164 5.86239 1.18164"
                                                    fill="#0060AF"
                                                />
                                                <path
                                                    id="path28"
                                                    d="M6.17557 9.86779C6.17557 9.34966 6.1702 7.96474 6.18169 7.7941C6.1716 5.7333 7.5434 4.27958 8.41133 4.39291C9.01139 4.44976 9.51375 4.71684 9.78453 5.48519C10.0346 6.20126 9.80954 7.15373 8.97843 7.37723C8.08827 7.61725 7.56938 7.81695 7.19242 8.09869C6.73226 8.44361 6.38246 9.1026 6.37173 9.86861"
                                                    fill="#0060AF"
                                                />
                                                <path
                                                    id="path30"
                                                    d="M6.5469 9.86898C6.54368 9.20482 6.88316 8.61755 7.32572 8.30193C7.72104 8.023 8.25024 7.8397 9.10218 7.60367C9.36629 7.53007 9.64168 7.36658 9.72554 7.1582C9.9524 7.40654 9.9933 7.96487 9.95358 8.29115C9.90645 8.66876 9.50329 9.29107 8.89571 9.31546C8.52412 9.33174 8.05172 9.22814 7.82733 9.17588C7.44006 9.08422 6.82325 9.35003 6.72491 9.86816"
                                                    fill="#0060AF"
                                                />
                                                <path
                                                    id="path32"
                                                    d="M6.86546 12.0126L6.7334 10.9607L7.05216 10.908C7.12979 10.8964 7.22427 10.9112 7.26206 10.9643C7.30383 11.0197 7.3166 11.0655 7.32466 11.1382C7.33668 11.2281 7.31284 11.332 7.22008 11.3838V11.387C7.32369 11.387 7.38628 11.4682 7.40443 11.6053C7.40711 11.6343 7.41495 11.7042 7.40711 11.7626C7.38607 11.9015 7.31016 11.9461 7.18207 11.9657L6.86546 12.0126ZM7.07063 11.8243C7.10842 11.8184 7.14675 11.8162 7.17671 11.7953C7.22255 11.7626 7.21836 11.6926 7.21203 11.6407C7.19603 11.5266 7.16876 11.4832 7.05785 11.5011L6.98817 11.5129L7.0323 11.8301L7.07063 11.8243ZM7.00385 11.3382C7.04604 11.3308 7.10327 11.3252 7.1271 11.2815C7.13956 11.2523 7.15556 11.2291 7.14503 11.1642C7.13204 11.0872 7.10864 11.0395 7.0191 11.058L6.93567 11.0727L6.96853 11.3422"
                                                    fill="#0060AF"
                                                />
                                                <path
                                                    id="path34"
                                                    d="M8.24645 11.3806C8.24892 11.4002 8.25182 11.422 8.25289 11.4415C8.27866 11.6334 8.24645 11.7922 8.0489 11.8359C7.75686 11.8973 7.70092 11.6993 7.6495 11.422L7.62212 11.272C7.58186 11.0066 7.56457 10.8057 7.8493 10.7439C8.00981 10.7119 8.11589 10.7816 8.16002 10.956C8.16689 10.982 8.17548 11.0078 8.1787 11.0339L8.00402 11.0733C7.98383 11.0078 7.9571 10.8907 7.87851 10.9006C7.73743 10.9191 7.78403 11.1107 7.79852 11.1907L7.85102 11.4787C7.8668 11.5658 7.89816 11.7049 8.02023 11.678C8.11933 11.6564 8.07617 11.4878 8.06736 11.4188"
                                                    fill="#0060AF"
                                                />
                                                <path
                                                    id="path36"
                                                    d="M8.52675 11.6979L8.46631 10.6094L8.70101 10.5312L9.19306 11.478L9.00828 11.5383L8.89169 11.2977L8.68651 11.365L8.71303 11.6385L8.52675 11.6979ZM8.66933 11.1892L8.81761 11.1423L8.6207 10.7019"
                                                    fill="#0060AF"
                                                />
                                                <path
                                                    id="path38"
                                                    d="M2.72987 10.876C2.80331 10.6193 2.86913 10.4304 3.14935 10.5143C3.29933 10.56 3.39231 10.6322 3.38791 10.8224C3.38719 10.8647 3.37438 10.9079 3.36601 10.9497L3.19154 10.8971C3.21441 10.7921 3.2289 10.7087 3.11037 10.6689C2.97338 10.6279 2.93999 10.8092 2.92109 10.8875L2.85012 11.1728C2.82757 11.2576 2.80052 11.3976 2.92109 11.4337C3.02072 11.463 3.08117 11.3563 3.11724 11.2004L2.99517 11.1651L3.03737 11L3.32435 11.1008L3.18811 11.6508L3.05605 11.6116L3.08579 11.4954H3.08203C3.02126 11.5904 2.94707 11.6004 2.88211 11.5868C2.59513 11.5021 2.62508 11.2973 2.69358 11.0238"
                                                    fill="#0060AF"
                                                />
                                                <path
                                                    id="path40"
                                                    d="M3.79806 11.3406L3.71163 11.788L3.51709 11.7421L3.72441 10.6973L4.05606 10.7791C4.25018 10.8248 4.3088 10.9191 4.28131 11.1133C4.26564 11.2248 4.21528 11.3449 4.09235 11.3352L4.09106 11.3334C4.19499 11.3731 4.20379 11.4303 4.18565 11.5292C4.17781 11.5713 4.12381 11.8266 4.16106 11.8679L4.16235 11.8992L3.96104 11.8419C3.95267 11.7711 3.98112 11.6438 3.99239 11.5734C4.00377 11.511 4.02192 11.4231 3.96394 11.3901C3.91853 11.3637 3.90167 11.365 3.85035 11.3521L3.79806 11.3406ZM3.83124 11.1787L3.96222 11.2173C4.04178 11.2298 4.08601 11.1848 4.10169 11.0799C4.11586 10.9837 4.0975 10.9461 4.0261 10.9274L3.88567 10.8964"
                                                    fill="#0060AF"
                                                />
                                                <path
                                                    id="path42"
                                                    d="M5.04564 10.9297L5.23803 10.9541L5.15515 11.6885C5.11489 11.9214 5.03243 12.0233 4.79773 11.9914C4.55895 11.9584 4.50226 11.8397 4.51676 11.605L4.60018 10.8711L4.79408 10.8954L4.71087 11.6128C4.70207 11.6908 4.68553 11.8062 4.81255 11.8202C4.92517 11.8295 4.95073 11.7481 4.96339 11.6468"
                                                    fill="#0060AF"
                                                />
                                                <path
                                                    id="path44"
                                                    d="M5.4502 12.0308L5.50807 10.9805L5.87772 10.9979C6.0524 11.0073 6.09814 11.1631 6.09267 11.3117C6.08762 11.402 6.06174 11.5029 5.9896 11.5577C5.93044 11.6042 5.85442 11.6152 5.78388 11.6115L5.66342 11.6042L5.63937 12.0444L5.4502 12.0308ZM5.6689 11.444L5.76681 11.45C5.84637 11.4531 5.89909 11.4188 5.90596 11.2913C5.90982 11.1688 5.86741 11.1481 5.76434 11.1431L5.68672 11.1402"
                                                    fill="#0060AF"
                                                />
                                                <path
                                                    id="path46"
                                                    d="M31.5218 2.19611L30.0527 5.10694C29.4981 4.61542 28.821 4.25363 27.957 4.25363C25.9125 4.25363 25.082 5.91725 25.082 7.0891C25.082 7.95894 25.6038 9.24237 27.423 9.24237C28.1865 9.24237 29.2721 8.66248 29.5845 8.39867L28.1315 11.7757C27.4389 11.9265 27.2114 12.0201 26.625 12.0399C23.369 12.1459 22.0532 9.96255 22.0542 7.73146C22.0564 4.78207 24.4586 1.19513 28.441 1.19513C28.685 1.19513 28.9835 1.28725 29.2387 1.38933L29.4966 1.0293"
                                                    fill="#0060AF"
                                                />
                                                <path
                                                    id="path48"
                                                    d="M37.5842 1.12109L38.0002 11.7007H34.904L34.9022 9.88628H32.791L32.0961 11.7007H28.7383L32.2488 4.14596L31.4572 4.14034L32.9613 1.12109H37.5842ZM34.8821 4.35762L33.6884 7.43487H34.9181"
                                                    fill="#0060AF"
                                                />
                                                <path
                                                    id="path50"
                                                    d="M20.0996 1.12135C21.6329 1.13073 22.4993 2.03924 22.4993 3.35162C22.4993 4.56145 21.5856 5.6324 20.5824 6.18616C21.6152 6.60056 21.7045 7.61784 21.7045 8.33755C21.7045 10.0763 20.1062 11.701 18.0286 11.701H13.4976L15.265 4.25146L14.539 4.24689L16.0231 1.12135C16.0231 1.12135 18.8528 1.11198 20.0996 1.12135ZM18.5953 5.41078C18.9125 5.41078 19.4725 5.32311 19.6125 4.65309C19.7659 3.92577 19.2404 3.9062 18.9883 3.9062L18.0875 3.90189L17.7734 5.41081L18.5953 5.41078ZM17.3218 7.28031L16.907 9.01905H17.9677C18.385 9.01905 18.9537 8.79298 19.0931 8.22715C19.2307 7.65968 18.8332 7.28031 18.4173 7.28031"
                                                    fill="#0060AF"
                                                />
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="bank-message">
                                        {t("accountnumber")} ({t("onbehalfof")} Luxury Hub)
                                    </div>
                                    <div className="bank-number">
                                        <div>54914788712</div>
                                        <button onClick={() => navigator.clipboard.writeText("54914788712")}>
                                            {t("copy")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        <div className="review-item-footer">
                            {reviewObj?.status == "Not Approved" ? (
                                <button
                                    className="preview"
                                    type="button"
                                    onClick={() => navigate("../productinformation")}
                                >
                                    {t("backto")} {t("productinformation")}
                                </button>
                            ) : null}
                            {reviewObj?.status == "Not Approved" ? (
                                <button className="next" type="button">
                                    {t("canceltransaction")}
                                </button>
                            ) : null}
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
