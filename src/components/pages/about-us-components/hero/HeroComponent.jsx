import BreadCrumb from "../../../general/breadcrumb/BreadCrumb";
import BagImage from './../../../../images/bag-about-us.png'
import './hero.scoped.scss'

export default function HeroComponent() {
    return (
        <div className='hero-wrapper'>
            <div className="left">
                <BreadCrumb
                    lists={[{
                        label: 'Home',
                        url: '/'
                    }, {
                        label: 'About Us'
                    }]}
                />
                <p>
                    Luxury Bags for the Elegant and Expensive is a leading retailer of luxury handbags and leather accessories. We offer a wide selection of bags from top brands such as Hermès, Chanel, Louis Vuitton, Gucci, and Prada. Our bags are carefully selected for their quality, craftsmanship, and timeless style.
                </p>
                <p>
                    We are committed to providing our customers with the best possible shopping experience. Our team of experienced and knowledgeable stylists is always available to help customers find the perfect bag for their needs. We also offer a variety of convenient services, such as free shipping and returns, and personalized gift wrapping.
                </p>
                <p>
                    Our goal is to help our customers feel confident and stylish. We believe that a luxury bag is more than just an accessory; it is a statement of personal style and success.
                </p>
            </div>
            <img src={BagImage} alt="bag-image" />
        </div>
    )
}