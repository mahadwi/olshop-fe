import { useEffect, useState } from "react";
import AccountOrderLayoutComponent from "../../../components/general/account-order-layout/AccountOrderLayoutComponent";
import './address.scoped.scss'

export default function AddressIndex() {
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
        <AccountOrderLayoutComponent breadcrumb={breadcrumb} position={'Address'} title={'Address'} buttonAddress={true}>
            <div className="addresess">
                <div className="address-box active">
                    <div className="inner-address-box">
                        <div className="top">
                            <h4 className="place-text">Home</h4>
                            <div className="list-button">
                                <button className="edit">Edit</button>
                                <button className="set-default">Set as default</button>
                                <button className="delete">Delete</button>
                            </div>
                        </div>
                        <div className="middle">
                            <h4 className="name-text">Roberto Marquez</h4>
                            <h4 className="number-phone-text">(+62) 89000111222</h4>
                        </div>
                        <div className="bottom">
                            <p>Jl. Lidah Bukit Mas, Lidah Wetan, Kec. Lakarsantri, Surabaya, Jawa Timur 60213</p>
                        </div>
                    </div>
                </div>
                <div className="address-box">
                    <div className="inner-address-box">
                        <div className="top">
                            <h4 className="place-text">Home</h4>
                            <div className="list-button">
                                <button className="edit">Edit</button>
                                <button className="set-default">Set as default</button>
                                <button className="delete">Delete</button>
                            </div>
                        </div>
                        <div className="middle">
                            <h4 className="name-text">Roberto Marquez</h4>
                            <h4 className="number-phone-text">(+62) 89000111222</h4>
                        </div>
                        <div className="bottom">
                            <p>Jl. Lidah Bukit Mas, Lidah Wetan, Kec. Lakarsantri, Surabaya, Jawa Timur 60213</p>
                        </div>
                    </div>
                </div>
                <div className="address-box">
                    <div className="inner-address-box">
                        <div className="top">
                            <h4 className="place-text">Home</h4>
                            <div className="list-button">
                                <button className="edit">Edit</button>
                                <button className="set-default">Set as default</button>
                                <button className="delete">Delete</button>
                            </div>
                        </div>
                        <div className="middle">
                            <h4 className="name-text">Roberto Marquez</h4>
                            <h4 className="number-phone-text">(+62) 89000111222</h4>
                        </div>
                        <div className="bottom">
                            <p>Jl. Lidah Bukit Mas, Lidah Wetan, Kec. Lakarsantri, Surabaya, Jawa Timur 60213</p>
                        </div>
                    </div>
                </div>
            </div>
        </AccountOrderLayoutComponent>
    )
}