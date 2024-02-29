import { useContext, useState } from 'react';
import './eticket-tab-content.scoped.scss'
import { useTranslation } from 'react-i18next';
import { CurrencyContext } from '../../../../../context/CurrencyContext'
import { AuthUserContext } from '../../../../../context/AuthUserContext'
import { LoadingContext } from '../../../../../context/LoadingContext'
import { IconChevronDown, IconChevronUp, IconCircleX, IconPhoto, IconStar, IconStarFilled, IconX } from '@tabler/icons-react';
import Api from '../../../../../utils/Api';
import { toast } from 'react-hot-toast';

function EticketCard({ticket}) {

    /**
     * Hooks
     * 
     */
    const { t } = useTranslation();
    const { currency } = useContext(CurrencyContext)
    const formater = new Intl.NumberFormat(
        currency == 'id' ? 'id-ID' : 'en-EN',
        {
            style: 'currency',
            currency: currency == 'id' ? 'IDR' : 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }
    )

    /**
     * Context
     * 
     */
    const { user } = useContext(AuthUserContext);
    const { setLoading } = useContext(LoadingContext);

    return (
        <div className='inner'>
            <div className='status' data-status={ticket.status.toLowerCase()}>
                {t('orderstatus')}: <strong>{t('order')} {t(ticket.status.toLowerCase())}</strong> / <a href="#">{ticket.invoice_id}</a> / {user.name} / Status: <strong>{t(ticket.status.toLowerCase())}</strong> / 2024-01-17 13:00:15
            </div>
            <div className='items'>
                <div className='item'>
                    <img src={"https://dev-olshop.berkatsoft.com/image/product/656a762817ffc.jpg"} alt="" />
                    <div className='product-detail'>
                        <div>
                            <div className='title'>
                                NAME
                            </div>
                            <div>
                                Pax: 29
                            </div>
                        </div>
                        <div className='text-center'>
                            <div className='title'>
                                {t('paymentoption')}
                            </div>
                            <div>
                                {ticket.payment.invoice_url ? 'Bank' : 'Offline'}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`footer-item border-top-no-bb`}>
                    {t('totalpayment')} : <span>{formater.format(Number(ticket.total))}</span>
                </div>
                <div className={`review-item`}>
                    <button>{t('e-ticket')}</button>
                    <button>{t('contactseller')}</button>
                </div>
            </div>
        </div>
    )
}

export default function EticketTabContentComponent({ tickets }) {
    return (
        <div className="order-tab-content">
            <div className='body-order-history-tab-content'>
                {tickets.map((ticket) => {
                    return (
                        <EticketCard key={ticket.id} ticket={ticket} />
                    )
                })}
            </div>
        </div>
    )
}
