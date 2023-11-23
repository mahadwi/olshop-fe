import { useEffect, useState } from 'react'
import ContainerComponent from '../../../../general/container/ContainerComponent'
import HighlightTitleComponent from '../../../../general/highlight-title/HighlightTitleComponent'
import TicketPurchaseItemComponent from '../ticket-purchase-item/TicketPurchaseItemComponent'
import './ticket-purchase.scoped.scss'

export default function TicketPurchaseComponent() {

    const [tickets, setTickets] = useState([])

    useEffect(() => {
        loadTickets()
    }, [])

    const loadTickets = () => {
        setTickets([
            {
                day: 1,
                price: 'Rp. 500.000'
            },
            {
                day: 2,
                price: 'Rp. 1.000.000'
            },
            {
                day: 3,
                price: 'Rp. 1.500.000'
            },
            {
                day: 4,
                price: 'Rp. 1.800.000'
            },
            {
                day: 5,
                price: 'Rp. 2.300.000'
            },
            {
                day: 6,
                price: 'Rp. 2.700.000'
            },
            {
                day: 7,
                price: 'Rp. 3.000.000'
            }
        ])
    }

    return (
        <div>
            <HighlightTitleComponent background={'linear-gradient(90deg, #E4A951 0%, #E4E4EA 50.62%, #FFF 98.93%)'} title={'Ticket Purchase List'} />

            <ContainerComponent>
                <div className='ticket-purchase-wrapper'>
                    {
                        tickets.map((ticket) => (
                            <TicketPurchaseItemComponent ticket={ticket} />
                        ))
                    }
                </div>
            </ContainerComponent>
        </div>
    )
}