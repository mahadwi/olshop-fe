import { useContext, useEffect, useState } from "react"
import AccountOrderLayoutComponent from "../../../components/general/account-order-layout/AccountOrderLayoutComponent"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './account-order.css'
import CurrentOrderTabContentComponent from "../../../components/pages/account/order/current-order-tab-content/CurrentOrderTabContentComponent";
import OrderHistoryTabContentComponent from "../../../components/pages/account/order/order-history-tab-content/OrderHistoryTabContentComponent";
import CanceledOrderTabContentComponent from "../../../components/pages/account/order/canceled-order-tab-content/CanceledOrderTabContentComponent";
import OrderTabContentComponent from "../../../components/pages/account/order/order-tab-content/OrderTabContentComponent";
import { useLocation } from 'react-router-dom'
import Api from '../../../utils/Api';
import { LoadingContext } from '../../../context/LoadingContext';
import { useTranslation } from 'react-i18next';

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

export default function AccountOrder() {

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
    const { setLoading } = useContext(LoadingContext);

    /**
     * Main State
     * 
     */
    const [breadcrumb, setBreadcrumb] = useState([])
    const [tabIndex, setTabIndex] = useState(0);
    const [tabName, setTabName] = useState(TABS[0]);
    const [orders, setOrders] = useState([])

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        loadOrder();
    }, [tabName])

    useEffect(() => {
        loadBreadcrumb()
        loadOrder()
    }, [])

    const loadBreadcrumb = () => {
        setBreadcrumb([
            {
                label: 'Home',
                url: '/'
            },
            {
                label: 'Orders',
            }
        ])
    }

  const loadOrder = () => {
        setLoading(true)
        const searchParams = new URLSearchParams();

        if (tabName != 'All') {
            if (tabName == 'Unpaid') {
                searchParams.append('payment_status', 'Unpaid');
            }

            if (tabName == 'Offline') {
                searchParams.append('is_offline', '1');
            }

            if (tabName != 'Offline' && tabName != 'Unpaid') {
                searchParams.append('status', tabName);
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
        <div className="account-order-container" data-unique_attr="wxshf">
            <AccountOrderLayoutComponent position={'Orders'} breadcrumb={breadcrumb} title={'My Orders'}>
                <Tabs selectedIndex={tabIndex} onSelect={(index) => {
                    setTabIndex(index)
                    setTabName(TABS[index])
                }}>
                    <TabList>
                        {TABS.map((a) => <Tab>{t(a.toLowerCase())}</Tab>)}
                    </TabList>
                </Tabs>
                <OrderTabContentComponent orders={orders} />
            </AccountOrderLayoutComponent>
        </div>
    )
}
