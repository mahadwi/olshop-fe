import React, { useContext, useState } from 'react'
import './form.scoped.scss'
import Api from '../../../../../utils/Api'
import { LoadingContext } from '../../../../../context/LoadingContext'
import ApiErrorHandling from '../../../../../utils/ApiErrorHandling'
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha'
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom'

export default function FormComponent() {

    /**
     * Context
     * 
     */
    const { setLoading } = useContext(LoadingContext)
    const { t } = useTranslation();

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
                {t('contactindexdescquestion')} <span style={{
                    color: '#081CC9',
                    fontWeight: '700'
                }}>{t('faq')}</span>. <br />
                {t('contactindexdesccontact')}
            </p>

            <form action="">
                <div className="form-row">
                    <div className="form-group">
                        <input type="text" className={`form-control ${objError422.firstName ? 'is-invalid' : ''}`} placeholder={t('firstname')} value={firstName} onChange={(e) => {
                            setFirstName(e.target.value);
                        }} />

                        {
                            objError422.firstName ?
                                <div className='invalid-feedback'>{objError422.firstName}</div>
                                : <></>
                        }
                    </div>
                    <div className="form-group">
                        <input type="text" className={`form-control ${objError422.lastName ? 'is-invalid' : ''}`} placeholder={t('lastname')} value={lastName} onChange={(e) => {
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
                        <input type="email" className={`form-control ${objError422.email ? 'is-invalid' : ''}`} placeholder={t('emailaddress')} value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />

                        {
                            objError422.email ?
                                <div className='invalid-feedback'>{objError422.email}</div>
                                : <></>
                        }
                    </div>
                    <div className="form-group">
                        <input type="text" className={`form-control ${objError422.handphone ? 'is-invalid' : ''}`} placeholder={t('phonenumber')} value={phone} onChange={(e) => {
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
                        <input type="text" className={`form-control ${objError422.subject ? 'is-invalid' : ''}`} placeholder={t('subject')} value={subject} onChange={(e) => {
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
                    <textarea name="" id="" cols="30" rows="10" className={`form-control ${objError422.message ? 'is-invalid' : ''}`} placeholder={t('messagebox')} value={message} onChange={(e) => {
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
                        {t('contactindexformparagraphfoot_1')} <Link to={'/term-and-conditions'}>{t('termconditions')}</Link> {t('contactindexformparagraphfoot_2')} <Link to={'/privacy-policy'}>{t('privacypolicy')}</Link> {t('contactindexformparagraphfoot_3')} LUXURYHUB.
                    </p>
                    <button type='button' onClick={() => {
                        doSubmitForm()
                    }} className='btn btn-dark'>{t('submit')}</button>
                </div>
            </form>
        </div>
    )
}