import { useContext, useEffect, useState } from "react";
import AccountOrderLayoutComponent from "../../../components/general/account-order-layout/AccountOrderLayoutComponent";
import './vendor.scoped.scss'
import { useLocation } from 'react-router-dom'
import 'react-responsive-modal/styles.css';
import AsyncSelect from 'react-select/async';
import Api from "../../../utils/Api";
import Modal from 'react-bootstrap/Modal';
import { LoadingContext } from "../../../context/LoadingContext";
import ApiErrorHandling from "../../../utils/ApiErrorHandling";
import { AuthUserContext } from "../../../context/AuthUserContext";
import WelcomeImage from '../../../images/online shopping app.png';
import ContainerComponent from "../../../components/general/container/ContainerComponent";

export default function VendorIndex() {

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
    const { user, refreshUser } = useContext(AuthUserContext)

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='vendor'>
            <ContainerComponent>
                <div className='bg-white'>
                    <div className='welcome'>
                        <div className='img-wrapper'>
                            <img src={WelcomeImage} alt='ilustrator' />
                        </div>
                        <div className='title'>Welcome to LUXI!</div>
                        <div className='description'>To start as a vendor, register and complete the following information by clicking start registration</div>
                        <button>Start Registration</button>
                    </div>
                </div>
            </ContainerComponent>
      </div>
    )
}
