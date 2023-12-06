import { useEffect, useState } from "react";
import FooterComponent from "../../../components/footer/FooterComponent";
import HighlightTitleComponent from "../../../components/general/highlight-title/HighlightTitleComponent";
import NavbarComponent from "../../../components/general/navbar/NavbarComponent";
import ScreenContainerComponent from "../../../components/general/screen-container/ScreenContainerComponent";
import './email-verification.scoped.scss'
import ContainerComponent from "../../../components/general/container/ContainerComponent";

export default function EmailVerificationIndex() {
    const [arrOtpCodes, setArrOtpCodes] = useState(['', '', '', '', '', ''])

    return (
        <div className="email-verification">
            <NavbarComponent />
            <ScreenContainerComponent>
                <HighlightTitleComponent title={'Verification your account'} background={'linear-gradient(90deg, #E4A951 0%, #E4E4EA 50.62%, #FFF 98.93%)'} />

                <ContainerComponent>
                    <div className="inner">
                        <p className="text-input-code-verif">Input your code verification</p>
                        <p className="text-verification-code-sent-to">The verification code has been sent via e-mail to Non_471@gmail.com</p>
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
                        <p className="text-wait-verify">Please wait within 26 seconds to resend</p>
                    </div>
                </ContainerComponent>
            </ScreenContainerComponent>
            <FooterComponent />
        </div>
    )
}