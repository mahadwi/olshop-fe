import { useContext, useEffect, useState } from "react";
import './vendorlistingproduct.scoped.scss'
import { useLocation } from 'react-router-dom'
import 'react-responsive-modal/styles.css';
import Api from "../../../utils/Api";
import { LoadingContext } from "../../../context/LoadingContext";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { CurrencyContext } from "../../../context/CurrencyContext";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const REVEWI_DATA_DUMMY = [
    {
        image: "https://dev-olshop.berkatsoft.com/image/product/6544a6bc8f3ae.jpg",
        name: "Channle Anmoller",
        price: "35000000",
        price_usd: "235",
        sale_price: "35000000",
        sale_price_usd: "235",
        stock: 1,
        date: "13/12/2023 13:00:00",
        schedulemeeting : "13/12/2023 13:00:00",
        priceforentrustinggoods: "35000000",
        priceforentrustinggoods_usd: "235",
        note: "-",
        status: "In Review",
        weight: 1,
        width: 2,
        length: 3,
        height: 4,
        description: "Ini Deskripsi",
        description_en: "This is description",
        history: "History barang",
        history_en: "History of",
        status_sold: "On Etalase",
    },
    {
        image: "https://dev-olshop.berkatsoft.com/image/product/6544a6bc8f3ae.jpg",
        name: "Channle Anmoller",
        price: "35000000",
        price_usd: "235",
        sale_price: "35000000",
        sale_price_usd: "235",
        stock: 1,
        date: "13/12/2023 13:00:00",
        schedulemeeting : "13/12/2023 13:00:00",
        priceforentrustinggoods: "35000000",
        priceforentrustinggoods_usd: "235",
        note: "-",
        status: "In Review",
        weight: 1,
        width: 2,
        length: 3,
        height: 4,
        description: "Ini Deskripsi",
        description_en: "This is description",
        history: "History barang",
        history_en: "History of",
        status_sold: "On Etalase",
    },
    {
        image: "https://dev-olshop.berkatsoft.com/image/product/6544a6bc8f3ae.jpg",
        name: "Channle Anmoller",
        price: "35000000",
        price_usd: "235",
        sale_price: "35000000",
        sale_price_usd: "235",
        stock: 1,
        date: "13/12/2023 13:00:00",
        schedulemeeting : "13/12/2023 13:00:00",
        priceforentrustinggoods: "35000000",
        priceforentrustinggoods_usd: "235",
        note: "Harga yang ditawarkan terlalu tinggi",
        status: "Rejected",
        weight: 1,
        width: 2,
        length: 3,
        height: 4,
        description: "Ini Deskripsi",
        description_en: "This is description",
        history: "History barang",
        history_en: "History of",
        status_sold: "On Etalase",
    },
    {
        image: "https://dev-olshop.berkatsoft.com/image/product/656a6feb1203b.jpeg",
        name: "CROC-EFFECT GRECA GODDESS MINI BAG",
        price: "49303",
        price_usd: "95",
        sale_price: "35000000",
        sale_price_usd: "235",
        stock: 1,
        date: "13/12/2023 13:00:00",
        schedulemeeting : "13/12/2023 13:00:00",
        priceforentrustinggoods: "35000000",
        priceforentrustinggoods_usd: "235",
        note: "-",
        status: "Approved",
        weight: 1,
        width: 2,
        length: 3,
        height: 4,
        description: "Ini Deskripsi",
        description_en: "This is description",
        history: "History barang",
        history_en: "History of",
        status_sold: "On Etalase",
    },
    {
        image: "https://dev-olshop.berkatsoft.com/image/product/6544a6bc8f3ae.jpg",
        name: "Channle Anmoller",
        price: "35000000",
        price_usd: "235",
        sale_price: "35000000",
        sale_price_usd: "235",
        stock: 1,
        date: "13/12/2023 13:00:00",
        schedulemeeting : "13/12/2023 13:00:00",
        priceforentrustinggoods: "35000000",
        priceforentrustinggoods_usd: "235",
        note: "-",
        status: "In Review",
        weight: 1,
        width: 2,
        length: 3,
        height: 4,
        description: "Ini Deskripsi",
        description_en: "This is description",
        history: "History barang",
        history_en: "History of",
        status_sold: "On Etalase",
    },
    {
        image: "https://dev-olshop.berkatsoft.com/image/product/656a6feb1203b.jpeg",
        name: "CROC-EFFECT GRECA GODDESS MINI BAG",
        price: "49303",
        price_usd: "95",
        sale_price: "35000000",
        sale_price_usd: "235",
        stock: 1,
        date: "13/12/2023 13:00:00",
        schedulemeeting : "13/12/2023 13:00:00",
        priceforentrustinggoods: "35000000",
        priceforentrustinggoods_usd: "235",
        note: "-",
        status: "Approved",
        weight: 1,
        width: 2,
        length: 3,
        height: 4,
        description: "Ini Deskripsi",
        description_en: "This is description",
        history: "History barang",
        history_en: "History of",
        status_sold: "Sold Out",
    },
];

