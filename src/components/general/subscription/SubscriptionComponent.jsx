import { IconX } from '@tabler/icons-react'
import SubscriptionHeroImage from './../../../images/subscription-hero.png'
import './subscription.scoped.scss'
import { useEffect, useState } from 'react'

export default function SubscriptionComponent({ loading }) {
    const [showSubscription, setShowSubscription] = useState(false)

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                setShowSubscription(true)
            }, 3500);
        }
    }, [loading])

    return (
        <div className={`subscription-component ${showSubscription ? 'show' : ''}`}>
            <div className={`subscribtion-content ${showSubscription ? 'show' : ''}`}>
                <div className="left">
                    <img src={SubscriptionHeroImage} alt="subscription-image" />
                </div>
                <div className="right">
                    <div className='top'>
                        <h2 className='title-off'>Get 350 K OFF</h2>
                        <h3 className='title-subscribe'>Subscribe Now</h3>
                    </div>
                    <form action="">
                        <div className='form-groups'>
                            <div className='form-group'>
                                <input type="text" name="name" id="name" placeholder='Name' />
                            </div>
                            <div className='form-group'>
                                <input type="email" name="email_address" id="email_address" placeholder='Email Address' />
                            </div>
                            <div className='form-group form-group__phone-number'>
                                <select name="" id="" className='form-control'>
                                    <option value="+62">+62</option>
                                </select>
                                <input type="number" name="phone_number" id="phone_number" placeholder='Phone Number' />
                            </div>
                            <div className='form-group form-group__button'>
                                <button type='button'>Submit</button>
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