import './banner.scoped.scss'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

export default function BannerComponent({ event }) {
    const { t } = useTranslation();

    return (
        <>
            {
                event ?
                    <div className='banner-container' style={{ backgroundImage: `url(${event.banner_image})` }}>
                        <div className='inner'>
                            <h2>{t('joinusfor')} <br /> {event.name}</h2>
                            <div>
                                <div>
                                    <p>{t('oneventtime')} {event.start_date} - {event.end_date}</p>
                                    <p>{t('at')} {event.place}</p>
                                </div>
                                <NavLink to={'/event/' + event.id}>{t('grabhere')}</NavLink>
                            </div>
                        </div>
                    </div> : <></>
            }
        </>

    )
}
