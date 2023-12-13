import './shipping-information.scoped.scss'

export default function ShippingInformationComponent({ deliveryShippingObject }) {

    return (
        <div className="shipping-information">
            <div className='left'>
                <div className="inner">
                    <img src={deliveryShippingObject.image_url} alt="" />
                </div>
            </div>
            <div className="right">
                <div className="inner">
                    <div dangerouslySetInnerHTML={{ __html: deliveryShippingObject.description }}></div>
                </div>
            </div>
        </div>
    )
}