import { useContext, useEffect, useState } from "react";
import './vendoragreement.scoped.scss'
import { useLocation } from 'react-router-dom'
import 'react-responsive-modal/styles.css';
import Api from "../../../utils/Api";
import { LoadingContext } from "../../../context/LoadingContext";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { CurrencyContext } from "../../../context/CurrencyContext";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

export default function VendorAgreement() {

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
        setReviewObj({});
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
                            <div className='step active'>{t('agreement')}</div>
                            <div className='step'>{t('listingproduct')}</div>
                        </div>
                    </div>
                    <div className='step-1-main review-item'>
                        <div className="item bg-white">
                            <div className="top" onClick={() => navigate(`../review/${id}`)}>
                                <button type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#111111" />
                                    </svg>
                                </button>
                                <h2>{t('agreement')}</h2>
                            </div>
                            <div className="body">
                                <table>
                                    <thead>
                                        <tr>
                                            <td>{t('title')}</td>
                                            <td>{t('action')}</td>
                                            <td>{t('upload')} {t('document')}</td>
                                            <td>Status</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Data A</td>
                                            <td>{t('agreementview')} | {t('download')}</td>
                                            <td>{t('upload')}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Data B</td>
                                            <td>{t('agreementview')} | {t('download')}</td>
                                            <td>{t('upload')}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Data C</td>
                                            <td>{t('agreementview')} | {t('download')}</td>
                                            <td>{t('upload')}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Bukti Transfer</td>
                                            <td>{t('agreementview')} | {t('download')}</td>
                                            <td>{t('upload')}</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="agreement-footer">
                                <button className="next" onClick={() => navigate(`../listingproduct/${id}`)}>{t('next')}</button>
                            </div>
                        </div>

                    </div>
                </>
            </ContainerComponent>
        </div>
    )
}
