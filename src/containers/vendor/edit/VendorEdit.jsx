import { useContext, useEffect, useRef, useState } from "react";
import "./vendoredit.scoped.scss";
import { useLocation, useParams } from "react-router-dom";
import "react-responsive-modal/styles.css";
import CreatableSelect from "react-select/creatable";
import Api from "../../../utils/Api";
import Modal from "react-bootstrap/Modal";
import { LoadingContext } from "../../../context/LoadingContext";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { CurrencyContext } from "../../../context/CurrencyContext";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ApiErrorHandling from "../../../utils/ApiErrorHandling";
import toast from "react-hot-toast";
import parse from "html-react-parser";
import { IconX } from "@tabler/icons-react";

const inputNonNegativeValue = event => {
    const target = event.currentTarget;
    if (target.value == "") {
        target.value = "";
    } else {
        const v = Number(target.value);
        target.value = isNaN(v) || v == 0 ? 1 : v;
    }
    return target.value;
};

const dot = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: "block",
        marginRight: 8,
        height: 10,
        width: 10
    }
});

const inputUsdFormat = event => {
    const target = event.currentTarget;
    if (target.value == "") {
        target.value = "";
    } else {
        const s = target.value.split(".");
        if (target.value[target.value.length - 1] == "." && s.length == 2) {
            return s.join("");
        }
        const v = Number(s.slice(0, 2).join("."));
        target.value = isNaN(v) || v == 0 ? 1 : v;
    }
    return target.value;
};

