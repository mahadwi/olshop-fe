import { useEffect, useState } from "react";
import AccountOrderLayoutComponent from "../../../components/general/account-order-layout/AccountOrderLayoutComponent";
import BoxProfileComponent from "../../../components/pages/account/index/BoxProfileComponent";

export default function AccountIndex() {
    const [breadcrumb, setBreadcrumb] = useState([])

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
            <BoxProfileComponent />
        </AccountOrderLayoutComponent>
    )
}