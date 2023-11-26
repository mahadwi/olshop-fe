import './section-7.scoped.scss'
import Carousel from 'react-bootstrap/Carousel';
import BagImage from '../../../images/Section7.svg'
import { Link } from 'react-router-dom';
import ContainerComponent from '../../general/container/ContainerComponent';

export default function Section7Component() {
    return (
        <ContainerComponent>
            <div className='section-6'>
                <div className='left'>
                    <Carousel>
                        <Carousel.Item>
                            <div className='img-wrap'>
                                <img src={BagImage} alt="" />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className='img-wrap'>
                                <img src={BagImage} alt="" />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className='img-wrap'>
                                <img src={BagImage} alt="" />
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className='right'>
                    <h2>Prada Re-Edition 2005 Re-Nylon  mini bag</h2>
                    <p>Inspired by the iconic mini hobo bag, the Prada Re-Edition
                        2005 shoulder bag is made of Re-Nylon: a regenerated
                        nylon yarn produced from recycled, purified plastic trash
                        collected in the ocean, fishing nets and textile waste fibers.
                        Practical and feminine, the mini bag is decorated with
                        iconic Saffiano leather trim. It features a contemporary
                        mix of materials.
                    </p>
                    <Link>Read More</Link>
                </div>
            </div>
        </ContainerComponent>
    )
}