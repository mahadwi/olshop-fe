import { Link } from 'react-router-dom'
import BagImage from '../../../images/Section5.svg'
import './section-5.scoped.scss'
import Carousel from 'react-bootstrap/Carousel';

export default function Section5Component({ item }) {


    return (
        <div className='section-5'>
            <div className='left'>
                <h2>NEW ARRIVAL - SPRING FALL 2023</h2>
                <h2>{item.title}</h2>
                <p>{item.product ? item.product.description : ''}</p>
                <Link>Shop Now</Link>
            </div>
            <div className="right">
                {
                    item.images ?
                        <Carousel>

                            {
                                item.images.map((itemImage) => (
                                    <Carousel.Item>
                                        <div>
                                            <img src={itemImage} alt="" />
                                        </div>
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                        : <></>
                }
            </div>
        </div>
    )
}