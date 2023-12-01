import './section-6.scoped.scss'
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import ContainerComponent from '../../general/container/ContainerComponent';
import parse from 'html-react-parser';

export default function Section6Component({ item }) {

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
                    <Link to={`/shop/${item.product ? item.product.id : ''}`}>Read More</Link>
                </div>
            </div>
        </ContainerComponent>
    )
}