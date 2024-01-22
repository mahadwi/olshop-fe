import './Banner.scoped.scss'
import bannerBackground from './../../../../../images/62782f1f7146ee3c859503f63905372f.jpeg'
import { useTranslation } from "react-i18next";

export default function BannerComponent({ eventDetailObj }) {
    const { t } = useTranslation();

    return (
        <div className="banner-container" style={{ backgroundImage: `url(${eventDetailObj.banner_image})` }}>
            <h1>{eventDetailObj.name?.toUpperCase()}</h1>

            <div>
                <p className="time">{t('oneventtime')} {eventDetailObj.start_date} - {eventDetailObj.end_date} ({eventDetailObj.time_start} - {eventDetailObj.time_end})</p>
                <p className="location"><span>{t('at')}</span> {eventDetailObj.place}</p>
            </div>
        </div>
    )
}
