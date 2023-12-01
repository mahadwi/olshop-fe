import './Banner.scoped.scss'
import bannerBackground from './../../../../../images/62782f1f7146ee3c859503f63905372f.jpeg'

export default function BannerComponent({ eventDetailObj }) {
    return (
        <div className="banner-container" style={{ backgroundImage: `url(${eventDetailObj.banner_image})` }}>
            <h1>{eventDetailObj.name}</h1>

            <div>
                <p className="time">On {eventDetailObj.start_date} - {eventDetailObj.end_date} ({eventDetailObj.time_start} - {eventDetailObj.time_end})</p>
                <p className="location"><span>At</span> {eventDetailObj.place}</p>
            </div>
        </div>
    )
}