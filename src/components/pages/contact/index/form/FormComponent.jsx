import React, { useContext, useState } from 'react'
import './form.scoped.scss'
import Api from '../../../../../utils/Api'
import { LoadingContext } from '../../../../../context/LoadingContext'
import ApiErrorHandling from '../../../../../utils/ApiErrorHandling'
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha'
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom'

const PHONE_NUMBER_CODE = [
    '+62',
    '+1',
];

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
    const [phonePrefix, setPhonePrefix] = useState('+62')
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
            handphone: `${phonePrefix}${phone}`,
            subject: subject,
            message: message,
            recapcha: recaptchaValue
        })
            .then((res) => {
                toast(
                    <div style={{textAlign: 'center'}}>
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="90"
                                height="83"
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
                        <div className="mt-3">{t("messagesentsuccessfully")}</div>
                    </div>
                );

                setFirstName('')
                setLasName('')
                setEmail('')
                setPhonePrefix('+62')
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
                    <div className="form-group form-group__phone-number">
                        <label htmlFor="phone" className="d-none">Phone</label>
                        <select name="" id="" className='form-control' onChange={(event) => setPhonePrefix(event.currentTarget.value)}>
                            {
                                PHONE_NUMBER_CODE.map((v) => <option selected={v == phonePrefix} value={v}>{v}</option>)
                            }
                        </select>
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
