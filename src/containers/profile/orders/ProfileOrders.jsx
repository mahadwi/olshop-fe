import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from 'react-router-dom'
import './profile-orders.scoped.scss';
import { AuthUserContext } from "../../../context/AuthUserContext";
import { LoadingContext } from "../../../context/LoadingContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { CurrencyContext } from "../../../context/CurrencyContext";
import { IconChevronDown, IconChevronUp, IconInbox } from "@tabler/icons-react";
import Api from '../../../utils/Api';
import { useTranslation } from "react-i18next";

require('rc-checkbox/assets/index.css');

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
                            return (<OrderCard order={order} />);
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

    return (
        <div className='order'>
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
                    {t('totalpayment')}: {formater.format(Number(order.total))}
                </div>
            </div>
        </div>
    )
}
