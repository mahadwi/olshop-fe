import { useEffect, useState } from "react";
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
    const { setLoading } = useState(LoadingContext)

    /**
     * Main State
     * 
     */
    const [arrOtpCodes, setArrOtpCodes] = useState(['', '', '', '', '', ''])
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

    const getEmail = () => {
        setEmail(localStorage.getItem('emailVerification'))
    }

    return (
        <div className="email-verification">
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
    )
}