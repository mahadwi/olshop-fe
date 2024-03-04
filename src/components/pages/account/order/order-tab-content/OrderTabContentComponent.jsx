import { useContext, useState } from 'react';
import './order-tab-content.scoped.scss'
import { useTranslation } from 'react-i18next';
import { CurrencyContext } from '../../../../../context/CurrencyContext'
import { AuthUserContext } from '../../../../../context/AuthUserContext'
import { LoadingContext } from '../../../../../context/LoadingContext'
import { IconChevronDown, IconChevronUp, IconCircleX, IconPhoto, IconStar, IconStarFilled, IconX } from '@tabler/icons-react';
import Modal from "react-bootstrap/Modal";
import Api from '../../../../../utils/Api';
import { toast } from 'react-hot-toast';

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
    const { setLoading } = useContext(LoadingContext);

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

    const doReview = () => {
        const form_data_insert = new FormData();
        form_data_insert.set(`order_id`, order.id)

        for (let i = 0; i < rateProducts.length; i++) {
            const product = rateProducts[i];
            form_data_insert.set(`reviews[${i}][order_detail_id]`, product.id);
            form_data_insert.set(`reviews[${i}][rating]`, product.rate);
            form_data_insert.set(`reviews[${i}][review]`, product.comment);

            for (let j = 0; j < product.imageBlobs.length; j++) {
                const { file } = product.imageBlobs[j];
                form_data_insert.set(`reviews[${i}][image][${j}]`, file);
            }
        }

        setLoading(true);
        Api.post('/order-review', form_data_insert, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("apiToken")
            }
        })
            .then(res => {
                console.log(res.data);
                setModalReview(false);
                toast(
                    <div style={{textAlign: 'center'}}>
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="220"
                                height="202.89"
                                viewBox="0 0 90 83"
                                fill="none"
                            >
                                <path
                                    d="M26.25 76.082H63.75"
                                    stroke="#00AE65"
                                    stroke-width="8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M7.5 58.791V13.8327C7.5 11.9983 8.29018 10.239 9.6967 8.94186C11.1032 7.64473 13.0109 6.91602 15 6.91602H75C76.9891 6.91602 78.8968 7.64473 80.3033 8.94186C81.7098 10.239 82.5 11.9983 82.5 13.8327V58.791C82.5 60.6254 81.7098 62.3847 80.3033 63.6818C78.8968 64.979 76.9891 65.7077 75 65.7077H15C13.0109 65.7077 11.1032 64.979 9.6967 63.6818C8.29018 62.3847 7.5 60.6254 7.5 58.791Z"
                                    stroke="#00AE65"
                                    stroke-width="8"
                                />
                                <path
                                    d="M33.75 36.3112L41.25 43.2279L56.25 29.3945"
                                    stroke="#00AE65"
                                    stroke-width="8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>
                        <div className="mt-3">{t("toastorderreviewsuccess")}</div>
                    </div>
                );
            })
            .catch(err => {
                toast(
                    <div style={{textAlign: 'center'}}>
                        <div>
                            <IconCircleX size={212} color={`#ff3333`} />
                        </div>
                        <div>
                            {t("toastorderreviewfailed")}
                        </div>
                    </div>
                );
            })
            .finally(() => {
                setLoading(false);
            });

        setModalReview(false);
    }

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
                                doReview();
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
                    <button>{t('orderreceived')}</button>
                    {/* <button onClick={() => {setModalReview(true)}}>{t('orderreview')}</button> */}
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
