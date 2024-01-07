import React, { useContext, useState } from 'react'
import './form.scoped.scss'
import Api from '../../../../../utils/Api'
import { LoadingContext } from '../../../../../context/LoadingContext'
import ApiErrorHandling from '../../../../../utils/ApiErrorHandling'
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha'

export default function FormComponent() {

    /**
     * Context
     * 
     */
    const { setLoading } = useContext(LoadingContext)

    /**
     * Main State
     * 
     */
    const [firstName, setFirstName] = useState('')
    const [lastName, setLasName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [objError422, setObjError422] = useState({})
    const recaptchaRef = React.createRef()

    const doSubmitForm = () => {
        const recaptchaValue = recaptchaRef.current.getValue();

        setObjError422({})
        setLoading(true)

        Api.post('/message', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            handphone: phone,
            subject: subject,
            message: message,
            recapcha: recaptchaValue
        })
            .then((res) => {
                toast.success('Message, sent successfully.')

                setFirstName('')
                setLasName('')
                setEmail('')
                setPhone('')
                setSubject('')
                setMessage('')

            }).catch((err) => {
                ApiErrorHandling.handlingErr(err, [setObjError422])
            }).finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className='form-container'>
            <p className='paragraph-question'>
                Have a question? You may find an answer in our <span style={{
                    color: '#081CC9',
                    fontWeight: '700'
                }}>FAQs</span>. <br />
                But you can also contact us
            </p>

            <form action="">
                <div className="form-row">
                    <div className="form-group">
                        <input type="text" className={`form-control ${objError422.firstName ? 'is-invalid' : ''}`} placeholder="First Name" value={firstName} onChange={(e) => {
                            setFirstName(e.target.value);
                        }} />

                        {
                            objError422.firstName ?
                                <div className='invalid-feedback'>{objError422.firstName}</div>
                                : <></>
                        }
                    </div>
                    <div className="form-group">
                        <input type="text" className={`form-control ${objError422.lastName ? 'is-invalid' : ''}`} placeholder="Last Name" value={lastName} onChange={(e) => {
                            setLasName(e.target.value);
                        }} />

                        {
                            objError422.lastName ?
                                <div className='invalid-feedback'>{objError422.lastName}</div>
                                : <></>
                        }
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <input type="email" className={`form-control ${objError422.email ? 'is-invalid' : ''}`} placeholder="Email Address" value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />

                        {
                            objError422.email ?
                                <div className='invalid-feedback'>{objError422.email}</div>
                                : <></>
                        }
                    </div>
                    <div className="form-group">
                        <input type="text" className={`form-control ${objError422.handphone ? 'is-invalid' : ''}`} placeholder="Phone Number" value={phone} onChange={(e) => {
                            setPhone(e.target.value)
                        }} />

                        {
                            objError422.handphone ?
                                <div className='invalid-feedback'>{objError422.handphone}</div>
                                : <></>
                        }
                    </div>
                </div>
                <div className='form-row'>
                    <div className="form-group">
                        <input type="text" className={`form-control ${objError422.subject ? 'is-invalid' : ''}`} placeholder="Subject" value={subject} onChange={(e) => {
                            setSubject(e.target.value)
                        }} />

                        {
                            objError422.subject ?
                                <div className='invalid-feedback'>{objError422.subject}</div>
                                : <></>
                        }
                    </div>
                </div>
                <div className="form-group">
                    <textarea name="" id="" cols="30" rows="10" className={`form-control ${objError422.message ? 'is-invalid' : ''}`} placeholder="Message Box" value={message} onChange={(e) => {
                        setMessage(e.target.value)
                    }}></textarea>

                    {
                        objError422.message ?
                            <div className='invalid-feedback'>{objError422.message}</div>
                            : <></>
                    }
                </div>
                <div className='mt-3 d-flex flex-column text-center align-items-center'>
                    <ReCAPTCHA
                        className={`${objError422.recapcha ? 'is-invalid' : ''}`}
                        sitekey={process.env.REACT_APP_SITE_KEY}
                        ref={recaptchaRef}
                    />
                    {
                        objError422.recapcha ?
                        <div className='invalid-feedback'>{objError422.recapcha}</div>
                        : <></>
                    }
                </div>
                <div className="form-group form-group__bottom">
                    <p className='bottom-paragraph'>
                        By sending your message, you agree to accept the <a href="">General Terms and Conditions</a> of Use
                        and that your data will be processed in compliance with the <a href="">Privacy Policy</a> of Luxi.
                    </p>
                    <button type='button' onClick={() => {
                        doSubmitForm()
                    }} className='btn btn-dark'>Submit</button>
                </div>
            </form>
        </div>
    )
}