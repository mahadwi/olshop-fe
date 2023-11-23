import './Banner.scoped.scss'
import bannerBackground from './../../../../images/62782f1f7146ee3c859503f63905372f.jpeg'

export default function BannerComponent() {
    return (
        <div className="banner-container" style={{ backgroundImage: `url(${bannerBackground})` }}>
            <h1>JAKARTA FASHION WEEK 2023</h1>

            <div>
                <p className="time">On 23 - 29 Oct 2023 (3 - 6 PM)</p>
                <p className="location"><span>At</span> Pondok Indah Mall 3 in Jakarta</p>
            </div>
        </div>
    )
}