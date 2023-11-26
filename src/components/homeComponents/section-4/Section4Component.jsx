import './section-4.scoped.scss'
import { default as img1 } from '../../../images/Section4-1.svg'
import { default as img2 } from '../../../images/Section4-2.svg'
import { default as img3 } from '../../../images/Section4-3.svg'
import { Link } from 'react-router-dom'

export default function Section4Component() {
    return (
        <div className='section-4'>
            <div className='left'>
                <div className='inner-left'>
                    <img src={img1} alt="" />
                </div>
                <div className='inner-right'>
                    <div>
                        <img src={img2} alt="" />
                    </div>
                    <div>
                        <img src={img3} alt="" />
                    </div>
                </div>
            </div>
            <div className='right'>
                <h3>
                    EXUDE THE LUXURY OF
                    <br />
                    YOUR OWN STYLE
                </h3>
                <Link>Shop Now</Link>
            </div>
        </div>
    )
}