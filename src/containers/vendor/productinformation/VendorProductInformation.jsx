import { useContext, useEffect, useState } from "react";
import './vendorproductinformation.scoped.scss'
import { useLocation } from 'react-router-dom'
import 'react-responsive-modal/styles.css';
import AsyncSelect from 'react-select/async';
import Api from "../../../utils/Api";
import Modal from 'react-bootstrap/Modal';
import { LoadingContext } from "../../../context/LoadingContext";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { CurrencyContext } from "../../../context/CurrencyContext";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { IconList, IconPlus, IconLayoutGrid } from "@tabler/icons-react";
import Select from 'react-select';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const STEP_1_DATA_DUMMY = [
    {
        image: "https://dev-olshop.berkatsoft.com/image/product/6544a6bc8f3ae.jpg",
        name: "Channle Anmoller",
        price: "35000000",
        price_usd: "235",
        stock: 1,
        date: "13/12/2023 13:00:00",
        status: "In Review"
    },
    {
        image: "https://dev-olshop.berkatsoft.com/image/product/6544a6bc8f3ae.jpg",
        name: "Channle Anmoller",
        price: "35000000",
        price_usd: "235",
        stock: 1,
        date: "13/12/2023 13:00:00",
        status: "In Review"
    },
    {
        image: "https://dev-olshop.berkatsoft.com/image/product/6544a6bc8f3ae.jpg",
        name: "Channle Anmoller",
        price: "35000000",
        price_usd: "235",
        stock: 1,
        date: "13/12/2023 13:00:00",
        status: "Rejected"
    },
    {
        image: "https://dev-olshop.berkatsoft.com/image/product/656a6feb1203b.jpeg",
        name: "CROC-EFFECT GRECA GODDESS MINI BAG",
        price: "49303",
        price_usd: "95",
        stock: 1,
        date: "13/12/2023 13:00:00",
        status: "Approved"
    },
    {
        image: "https://dev-olshop.berkatsoft.com/image/product/6544a6bc8f3ae.jpg",
        name: "Channle Anmoller",
        price: "35000000",
        price_usd: "235",
        stock: 1,
        date: "13/12/2023 13:00:00",
        status: "In Review"
    },
    {
        image: "https://dev-olshop.berkatsoft.com/image/product/656a6feb1203b.jpeg",
        name: "CROC-EFFECT GRECA GODDESS MINI BAG",
        price: "49303",
        price_usd: "95",
        stock: 1,
        date: "13/12/2023 13:00:00",
        status: "Approved"
    },
];

export default function VendorProductInformation() {

    /**
     * Hooks
     * 
     */
    const { pathname } = useLocation();
    const { t } = useTranslation();
    const navigate = useNavigate()

    /**
     * Context
     * 
     */
    const { setLoading } = useContext(LoadingContext)
    const { user, refreshUser } = useContext(AuthUserContext)
    const { currency } = useContext(CurrencyContext)
    const formater = new Intl.NumberFormat(currency == 'id' ? 'id-ID' : 'en-EN', { style: 'currency', currency: currency == 'id' ? 'IDR' : 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 })
    const [modalConfirm, setModalConfirm] = useState(false)

    /**
     * Main State
     * 
     */
    const [layout, setLayout] = useState("list");

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setLoading(true);
        Api.get('/vendor', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apiToken')
            }
        }).then((res) => {
            const data = res.data.data;
            if (data.length == 0) {
                navigate('../');
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div className='vendor'>

            {/* Modal Confirm */}
            <Modal centered show={modalConfirm} onHide={() => {
                setModalConfirm(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('confirmation')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-confirm-body">
                        {t('thegoodsinstallationrate')}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="modal-confirm-body-footer">
                        <button type="button" onClick={() => {
                            setModalConfirm(false)
                        }} className="cancel-button">{t('cancel')}</button>
                        <button type="button" className="send-button" onClick={() => {
                            setModalConfirm(false)
                            navigate('sell')
                        }}>{t('agree')}</button>
                    </div>
                </Modal.Footer>
            </Modal>
            {/* End of Modal Confirm */}

            <ContainerComponent>
                <>
                    <div className='tabs'>
                        <button onClick={() => {
                            navigate('../accountinformation')
                        }}>
                            {t('accountinformation')}
                        </button>
                        <button className='active'>
                            {t('productinformation')}
                        </button>
                    </div>
                    <div className='step-1 bg-white'>
                        <div className='steps'>
                            <div className='step active'>{t('productinformation')}</div>
                            <div className='step'>{t('reviewvendor')}</div>
                            <div className='step'>{t('agreement')}</div>
                            <div className='step'>{t('listingproduct')}</div>
                        </div>
                    </div>
                    <div className='step-1-main'>
                        <div className='left'>
                            <button type="button" onClick={() => {
                                setModalConfirm(true)
                            }}>{t('sellgoods')} <IconPlus /></button>
                            <div className='links'>
                                <div>
                                    {t('goodssales')}
                                </div>
                                <div>
                                    {t('goodssaleshistory')}
                                </div>
                            </div>
                        </div>
                        <div className='right'>
                            <div className='top'>
                                <div className='name'>
                                    {t('youroffer')}
                                </div>
                                <div className='search'>
                                    <div>
                                        {t('search')}
                                    </div>
                                    <div>
                                        <input className="form-control" type="text" name="q" id="search" />
                                    </div>
                                    <div className='layout'>
                                        <button className={`${layout == 'list' ? 'active' : ''}`} onClick={() => setLayout("list")}><IconList /></button>
                                        <button className={`${layout == 'grid' ? 'active' : ''}`} onClick={() => setLayout("grid")}><IconLayoutGrid /></button>
                                    </div>
                                </div>
                            </div>
                            <div className={`products ${layout == 'grid' ? 'grid' : ''}`}>
                                {
                                    STEP_1_DATA_DUMMY.map((c, i) => {
                                        return (<>
                                            <div className={`product ${layout == 'grid' ? 'grid' : ''}`} onClick={() => navigate(`../review/${i}`)}>
                                                <div className='image'>
                                                    <img className={`${layout == 'grid' ? 'grid' : ''}`} src={c.image} alt='product' />
                                                </div>
                                                <div className={`center ${layout == 'grid' ? 'grid' : ''}`}>
                                                    <div className='name'>{c.name}</div>
                                                    <div className='price'>{formater.format(currency == 'id' ? c.price : c.price_usd)}</div>
                                                    { layout == 'list' ? <div className='stock'>Stock: {c.stock}</div> : null }
                                                    <div className='date'>{t('offeredon')} {c.date}</div>
                                                </div>
                                                <div className={`status ${layout == 'grid' ? 'grid' : ''}`} data-status={`${c.status.toLowerCase()}`}>
                                                    {t(c.status.toLowerCase())}
                                                </div>
                                            </div>
                                        </>)
                                    })
                                }
                            </div>
                        </div>
                    </div> :
                </>
            </ContainerComponent>
        </div>
    )
}
