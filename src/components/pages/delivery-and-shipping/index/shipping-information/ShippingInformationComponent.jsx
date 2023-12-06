import './shipping-information.scoped.scss'
import DeliveryAndShoppingIllustration from './../../../../../images/delivery-and-shipping/DeliveryAndShoppingIllustration.png'

export default function ShippingInformationComponent() {

    const toggleDropdown = (evt) => {
        evt.target.parentElement.classList.toggle('show')
    }

    return (
        <div className="shipping-information">
            <div className='left'>
                <div className="inner">
                    <img src={DeliveryAndShoppingIllustration} alt="" />
                </div>
            </div>
            <div className="right">
                <div className="inner">
                    <hr />
                    <ul className='shop-dropdown-lists'>
                        <li className='shop-dropdown-item'>
                            <span className='shop-dropdown-item-title' onClick={(e) => {
                                toggleDropdown(e)
                            }}>NATIONWIDE</span>

                            <div className='shop-dropdown-item-content'>
                                <p>
                                    FREE shipping nationwide for all Hermes bags. Shipping fees applied to other brands and Hermes accessories will be calculated based on package size.
                                </p>
                                <p>
                                    We ship nationwide across Indonesia via TIKI ONS/TIKI Regular.
                                </p>
                                <p>
                                    Specially for JABODETABEK area, we offer:
                                </p>

                                <ul>
                                    <li>GO-JEK/GRAB</li>
                                    <li>Private Courier Service</li>
                                    <li>COD (Cash on Delivery)</li>
                                </ul>
                            </div>
                        </li>
                        <li className='shop-dropdown-item'>
                            <span className='shop-dropdown-item-title' onClick={(e) => {
                                toggleDropdown(e)
                            }}>WORLD WIDE</span>

                            <div className='shop-dropdown-item-content'>
                                <p>
                                    All items are available for worldwide shipping from Jakarta, Indonesia via DHL Express. Shipping fee will be calculated based on package size.

                                    Kindly note that clients are responsible for ensuring that items purchased can be legally imported into the destination country. Different regulations may apply for certain types of items, such as exotic leathers.

                                    Please contact our Client Advisors for more information regarding international shipments.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}