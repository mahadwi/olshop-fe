import { useEffect, useState } from 'react'
import ContainerComponent from '../../../../general/container/ContainerComponent'
import HighlightTitleComponent from '../../../../general/highlight-title/HighlightTitleComponent'
import TicketPurchaseItemComponent from '../ticket-purchase-item/TicketPurchaseItemComponent'
import './ticket-purchase.scoped.scss'
import { useTranslation } from 'react-i18next';

export default function TicketPurchaseComponent({ eventDetailObj }) {
    const { t } = useTranslation();

    return (
        <div>
            <HighlightTitleComponent background={'linear-gradient(90deg, #E4A951 0%, #E4E4EA 50.62%, #FFF 98.93%)'} title={t('ticketpurchaselist')} />

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
