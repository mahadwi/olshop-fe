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
                toast.success('Suggestion, sent successfully.')

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
