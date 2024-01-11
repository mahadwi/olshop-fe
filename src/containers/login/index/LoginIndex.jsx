import ContainerComponent from '../../../components/general/container/ContainerComponent'
import './login.scoped.scss'
import LoginIllustration from './../../../images/login/LoginIllustration.svg'
import Checkbox from 'react-custom-checkbox'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import GoogleIcon from './../../../images/icons/google-icon.png'
import FacebookIcon from './../../../images/icons/facebook-icon.png'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { useContext, useEffect, useRef, useState } from 'react'
import Api from '../../../utils/Api'
import Modal from 'react-bootstrap/Modal';
import ApiErrorHandling from '../../../utils/ApiErrorHandling'
import { AuthUserContext } from '../../../context/AuthUserContext'
import { LoadingContext } from '../../../context/LoadingContext'
import { GoogleLogin } from '@react-oauth/google';

const FORGOT_PASSWORD_TITLE = [
    'Find your LUXI account',
    'Verification',
    'Reset Password',
];

export default function LoginIndex() {

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
    const { doLogin } = useContext(AuthUserContext)

    /**
     * Main State
     * 
     */
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorObj422, setErrorObj422] = useState({})
    const [googleLoginUrl, setGoogleLoginUrl] = useState("")
    const inputPasswordRef = useRef()
    const [modalForgotPassword, setModalForgotPassword] = useState(false)
    const [forgotPasswordStep, setForgotPasswordStep] = useState(0)
    const [emailForgotPassword, setEmailForgotPassword] = useState('')
    const [foundEmailForgotPassword, setFoundEmailForgotPassword] = useState(true)
    const [disableNextStep, setDisableNextStep] = useState(true);
    const [currentOtp, setCurrentOtp] = useState('');
    const [currentNewPasswordForgetPassword, setCurrentNewPasswordForgetPassword] = useState('');
    const [currentConfirmPasswordForgetPassword, setCurrentConfirmPasswordForgetPassword] = useState('');
    const [correctOtpForgotPassword, setCorrectOtpForgotPassword] = useState(true)
    const inputOtpRef = useRef()

    useEffect(() => {
        setLoading(true);
        Api.get('/auth?provider=google', {
            provider: 'google',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                return response.data;
            })
            .then((data) => setGoogleLoginUrl( data.url ))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const doLoginActionPage = () => {
        setErrorObj422({})

        doLogin({
            email: email,
            password: password
        }, (err) => {
            if (err.response.status == 422 && err.response.data.message == 'unverified account') {
                localStorage.setItem('emailVerification', email)
                return navigate('/email-verification')
            } else {
                ApiErrorHandling.handlingErr(err, [setErrorObj422])
            }
        }, () => {
            setLoading(false)
        })
    }

    const toggleShowHideInput = (inputRef, evt) => {
        const inputMode = inputRef.current.getAttribute('type')

        inputRef.current.setAttribute('type', inputMode == 'text' ? 'password' : 'text')
        evt.target.closest('button').innerHTML = inputMode == 'text' ?
            '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye-off" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="#999999" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" /><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" /><path d="M3 3l18 18" /></svg>'
            :
            '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="#999999" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>'
    }

    const doRequestOtp = () => {
        // setForgotPasswordStep((c) => c+1)
        setLoading(true)
        Api.post('/request-otp', {
            email: emailForgotPassword,
        })
            .then((response) => {
                if (response.data.errorCode == 0) {
                    setForgotPasswordStep((c) => c+1)
                } else {
                    throw new Error()
                }
            })
            .catch((error) => setFoundEmailForgotPassword(false))
            .finally(() => setLoading(false));
    }

    const doResendOtp = () => {
        setLoading(true)
        Api.post('/request-otp', {
            email: emailForgotPassword,
        })
            .then((response) => {
                if (response.data.errorCode == 0) {
                    // setForgotPasswordStep((c) => c+1)
                } else {
                    throw new Error()
                }
            })
            .catch((error) => setFoundEmailForgotPassword(false))
            .finally(() => setLoading(false));
    }

    const otpKeyUp = function (e) {
        const target = e.target;
        const key = e.key.toLowerCase();

        if (key == "backspace" || key == "delete") {
            target.value = "";
            const prev = target.previousElementSibling;
            if (prev) {
                prev.focus();
            }
            return;
        }

      if (key.length == 1){
          target.value = e.key;
          const next = target.nextElementSibling;
          if (next) {
              next.focus();
          }
      }

      setCorrectOtpForgotPassword(true);
    }

    const doCheckOtp = () => {
        const otp = Array.from(inputOtpRef.current.querySelectorAll('input')).reduce((s, el) => s + el.value, '');
        // setForgotPasswordStep((c) => c+1)
        setLoading(true)
        Api.post('/check-otp', {
            email: emailForgotPassword,
            otp: otp,
        })
            .then((response) => {
                if (response.data.errorCode == 0) {
                    setCurrentOtp(otp)
                    setForgotPasswordStep((c) => c+1)
                } else {
                    throw new Error()
                }
            })
            .catch((error) => setCorrectOtpForgotPassword(false))
            .finally(() => setLoading(false));
        
    }

    const doChangePassword = () => {
        // setForgotPasswordStep(0);
        // setModalForgotPassword(false);
        setLoading(true)
        Api.post('/change-password', {
            email: emailForgotPassword,
            password: currentNewPasswordForgetPassword,
            password_confirmation: currentConfirmPasswordForgetPassword,
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => console.log(error))
            .finally(() => {
                setModalForgotPassword(false);
                setForgotPasswordStep(0);
                setLoading(false)
            });
    }

    return (
        <div>
            {/* Modal Create */}
            <Modal show={modalForgotPassword} centered onHide={() => {
                setModalForgotPassword(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>{FORGOT_PASSWORD_TITLE[forgotPasswordStep]}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { forgotPasswordStep == 0 ?
                        <div className='modal-forget-password'>
                            <div className='description'>
                                Enter the email associated with your account to change the password.
                            </div>
                            <div>
                                <div className='input-g'>
                                    <label>
                                        Email
                                    </label>
                                    <input type={'text'} onInput={(e) => {setEmailForgotPassword(e.currentTarget.value);setDisableNextStep(!e.currentTarget.value);setFoundEmailForgotPassword(true)}} />
                                    <div className={`warning ${foundEmailForgotPassword ? 'hide' : ''}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
                                        Sorry we couldn't find your account !
                                    </div>
                                </div>
                            </div>
                            <div className='bottom'>
                                <button disabled={disableNextStep} className='btn-forget-password' onClick={doRequestOtp}>Next</button>
                            </div>
                        </div>
                    : null }
                    { forgotPasswordStep == 1 ?
                        <div className='modal-forget-password'>
                            <div className='description'>
                                Input your code verification. The verification code has been sent via e-mail to {emailForgotPassword}
                            </div>
                            <div ref={inputOtpRef} className='input-otps'>
                                <input className='otp' type={'text'} onKeyUp={otpKeyUp} />
                                <input className='otp' type={'text'} onKeyUp={otpKeyUp} />
                                <input className='otp' type={'text'} onKeyUp={otpKeyUp} />
                                <input className='otp' type={'text'} onKeyUp={otpKeyUp} />
                                <input className='otp' type={'text'} onKeyUp={otpKeyUp} />
                                <input className='otp' type={'text'} onKeyUp={otpKeyUp} />
                            </div>
                            <div className={`warning otp-warning ${correctOtpForgotPassword ? 'hide' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
                                OTP Invalid
                            </div>
                            <div className='bottom'>
                                <button className='btn-forget-password-resend' onClick={doResendOtp}>Resend</button>
                                <button className='btn-forget-password' onClick={doCheckOtp}>Next</button>
                            </div>
                        </div>
                    : null }
                    { forgotPasswordStep == 2 ?
                        <div className='modal-forget-password'>
                            <div className='description'>
                                Enter the email associated with your account to change the password.
                            </div>
                            <div className='input-gs'>
                                <div className='input-g'>
                                    <label>
                                        New Password
                                    </label>
                                    <input type={'password'} onInput={(e) => {setCurrentNewPasswordForgetPassword(e.currentTarget.value);}} />
                                </div>
                                <div className='input-g'>
                                    <label>
                                        Confirm New Password
                                    </label>
                                    <input type={'password'} onInput={(e) => {setCurrentConfirmPasswordForgetPassword(e.currentTarget.value);}} />
                                    <div className={`warning ${currentNewPasswordForgetPassword != currentConfirmPasswordForgetPassword ? '' : 'hide'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
                                        Password does not match
                                    </div>
                                </div>
                            </div>
                            <div className='bottom'>
                                <button disabled={(currentConfirmPasswordForgetPassword == '' && currentNewPasswordForgetPassword == '') || currentNewPasswordForgetPassword != currentConfirmPasswordForgetPassword} className='btn-forget-password' onClick={doChangePassword}>Save</button>
                            </div>
                        </div>
                    : null }
                </Modal.Body>
            </Modal>
            {/* End of Modal Create */}
            <ContainerComponent>
                <div className='login-section'>
                    <div className="left only-desktop">
                        <div className='inner'>
                            <img src={LoginIllustration} alt="" />
                        </div>
                    </div>
                    <div className="right">
                        <div className='inner'>
                            <div className='sign-is-socmed only-desktop'>
                                <div className='button-wrap'>
                                    {/*<GoogleLogin
                                        onSuccess={credentialResponse => {
                                            console.log(credentialResponse);
                                        }}
                                        onError={() => {
                                            console.log('Login Failed');
                                        }}
                                        useOneTap
                                    /> */}
                                    <a href={googleLoginUrl}><button><img src={GoogleIcon} alt="" /> Sign in with Google</button></a>
                                    <button><img src={FacebookIcon} alt="" /> Sign in with Facebook</button>
                                </div>
                                <p>- OR -</p>
                            </div>
                            <form action="">
                                <div className='form-group'>
                                    <label htmlFor="email">Email</label>
                                    <input className={`${errorObj422.email ? 'is-invalid' : ''}`} type="text" name="email" id="email" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                    {
                                        errorObj422.email ?
                                            <span className='text-danger'>
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="18" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
                                                {errorObj422.email}</span>
                                            : <></>
                                    }
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="password">Password</label>
                                    <input ref={inputPasswordRef} className={`${errorObj422.password ? 'is-invalid' : ''}`} type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                    {
                                        errorObj422.password ?
                                            <span className='text-danger'>
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
                                                {errorObj422.password}</span>
                                            : <></>
                                    }
                                    <button type='button' onClick={(e) => {
                                        toggleShowHideInput(inputPasswordRef, e)
                                    }} className='show-hide'><IconEyeOff size={30} color='#999' /></button>
                                </div>
                                <div className='form-group remember-me-password'>
                                    <div className='form-check'>
                                        <Checkbox borderColor={'#DADADA'} />
                                        <label className='remember-me-label' htmlFor="remember_me">Remember Me</label>
                                    </div>
                                    <Link onClick={(e) => {e.preventDefault();setModalForgotPassword(true)}}>Forgot Password?</Link>
                                </div>
                                <div className='form-group form-group__button'>
                                    <button className='button-submit' type='button' onClick={doLoginActionPage}>Login</button>
                                </div>
                            </form>
                            <p>Don't have an account? <Link to={'/register'}>Sign Up</Link></p>
                            <div className='sign-is-socmed only-mobile'>
                                <p>- OR -</p>
                                <div className='button-wrap'>
                                    {/*<GoogleLogin
                                        onSuccess={credentialResponse => {
                                            console.log(credentialResponse);
                                        }}
                                        onError={() => {
                                            console.log('Login Failed');
                                        }}
                                        useOneTap
                                    /> */}
                                    <a href={googleLoginUrl}><button><img src={GoogleIcon} alt="" /> Sign in with Google</button></a>
                                    <button><img src={FacebookIcon} alt="" /> Sign in with Facebook</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ContainerComponent>
        </div>
    )
}
