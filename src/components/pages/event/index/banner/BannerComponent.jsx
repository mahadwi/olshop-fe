import './banner.scoped.scss'
import { NavLink } from 'react-router-dom'

export default function BannerComponent({ event }) {
    return (
        <>
            {
                event ?
                    <div className='banner-container' style={{ backgroundImage: `url(${event.banner_image})` }}>
                        <div className='inner'>
                            <h2>JOIN US FOR <br /> {event.name}</h2>
                            <div>
                                <div>
                                    <p>On {event.start_date} - {event.end_date}</p>
                                    <p>At {event.place}</p>
                                </div>
                                <NavLink to={'/event/' + event.id}>Grab Here</NavLink>
                            </div>
                        </div>
                    </div> : <></>
            }
        </>

    )
}