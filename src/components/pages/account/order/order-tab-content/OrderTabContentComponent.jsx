import { useContext, useState } from 'react';
import './order-tab-content.scoped.scss'
import { useTranslation } from 'react-i18next';
import { CurrencyContext } from '../../../../../context/CurrencyContext'
import { AuthUserContext } from '../../../../../context/AuthUserContext'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

function OrderCard({order}) {

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

    /**
     * State
     * 
     */
    const [viewMore, setViewMore] = useState(false);

    return (
        <div className='inner'>
            <div className='status' data-status={order.status.toLowerCase()}>
                {t('orderstatus')}: <strong>{t('order')} {t(order.status.toLowerCase())}</strong> / <a href="#">INVXXX</a> / {user.name} / Status: <strong>{t(order.status.toLowerCase())}</strong> / 2024-01-17 13:00:15
            </div>
            <div className='items'>
                {
                    (viewMore ? order.detail : order.detail.slice(0, 1)).map((detail, i) => {
                        return (
                            <div className='item'>
                                <img src={detail.product.images[0]} alt="" />
                                <div className='product-detail'>
                                    <div>
                                        <div className='title'>
                                            {detail.product.name}
                                        </div>
                                        <div>
                                            {detail.qty} x {formater.format(Number(detail.price))}
                                        </div>
                                    </div>
                                    <div className='text-center'>
                                        { i == 0 ?
                                        <>
                                        <div className='title'>
                                            {t('address')}
                                        </div>
                                        <div>
                                            {order.address.full_address}
                                        </div>
                                        </>
                                        : null }
                                    </div>
                                    <div className='text-center'>
                                        { i == 0 ?
                                        <>
                                        <div className='title'>
                                            {t('courier')}
                                        </div>
                                        <div>
                                            {formater.format(Number(order.ongkir))}
                                        </div>
                                        </>
                                        : null }
                                    </div>
                                    <div className='text-center'>
                                        { i == 0 ?
                                        <>
                                        <div className='title'>
                                            {t('paymentoption')}
                                        </div>
                                        <div>
                                            {order.payment.invoice_url ? 'Bank' : 'Offline'}
                                        </div>
                                        </>
                                        : null }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                { order.detail.length > 1 ?
                <div className='text-center'>
                    <button className='view-more' onClick={() => setViewMore((c) => !c)}>
                        { viewMore ?
                            <>{t('viewless')} <IconChevronUp /></>
                        :
                            <>{t('viewmore')} <IconChevronDown /></>
                        }
                    </button>
                </div>
                : null }
                <div className={`footer-item ${order.detail.length > 1 ? 'border-top-no-bb' : ''}`}>
                    {t('totalpayment')}: {formater.format(Number(order.total))}
                </div>
            </div>
        </div>
    )
}

export default function OrderTabContentComponent({ orders }) {
    return (
        <div className="order-tab-content">
            <div className='body-order-history-tab-content'>
                {orders.map((order) => {
                    return (
                        <OrderCard order={order} />
                    )
                })}
            </div>
        </div>
    )
}
