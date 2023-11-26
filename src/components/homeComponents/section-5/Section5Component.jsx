import { Link } from 'react-router-dom'
import BagImage from '../../../images/Section5.svg'
import Flickity from 'react-flickity-component'
import './section-5.scoped.scss'
import Carousel from 'react-bootstrap/Carousel';

export default function Section5Component() {
    const flickityOptions = {
        autoPlay: 5000,
        wrapAround: false,
        friction: 0.7
    }

    return (
        <div className='section-5'>
            <div className='left'>
                <h2>NEW ARRIVAL - SPRING FALL 2023</h2>
                <h2>Prada Odette leather mini-bag</h2>
                <p>Elegance and sleek lines give life to a leather mini-bag with a refined character. The versatile, structured design, carried by hand or worn with the detachable shoulder strap, is completed  with a double zipper closure and embellished with the enameled metal triangle logo.</p>
                <Link>Shop Now</Link>
            </div>
            <div className="right">
                <Carousel>
                    <Carousel.Item>
                        <div>
                            <img src={BagImage} alt="" />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div>
                            <img src={BagImage} alt="" />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div>
                            <img src={BagImage} alt="" />
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
}