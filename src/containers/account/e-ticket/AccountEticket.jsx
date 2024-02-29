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

const DATA_DUMMY = [
    {
        "id": 49,
        "invoice_id": "0026/POS/II/24",
        "courier": "pickup",
        "ongkir": "0",
        "voucher": null,
        "discount": "0",
        "total": "70000000",
        "status": "On Process",
        "note": "tes",
        "is_offline": false,
        "pickup_deadline": "01-03-2024",
        "date": "23-02-2024 14:11",
        "payment": {
            "status": "Unpaid",
            "invoice_url": "https://checkout-staging.xendit.co/latest/65d845140311e468e2928d13",
            "expired": "2024-02-25 14:11:16",
            "payment_method": null,
            "payment_channel": null
        },
        "detail": [
            {
                "id": 57,
                "price": "15000000",
                "qty": 4,
                "total": "60000000",
                "product": {
                    "id": 16,
                    "name": "Tas Bershka",
                    "description": "<p>-</p>",
                    "description_en": "<p><span style=\"color: rgb(17, 24, 39);\">Description In English</span></p>",
                    "color": "Orange",
                    "history": "-",
                    "history_en": "History In English",
                    "category": "Accessories",
                    "brand": "Bershka",
                    "stock": 10,
                    "sale_price": "15000000",
                    "sale_usd": "13.26",
                    "condition": "Like New",
                    "is_wishlist": false,
                    "is_new_arrival": false,
                    "entry_date": "01-08-2023",
                    "weight": 1000,
                    "width": "10",
                    "length": "16",
                    "height": "17",
                    "images": [
                        "https://dev-olshop.berkatsoft.com/image/product/656a762817ffc.jpg"
                    ],
                    "wishlist": null,
                    "review": []
                }
            },
            {
                "id": 58,
                "price": "10000000",
                "qty": 1,
                "total": "10000000",
                "product": {
                    "id": 6,
                    "name": "Guci Terbaru 2023",
                    "description": "<p>-</p>",
                    "description_en": "<p><span style=\"color: rgb(17, 24, 39);\">Description In English</span></p>",
                    "color": "Hitam",
                    "history": "-",
                    "history_en": "History In English",
                    "category": "Hand Bag",
                    "brand": "Guci",
                    "stock": 10,
                    "sale_price": "10000000",
                    "sale_usd": "13.26",
                    "condition": "New",
                    "is_wishlist": false,
                    "is_new_arrival": false,
                    "entry_date": "01-11-2023",
                    "weight": 1333.3333333333333,
                    "width": "20",
                    "length": "20",
                    "height": "20",
                    "images": [
                        "https://dev-olshop.berkatsoft.com/image/product/656a76755d639.jpeg"
                    ],
                    "wishlist": null,
                    "review": []
                }
            }
        ],
        "address": {
            "id": 15,
            "name": "bbb",
            "address": "983202342",
            "phone": "983202342",
            "tag": "Home",
            "is_primary": true,
            "full_address": "Nanggroe Aceh Darussalam (NAD), Aceh Besar, Baitussalam",
            "subdistrict_id": 22,
            "subdistrict": "Baitussalam"
        }
    },
    {
        "id": 48,
        "invoice_id": "0025/POS/II/24",
        "courier": "pickup",
        "ongkir": "0",
        "voucher": null,
        "discount": "0",
        "total": "60000000",
        "status": "On Process",
        "note": "tes",
        "is_offline": true,
        "pickup_deadline": "01-03-2024",
        "date": "23-02-2024 14:07",
        "payment": {
            "status": "Unpaid",
            "invoice_url": null,
            "expired": null,
            "payment_method": null,
            "payment_channel": null
        },
        "detail": [
            {
                "id": 56,
                "price": "60000000",
                "qty": 1,
                "total": "60000000",
                "product": {
                    "id": 14,
                    "name": "Guci Odette leather mini-bag",
                    "description": "<p>-</p>",
                    "description_en": "<p><span style=\"color: rgb(17, 24, 39);\">Description In English</span></p>",
                    "color": "Hitam",
                    "history": "-",
                    "history_en": "History In English",
                    "category": "Hand Bag",
                    "brand": "Guci",
                    "stock": 1,
                    "sale_price": "60000000",
                    "sale_usd": "27",
                    "condition": "Like New",
                    "is_wishlist": false,
                    "is_new_arrival": false,
                    "entry_date": "01-11-2023",
                    "weight": 1000,
                    "width": "0",
                    "length": "0",
                    "height": "0",
                    "images": [
                        "https://dev-olshop.berkatsoft.com/image/product/655c68dae5345.jpg"
                    ],
                    "wishlist": null,
                    "review": [
                        {
                            "rating": 4,
                            "review": "Barang bagus, original semoga awet",
                            "images": [],
                            "date": "23-02-2024 11:01",
                            "user": {
                                "id": 2,
                                "name": "Riky Riyan",
                                "phone": "undefinednull",
                                "email": "riyanrikys@gmail.com",
                                "userName": "null",
                                "gender": "male",
                                "birthDate": "2024-01-01",
                                "image": "https://dev-olshop.berkatsoft.com/image/658a878bb9d63.jpg",
                                "is_subscribe": false
                            }
                        }
                    ]
                }
            }
        ],
        "address": {
            "id": 15,
            "name": "bbb",
            "address": "983202342",
            "phone": "983202342",
            "tag": "Home",
            "is_primary": true,
            "full_address": "Nanggroe Aceh Darussalam (NAD), Aceh Besar, Baitussalam",
            "subdistrict_id": 22,
            "subdistrict": "Baitussalam"
        }
    },
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

        setTickets(DATA_DUMMY);
        setLoading(false);

        // const getOrder = Api.get(`/order?${searchParams.toString()}`, {
        //         headers: {
        //             Authorization: 'Bearer ' + localStorage.getItem('apiToken')
        //         },
        //     })
        //     .then((res) => {
        //         const { data } = res.data;
        //         setTickets(data);
        //         console.log(data);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
        // Promise.all([getOrder])
        //     .finally(() => {
        //         setLoading(false);
        //     });
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
