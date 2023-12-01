import { useEffect, useState } from 'react'
import ContainerComponent from '../../../../general/container/ContainerComponent'
import HighlightTitleComponent from '../../../../general/highlight-title/HighlightTitleComponent'
import TicketPurchaseItemComponent from '../ticket-purchase-item/TicketPurchaseItemComponent'
import './ticket-purchase.scoped.scss'

export default function TicketPurchaseComponent({ eventDetailObj }) {

    return (
        <div>
            <HighlightTitleComponent background={'linear-gradient(90deg, #E4A951 0%, #E4E4EA 50.62%, #FFF 98.93%)'} title={'Ticket Purchase List'} />

            <ContainerComponent>
                <div className='ticket-purchase-wrapper'>
                    {
                        eventDetailObj.details ?
                            eventDetailObj.details.map((eventTicketDetail) => (
                                <TicketPurchaseItemComponent ticket={eventTicketDetail} />
                            )) : <></>
                    }
                </div>
            </ContainerComponent>
        </div>
    )
}