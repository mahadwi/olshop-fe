import { useContext, useEffect, useState } from "react";
import "./vendoraccountinformation.scoped.scss";
import { useLocation } from "react-router-dom";
import "react-responsive-modal/styles.css";
import Select from "react-select";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { LoadingContext } from "../../../context/LoadingContext";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Api from "../../../utils/Api";
import ApiErrorHandling from "../../../utils/ApiErrorHandling";
import toast from "react-hot-toast";

const PHONE_NUMBER_CODE = ["+62", "+1"];

export default function VendorAccountInformation() {
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
    const { user } = useContext(AuthUserContext);

    /**
     * Main State
     *
     */
    const [banks, setBanks] = useState([]);
    const [selectedBank, setSelectedBank] = useState(null);

    const [updateVendor, setUpdateVendor] = useState(false);
    const [editVendor, setEditVendor] = useState(true);

    const [defaultName, setDefaultName] = useState("");
    const [defaultPhone, setDefaultPhone] = useState("");
    const [defaultKtp, setDefaultKtp] = useState("");
    const [defaultBankAccountHolder, setDefaultBankAccountHolder] = useState("");
    const [defaultBankAccountNumber, setDefaultBankAccountNumber] = useState("");
    const [defaultAddress, setDefaultAddress] = useState("");

    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [phoneCode, setPhoneCode] = useState("+62");
    const [phone, setPhone] = useState("");
    const [ktp, setKtp] = useState("");
    const [bankAccountHolder, setBankAccountHolder] = useState("");
    const [bankAccountNumber, setBankAccountNumber] = useState("");
    const [address, setAddress] = useState("");
    const [errorObj422, setErrorObj422] = useState({});

    const doReg = () => {
        const data = {
            name: name,
            email: user.email,
            phone: `${phoneCode}${phone}`,
            ktp: ktp,
            bank: selectedBank?.value,
            bank_account_holder: bankAccountHolder,
            bank_account_number: bankAccountNumber,
            address: address
        };
        setErrorObj422({});
        setLoading(true);
        Api.post("/vendor", data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("apiToken")
            }
        })
            .then(res => {
                navigate("../productinformation");
            })
            .catch(err => {
                ApiErrorHandling.handlingErr(err, [setErrorObj422]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const doUpdate = () => {
        const data = {
            name: name,
            email: user.email,
            phone: `${phoneCode}${phone}`,
            ktp: ktp,
            bank: selectedBank?.value,
            bank_account_holder: bankAccountHolder,
            bank_account_number: bankAccountNumber,
            address: address
        };
        setErrorObj422({});
        setLoading(true);
        Api.put(`/vendor/${id}`, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("apiToken")
            }
        })
            .then(res => {
                setEditVendor(false);
                setUpdateVendor(true);
                toast.success("Account information has been updated");
            })
            .catch(err => {
                ApiErrorHandling.handlingErr(err, [setErrorObj422]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        // Api.delete('/vendor/5', {
        //     headers: {
        //         Authorization: 'Bearer ' + localStorage.getItem('apiToken')
        //     }
        // }).catch((err) => {
        //     console.log(err);
        // });
        setLoading(true);
        let bs = [];
        let b = "";

        const bankCode = Api.get("/bank-code")
            .then(res => {
                const r = res.data.data.map(v => ({ value: v.code, label: v.name }));
                bs = r;
                setBanks(r);
            })
            .catch(err => {
                console.log(err);
            });
        const vendor = Api.get("/vendor", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("apiToken")
            }
        })
            .then(res => {
                const data = res.data.data;
                if (data.length != 0) {
                    const vendor = data[0];

                    setId(vendor.id);
                    setDefaultName(vendor.name);
                    setName(vendor.name);
                    for (const phoneCode of PHONE_NUMBER_CODE) {
                        if (vendor.phone.startsWith(phoneCode)) {
                            setDefaultPhone(vendor.phone.substring(phoneCode.length));
                            setPhone(vendor.phone.substring(phoneCode.length));
                            setPhoneCode(phoneCode);
                            break;
                        }
                    }
                    setDefaultKtp(vendor.ktp);
                    setKtp(vendor.ktp);
                    b = vendor.bank;
                    setDefaultBankAccountNumber(vendor.bank_account_number);
                    setBankAccountNumber(vendor.bank_account_number);
                    setDefaultBankAccountHolder(vendor.bank_account_holder);
                    setBankAccountHolder(vendor.bank_account_holder);
                    setDefaultAddress(vendor.address);
                    setAddress(vendor.address);

                    setUpdateVendor(true);
                    setEditVendor(false);
                }
            })
            .catch(err => {
                console.log(err);
            });
        Promise.all([bankCode, vendor])
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                for (const bank of bs) {
                    if (bank.value === b) {
                        setSelectedBank(bank);
                        break;
                    }
                }
                setLoading(false);
            });
    }, []);

    return (
        <div className="vendor">
            <ContainerComponent>
                <div className="tabs">
                    <button className="active">{t("accountinformation")}</button>
                    <button
                        onClick={() => {
                            if (updateVendor) {
                                navigate("../productinformation");
                            }
                        }}
                    >
                        {t("productinformation")}
                    </button>
                </div>
                <div className="step-1 bg-white">
                    <div className="title">{t("accountinformation")}</div>
                    <div className="divider" />
                    <div className="content">
                        <form action="">
                            <div className="form-input">
                                <div className="form-group">
                                    <div className="left-form-group">
                                        <label className="form-label" htmlFor="name">
                                            {t("name")}
                                        </label>
                                    </div>
                                    <div className="center-form-group">
                                        <span>:</span>
                                    </div>
                                    <div className="right-form-group">
                                        <input
                                            disabled={!editVendor}
                                            className={`form-control ${errorObj422.name ? "is-invalid" : ""}`}
                                            type="text"
                                            defaultValue={defaultName}
                                            name="name"
                                            id="name"
                                            placeholder={`${t("name")}*`}
                                            onInput={event => setName(event.currentTarget.value)}
                                        />

                                        {errorObj422.name ? (
                                            <div className="invalid-feedback">{errorObj422.name}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="left-form-group">
                                        <label className="form-label" htmlFor="email">
                                            Email
                                        </label>
                                    </div>
                                    <div className="center-form-group">
                                        <span>:</span>
                                    </div>
                                    <div className="right-form-group">
                                        <input
                                            className={`form-control ${errorObj422.email ? "is-invalid" : ""}`}
                                            type="email"
                                            disabled
                                            name="email"
                                            id="email"
                                            value={user.email}
                                        />
                                        {errorObj422.email ? (
                                            <div className="invalid-feedback">{errorObj422.email}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="left-form-group">
                                        <label className="form-label" htmlFor="phone">
                                            {t("phonenumber")}
                                        </label>
                                    </div>
                                    <div className="center-form-group">
                                        <span>:</span>
                                    </div>
                                    <div className="right-form-group form-group__phone-number">
                                        <select
                                            disabled={!editVendor}
                                            name=""
                                            id=""
                                            className="form-control"
                                            onChange={event => setPhoneCode(event.currentTarget.value)}
                                        >
                                            {PHONE_NUMBER_CODE.map(v => (
                                                <option selected={v == phoneCode} value={v}>
                                                    {v}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            disabled={!editVendor}
                                            className={`form-control ${errorObj422.phone ? "is-invalid" : ""}`}
                                            type="email"
                                            defaultValue={defaultPhone}
                                            name="phone"
                                            id="phone"
                                            placeholder={`${t("phonenumber")}*`}
                                            onInput={event => setPhone(event.currentTarget.value)}
                                        />
                                        {errorObj422.phone ? (
                                            <div className="invalid-feedback">{errorObj422.phone}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="left-form-group">
                                        <label className="form-label" htmlFor="nik">
                                            {t("idcardnumber")}
                                        </label>
                                    </div>
                                    <div className="center-form-group">
                                        <span>:</span>
                                    </div>
                                    <div className="right-form-group">
                                        <input
                                            disabled={!editVendor}
                                            className={`form-control ${errorObj422.ktp ? "is-invalid" : ""}`}
                                            type="email"
                                            defaultValue={defaultKtp}
                                            name="nik"
                                            id="nik"
                                            placeholder={`${t("idcardnumber")}*`}
                                            onInput={event => setKtp(event.currentTarget.value)}
                                        />
                                        {errorObj422.ktp ? (
                                            <div className="invalid-feedback">{errorObj422.ktp}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="left-form-group">
                                        <label className="form-label" htmlFor="bank">
                                            {t("bankname")}
                                        </label>
                                    </div>
                                    <div className="center-form-group">
                                        <span>:</span>
                                    </div>
                                    <div className="right-form-group">
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
                                                    width: "100%",
                                                    backgroundColor: state.isDisabled ? "#e9ecef" : "transparent"
                                                }),
                                                input: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    color: "#545454",
                                                    fontSize: "12px",
                                                    fontWeight: "300",
                                                    fontFamily: "'Inter', sans-serif"
                                                }),
                                                placeholder: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    color: state.isDisabled ? "#53575B" : "#000",
                                                    fontSize: "12px",
                                                    fontWeight: "500",
                                                    fontFamily: "'Cabin', sans-serif"
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
                                            name="banks"
                                            isDisabled={!editVendor}
                                            className={`${errorObj422.bank ? "is-invalid" : ""}`}
                                            defaultOptions
                                            placeholder={`${t("selectbankname")}*`}
                                            value={selectedBank}
                                            onChange={setSelectedBank}
                                            options={banks}
                                        />
                                        {errorObj422.bank ? (
                                            <div className="invalid-feedback">{errorObj422.bank}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="left-form-group">
                                        <label className="form-label" htmlFor="rekening">
                                            {t("accountnumber")}
                                        </label>
                                    </div>
                                    <div className="center-form-group">
                                        <span>:</span>
                                    </div>
                                    <div className="right-form-group">
                                        <input
                                            disabled={!editVendor}
                                            className={`form-control ${
                                                errorObj422.bank_account_number ? "is-invalid" : ""
                                            }`}
                                            type="email"
                                            defaultValue={defaultBankAccountNumber}
                                            s
                                            name="rekening"
                                            id="rekening"
                                            placeholder={`${t("accountnumber")}*`}
                                            onInput={event => setBankAccountNumber(event.currentTarget.value)}
                                        />
                                        {errorObj422.bank_account_number ? (
                                            <div className="invalid-feedback">{errorObj422.bank_account_number}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="left-form-group">
                                        <label className="form-label" htmlFor="penerima">
                                            {t("recipientname")}
                                        </label>
                                    </div>
                                    <div className="center-form-group">
                                        <span>:</span>
                                    </div>
                                    <div className="right-form-group">
                                        <input
                                            disabled={!editVendor}
                                            className={`form-control ${
                                                errorObj422.bank_account_holder ? "is-invalid" : ""
                                            }`}
                                            type="email"
                                            defaultValue={defaultBankAccountHolder}
                                            name="penerima"
                                            id="penerima"
                                            placeholder={`${t("recipientname")}*`}
                                            onInput={event => setBankAccountHolder(event.currentTarget.value)}
                                        />
                                        {errorObj422.bank_account_holder ? (
                                            <div className="invalid-feedback">{errorObj422.bank_account_holder}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="left-form-group">
                                        <label className="form-label" htmlFor="alamat">
                                            {t("address")}
                                        </label>
                                    </div>
                                    <div className="center-form-group">
                                        <span>:</span>
                                    </div>
                                    <div className="right-form-group">
                                        <textarea
                                            disabled={!editVendor}
                                            defaultValue={defaultAddress}
                                            name="address"
                                            id="alamat"
                                            class={`form-control ${errorObj422.address ? "is-invalid" : ""}`}
                                            cols="30"
                                            rows="10"
                                            style={{ height: "100px" }}
                                            placeholder={`${t("address")}*`}
                                            onInput={event => setAddress(event.currentTarget.value)}
                                        />
                                        {errorObj422.address ? (
                                            <div className="invalid-feedback">{errorObj422.address}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="divider" />
                    <div className="bottom">
                        {editVendor && !updateVendor ? (
                            <button onClick={() => navigate("..")}>{t("cancel")}</button>
                        ) : null}
                        {!updateVendor ? <button onClick={doReg}>{t("next")}</button> : null}
                        {!editVendor ? (
                            <button
                                className="dark"
                                onClick={() => {
                                    setEditVendor(true);
                                }}
                            >
                                {t("edit")}
                            </button>
                        ) : null}
                        {editVendor && updateVendor ? (
                            <button onClick={() => setEditVendor(false)}>{t("cancel")}</button>
                        ) : null}
                        {editVendor && updateVendor ? (
                            <button
                                onClick={() => {
                                    doUpdate();
                                }}
                            >
                                {t("save")}
                            </button>
                        ) : null}
                    </div>
                </div>
            </ContainerComponent>
        </div>
    );
}
