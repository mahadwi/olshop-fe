import FooterComponent from '../../../components/footer/FooterComponent'
import ContainerComponent from '../../../components/general/container/ContainerComponent'
import NavbarComponent from '../../../components/general/navbar/NavbarComponent'
import ScreenContainerComponent from '../../../components/general/screen-container/ScreenContainerComponent'
import './login.scoped.scss'
import LoginIllustration from './../../../images/login/LoginIllustration.svg'
import Checkbox from 'react-custom-checkbox'
import { Link, useNavigate } from 'react-router-dom'
import GoogleIcon from './../../../images/icons/google-icon.png'
import FacebookIcon from './../../../images/icons/facebook-icon.png'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import Api from '../../../utils/Api'
import { useEffect, useRef, useState } from 'react'
import LoadingComponent from '../../../components/general/loading/LoadingComponent'
import ApiErrorHandling from '../../../utils/ApiErrorHandling'

export default function LoginIndex() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorObj422, setErrorObj422] = useState({})
    const inputPasswordRef = useRef()

    const doLogin = () => {
        setErrorObj422({})
        setLoading(true)
        Api.post('/login', {
            email: email,
            password: password
        }).then((res) => {
            if (res) {
                localStorage.setItem('apiToken', res.data.data.token)
                window.location.href = '/'
            }
        }).catch((err) => {
            if (err.response.status == 422 && err.response.data.message == 'unverified account') {
                localStorage.setItem('emailVerification', email)
                return navigate('/email-verification')
            } else {
                ApiErrorHandling.handlingErr(err, [setErrorObj422])
            }
        }).finally(() => {
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

    return (
        <div>

            <LoadingComponent loading={loading} />

            <NavbarComponent />
            <ScreenContainerComponent>
                <ContainerComponent>
                    <div className='login-section'>
                        <div className="left">
                            <div className='inner'>
                                <img src={LoginIllustration} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <div className='inner'>
                                <div className='sign-is-socmed'>
                                    <div className='button-wrap'>
                                        <button><img src={GoogleIcon} alt="" /> Sign in with Google</button>
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
                                        <Link to={'/forgot-password'}>Forgot Password?</Link>
                                    </div>
                                    <div className='form-group form-group__button'>
                                        <button className='button-submit' type='button' onClick={doLogin}>Login</button>
                                    </div>
                                </form>
                                <p>Don't have an account? <Link to={'/register'}>Sign Up</Link></p>
                            </div>
                        </div>
                    </div>
                </ContainerComponent>
            </ScreenContainerComponent>
            <FooterComponent />
        </div>
    )
}