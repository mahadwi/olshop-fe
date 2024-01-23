import { useEffect, useState } from 'react'
import './best-journals.scoped.scss'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

export default function BestJournalsComponent({ events }) {
    const { t } = useTranslation();

    return (
        <div>
            <h2>{t('bestjournalfromustoyou')}</h2>
            <hr />
            <ul>
                {
                    events.filter((e, i) => i > 0 && i < 4).map((event, index) => (
                        <li>
                            <Link to={`/event/${event.id}`}>
                                <img src={event.cover_image} alt={`journal-${event.name}`} />
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
