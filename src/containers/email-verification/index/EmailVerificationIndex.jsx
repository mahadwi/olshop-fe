import { useContext, useEffect, useState } from "react";
import HighlightTitleComponent from "../../../components/general/highlight-title/HighlightTitleComponent";
import './email-verification.scoped.scss'
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import Api from "../../../utils/Api";
import { useNavigate, useLocation } from 'react-router-dom'
import { LoadingContext } from "../../../context/LoadingContext";
import toast from 'react-hot-toast';
import { IconCircleX } from "@tabler/icons-react";
import { useTranslation } from 'react-i18next';

export default function EmailVerificationIndex() {

    /**
     * Hooks
     * 
     */
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { t } = useTranslation();

    /**
     * Context
     * 
     */
    const { setLoading } = useContext(LoadingContext)

    /**
     * Main State
     * 
     */
    const [arrOtpCodes, setArrOtpCodes] = useState(['', '', '', '', '', ''])
    const [arrMobileOtpCodes, setMobileArrOtpCodes] = useState(['', '', '', '', '', ''])
    const [email, setEmail] = useState('')

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        getEmail()
    }, [])

    useEffect(() => {
        if (arrOtpCodes.every((val) => (val != ''))) {
            setLoading(true)
            Api.post('/verify-email', {
                email: email,
                otp: arrOtpCodes.join('')
            }).then((res) => {
                if (res) {
                    localStorage.setItem('verificationSuccess', 'true');
                    localStorage.removeItem('emailVerification')
                    toast(
                        <div style={{textAlign: "center"}}>
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="220"
                                    height="202.89"
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
                            <div className="mt-3">{t("verificationsuccess")}</div>
                        </div>
                    );
                    setTimeout(() => {
                        navigate('/login')
                    }, 3000);
                }
            }).catch((err) => {
                toast(
                    <div style={{textAlign: "center"}}>
                        <div>
                            <IconCircleX size={212} color={`#ff3333`} />
                        </div>
                        <div className="mt-3">{t("verificationfailed")}</div>
                    </div>
                );
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [arrOtpCodes])

    const doResend = () => {
        setLoading(true)
        Api.post('/request-verify-email', {
            email: email,
        }).catch((err) => {
            if (err.response.status == 422) {
                alert(err.response.data.meta)
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    const doVerify = () => {
        setLoading(true)
        Api.post('/verify-email', {
            email: email,
            otp: arrMobileOtpCodes.join('')
        }).then((res) => {
            if (res) {
                localStorage.setItem('verificationSuccess', 'true');
                localStorage.removeItem('emailVerification')
                toast(
                    <div style={{textAlign: "center"}}>
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="220"
                                height="202.89"
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
                        <div className="mt-3">{t("verificationsuccess")}</div>
                    </div>
                );
                setTimeout(() => {
                    navigate('/login')
                }, 3000);
            }
        }).catch((err) => {
            toast(
                <div style={{textAlign: "center"}}>
                    <div>
                        <IconCircleX size={212} color={`#ff3333`} />
                    </div>
                    <div className="mt-3">{t("verificationfailed")}</div>
                </div>
            );
        }).finally(() => {
            setLoading(false)
        })
    }

    const getEmail = () => {
        setEmail(localStorage.getItem('emailVerification'))
    }

    return (
        <>
        <div className="email-verification only-desktop">
            <HighlightTitleComponent title={'Verification your account'} background={'linear-gradient(90deg, #E4A951 0%, #E4E4EA 50.62%, #FFF 98.93%)'} />

            <ContainerComponent>
                <div className="inner">
                    <p className="text-input-code-verif">Input your code verification</p>
                    <p className="text-verification-code-sent-to">The verification code has been sent via e-mail to {email}</p>
                    <div>
                        {
                            arrOtpCodes.map((otpCode, index) => (
                                <input type="text" name={`otp_code_${index}`} maxLength={1} id={`otp_code_${index}`} value={otpCode} onInput={(e) => {
                                    const tempArray = [...arrOtpCodes]
                                    tempArray[index] = e.target.value
                                    setArrOtpCodes(tempArray)
                                    if (e.currentTarget.value) {
                                        e.currentTarget.nextElementSibling?.focus();
                                    }
                                }} />
                            ))
                        }
                    </div>
                    {/* <p className="text-wait-verify">Please wait within 26 seconds to resend</p> */}
                </div>
            </ContainerComponent>
        </div>
        <div className="email-verification only-mobile">
            <ContainerComponent>
                <div className="inner-mobile">
                    <div className="mobile-title">
                        Verification your account
                    </div>
                    <div className="mobile-code-sent-to">
                        Input your code verification<br />The verification code has been sent via e-mail to {email}
                    </div>
                    {/* <p className="text-wait-verify">Please wait within 26 seconds to resend</p> */}
                    <div className="mobile-input">
                        {
                            arrMobileOtpCodes.map((otpCode, index) => (
                                <input type="text" name={`otp_code_${index}`} maxLength={1} id={`otp_code_${index}`} value={otpCode} onInput={(e) => {
                                    const tempArray = [...arrMobileOtpCodes]
                                    tempArray[index] = e.target.value
                                    setMobileArrOtpCodes(tempArray)
                                    if (e.currentTarget.value) {
                                        e.currentTarget.nextElementSibling?.focus();
                                    }
                                }} />
                            ))
                        }
                    </div>
                    <div className="mobile-buttons">
                        <button className="resend" onClick={doResend}>Resend</button>
                        <button disabled={arrMobileOtpCodes.join('').length != arrMobileOtpCodes.length} className="verify" onClick={doVerify}>Verify</button>
                    </div>
                </div>
            </ContainerComponent>
        </div>
        </>
    )
}
