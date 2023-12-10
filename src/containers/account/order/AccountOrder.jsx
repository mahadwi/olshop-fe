import { useEffect, useState } from "react"
import AccountOrderLayoutComponent from "../../../components/general/account-order-layout/AccountOrderLayoutComponent"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './account-order.css'
import CurrentOrderTabContentComponent from "../../../components/pages/account/order/current-order-tab-content/CurrentOrderTabContentComponent";
import OrderHistoryTabContentComponent from "../../../components/pages/account/order/order-history-tab-content/OrderHistoryTabContentComponent";
import CanceledOrderTabContentComponent from "../../../components/pages/account/order/canceled-order-tab-content/CanceledOrderTabContentComponent";

export default function AccountOrder() {
    const [breadcrumb, setBreadcrumb] = useState([])
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        loadBreadcrumb()
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

    return (
        <div className="account-order-container" data-unique_attr="wxshf">
            <AccountOrderLayoutComponent position={'Orders'} breadcrumb={breadcrumb} title={'My Orders'}>
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>Current Order</Tab>
                        <Tab>Order History</Tab>
                        <Tab>Canceled Order</Tab>
                    </TabList>
                    <TabPanel>
                        <CurrentOrderTabContentComponent />
                    </TabPanel>
                    <TabPanel>
                        <OrderHistoryTabContentComponent />
                    </TabPanel>
                    <TabPanel>
                        <CanceledOrderTabContentComponent />
                    </TabPanel>
                </Tabs>
            </AccountOrderLayoutComponent>
        </div>
    )
}