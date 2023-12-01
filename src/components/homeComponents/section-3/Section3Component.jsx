import './section-3.scoped.scss'
import { Link } from 'react-router-dom'
import ContainerComponent from '../../general/container/ContainerComponent'

export default function Section3Component({ item }) {

    return (
        <div className='section-3' style={{ backgroundImage: `url(${item.images ? item.images[0] : ''})` }}>
            <ContainerComponent>
                <div className='inner'>
                    <h2>{item.title}</h2>
                    <Link to={`/shop/${item.product ? item.product.id : ''}`}>Shop Now</Link>
                </div>
            </ContainerComponent>
        </div>
    )
}