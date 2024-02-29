import HighlightTitleComponent from '../../../general/highlight-title/HighlightTitleComponent'
import './form-box.scoped.scss'
import React, { useContext, useState } from 'react'
import Api from '../../../../utils/Api'
import ApiErrorHandling from '../../../../utils/ApiErrorHandling'
import toast from 'react-hot-toast';
import { LoadingContext } from '../../../../context/LoadingContext'
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';

export default function FormBoxComponent() {

    /**
     * Hook
     * 
     */
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
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [suggestion, setSuggestion] = useState('')
    const [objError422, setObjError422] = useState({})
    const recaptchaRef = React.createRef()

    const submitSuggestion = () => {
        const recaptchaValue = recaptchaRef.current.getValue();

        setObjError422({})
        setLoading(true)

        Api.post('/suggestion', {
            name: name,
            email: email,
            suggestion: suggestion,
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
                        <div className="mt-3">{t("suggestionsentsuccessfully")}</div>
                    </div>
                );

                setName('')
                setEmail('')
                setSuggestion('')

            }).catch((err) => {
                ApiErrorHandling.handlingErr(err, [setObjError422])
            }).finally(() => {
                setLoading(false)
            })
        
    }

    return (
        <div className='container-form'>
            <HighlightTitleComponent title={t('suggestion')} background={'linear-gradient(270deg, #E4A951 0%, #E4E4EA 45.18%, #FFF 87.37%)'} />

            <p>
                {t('suggestionmessageform')} :
            </p>

            <div
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <form action="">
                    <div className='form-group'>
                        <label className='form-label' htmlFor="name">{t('name')}</label>
                        <input type="text" className={`form-control ${objError422.name ? 'is-invalid' : ''}`} name="name" id="name" placeholder={t('inputyourname')} value={name} onChange={(e) => {
                            setName(e.target.value);
                        }} />

                        {
                            objError422.name ?
                                <div className='invalid-feedback'>{objError422.name}</div>
                                : <></>
                        }
                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor="email">Email</label>
                        <input type="email" className={`form-control ${objError422.email ? 'is-invalid' : ''}`} name="email" id="email" placeholder={t('inputyouremailaddress')} value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />

                        {
                            objError422.email ?
                                <div className='invalid-feedback'>{objError422.email}</div>
                                : <></>
                        }
                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor="sugestion">{t('suggestion')}</label>
                        <textarea className={`form-control ${objError422.suggestion ? 'is-invalid' : ''}`} name="sugestion" id="sugestion" cols="30" rows="10" placeholder={t('inputyoursuggestion')} value={suggestion} onChange={(e) => {
                            setSuggestion(e.target.value)
                        }}></textarea>

                        {
                            objError422.suggestion ?
                                <div className='invalid-feedback'>{objError422.suggestion}</div>
                                : <></>
                        }
                    </div>
                    <div className='d-flex flex-column text-center align-items-center'>
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
                    <div className='form-group form-group-button'>
                        <button type="button" onClick={() => {
                            submitSuggestion()
                        }} className='btn'>{t("submit")}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
