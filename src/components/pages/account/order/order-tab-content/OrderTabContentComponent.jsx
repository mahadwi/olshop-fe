import { useContext } from 'react';
import './order-tab-content.scoped.scss'
import { useTranslation } from 'react-i18next';
import { CurrencyContext } from '../../../../../context/CurrencyContext'

export default function OrderTabContentComponent({ orders }) {
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

    return (
        <div className="order-tab-content">
            <div className="search-wrap">
                <input type="text" name="search" id="search" placeholder="Search" />
            </div>
            <div className='body-order-history-tab-content'>
                {orders.map((order) => {
                    return order.detail.map((detail) => {
                        return (
                            <div className='inner'>
                                <div className="item">
                                    <div className='left'>
                                        <img src={detail.product.images[0]} alt="" />
                                        <div className='product-detail'>
                                            <h4 className='product-name'>{detail.product.name}</h4>
                                            <table>
                                                <tr>
                                                    <td>Qty</td>
                                                    <td>:</td>
                                                    <td>{detail.qty}</td>
                                                </tr>
                                                <tr>
                                                    <td>{t('note')}</td>
                                                    <td>:</td>
                                                    <td>{order.note ?? '-'}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>

                                    <div className='right'>
                                        <div className='top'>
                                            <span className='product-detail'>{t('productdetail')}</span>
                                            <span className='track-order'>{t('trackorder')}</span>
                                        </div>
                                        <h4 className='price'>{formater.format(Number(detail.total))}</h4>
                                        <div className="bottom">
                                            <div className='label' data-status={order.status.toLowerCase()}>
                                                <span>{t(order.status.toLowerCase())}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                })}
            </div>
        </div>
    )
}
