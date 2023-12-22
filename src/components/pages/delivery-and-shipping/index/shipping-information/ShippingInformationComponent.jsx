import { useContext } from 'react';
import './shipping-information.scoped.scss'
import './shipping-information.css'
import { LanguageContext } from "../../../../../context/LanguageContext";

export default function ShippingInformationComponent({ deliveryShippingObject }) {
    const { language } = useContext(LanguageContext)
    const suffix = language == 'id' ? '' : '_en';

    return (
        <div className="shipping-information">
            <div className='left'>
                <div className="inner">
                    <img src={deliveryShippingObject.image_url} alt="" />
                </div>
            </div>
            <div className="right">
                <div className="inner">
                    <div dangerouslySetInnerHTML={{ __html: deliveryShippingObject['description' + suffix] }}></div>
                </div>
            </div>
        </div>
    )
}
