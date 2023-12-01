import { useState } from 'react'
import HighlightTitleComponent from '../../../../general/highlight-title/HighlightTitleComponent'
import './out-journals.scoped.scss'
import { useEffect } from 'react'
import ContainerComponent from '../../../../general/container/ContainerComponent'
import { Link } from 'react-router-dom'

export default function OurJournalsComponent({ events }) {

    return (
        <div className='our-journals-section'>
            <HighlightTitleComponent background={'linear-gradient(90deg, #E4A951 0%, #E4E4EA 50.62%, #FFF 98.93%)'} title={'THIS IS OUR JOURNAL'} />

            <ContainerComponent>
                <ul>
                    {
                        events.filter((e, i) => i >= 4).map((event, index) => (
                            <li className={`divide-journal-item`}>
                                <Link to={`/event/${event.id}`}><img src={event.cover_image} alt={`${event.name}`} /></Link>
                            </li>
                        ))
                    }
                </ul>
            </ContainerComponent>
        </div>
    )
}