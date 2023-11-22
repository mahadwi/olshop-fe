import contactHeroImage from './../../../../../images/contact-hero.png'
import './hero.scoped.scss'

export default function HeroComponent() {
    return (
        <div className='hero' style={{ backgroundImage: `url(${contactHeroImage})` }}>
            <h1>CONTACT US</h1>
        </div>
    )
}