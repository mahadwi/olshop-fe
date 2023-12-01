import './section-7.scoped.scss'
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import ContainerComponent from '../../general/container/ContainerComponent';
import { useEffect } from 'react';
import parse from 'html-react-parser';

export default function Section7Component({ item }) {

    useEffect(() => {
        console.log(item)
    }, [item])

    return (
        <ContainerComponent>
            <div className='section-6'>
                <div className='left'>
                    {
                        item.images ?
                            <Carousel>
                                {
                                    item.images.map((itemImage) => (
                                        <Carousel.Item>
                                            <div className='img-wrap'>
                                                <img src={itemImage} alt="" />
                                            </div>
                                        </Carousel.Item>
                                    ))
                                }
                            </Carousel> : <></>
                    }
                </div>
                <div className='right'>
                    <h2>{item.title}</h2>
                    <p>{parse(item.product ? item.product.description : '')}</p>
                    <Link>Read More</Link>
                </div>
            </div>
        </ContainerComponent>
    )
}