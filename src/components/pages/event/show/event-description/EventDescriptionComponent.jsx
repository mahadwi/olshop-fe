import { useContext } from 'react';
import StringUtil from '../../../../../utils/StringUtil'
import './event-description.scoped.scss'
import { LanguageContext } from '../../../../../context/LanguageContext'
import { useTranslation } from "react-i18next";

export default function EventDescriptionComponent({ eventDetailObj }) {
    const { language } = useContext(LanguageContext)
    const suffix = language == 'id' ? '' : '_en';
    const { t } = useTranslation();

    return (
        <div className='event-description-section'>
            <div className='first-section'>
                <div dangerouslySetInnerHTML={{ __html: eventDetailObj['description'+suffix] }} />
            </div>
            <div className='location-box'>
                <h3>{t('locationdetails')} :</h3>
                <div className='location-wrapper'>
                    <div className='map-box'>
                        <iframe src={StringUtil.googleMapsURLToEmbedURL(eventDetailObj.maps)} style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className='text-location-box'>
                        <div>
                            <div className='title-wrap'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 9C7.50555 9 7.0222 8.85338 6.61108 8.57868C6.19995 8.30397 5.87952 7.91352 5.6903 7.45671C5.50108 6.99989 5.45157 6.49723 5.54804 6.01228C5.6445 5.52732 5.8826 5.08187 6.23223 4.73223C6.58187 4.3826 7.02732 4.1445 7.51228 4.04804C7.99723 3.95157 8.49989 4.00108 8.95671 4.1903C9.41353 4.37952 9.80397 4.69995 10.0787 5.11108C10.3534 5.5222 10.5 6.00555 10.5 6.5C10.4992 7.1628 10.2356 7.79822 9.76689 8.26689C9.29822 8.73556 8.6628 8.99921 8 9ZM8 5C7.70333 5 7.41332 5.08797 7.16665 5.2528C6.91997 5.41762 6.72771 5.65189 6.61418 5.92598C6.50065 6.20007 6.47095 6.50167 6.52882 6.79264C6.5867 7.08361 6.72956 7.35088 6.93934 7.56066C7.14912 7.77044 7.41639 7.9133 7.70737 7.97118C7.99834 8.02906 8.29994 7.99935 8.57403 7.88582C8.84812 7.77229 9.08238 7.58003 9.24721 7.33336C9.41203 7.08668 9.5 6.79667 9.5 6.5C9.4996 6.1023 9.34144 5.721 9.06022 5.43978C8.779 5.15856 8.3977 5.0004 8 5Z" fill="black" />
                                    <path d="M8.00001 15L3.78201 10.0255C3.7234 9.95081 3.66539 9.87564 3.60801 9.8C2.8875 8.85089 2.49826 7.69161 2.50001 6.5C2.50001 5.04131 3.07947 3.64236 4.11092 2.61091C5.14237 1.57946 6.54131 1 8.00001 1C9.4587 1 10.8576 1.57946 11.8891 2.61091C12.9205 3.64236 13.5 5.04131 13.5 6.5C13.5018 7.69107 13.1127 8.84982 12.3925 9.7985L12.392 9.8C12.392 9.8 12.242 9.997 12.2195 10.0235L8.00001 15ZM4.40601 9.1975C4.40701 9.1975 4.52301 9.3515 4.54951 9.3845L8.00001 13.454L11.455 9.379C11.477 9.3515 11.594 9.1965 11.5945 9.196C12.1831 8.42056 12.5012 7.47352 12.5 6.5C12.5 5.30653 12.0259 4.16193 11.182 3.31802C10.3381 2.47411 9.19348 2 8.00001 2C6.80653 2 5.66194 2.47411 4.81803 3.31802C3.97411 4.16193 3.50001 5.30653 3.50001 6.5C3.49896 7.47412 3.81689 8.42171 4.40601 9.1975Z" fill="black" />
                                </svg>
                                <h4 className='title-text'>
                                    {eventDetailObj.place}
                                </h4>
                            </div>
                        </div>
                        <div className='bottom-location-wrap'>
                            <p className='address' dangerouslySetInnerHTML={{ __html: eventDetailObj.detail_maps }}>
                            </p>
                            <a href={eventDetailObj.maps} target='_blank'>
                                <img src={require('./../../../../../images/carbon_location.png')} alt="" />
                                <span>{t('viewinmap')}</span>
                            </a>
                        </div>
                    </div>
                </div>
                {/* <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M11.6375 12.25C10.4222 12.25 9.22153 11.985 8.03542 11.4549C6.84931 10.9249 5.77014 10.1739 4.79792 9.20208C3.82569 8.22986 3.07475 7.15069 2.54508 5.96458C2.01542 4.77847 1.75039 3.57778 1.75 2.3625C1.75 2.1875 1.80833 2.04167 1.925 1.925C2.04167 1.80833 2.1875 1.75 2.3625 1.75H4.725C4.86111 1.75 4.98264 1.79628 5.08958 1.88883C5.19653 1.98139 5.25972 2.09067 5.27917 2.21667L5.65833 4.25833C5.67778 4.41389 5.67292 4.54514 5.64375 4.65208C5.61458 4.75903 5.56111 4.85139 5.48333 4.92917L4.06875 6.35833C4.26319 6.71806 4.494 7.06553 4.76117 7.40075C5.02833 7.73597 5.32253 8.05933 5.64375 8.37083C5.94514 8.67222 6.26111 8.95183 6.59167 9.20967C6.92222 9.4675 7.27222 9.70317 7.64167 9.91667L9.0125 8.54583C9.1 8.45833 9.21433 8.39261 9.3555 8.34867C9.49667 8.30472 9.63511 8.29267 9.77083 8.3125L11.7833 8.72083C11.9194 8.75972 12.0312 8.83031 12.1187 8.93258C12.2062 9.03486 12.25 9.149 12.25 9.275V11.6375C12.25 11.8125 12.1917 11.9583 12.075 12.075C11.9583 12.1917 11.8125 12.25 11.6375 12.25Z" fill="black" />
                    </svg>
                    <span>Contact Partner :</span>
                    <span>(+62) 123-1231-2345</span>
                </p> */}
            </div>
        </div>
    )
}
