import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from 'react-router-dom'
import './profile-orders.scoped.scss';
import { AuthUserContext } from "../../../context/AuthUserContext";
import { LoadingContext } from "../../../context/LoadingContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { CurrencyContext } from "../../../context/CurrencyContext";
import { IconChevronDown, IconChevronUp, IconInbox, IconPhoto, IconStar, IconStarFilled, IconX } from "@tabler/icons-react";
import Api from '../../../utils/Api';
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";

require('rc-checkbox/assets/index.css');

const RATE = [
    1,
    2,
    3,
    4,
    5,
];

const TABS = [
    'All',
    'Unpaid',
    'On Process',
    'On Going',
    'Completed',
    'Cancel',
    'Return',
    'Offline',
];

export default function ProfileOrders() {

    /**
     * Hooks
     * 
     */
    const { pathname } = useLocation();
    const { t } = useTranslation();

    /**
     * Context
     * 
     */
    const { setLoading } = useContext(LoadingContext)
    const { language } = useContext(LanguageContext)
    const { currency } = useContext(CurrencyContext)
    const formater = new Intl.NumberFormat(currency == 'id' ? 'id-ID' : 'en-EN', { style: 'currency', currency: currency == 'id' ? 'IDR' : 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 })

    /**
     * Main State
     * 
     */
    const [ currentTab, setCurrentTab ] = useState('All');
    const [orders, setOrders] = useState([])

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        loadOrder();
    }, [currentTab])

    useEffect(() => {
        loadOrder()
    }, [])

    const loadOrder = () => {
          setLoading(true)
          const searchParams = new URLSearchParams();

          if (currentTab != 'All') {
              if (currentTab == 'Unpaid') {
                  searchParams.append('payment_status', 'Unpaid');
              }

              if (currentTab == 'Offline') {
                  searchParams.append('is_offline', '1');
              }

              if (currentTab != 'Offline' && currentTab != 'Unpaid') {
                  searchParams.append('status', currentTab);
              }
          }

          const getOrder = Api.get(`/order?${searchParams.toString()}`, {
                  headers: {
                      Authorization: 'Bearer ' + localStorage.getItem('apiToken')
                  },
              })
              .then((res) => {
                  const { data } = res.data;
                  setOrders(data);
                  console.log(data);
              })
              .catch(err => {
                  console.log(err);
              })
          Promise.all([getOrder])
              .finally(() => {
                  setLoading(false);
              });
    }

    return (
        <div className='profile-orders-page'>
            <div className='tabs'>
                {
                    TABS.map((l) => <button className={`${currentTab == l ? 'active' : ''}`} onClick={() => setCurrentTab(l)}>{t(l)}</button>)
                }
            </div>
            { orders.length == 0 ?
                <div className='orders-empty'>
                    <IconInbox size={80} />
                    You don’t have an order yet
                </div>
            :
                <div className='orders'>
                    {
                        orders.map((order) => {
                            return (<OrderCard key={order.id} order={order} />);
                        })
                    }
                </div>
            }
        </div>
    )
}

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
        <div className='order'>
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
                {t('orderstatus')}: <strong>{t('order')} {t(order.status.toLowerCase())}</strong> / <a href="#">INVXXX</a> / 2024-01-17 13:00:15
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
                                </div>
                            </div>
                        )
                    })
                }
                <div className='address'>
                    <div className='title'>
                        {t('address')}
                    </div>
                    <div>
                        {order.address.full_address}
                    </div>
                </div>
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
