import { useContext, useEffect, useState } from "react"
import AccountOrderLayoutComponent from "../../../components/general/account-order-layout/AccountOrderLayoutComponent"
import { Tab, Tabs, TabList } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './account-eticket.css'
import EticketTabContentComponent from "../../../components/pages/account/e-ticket/e-ticket-tab-content/EticketTabContentComponent";
import { useLocation } from 'react-router-dom'
import Api from '../../../utils/Api';
import { LoadingContext } from '../../../context/LoadingContext';
import { useTranslation } from 'react-i18next';

const TABS = [
    'All',
    'Unpaid',
    'E-Ticket',
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
    const [tickets, setTickets] = useState([])

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

    useEffect(() => {
        loadBreadcrumb()
    }, [t])

    const loadBreadcrumb = () => {
        setBreadcrumb([
            {
                label: 'Home',
                url: '/'
            },
            {
                label: t("e-ticket"),
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

        Api.get(`/booking`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('apiToken')
                },
            });

        const getEtickets = Api.get(`/booking`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('apiToken')
                },
            })
            .then((res) => {
                const { data } = res.data;
                setTickets(data);
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
        Promise.all([getEtickets])
            .finally(() => {
                setLoading(false);
            });
  }

    return (
        <div className="account-order-container" data-unique_attr="wxshf">
            <AccountOrderLayoutComponent position={'E-Ticket'} breadcrumb={breadcrumb} title={t("e-ticket")}>
                <Tabs selectedIndex={tabIndex} onSelect={(index) => {
                    setTabIndex(index)
                    setTabName(TABS[index])
                }}>
                    <TabList>
                        {TABS.map((a) => <Tab>{t(a.toLowerCase())}</Tab>)}
                    </TabList>
                </Tabs>
                <EticketTabContentComponent tickets={tickets} />
            </AccountOrderLayoutComponent>
        </div>
    )
}
