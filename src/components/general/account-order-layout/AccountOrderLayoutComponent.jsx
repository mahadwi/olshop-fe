import { Link } from "react-router-dom";
import FooterComponent from "../../../components/footer/FooterComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import NavbarComponent from "../../../components/general/navbar/NavbarComponent";
import ScreenContainerComponent from "../../../components/general/screen-container/ScreenContainerComponent";
import BreadCrumbComponent from "../breadcrumb/BreadCrumbComponent";
import './account-order-layout.scoped.scss'
import { IconPlus } from "@tabler/icons-react";

export default function AccountOrderLayoutComponent({ children, breadcrumb, title, description, buttonAddress }) {
    return (
        <div>
            <NavbarComponent />
            <ScreenContainerComponent>
                <ContainerComponent>
                    <BreadCrumbComponent lists={breadcrumb} />
                    <div className="account-order-layout">

                        <div className="left">
                            <div className="box">
                                <ul>
                                    <li><Link to={'/account'} className="active">My Account</Link></li>
                                    <li><Link to={'/orders'}>Orders</Link></li>
                                    <li><Link to={'/wishlist'}>Wishlist</Link></li>
                                </ul>
                                <hr />
                                <ul>
                                    <li><Link to={'/address'}>Address</Link></li>
                                    <li><Link to={'/logout'}>Logout</Link></li>
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
                                            <button type="button"><span>Add New Address</span> <IconPlus /></button>
                                            : <></>
                                    }
                                </div>

                                {children}
                            </div>
                        </div>
                    </div>

                </ContainerComponent>
            </ScreenContainerComponent>
            <FooterComponent />
        </div>
    )
}