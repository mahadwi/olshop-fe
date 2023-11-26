import './section-3.scoped.scss'
import { default as pic1 } from "../../../images/pic1.svg"
import { Link } from 'react-router-dom'
import ContainerComponent from '../../general/container/ContainerComponent'

export default function Section3Component() {
    return (
        <div className='section-3' style={{ backgroundImage: `url(${pic1})` }}>
            <ContainerComponent>
                <div className='inner'>
                    <h2>FALL WINTER - 2023</h2>
                    <Link>Shop Now</Link>
                </div>
            </ContainerComponent>
        </div>
    )
}