export default function VendorEdit() {
    /**
     * Hooks
     *
     */
    const { pathname } = useLocation();
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();

    /**
     * Context
     *
     */
    const { setLoading } = useContext(LoadingContext);
    const { user, refreshUser } = useContext(AuthUserContext);
    const { language } = useContext(LanguageContext);
    const suffix = language == "id" ? "" : "_en";
    const { currency } = useContext(CurrencyContext);
    const [modalPratinjau, setModalPratinjau] = useState(false);
    const [commissionType, setCommissionType] = useState(null);

    /**
     * Main State
     *
     */
    const [modalConfirmSellGoods, setModalConfirmSellGoods] = useState(false);
    const inputImage = useRef(null);
    const [imageBlobs, setImageBlobs] = useState([]);
    const [selectedImageBlob, setSelectedImageBlob] = useState(-1);

    const conditions = [
        {
            label: t("new"),
            value: "New"
        },
        {
            label: t("likenew"),
            value: "Like New"
        }
    ];
    const [selectedCondition, setSelectedCondition] = useState(null);

    const [isLoadingBrands, setIsLoadingBrands] = useState(false);
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(null);

    const [colors, setColors] = useState([]);
    const [selectedColor, setSelectedColor] = useState(null);

    const [formData, setFormData] = useState({});
    const [errorObj422, setErrorObj422] = useState({});

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setLoading(true);
        const v = Api.get("/vendor", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("apiToken")
            }
        })
            .then(res => {
                const data = res.data.data;
                if (data.length == 0) {
                    navigate("../..");
                }
            })
            .catch(err => {
                console.log(err);
            });
        let fetchColors = [];
        const c = Api.get("/color")
            .then(res => {
                fetchColors = res.data.data.map(c => ({
                    value: c.id,
                    label: c.name,
                    color: c.hex_code
                }));
            })
            .catch(err => {
                console.log(err);
            });
        let fetchCategories = [];
        const ca = Api.get("/product-category")
            .then(res => {
                fetchCategories = res.data.data.map(c => ({ value: c.id, label: c.name }));
            })
            .catch(err => {
                console.log(err);
            });
        let fetchBrands = [];
        const bra = Api.get("/brand")
            .then(res => {
                fetchBrands = res.data.data.map(c => ({ value: c.id, label: c.name }));
            })
            .catch(err => {
                console.log(err);
            });
        let fetchProduct = {};
        const product = Api.get(`/vendor-product/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("apiToken")
            }
        })
            .then(res => {
                fetchProduct = res.data.data;
            })
            .catch(err => {
                console.log(err);
            });
        Promise.all([v, c, ca, bra, product]).finally(() => {
            setColors(fetchColors);
            setCategories(fetchCategories);
            setBrands(fetchBrands);

            const { brand, category, color, commission_type, id, images, ...d } = fetchProduct;

            for (const brandOption of fetchBrands) {
                if (brandOption.label == brand) {
                    setSelectedBrand(brandOption);
                    d.brand_id = brandOption.value;
                    break;
                }
            }

            for (const categoryOption of fetchCategories) {
                if (categoryOption.label == category) {
                    setSelectedCategories(categoryOption);
                    d.product_category_id = categoryOption.value;
                    break;
                }
            }

            for (const colorOption of fetchColors) {
                if (colorOption.label == color) {
                    setSelectedColor(colorOption);
                    d.color_id = colorOption.value;
                    break;
                }
            }

            if (commission_type == "percent") {
                delete d.sale_price;
                delete d.sale_usd;
            } else {
                delete d.commission;
            }
            d.commission_type = commission_type;
            setCommissionType({ value: commission_type, label: commission_type == "percent" ? "Percent" : "Selling" });

            setSelectedCondition({ value: d.condition, label: d.condition == "New" ? t("new") : t("likenew") });

            setImageBlobs(images.map((img) => ({
                type: "URL",
                url: img,
            })));

            setFormData(d);

            (async () => {
                for (const img of images) {
                    // TODO: convert to blob
                }
                setLoading(false);
            })();
        });
    }, []);

    const inputImageOnChange = event => {
        const file = event.currentTarget.files[0];
        setImageBlobs(blobs => {
            const c = [...blobs];
            c.push({
                type: "BLOB",
                file: file,
                url: URL.createObjectURL(file)
            });
            return c;
        });
    };

    const removeImageBlog = i => {
        setImageBlobs(blobs => {
            const c = [...blobs].filter(({ url, type }, j) => {
                const r = j != i;
                if (!r) {
                    if (type == "BLOB") {
                        URL.revokeObjectURL(url);
                    }
                    if (type == "URL") {
                        setLoading(true);
                        Api.post("/vendor-product-delete-image", {
                            vendor_product_id: id,
                            images: [url.split("/").pop()],
                        }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("apiToken"),
                            }
                        }).catch((err) => {
                            console.log(err);
                        }).finally(() => {
                            setLoading(false);
                        });
                    }
                }
                return r;
            });
            return c;
        });
    };

    const doUpdateProduct = () => {
        setLoading(true);
        setErrorObj422({});

        let i;
        const imgBlobs = imageBlobs.reduce((r, img, i) => {
            if (img.type == "BLOB") {
                r.push({
                    index: i,
                    file:  img.file,
                });
            }
            return r;
        }, []);

        if (imgBlobs.length == 0) {
            i = Promise.resolve(true);
        } else {
            const imageFormData = new FormData();
            imageFormData.set("vendor_product_id", id);

            for (const img of imgBlobs) {
                imageFormData.set(`images[${img.index}]`, img.file);
            }

            i = Api.post(`/vendor-product-upload-image`, imageFormData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("apiToken"),
                }
            })
                .then(res => {
                    console.log(res);
                })
        }

        const form_data_insert = new FormData();

        for (var key in formData) {
            form_data_insert.set(key, formData[key]);
        }

        // for (const { file } of imageBlobs) {
        //     form_data_insert.append("image[]", file);
        // }

        if (form_data_insert.get("commission_type") == "percent") {
            form_data_insert.set("sale_price", 0);
            form_data_insert.set("sale_usd", 0);
        } else {
            form_data_insert.set("commission", 0);
        }

        const dataInsert = {};

        for (var pair of form_data_insert.entries()) {
            dataInsert[pair[0]] = pair[1];
        }

        const p = Api.put(`/vendor-product/${id}`, dataInsert, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("apiToken")
            }
        })

        Promise.all([i, p])
            .then(res => {
                navigate(`/account/vendor/review/${id}`);
            })
            .catch(err => {
                toast.error("Error validations");
                ApiErrorHandling.handlingErr(err, [setErrorObj422]);
                setImageBlobs((c) => {
                    return c.map(({url}) => ({
                        type: "URL",
                        url: url,
                    }));
                });
            })
            .finally(() => {
                setModalConfirmSellGoods(false);
                setLoading(false);
            });
    };

    return (
        <div className="vendor">
            {/* Modal Create */}
            <Modal
                size="lg"
                fullscreen="lg-down"
                scrollable={true}
                show={modalPratinjau}
                onHide={() => {
                    setModalPratinjau(false);
                    setSelectedImageBlob(-1);
                }}
            >
                <Modal.Header closeButton />
                <Modal.Body>
                    <div className="modal-prainjau-body">
                        <p className="title-body">{t("preview")}</p>
                        <div className="body">
                            <div className="left">
                                {imageBlobs.length != 0 ? (
                                    <>
                                        {selectedImageBlob != -1 ? (
                                            <img
                                                src={imageBlobs[selectedImageBlob].url}
                                                className="image-preview-main"
                                                alt="main preview"
                                            />
                                        ) : null}
                                        {imageBlobs.length > 1 ? (
                                            <div className="preview-photos">
                                                {imageBlobs.map(({ url }, i) => (
                                                    <button
                                                        className="preview-photo"
                                                        onClick={() => setSelectedImageBlob(i)}
                                                    >
                                                        <img src={url} alt="preview product" />
                                                    </button>
                                                ))}
                                            </div>
                                        ) : null}
                                    </>
                                ) : (
                                    <div className="empty">
                                        <h2>{t("previewyouroffers")}</h2>
                                        <p>{t("whencreatinganofferyoucanpreviewhowitwilllook")}</p>
                                    </div>
                                )}
                            </div>
                            <div className="right">
                                <div className="top">
                                    <h2 className={`title ${formData?.name ? "active" : ""}`}>
                                        {formData?.name ? formData.name : t("title")}
                                    </h2>
                                    <h3 className={`price ${selectedBrand?.label ? "active" : ""}`}>
                                        Brand{selectedBrand?.label ? `: ${selectedBrand.label}` : ""}
                                    </h3>
                                    <h3 className={`price ${formData?.price || formData?.price_usd ? "active" : ""}`}>
                                        {t("price")}
                                        {formData?.price || formData?.price_usd ? ": " : ""}
                                        {formData?.price
                                            ? ` ${Number(formData?.price)?.toLocaleString("id-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                                  maximumFractionDigits: 0
                                              })}`
                                            : ""}
                                        {formData?.price && formData?.price_usd ? " | " : ""}
                                        {formData?.price_usd
                                            ? ` ${Number(formData?.price_usd)?.toLocaleString("en-US", {
                                                  style: "currency",
                                                  currency: "USD"
                                              })}`
                                            : ""}
                                    </h3>
                                    {commissionType?.value == "selling" ? (
                                        <h3
                                            className={`price ${
                                                formData?.sale_price || formData?.sale_usd ? "active" : ""
                                            }`}
                                        >
                                            {t("saleprice")}
                                            {formData?.sale_price || formData?.sale_usd ? ": " : ""}
                                            {formData?.sale_price
                                                ? ` ${Number(formData?.sale_price)?.toLocaleString("id-ID", {
                                                      style: "currency",
                                                      currency: "IDR",
                                                      maximumFractionDigits: 0
                                                  })}`
                                                : ""}
                                            {formData?.sale_price && formData?.sale_usd ? " | " : ""}
                                            {formData?.sale_usd
                                                ? ` ${Number(formData?.sale_usd)?.toLocaleString("en-US", {
                                                      style: "currency",
                                                      currency: "USD"
                                                  })}`
                                                : ""}
                                        </h3>
                                    ) : null}
                                    {commissionType?.value == "percent" ? (
                                        <h3 className={`price ${formData?.commission ? "active" : ""}`}>
                                            {t("commission")}
                                            {formData?.commission ? `: ${formData.commission}%` : ""}
                                        </h3>
                                    ) : null}
                                    <h3 className={`price ${selectedColor?.label ? "active" : ""}`}>
                                        {t("color")}
                                        {selectedColor?.label ? `: ${selectedColor.label}` : ""}
                                    </h3>
                                    <p className="p">
                                        {t("offeredon")}{" "}
                                        {new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}{" "}
                                        {new Date().toLocaleString("id-ID", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric"
                                        })}
                                    </p>
                                </div>
                                <div className="bottom">
                                    <div className="content">
                                        <div className="wrapper">
                                            {formData["description" + suffix] ? null : (
                                                <div className="title">Detail</div>
                                            )}
                                            {formData["description" + suffix] ? (
                                                <div>
                                                    {parse(
                                                        formData["description" + suffix]
                                                            ? formData["description" + suffix]
                                                            : ""
                                                    )}
                                                </div>
                                            ) : null}
                                            {formData?.length && formData.width && formData.height ? (
                                                <div className="title active">
                                                    {t("measurements")}
                                                    <span>
                                                        : {`${formData.length}*${formData.width}*${formData.height}`} (
                                                        {t("length")
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                        *
                                                        {t("width")
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                        *
                                                        {t("height")
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                        ) (cm)
                                                    </span>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="seller-info">
                                        <p className="seller-info-left">{t("sellerinformation")}</p>
                                        <p className="seller-info-right">{t("sellerdetail")}</p>
                                    </div>
                                    <div className="user">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            viewBox="0 0 32 32"
                                            fill="none"
                                        >
                                            <g clip-path="url(#clip0_2390_8617)">
                                                <path
                                                    d="M15.9998 29.3346C8.63584 29.3346 2.6665 23.3653 2.6665 16.0013C2.6665 8.6373 8.63584 2.66797 15.9998 2.66797C23.3638 2.66797 29.3332 8.6373 29.3332 16.0013C29.3332 23.3653 23.3638 29.3346 15.9998 29.3346ZM9.3505 24.3426C11.2379 25.8516 13.5834 26.6718 15.9998 26.668C18.6265 26.668 21.0305 25.7186 22.8892 24.1453C22.0208 23.2543 20.9826 22.5465 19.8359 22.0637C18.6892 21.5809 17.4573 21.333 16.2132 21.3346C14.9233 21.3331 13.6472 21.5998 12.4658 22.1176C11.2844 22.6354 10.2235 23.3931 9.3505 24.3426ZM7.48784 22.428C8.60844 21.2387 9.96073 20.2916 11.4614 19.6449C12.962 18.9983 14.5791 18.6658 16.2132 18.668C17.7887 18.6659 19.3491 18.9751 20.8048 19.5778C22.2605 20.1805 23.5828 21.0648 24.6958 22.18C25.8373 20.5735 26.5113 18.6821 26.6433 16.7159C26.7752 14.7496 26.3598 12.7851 25.4432 11.0406C24.5265 9.296 23.1445 7.83947 21.4505 6.83256C19.7564 5.82566 17.8165 5.30775 15.846 5.3363C13.8755 5.36486 11.9514 5.93875 10.2872 6.99431C8.62301 8.04987 7.28378 9.54584 6.41809 11.3162C5.5524 13.0866 5.1941 15.0623 5.38292 17.0239C5.57175 18.9856 6.30033 20.8565 7.48784 22.4293V22.428ZM15.9998 17.3346C14.5853 17.3346 13.2288 16.7727 12.2286 15.7725C11.2284 14.7723 10.6665 13.4158 10.6665 12.0013C10.6665 10.5868 11.2284 9.23026 12.2286 8.23007C13.2288 7.22987 14.5853 6.66797 15.9998 6.66797C17.4143 6.66797 18.7709 7.22987 19.7711 8.23007C20.7713 9.23026 21.3332 10.5868 21.3332 12.0013C21.3332 13.4158 20.7713 14.7723 19.7711 15.7725C18.7709 16.7727 17.4143 17.3346 15.9998 17.3346ZM15.9998 14.668C16.7071 14.668 17.3854 14.387 17.8855 13.8869C18.3856 13.3868 18.6665 12.7085 18.6665 12.0013C18.6665 11.2941 18.3856 10.6158 17.8855 10.1157C17.3854 9.61559 16.7071 9.33464 15.9998 9.33463C15.2926 9.33464 14.6143 9.61559 14.1142 10.1157C13.6141 10.6158 13.3332 11.2941 13.3332 12.0013C13.3332 12.7085 13.6141 13.3868 14.1142 13.8869C14.6143 14.387 15.2926 14.668 15.9998 14.668Z"
                                                    fill="#A2A3B1"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_2390_8617">
                                                    <rect width="32" height="32" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <p>{user.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {/* End of Modal Create */}

            {/* Modal Confirm */}
            <Modal
                centered
                show={modalConfirmSellGoods}
                onHide={() => {
                    setModalConfirmSellGoods(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("confirmation")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-confirm-body">{t("isthedataenteredcorrect")}</div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="modal-confirm-body-footer">
                        <button
                            type="button"
                            onClick={() => {
                                setModalConfirmSellGoods(false);
                            }}
                            className="cancel-button"
                        >
                            {t("cancel")}
                        </button>
                        <button
                            type="button"
                            className="send-button"
                            onClick={() => {
                                doUpdateProduct();
                            }}
                        >
                            {t("save")}
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
                    <div className="step-1-main sell-item">
                        <div className="card">
                            <div className="top">
                                <button
                                    type="button"
                                    onClick={() => {
                                        navigate("../productinformation");
                                    }}
                                >
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
                                <h2>
                                    {t("edit")} {t("sellgoods")}
                                </h2>
                            </div>
                            <div className="body">
                                <input
                                    ref={inputImage}
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={inputImageOnChange}
                                />
                                {imageBlobs.length != 0 ? (
                                    <div className="multiple-photos">
                                        {imageBlobs.map(({ url }, i) => (
                                            <div className="photo">
                                                <img
                                                    src={url}
                                                    alt="preview product"
                                                    className={`${errorObj422["image." + i] ? "is-invalid" : ""}`}
                                                />
                                                <button
                                                    onClick={() => {
                                                        removeImageBlog(i);
                                                    }}
                                                >
                                                    <IconX />
                                                </button>
                                            </div>
                                        ))}
                                        {imageBlobs.length != 4 ? (
                                            <button onClick={() => inputImage.current?.click()}>
                                                <div className="cursor-pointer">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="21"
                                                        height="21"
                                                        viewBox="0 0 21 21"
                                                        fill="none"
                                                    >
                                                        <g clip-path="url(#clip0_2390_8792)">
                                                            <path
                                                                d="M20.0268 3.81V5.51667H17.4668V8.07667H15.7601V5.51667H13.2001V3.81H15.7601V1.25H17.4668V3.81H20.0268ZM12.7735 9.78333C13.1131 9.78322 13.4387 9.64821 13.6787 9.408C13.9188 9.1678 14.0536 8.84207 14.0535 8.50248C14.0534 8.16289 13.9184 7.83725 13.6781 7.59721C13.4379 7.35716 13.1122 7.22237 12.7726 7.22248C12.6045 7.22254 12.438 7.25571 12.2827 7.32011C12.1273 7.38451 11.9862 7.47887 11.8673 7.59781C11.7485 7.71675 11.6542 7.85793 11.5899 8.0133C11.5256 8.16867 11.4926 8.33519 11.4926 8.50333C11.4927 8.67148 11.5259 8.83797 11.5903 8.9933C11.6547 9.14863 11.749 9.28975 11.868 9.40861C11.9869 9.52747 12.1281 9.62173 12.2834 9.68603C12.4388 9.75033 12.6053 9.78339 12.7735 9.78333ZM15.7601 12.543L15.3224 12.0566C15.1623 11.8784 14.9665 11.7359 14.7478 11.6383C14.529 11.5407 14.2922 11.4903 14.0526 11.4903C13.8131 11.4903 13.5762 11.5407 13.3575 11.6383C13.1387 11.7359 12.9429 11.8784 12.7829 12.0566L12.2231 12.6804L8.08014 8.07667L5.52014 10.9208V5.51667H11.4935V3.81H5.52014C5.06751 3.81 4.63341 3.98981 4.31335 4.30987C3.99329 4.62993 3.81348 5.06403 3.81348 5.51667V15.7567C3.81348 16.2093 3.99329 16.6434 4.31335 16.9635C4.63341 17.2835 5.06751 17.4633 5.52014 17.4633H15.7601C16.2128 17.4633 16.6469 17.2835 16.9669 16.9635C17.287 16.6434 17.4668 16.2093 17.4668 15.7567V9.78333H15.7601V12.543Z"
                                                                fill="#111111"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_2390_8792">
                                                                <rect
                                                                    width="20.48"
                                                                    height="20.48"
                                                                    fill="white"
                                                                    transform="translate(0.399902 0.398438)"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                                <p>{t("addphoto")}</p>
                                            </button>
                                        ) : null}
                                    </div>
                                ) : (
                                    <div
                                        className={`add-photo-wrap ${errorObj422.image ? "is-invalid" : ""}`}
                                        onClick={() => inputImage.current?.click()}
                                    >
                                        <div className="cursor-pointer">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="21"
                                                height="21"
                                                viewBox="0 0 21 21"
                                                fill="none"
                                            >
                                                <g clip-path="url(#clip0_2390_8792)">
                                                    <path
                                                        d="M20.0268 3.81V5.51667H17.4668V8.07667H15.7601V5.51667H13.2001V3.81H15.7601V1.25H17.4668V3.81H20.0268ZM12.7735 9.78333C13.1131 9.78322 13.4387 9.64821 13.6787 9.408C13.9188 9.1678 14.0536 8.84207 14.0535 8.50248C14.0534 8.16289 13.9184 7.83725 13.6781 7.59721C13.4379 7.35716 13.1122 7.22237 12.7726 7.22248C12.6045 7.22254 12.438 7.25571 12.2827 7.32011C12.1273 7.38451 11.9862 7.47887 11.8673 7.59781C11.7485 7.71675 11.6542 7.85793 11.5899 8.0133C11.5256 8.16867 11.4926 8.33519 11.4926 8.50333C11.4927 8.67148 11.5259 8.83797 11.5903 8.9933C11.6547 9.14863 11.749 9.28975 11.868 9.40861C11.9869 9.52747 12.1281 9.62173 12.2834 9.68603C12.4388 9.75033 12.6053 9.78339 12.7735 9.78333ZM15.7601 12.543L15.3224 12.0566C15.1623 11.8784 14.9665 11.7359 14.7478 11.6383C14.529 11.5407 14.2922 11.4903 14.0526 11.4903C13.8131 11.4903 13.5762 11.5407 13.3575 11.6383C13.1387 11.7359 12.9429 11.8784 12.7829 12.0566L12.2231 12.6804L8.08014 8.07667L5.52014 10.9208V5.51667H11.4935V3.81H5.52014C5.06751 3.81 4.63341 3.98981 4.31335 4.30987C3.99329 4.62993 3.81348 5.06403 3.81348 5.51667V15.7567C3.81348 16.2093 3.99329 16.6434 4.31335 16.9635C4.63341 17.2835 5.06751 17.4633 5.52014 17.4633H15.7601C16.2128 17.4633 16.6469 17.2835 16.9669 16.9635C17.287 16.6434 17.4668 16.2093 17.4668 15.7567V9.78333H15.7601V12.543Z"
                                                        fill="#111111"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_2390_8792">
                                                        <rect
                                                            width="20.48"
                                                            height="20.48"
                                                            fill="white"
                                                            transform="translate(0.399902 0.398438)"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <p>{t("addphoto")}</p>
                                    </div>
                                )}
                                {[0, 1, 2, 3].map((_, i) => {
                                    if (errorObj422["image." + i]) {
                                        return <div className="invalid-feedback">{errorObj422["image." + i]}</div>;
                                    }
                                    return null;
                                })}
                                <div className="input-title">
                                    <h4>{t("required")}</h4>
                                    <p>{t("giveascompleteanexplanationaspossible")}</p>
                                </div>
                                <div className="form-area">
                                    <div className="one-col col">
                                        <input
                                            className={`form-control ${errorObj422.name ? "is-invalid" : ""}`}
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder={t("name")}
                                            value={formData?.name ?? ""}
                                            onInput={event => {
                                                const d = Object.assign({}, formData);
                                                d.name = event.currentTarget.value;
                                                setFormData(d);
                                            }}
                                        />
                                        {errorObj422.name ? (
                                            <span className="invalid-feedback">{errorObj422.name}</span>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div className="one-col col">
                                        <CreatableSelect
                                            styles={{
                                                placeholder: defaultStyles => {
                                                    return {
                                                        ...defaultStyles,
                                                        color: "#A2A3B1",
                                                        fontSize: "10px",
                                                        fontWeight: "600",
                                                        fontFamily: "'Inter', sans-serif",
                                                        marginLeft: ".6rem"
                                                    };
                                                },
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderColor: errorObj422.brand_id ? "#dc3545" : "#C4C4C4",
                                                    borderWidth: "1px",
                                                    boxShadow: "none",
                                                    backgroundColor: state.isDisabled ? "transparent" : "transparent",
                                                    "&:hover": {
                                                        borderColor: "#C4C4C4"
                                                    }
                                                }),
                                                singleValue: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    color: "#000",
                                                    fontSize: "12px",
                                                    fontWeight: "500",
                                                    fontFamily: "'Cabin', sans-serif"
                                                }),
                                                container: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    width: "100%"
                                                }),
                                                input: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    color: "#545454",
                                                    fontSize: "10px",
                                                    fontWeight: "normal",
                                                    fontFamily: "'Inter', sans-serif"
                                                }),
                                                option: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    backgroundColor: state.isDisabled ? "transparent" : "transparent",
                                                    color: "#000",
                                                    fontSize: "10px",
                                                    fontWeight: state.isDisabled ? "700" : "400",
                                                    fontFamily: "'Inter', sans-serif",
                                                    borderBottom: state.isDisabled ? "1px solid #C4C4C4;" : "0px",
                                                    "&:hover": {
                                                        backgroundColor: state.isDisabled ? "#FFF" : "#000",
                                                        color: state.isDisabled ? "#000" : "#FFF"
                                                    }
                                                })
                                            }}
                                            name=""
                                            formatCreateLabel={inputValue => {
                                                return `${t("addbrand")} "${inputValue}"`;
                                            }}
                                            isDisabled={isLoadingBrands}
                                            isLoading={isLoadingBrands}
                                            onCreateOption={inputValue => {
                                                setIsLoadingBrands(true);
                                                Api.post(
                                                    `/brand`,
                                                    {
                                                        name: inputValue
                                                    },
                                                    {
                                                        headers: {
                                                            Authorization: "Bearer " + localStorage.getItem("apiToken")
                                                        }
                                                    }
                                                )
                                                    .then(res => {
                                                        const newOption = {
                                                            label: inputValue,
                                                            value: res.data.data.id
                                                        };
                                                        setBrands(prev => [...prev, newOption]);
                                                        setSelectedBrand(newOption);
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                    })
                                                    .finally(() => {
                                                        setIsLoadingBrands(false);
                                                    });
                                            }}
                                            defaultOptions
                                            placeholder={"Brand"}
                                            value={selectedBrand}
                                            onChange={option => {
                                                const d = Object.assign({}, formData);
                                                d.brand_id = option.value;
                                                setFormData(d);
                                                setSelectedBrand(option);
                                            }}
                                            options={brands}
                                        />
                                        {errorObj422.brand_id ? (
                                            <span className="invalid-feedback">{errorObj422.brand_id}</span>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div className="one-col col">
                                        <Select
                                            styles={{
                                                placeholder: defaultStyles => {
                                                    return {
                                                        ...defaultStyles,
                                                        color: "#A2A3B1",
                                                        fontSize: "10px",
                                                        fontWeight: "600",
                                                        fontFamily: "'Inter', sans-serif",
                                                        marginLeft: ".6rem"
                                                    };
                                                },
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderColor: errorObj422.product_category_id
                                                        ? "#dc3545"
                                                        : "#C4C4C4",
                                                    borderWidth: "1px",
                                                    boxShadow: "none",
                                                    backgroundColor: state.isDisabled ? "transparent" : "transparent",
                                                    "&:hover": {
                                                        borderColor: "#C4C4C4"
                                                    }
                                                }),
                                                singleValue: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    color: "#000",
                                                    fontSize: "12px",
                                                    fontWeight: "500",
                                                    fontFamily: "'Cabin', sans-serif"
                                                }),
                                                container: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    width: "100%"
                                                }),
                                                input: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    color: "#545454",
                                                    fontSize: "10px",
                                                    fontWeight: "normal",
                                                    fontFamily: "'Inter', sans-serif"
                                                }),
                                                option: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    backgroundColor: state.isDisabled ? "transparent" : "transparent",
                                                    color: "#000",
                                                    fontSize: "10px",
                                                    fontWeight: state.isDisabled ? "700" : "400",
                                                    fontFamily: "'Inter', sans-serif",
                                                    borderBottom: state.isDisabled ? "1px solid #C4C4C4;" : "0px",
                                                    "&:hover": {
                                                        backgroundColor: state.isDisabled ? "#FFF" : "#000",
                                                        color: state.isDisabled ? "#000" : "#FFF"
                                                    }
                                                })
                                            }}
                                            name=""
                                            defaultOptions
                                            placeholder={t("category")}
                                            value={selectedCategories}
                                            onChange={option => {
                                                const d = Object.assign({}, formData);
                                                d.product_category_id = option.value;
                                                setFormData(d);
                                                setSelectedCategories(option);
                                            }}
                                            options={categories}
                                        />
                                        {errorObj422.product_category_id ? (
                                            <span className="invalid-feedback">{errorObj422.product_category_id}</span>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div className="two-col col">
                                        <div>
                                            <Select
                                                styles={{
                                                    placeholder: defaultStyles => {
                                                        return {
                                                            ...defaultStyles,
                                                            color: "#A2A3B1",
                                                            fontSize: "10px",
                                                            fontWeight: "600",
                                                            fontFamily: "'Inter', sans-serif",
                                                            marginLeft: ".6rem"
                                                        };
                                                    },
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderColor: errorObj422.condition ? "#dc3545" : "#C4C4C4",
                                                        borderWidth: "1px",
                                                        boxShadow: "none",
                                                        backgroundColor: state.isDisabled
                                                            ? "transparent"
                                                            : "transparent",
                                                        "&:hover": {
                                                            borderColor: "#C4C4C4"
                                                        }
                                                    }),
                                                    singleValue: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        color: "#000",
                                                        fontSize: "12px",
                                                        fontWeight: "500",
                                                        fontFamily: "'Cabin', sans-serif"
                                                    }),
                                                    container: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        width: "100%"
                                                    }),
                                                    input: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        color: "#545454",
                                                        fontSize: "10px",
                                                        fontWeight: "normal",
                                                        fontFamily: "'Inter', sans-serif"
                                                    }),
                                                    option: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        backgroundColor: state.isDisabled
                                                            ? "transparent"
                                                            : "transparent",
                                                        color: "#000",
                                                        fontSize: "10px",
                                                        fontWeight: state.isDisabled ? "700" : "400",
                                                        fontFamily: "'Inter', sans-serif",
                                                        borderBottom: state.isDisabled ? "1px solid #C4C4C4;" : "0px",
                                                        "&:hover": {
                                                            backgroundColor: state.isDisabled ? "#FFF" : "#000",
                                                            color: state.isDisabled ? "#000" : "#FFF"
                                                        }
                                                    })
                                                }}
                                                name=""
                                                defaultOptions
                                                placeholder={t("condition")}
                                                value={selectedCondition}
                                                onChange={option => {
                                                    const d = Object.assign({}, formData);
                                                    d.condition = option.value;
                                                    setFormData(d);
                                                    setSelectedCondition(option);
                                                }}
                                                options={conditions}
                                            />
                                            {errorObj422.condition ? (
                                                <span className="invalid-feedback">{errorObj422.condition}</span>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <div>
                                            <input
                                                className={`form-control ${
                                                    errorObj422.product_deadline ? "is-invalid" : ""
                                                }`}
                                                type="date"
                                                name=""
                                                id=""
                                                placeholder={`${t("productdeadline")} (cm)`}
                                                onInput={event => {
                                                    const d = Object.assign({}, formData);
                                                    d.product_deadline = event.target.value;
                                                    setFormData(d);
                                                }}
                                            />
                                            {errorObj422.product_deadline ? (
                                                <span className="invalid-feedback">{errorObj422.product_deadline}</span>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                    <div className="two-col col">
                                        <div>
                                            <input
                                                className={`form-control ${errorObj422.weight ? "is-invalid" : ""}`}
                                                type="number"
                                                min={1}
                                                name=""
                                                id=""
                                                placeholder={`${t("weight")} (Kg)`}
                                                value={formData.weight}
                                                onInput={event => {
                                                    const v = inputNonNegativeValue(event);
                                                    const d = Object.assign({}, formData);
                                                    d.weight = v;
                                                    setFormData(d);
                                                }}
                                            />
                                            {errorObj422.weight ? (
                                                <span className="invalid-feedback">{errorObj422.weight}</span>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <div>
                                            <input
                                                className={`form-control ${errorObj422.length ? "is-invalid" : ""}`}
                                                type="number"
                                                min={1}
                                                name=""
                                                id=""
                                                placeholder={`${t("length")} (cm)`}
                                                value={formData.length}
                                                onInput={event => {
                                                    const v = inputNonNegativeValue(event);
                                                    const d = Object.assign({}, formData);
                                                    d.length = v;
                                                    setFormData(d);
                                                }}
                                            />
                                            {errorObj422.length ? (
                                                <span className="invalid-feedback">{errorObj422.length}</span>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                    <div className="two-col col">
                                        <div>
                                            <input
                                                className={`form-control ${errorObj422.width ? "is-invalid" : ""}`}
                                                type="number"
                                                min={1}
                                                name=""
                                                id=""
                                                placeholder={`${t("width")} (cm)`}
                                                value={formData.width}
                                                onInput={event => {
                                                    const v = inputNonNegativeValue(event);
                                                    const d = Object.assign({}, formData);
                                                    d.width = v;
                                                    setFormData(d);
                                                }}
                                            />
                                            {errorObj422.width ? (
                                                <span className="invalid-feedback">{errorObj422.width}</span>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <div>
                                            <input
                                                className={`form-control ${errorObj422.width ? "is-invalid" : ""}`}
                                                type="number"
                                                min={1}
                                                name=""
                                                id=""
                                                placeholder={`${t("height")} (cm)`}
                                                value={formData.height}
                                                onInput={event => {
                                                    const v = inputNonNegativeValue(event);
                                                    const d = Object.assign({}, formData);
                                                    d.height = v;
                                                    setFormData(d);
                                                }}
                                            />
                                            {errorObj422.height ? (
                                                <span className="invalid-feedback">{errorObj422.height}</span>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                    <div className="two-col col">
                                        <div>
                                            <input
                                                className={`form-control ${errorObj422.price ? "is-invalid" : ""}`}
                                                type="text"
                                                name=""
                                                id=""
                                                placeholder={`${t("price")} (RP)`}
                                                value={formData.price}
                                                onInput={event => {
                                                    const v = inputNonNegativeValue(event);
                                                    const d = Object.assign({}, formData);
                                                    d.price = v;
                                                    setFormData(d);
                                                }}
                                            />
                                            {errorObj422.price ? (
                                                <span className="invalid-feedback">{errorObj422.price}</span>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <div>
                                            <input
                                                className={`form-control ${errorObj422.price_usd ? "is-invalid" : ""}`}
                                                type="text"
                                                min={1}
                                                name=""
                                                id=""
                                                placeholder={`${t("price")} (USD)`}
                                                value={formData.price_usd}
                                                onInput={event => {
                                                    const v = inputUsdFormat(event);
                                                    const d = Object.assign({}, formData);
                                                    d.price_usd = v;
                                                    setFormData(d);
                                                }}
                                            />
                                            {errorObj422.price_usd ? (
                                                <span className="invalid-feedback">{errorObj422.price_usd}</span>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                    <div className="two-col col">
                                        <div>
                                            <Select
                                                styles={{
                                                    placeholder: defaultStyles => {
                                                        return {
                                                            ...defaultStyles,
                                                            color: "#A2A3B1",
                                                            fontSize: "10px",
                                                            fontWeight: "600",
                                                            fontFamily: "'Inter', sans-serif",
                                                            marginLeft: ".6rem"
                                                        };
                                                    },
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderColor: errorObj422.commission_type
                                                            ? "#dc3545"
                                                            : "#C4C4C4",
                                                        borderWidth: "1px",
                                                        boxShadow: "none",
                                                        backgroundColor: state.isDisabled
                                                            ? "transparent"
                                                            : "transparent",
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
                                                        fontSize: "10px",
                                                        fontWeight: "normal",
                                                        fontFamily: "'Inter', sans-serif"
                                                    }),
                                                    singleValue: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        color: "#000",
                                                        fontSize: "12px",
                                                        fontWeight: "500",
                                                        fontFamily: "'Cabin', sans-serif"
                                                    }),
                                                    option: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        backgroundColor: state.isDisabled
                                                            ? "transparent"
                                                            : "transparent",
                                                        color: "#000",
                                                        fontSize: "10px",
                                                        fontWeight: state.isDisabled ? "700" : "400",
                                                        fontFamily: "'Inter', sans-serif",
                                                        borderBottom: state.isDisabled ? "1px solid #C4C4C4;" : "0px",
                                                        "&:hover": {
                                                            backgroundColor: state.isDisabled ? "#FFF" : "#000",
                                                            color: state.isDisabled ? "#000" : "#FFF"
                                                        }
                                                    })
                                                }}
                                                name="commissiontype"
                                                defaultOptions
                                                placeholder={t("commissiontype")}
                                                value={commissionType}
                                                onChange={option => {
                                                    const d = Object.assign({}, formData);
                                                    d.commission_type = option.value;

                                                    if (option.value == "percent") {
                                                        delete d.sale_price;
                                                        delete d.sale_usd;
                                                    } else {
                                                        delete d.commission;
                                                    }

                                                    setFormData(d);
                                                    setCommissionType(option);
                                                }}
                                                options={[
                                                    { value: "percent", label: "Percent" },
                                                    { value: "selling", label: "Selling" }
                                                ]}
                                            />
                                            {errorObj422.commission_type ? (
                                                <span className="invalid-feedback">{errorObj422.commission_type}</span>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <div>
                                            <input
                                                className={`form-control ${errorObj422.commission ? "is-invalid" : ""}`}
                                                style={{
                                                    background: commissionType?.value == "percent" ? "white" : "#EEE"
                                                }}
                                                type="number"
                                                min={1}
                                                name=""
                                                id="commision"
                                                disabled={commissionType?.value != "percent"}
                                                placeholder={`${t("commission")} (%)`}
                                                value={formData.commission}
                                                onInput={event => {
                                                    const v = inputNonNegativeValue(event);
                                                    const d = Object.assign({}, formData);
                                                    d.commission = v;
                                                    setFormData(d);
                                                }}
                                            />
                                            {errorObj422.commission ? (
                                                <span className="invalid-feedback">{errorObj422.commission}</span>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                    <div className="two-col col">
                                        <div>
                                            <input
                                                className={`form-control ${errorObj422.sale_price ? "is-invalid" : ""}`}
                                                type="text"
                                                style={{
                                                    background: commissionType?.value == "selling" ? "white" : "#EEE"
                                                }}
                                                name=""
                                                id="sale_price"
                                                disabled={commissionType?.value != "selling"}
                                                placeholder={`${t("saleprice")} (RP)`}
                                                value={formData.sale_price}
                                                onInput={event => {
                                                    const v = inputNonNegativeValue(event);
                                                    const d = Object.assign({}, formData);
                                                    d.sale_price = v;
                                                    setFormData(d);
                                                }}
                                            />
                                            {errorObj422.sale_price ? (
                                                <span className="invalid-feedback">{errorObj422.sale_price}</span>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <div>
                                            <input
                                                className={`form-control ${errorObj422.sale_usd ? "is-invalid" : ""}`}
                                                type="text"
                                                style={{
                                                    background: commissionType?.value == "selling" ? "white" : "#EEE"
                                                }}
                                                name=""
                                                id="sale_usd"
                                                disabled={commissionType?.value != "selling"}
                                                placeholder={`${t("saleprice")} (USD)`}
                                                value={formData.sale_usd}
                                                onInput={event => {
                                                    const v = inputUsdFormat(event);
                                                    const d = Object.assign({}, formData);
                                                    d.sale_usd = v;
                                                    setFormData(d);
                                                }}
                                            />
                                            {errorObj422.sale_usd ? (
                                                <span className="invalid-feedback">{errorObj422.sale_usd}</span>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                    <div className="one-col col">
                                        <div className="one-col col">
                                            <Select
                                                styles={{
                                                    placeholder: defaultStyles => {
                                                        return {
                                                            ...defaultStyles,
                                                            color: "#A2A3B1",
                                                            fontSize: "10px",
                                                            fontWeight: "600",
                                                            fontFamily: "'Inter', sans-serif",
                                                            marginLeft: ".6rem"
                                                        };
                                                    },
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderColor: errorObj422.color_id ? "#dc3545" : "#C4C4C4",
                                                        borderWidth: "1px",
                                                        boxShadow: "none",
                                                        backgroundColor: state.isDisabled
                                                            ? "transparent"
                                                            : "transparent",
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
                                                        fontFamily: "'Inter', sans-serif",
                                                        ...dot()
                                                    }),
                                                    singleValue: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        color: "#000",
                                                        fontSize: "12px",
                                                        fontWeight: "500",
                                                        fontFamily: "'Cabin', sans-serif",
                                                        ...dot(state.data.color)
                                                    }),
                                                    option: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        backgroundColor: state.isDisabled
                                                            ? "transparent"
                                                            : "transparent",
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
                                                name=""
                                                defaultOptions
                                                placeholder={t("color").toUpperCase()}
                                                value={selectedColor}
                                                onChange={option => {
                                                    setSelectedColor(option);
                                                    const d = Object.assign({}, formData);
                                                    d.color_id = option.value;
                                                    setFormData(d);
                                                }}
                                                options={colors}
                                            />
                                            {errorObj422.color_id ? (
                                                <span className="invalid-feedback">{errorObj422.color_id}</span>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="input-title input-title-2">
                                    <h4>{t("fulldetails")}</h4>
                                    <p>{t("attractmoreinterestbyincludingmoredetails")}</p>
                                </div>
                                <div className="form-area">
                                    <div className="one-col col">
                                        <textarea
                                            className={`form-control ${errorObj422.description ? "is-invalid" : ""}`}
                                            name=""
                                            id=""
                                            cols="30"
                                            rows="10"
                                            placeholder={t("descriptionindonesia")}
                                            value={formData.description}
                                            onInput={event => {
                                                const d = Object.assign({}, formData);
                                                d.description = event.currentTarget.value;
                                                setFormData(d);
                                            }}
                                        />
                                        {errorObj422.description ? (
                                            <span className="invalid-feedback">{errorObj422.description}</span>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div className="one-col col">
                                        <textarea
                                            className={`form-control ${errorObj422.description_en ? "is-invalid" : ""}`}
                                            name=""
                                            id=""
                                            cols="30"
                                            rows="10"
                                            value={formData.description_en}
                                            placeholder={t("descriptionenglish")}
                                            onInput={event => {
                                                const d = Object.assign({}, formData);
                                                d.description_en = event.currentTarget.value;
                                                setFormData(d);
                                            }}
                                        />
                                        {errorObj422.description_en ? (
                                            <span className="invalid-feedback">{errorObj422.description_en}</span>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div className="one-col col">
                                        <textarea
                                            className="form-control"
                                            name=""
                                            id=""
                                            cols="30"
                                            rows="10"
                                            placeholder={t("historyindonesia")}
                                            value={formData.history}
                                            onInput={event => {
                                                const d = Object.assign({}, formData);
                                                d.history = event.currentTarget.value;
                                                setFormData(d);
                                            }}
                                        />
                                    </div>
                                    <div className="one-col col">
                                        <textarea
                                            className="form-control"
                                            name=""
                                            id=""
                                            cols="30"
                                            rows="10"
                                            placeholder={t("historyenglish")}
                                            value={formData.history_en}
                                            onInput={event => {
                                                const d = Object.assign({}, formData);
                                                d.history_en = event.currentTarget.value;
                                                setFormData(d);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="footer">
                                <button
                                    className="preview"
                                    type="button"
                                    onClick={() => {
                                        setModalPratinjau(true);
                                        setSelectedImageBlob(0);
                                    }}
                                >
                                    {t("preview")}
                                </button>
                                <button
                                    className="next"
                                    onClick={() => {
                                        setModalConfirmSellGoods(true);
                                        console.log(formData);
                                    }}
                                >
                                    {t("save")}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            </ContainerComponent>
        </div>
    );
}
