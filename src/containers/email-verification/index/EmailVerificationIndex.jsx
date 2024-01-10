import { useContext, useEffect, useState } from "react";
import HighlightTitleComponent from "../../../components/general/highlight-title/HighlightTitleComponent";
import './email-verification.scoped.scss'
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import Api from "../../../utils/Api";
import { useNavigate, useLocation } from 'react-router-dom'
import { LoadingContext } from "../../../context/LoadingContext";

export default function EmailVerificationIndex() {

    /**
     * Hooks
     * 
     */
    const navigate = useNavigate();
    const { pathname } = useLocation();

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
                    localStorage.removeItem('emailVerification')
                    return navigate('/login')
                }
            }).catch((err) => {
                if (err.response.status == 422) {
                    alert(err.response.data.meta)
                }
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
                localStorage.removeItem('emailVerification')
                return navigate('/login')
            }
        }).catch((err) => {
            if (err.response.status == 422) {
                alert(err.response.data.meta)
            }
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
                                <input type="text" name={`otp_code_${index}`} maxLength={1} id={`otp_code_${index}`} value={otpCode} onChange={(e) => {
                                    const tempArray = [...arrOtpCodes]
                                    tempArray[index] = e.target.value
                                    setArrOtpCodes(tempArray)
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
                                <input type="text" name={`otp_code_${index}`} maxLength={1} id={`otp_code_${index}`} value={otpCode} onChange={(e) => {
                                    const tempArray = [...arrMobileOtpCodes]
                                    tempArray[index] = e.target.value
                                    setMobileArrOtpCodes(tempArray)
                                }} />
                            ))
                        }
                    </div>
                    <div className="mobile-buttons">
                        <button className="resend" onClick={doResend}>Resend</button>
                        <button disabled={arrMobileOtpCodes.join('').length != arrMobileOtpCodes.length} className="verify">Verify</button>
                    </div>
                </div>
            </ContainerComponent>
        </div>
        </>
    )
}
