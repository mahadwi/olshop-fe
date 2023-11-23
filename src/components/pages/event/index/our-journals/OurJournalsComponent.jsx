import { useState } from 'react'
import HighlightTitleComponent from '../../../../general/highlight-title/HighlightTitleComponent'
import './out-journals.scoped.scss'
import { useEffect } from 'react'
import ContainerComponent from '../../../../general/container/ContainerComponent'

export default function OurJournalsComponent() {

    const [journals, setJournals] = useState([])

    useEffect(() => {
        loadJournals()
    }, [])

    const loadJournals = () => {
        const arrJournals = [];

        for (let i = 0; i < 14; i++) {
            arrJournals.push({
                source: `our-journal-${i + 1}.png`,
                type: i == 6 || i == 10 ? 'full-row' : 'divide'
            })
        }

        setJournals(arrJournals)
    }

    return (
        <div className='our-journals-section'>
            <HighlightTitleComponent background={'linear-gradient(90deg, #E4A951 0%, #E4E4EA 50.62%, #FFF 98.93%)'} title={'THIS IS OUR JOURNAL'} />

            <ContainerComponent>
                <ul>
                    {
                        journals.map((journal, index) => (
                            <li className={`${journal.type}-journal-item`}>
                                <img src={require('./../../../../../images/' + journal.source)} alt={`${index}`} />
                            </li>
                        ))
                    }
                </ul>
            </ContainerComponent>
        </div>
    )
}