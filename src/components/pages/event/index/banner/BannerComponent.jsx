import './banner.scoped.scss'
import EventIndexHeroImage from './../../../../../images/event-index-hero.png'
import { NavLink } from 'react-router-dom'

export default function BannerComponent() {
    return (
        <div className='banner-container' style={{ backgroundImage: `url(${EventIndexHeroImage})` }}>
            <div className='inner'>
                <h2>JOIN US FOR <br /> FASHION WEEK</h2>
                <div>
                    <div>
                        <p>On 27 Sept - 1 Nov 2021</p>
                        <p>At Hall of Hotel Indonesia</p>
                    </div>
                    <NavLink to={'/event/fashion-week-2023'}>Grab Here</NavLink>
                </div>
            </div>
        </div>
    )
}