import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from 'react-router-dom'
import './profile-orders.scoped.scss';
import { AuthUserContext } from "../../../context/AuthUserContext";
import { LoadingContext } from "../../../context/LoadingContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { CurrencyContext } from "../../../context/CurrencyContext";
import { IconInbox } from "@tabler/icons-react";

require('rc-checkbox/assets/index.css');

const TABS = [
    'All',
    'Unpaid',
    'On Process',
    'On Going',
    'Completed',
    'Cancel',
    'Return',
];

const EMPTY_ORDER = false;

const ORDERS = [
    {
        status: 'On Going',
        image: 'https://i.ibb.co/8PFqDYR/image.png',
        title: 'Prada Re-Edition 2005 Re-Nylon mini bag',
        qty: 1,
        sale_price: 238192,
        sale_usd: 12,
        total: 1092841
    },
    {
        status: 'Completed',
        image: 'https://i.ibb.co/8PFqDYR/image.png',
        title: 'Prada Re-Edition 2005 Re-Nylon mini bag',
        qty: 1,
        sale_price: 238192,
        sale_usd: 12,
        total: 1092841
    },
];

export default function ProfileOrders() {

    /**
     * Hooks
     * 
     */
    const { pathname } = useLocation();

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

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='profile-orders-page'>
            <div className='tabs'>
                {
                    TABS.map((l) => <button className={`${currentTab == l ? 'active' : ''}`} onClick={() => setCurrentTab(l)}>{l}</button>)
                }
            </div>
            { EMPTY_ORDER ?
                <div className='orders-empty'>
                    <IconInbox size={80} />
                    You don’t have an order yet
                </div>
            :
                <div className='orders'>
                    {
                        ORDERS.map((order) => {
                            return (
                                <div className='order'>
                                    <div className='status' data-status={order.status}>
                                        {order.status}
                                    </div>
                                    <div className='top'>
                                        <img src={order.image} alt='order' />
                                        <div className='detail'>
                                            <div className='top'>
                                                {order.title}
                                            </div>
                                            <div className='bottom'>
                                                <div className='price'>
                                                    {formater.format(currency == 'id' ? order.sale_price : order.sale_usd )}
                                                </div>
                                                <div className='qty'>
                                                    x{order.qty}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bottom'>
                                        <div>
                                            Total Orders :
                                        </div>
                                        <div className='total'>
                                            {formater.format(order.total)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            }
        </div>
    )
}
