import { useContext, useEffect, useState } from "react";
import AccountOrderLayoutComponent from "../../../components/general/account-order-layout/AccountOrderLayoutComponent";
import BoxProfileComponent from "../../../components/pages/account/index/BoxProfileComponent";
import { useLocation } from 'react-router-dom'
import { AuthUserContext } from "../../../context/AuthUserContext";

export default function AccountIndex() {

    /**
     * Hooks
     * 
     */
    const { pathname } = useLocation();

    /**
     * Context
     * 
     */
    const { user } = useContext(AuthUserContext)

    /**
     * Main State
     * 
     */
    const [breadcrumb, setBreadcrumb] = useState([])

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

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
                label: 'My Account'
            }
        ])
    }

    return (
        <AccountOrderLayoutComponent position={'My Account'} breadcrumb={breadcrumb} title={'My Account'} description={'Manage and protect your account'}>
            <BoxProfileComponent user={user} />
        </AccountOrderLayoutComponent>
    )
}