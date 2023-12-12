import { IconX } from '@tabler/icons-react'
import './subscription.scoped.scss'
import { useContext, useEffect, useState } from 'react'
import Api from '../../../utils/Api'
import { LoadingContext } from '../../../context/LoadingContext'
import ApiErrorHandling from '../../../utils/ApiErrorHandling'
import { AuthUserContext } from '../../../context/AuthUserContext'
import { useNavigate } from 'react-router-dom'

export default function SubscriptionComponent({ loading }) {

    /**
     * Hooks
     * 
     */
    const navigate = useNavigate();

    /**
     * Context
     * 
     */
    const { setLoading } = useContext(LoadingContext)
    const { user } = useContext(AuthUserContext)

    /**
     * Main State
     * 
     */
    const [showSubscription, setShowSubscription] = useState(false)
    const [splashScreenObject, setSplashScreenObject] = useState({})
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [handphone, setHandhone] = useState('')
    const [errorObj422, setErrorObj422] = useState({})

    useEffect(() => {
        loadSplashScreenObject()

        if (!loading) {
            setTimeout(() => {
                setShowSubscription(true)
            }, 3500);
        }
    }, [loading])

    const loadSplashScreenObject = () => {
        Api.get('/subscribe')
            .then((res) => {
                if (res) {
                    setSplashScreenObject(res.data.data[0])
                }
            })
    }

    const doSubscribe = () => {
        if (user) {
            setLoading(true)
            setErrorObj422({})

            Api.post('/email-subscribe', {
                name: name,
                email: email,
                handphone: '+62' + handphone
            }).then((res) => {
                if (res) {
                    setShowSubscription(false)
                }
            }).catch((err) => {
                ApiErrorHandling.handlingErr(err, [setErrorObj422])
            }).finally(() => {
                setLoading(false)
            })
        } else {
            navigate('/login')
        }
    }

    return (
        <div className={`subscription-component ${showSubscription ? 'show' : ''}`}>
            <div className={`subscribtion-content ${showSubscription ? 'show' : ''}`}>
                <div className="left">
                    <img src={splashScreenObject.image_url} alt="subscription-image" />
                </div>
                <div className="right">
                    <div className='top'>
                        <h2 className='title-off'>{splashScreenObject.title}</h2>
                        <h3 className='title-subscribe'>Subscribe Now</h3>
                    </div>
                    <form action="">
                        <div className='form-groups'>
                            <div className='form-group'>
                                <input type="text" name="name" id="name" placeholder='Name' value={name} onChange={(e) => {
                                    setName(e.target.value)
                                }} />
                                {
                                    errorObj422.name ?
                                        <span className='text-danger d-block'>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="18" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
                                            {errorObj422.name}</span>
                                        : <></>
                                }
                            </div>
                            <div className='form-group'>
                                <input type="email" name="email_address" id="email_address" placeholder='Email Address' value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                                {
                                    errorObj422.email ?
                                        <span className='text-danger d-block'>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="18" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
                                            {errorObj422.email}</span>
                                        : <></>
                                }
                            </div>
                            <div className='form-group form-group__phone-number'>
                                <select name="" id="" className='form-control'>
                                    <option value="+62">+62</option>
                                </select>
                                <input type="number" name="phone_number" id="phone_number" placeholder='Phone Number' value={handphone.replace('+62', '')} onChange={(e) => {
                                    setHandhone(e.target.value)
                                }} />
                            </div>
                            {
                                errorObj422.handphone ?
                                    <span className='text-danger d-block' style={{ marginTop: '-1.5rem' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="18" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
                                        {errorObj422.handphone}</span>
                                    : <></>
                            }

                            <div className='form-group form-group__button'>
                                <button type='button' onClick={() => {
                                    doSubscribe()
                                }}>Submit</button>
                            </div>
                        </div>
                    </form>
                    <button className='close-modal' type='button' onClick={() => {
                        setShowSubscription(false)
                    }}><IconX /></button>
                </div>
            </div>
        </div>
    )
}