export default function VendorListingProduct() {

    /**
     * Hooks
     * 
     */
    const { pathname } = useLocation();
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate()

    /**
     * Context
     * 
     */
    const { setLoading } = useContext(LoadingContext)
    const { user, refreshUser } = useContext(AuthUserContext)

    /**
     * Main State
     * 
     */
    const [reviewObj, setReviewObj] = useState({});

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setReviewObj(REVEWI_DATA_DUMMY[Number(id)]);
    }, []);

    return (
        <div className='vendor'>
            <ContainerComponent>
                <>
                    <div className='tabs'>
                        <button onClick={() => {
                            navigate('../1')
                        }}>
                            {t('accountinformation')}
                        </button>
                        <button className='active'>
                            {t('productinformation')}
                        </button>
                    </div>
                    <div className='step-1 bg-white'>
                        <div className='steps'>
                            <div className='step' onClick={() => navigate('../2')}>{t('productinformation')}</div>
                            <div className='step' onClick={() => navigate(`../review/${id}`)}>{t('reviewvendor')}</div>
                            <div className='step' onClick={() => navigate(`../agreement/${id}`)}>{t('agreement')}</div>
                            <div className='step active'>{t('listingproduct')}</div>
                        </div>
                    </div>
                    <div className='step-1-main review-item'>
                        <div className="item bg-white">
                            <div className="top" onClick={() => navigate(`../agreement/${id}`)}>
                                <button type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#111111" />
                                    </svg>
                                </button>
                                <h2>{t('listingproduct')}</h2>
                            </div>
                            <div className="body">
                                <img src={reviewObj?.image} alt='review' />
                                <div className='detail'>
                                    <div className='status' data-status={reviewObj?.status?.toLowerCase()}>
                                        {t(reviewObj?.status?.toLowerCase())} .
                                    </div>
                                    <div className='title'>
                                        {reviewObj?.name}
                                    </div>
                                </div>
                                <div className='detail'>
                                    <div className='title'>
                                        {t('price')}
                                    </div>
                                    <div>
                                        {Number(reviewObj?.price)?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })} | {Number(reviewObj?.price_usd)?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                                    </div>
                                </div>
                                <div className='detail'>
                                    <div className='title'>
                                        {t('saleprice')}
                                    </div>
                                    <div>
                                        {Number(reviewObj?.sale_price)?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })} | {Number(reviewObj?.sale_price_usd)?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                                    </div>
                                </div>
                                <div className='detail'>
                                    <div className='title'>
                                        {t('weight')} (Kg)
                                    </div>
                                    <div>
                                        {reviewObj?.weight}
                                    </div>
                                </div>
                                <div className='detail'>
                                    <div className='title'>
                                        {t('width')} (Kg)
                                    </div>
                                    <div>
                                        {reviewObj?.width}
                                    </div>
                                </div>
                                <div className='detail'>
                                    <div className='title'>
                                        {t('length')} (Kg)
                                    </div>
                                    <div>
                                        {reviewObj?.length}
                                    </div>
                                </div>
                                <div className='detail'>
                                    <div className='title'>
                                        {t('height')} (Kg)
                                    </div>
                                    <div>
                                        {reviewObj?.height}
                                    </div>
                                </div>
                                <div className='detail'>
                                    <div className='title'>
                                        Deskripsi
                                    </div>
                                </div>
                                <div className='detail'>
                                    <div className='title'>
                                    </div>
                                    <div>
                                        {reviewObj?.description}
                                    </div>
                                </div>
                                <div className='detail'>
                                    <div className='title'>
                                        Description
                                    </div>
                                </div>
                                <div className='detail'>
                                    <div className='title'>
                                    </div>
                                    <div>
                                        {reviewObj?.description_en}
                                    </div>
                                </div>
                                <div className='detail'>
                                    <div className='title'>
                                        Sejarah
                                    </div>
                                </div>
                                <div className='detail'>
                                    <div className='title'>
                                    </div>
                                    <div>
                                        {reviewObj?.history}
                                    </div>
                                </div>
                                <div className='detail'>
                                    <div className='title'>
                                        History
                                    </div>
                                </div>
                                <div className='detail'>
                                    <div className='title'>
                                    </div>
                                    <div>
                                        {reviewObj?.history_en}
                                    </div>
                                </div>
                                <div className='detail'>
                                    <div className='title'>
                                        {t('goodssalesstatus')}
                                    </div>
                                </div>
                                <div className='detail'>
                                    <div className='title'>
                                    </div>
                                    <div>
                                        {reviewObj?.status_sold}
                                    </div>
                                </div>
                            </div>
                            <div className="listingproduct-footer">
                                <button className="next" onClick={() => navigate(`../2`)}>{t('viewlist')}</button>
                            </div>
                        </div>

                    </div>
                </>
            </ContainerComponent>
        </div>
    )
}
