import { useEffect, useState } from 'react'
import './best-journals.scoped.scss'

export default function BestJournalsComponent() {

    const [journals, setJournals] = useState([])

    useEffect(() => {
        loadJournals()
    }, [])

    const loadJournals = () => {
        setJournals(['event-journals-1.jpeg', 'event-journals-2.jpeg', 'event-journals-3.jpeg'])
    }

    return (
        <div>
            <h2>Best journal from us to you</h2>
            <hr />
            <ul>
                {
                    journals.map((journal, index) => (
                        <li>
                            <img src={require('./../../../../../images/' + journal)} alt={`journal-${journal + 1}`} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}