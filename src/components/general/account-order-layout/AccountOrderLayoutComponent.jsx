import { Link } from "react-router-dom";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import BreadCrumbComponent from "../breadcrumb/BreadCrumbComponent";
import './account-order-layout.scoped.scss'
import { IconPlus } from "@tabler/icons-react";
import { useContext } from "react";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { useTranslation } from "react-i18next";

export default function AccountOrderLayoutComponent({ children, breadcrumb, title, description, buttonAddress, position, setShowButtonAddress }) {
    const { doLogout } = useContext(AuthUserContext)

    const { t } = useTranslation();

    return (
        <div>
            <ContainerComponent>
                <BreadCrumbComponent lists={breadcrumb} />
                <div className="account-order-layout">

                    <div className="left">
                        <div className="box">
                            <ul>
                                <li><Link to={'/account'} className={position == 'My Account' ? 'active' : ''}>My Account</Link></li>
                                <li><Link to={'/account/orders'} className={position == 'Orders' ? 'active' : ''}>Orders</Link></li>
                                <li><Link to={'/account/e-ticket'} className={position == 'E-Ticket' ? 'active' : ''}>{t("e-ticket")}</Link></li>
                                <li><Link to={'/account/wishlist'} className={position == 'Wishlist' ? 'active' : ''}>Wishlist</Link></li>
                            </ul>
                            <hr />
                            <ul>
                                <li><Link to={'/account/address'} className={position == 'Address' ? 'active' : ''}>Address</Link></li>
                                <li><Link to={'/account/vendor'} className={position == 'Vendor' ? 'active' : ''}>{t("consigner")}</Link></li>
                                <li><Link to={'/logout'} onClick={(e) => {
                                    e.preventDefault()
                                    doLogout(() => {
                                        window.location.href = '/login'
                                    })
                                }}>Logout</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="right">
                        <div className="inner">
                            <div className="top-area">
                                <div className="text">
                                    <h2 className="title">{title}</h2>
                                    {
                                        description ?
                                            <p className="description">Manage and protect your account</p> : <></>
                                    }
                                    <hr className="line-title" />
                                </div>

                                {
                                    buttonAddress ?
                                        <button type="button" onClick={() => {
                                            setShowButtonAddress(true)
                                        }}><span>Add New Address</span> <IconPlus /></button>
                                        : <></>
                                }
                            </div>

                            {children}
                        </div>
                    </div>
                </div>

            </ContainerComponent>
        </div>
    )
}
