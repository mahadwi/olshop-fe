import './return-police.scoped.scss'
import ReturnPoliceIllustration from './../../../../../images/delivery-and-shipping/ReturnPoliceIllustration.png'
import { IconBrandWhatsapp } from '@tabler/icons-react'

export default function ReturnPoliceComponent() {
    return (
        <div className="return-police-information">
            <div className='left'>
                <div className="inner">
                    <img src={ReturnPoliceIllustration} alt="" />
                </div>
            </div>
            <div className="right">
                <div className="inner">
                    <p>All orders are final, we do not accept refund/returns for :</p>
                    <ul>
                        <li>Discounted/Sale items</li>
                        <li>tems shipped with international shipping</li>
                        <li>Items that have been received for more than 24 hours</li>
                    </ul>
                    <p>Items that are not according to your liking/taste
                        We can only accept returns for items that do not match the description or conditions written on the product description page.
                        Delivery will be borne by customer.</p>
                    <p><b>IMPORTANT</b> : Submit your Return Request with an unboxing video within 24 hours after you receive your order</p>
                    <p>You can always consign the non-returnable items at www.luxi.com. Contact our Client Advisors for more information.</p>
                    <a href=""><IconBrandWhatsapp /> Contact Us</a>
                </div>
            </div>
        </div>
    )
}