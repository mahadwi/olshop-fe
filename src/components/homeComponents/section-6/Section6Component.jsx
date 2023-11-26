import './section-6.scoped.scss'
import Carousel from 'react-bootstrap/Carousel';
import BagImage from '../../../images/Section6.svg'
import { Link } from 'react-router-dom';
import ContainerComponent from '../../general/container/ContainerComponent';

export default function Section6Component() {
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
                    <h2>GRECA GODDESS TOP HANDLE BAG</h2>
                    <p>The Fall-Winter 2023 collection introduces the
                        Greca Goddess top handle bag. Defined by Italian
                        leather artistry and a structural design,
                        the architectural curves of the bag’s body are
                        mirrored by an arched top handle crafted in tubular
                        leather with angular cut ends. The signature Greca
                        sits to the bag’s front above a metallic Versace logo
                        plaque, both in the color of deep gold.
                    </p>
                    <Link>Read More</Link>
                </div>
            </div>
        </ContainerComponent>
    )
}