import { useContext, useState } from 'react';
import './order-tab-content.scoped.scss'
import { useTranslation } from 'react-i18next';
import { CurrencyContext } from '../../../../../context/CurrencyContext'
import { AuthUserContext } from '../../../../../context/AuthUserContext'
import { IconChevronDown, IconChevronUp, IconPhoto, IconStar, IconStarFilled, IconX } from '@tabler/icons-react';
import Modal from "react-bootstrap/Modal";

const RATE = [
    1,
    2,
    3,
    4,
    5,
];

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
    const [modalReview, setModalReview] = useState(false);
    const [rateProducts, setRateProducts] = useState(order.detail.map((detail) => {
        return {
            ...detail,
            rate: 0,
            comment: '',
            imageBlobs: [],
        }
    }));

    return (
        <div className='inner'>
            {/* Modal Review */}
            <Modal
                show={modalReview}
                centered
                size='lg'
                onHide={() => {
                    setModalReview(false);
                }}
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('orderreviewproduct')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        rateProducts.map((detail, i) => {
                            return (
                                <>
                                    { i != 0 ? <div className='modal-review-divider' /> : null }
                                    <div className='modal-review'>
                                        <div className='detail'>
                                            <img src={detail.product.images[0]} alt='' />
                                            <div>{detail.product.name}</div>
                                        </div>
                                        <div className='rate'>
                                            <div>{t('qualityproduct')}</div>
                                            <div className='stars'>{ RATE.map((v) => (<button onClick={() => {
                                                const r = [...rateProducts];
                                                r[i].rate = v;
                                                setRateProducts(r);
                                            }}>{ v <= detail.rate ? <IconStarFilled /> : <IconStar /> }</button>)) }</div>
                                        </div>
                                        <div className='comment-box'>
                                            <textarea placeholder={t('comment')} rows={4} value={detail.comment} onInput={(e) => {
                                                const r = [...rateProducts];
                                                r[i].comment = e.currentTarget.value;
                                                setRateProducts(r);
                                            }} />
                                            <div className='photos'>
                                                {detail.imageBlobs.map(({ url }, j) => (
                                                    <div className='photo'>
                                                        <img
                                                            src={url}
                                                            alt='preview'
                                                        />
                                                        <button onClick={() => {
                                                            const r = [...rateProducts];
                                                            r[i].imageBlobs = r[i].imageBlobs.filter(({url}, k) => {
                                                                const z = j != k;
                                                                if (!z) {
                                                                    URL.revokeObjectURL(url);
                                                                }
                                                                return z;
                                                            })
                                                            setRateProducts(r);
                                                        }}>
                                                            <IconX />
                                                        </button>
                                                    </div>
                                                ))}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    hidden
                                                    onChange={(e) => {
                                                        const file = e.currentTarget.files[0];
                                                        const r = [...rateProducts];
                                                        r[i].imageBlobs.push({
                                                            file: file,
                                                            url: URL.createObjectURL(file),
                                                        });
                                                        setRateProducts(r);
                                                    }}
                                                />
                                                <button className='add-photo' onClick={(e) => e.currentTarget.previousElementSibling?.click()}><IconPhoto /> {t('addphoto')}</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </Modal.Body>
                <Modal.Footer>
                    <div className='modal-review-bottom'>
                        <button
                            onClick={() => {
                                setModalReview(false);
                            }}
                        >
                            {t('cancel')}
                        </button>
                        <button
                            onClick={() => {
                                setModalReview(false);
                            }}
                        >
                            {t('submit')}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            {/* End of Modal Voucher */}
            <div className='status' data-status={order.status.toLowerCase()}>
                {t('orderstatus')}: <strong>{t('order')} {t(order.status.toLowerCase())}</strong> / <a href="#">{order.invoice_id}</a> / {user.name} / Status: <strong>{t(order.status.toLowerCase())}</strong> / 2024-01-17 13:00:15
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
                <div className={`footer-item ${order.detail.length > 1 || order.status == 'Completed' ? 'border-top-no-bb' : ''}`}>
                    {t('totalpayment')} : <span>{formater.format(Number(order.total))}</span>
                </div>
                { order.status == 'Completed' ?
                <div className={`review-item`}>
                    <button onClick={() => {setModalReview(true)}}>{t('orderreview')}</button>
                    <button>{t('contactseller')}</button>
                </div>
                : null }
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
                        <OrderCard key={order.id} order={order} />
                    )
                })}
            </div>
        </div>
    )
}
