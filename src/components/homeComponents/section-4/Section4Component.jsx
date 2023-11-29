import './section-4.scoped.scss'
import { Link } from 'react-router-dom'

export default function Section4Component({ item }) {
    return (
        <div className='section-4'>
            <div className='left'>
                <div className='inner-left'>
                    <img src={item.images ? item.images[0] : ''} alt="" />
                </div>
                <div className='inner-right'>
                    <div>
                        <img src={item.images ? item.images[1] : ''} alt="" />
                    </div>
                    <div>
                        <img src={item.images ? item.images[2] : ''} alt="" />
                    </div>
                </div>
            </div>
            <div className='right'>
                <h3>
                    {item.title}
                </h3>
                <Link>Shop Now</Link>
            </div>
        </div>
    )
}