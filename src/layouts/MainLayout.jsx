import { useContext, useEffect } from "react";
import FooterComponent from "../components/footer/FooterComponent";
import NavbarComponent from "../components/general/navbar/NavbarComponent";
import ScreenContainerComponent from "../components/general/screen-container/ScreenContainerComponent";
import { Outlet, useLocation } from 'react-router-dom'
import LoadingComponent from "../components/general/loading/LoadingComponent";
import { LoadingContext } from "../context/LoadingContext";
import { AuthUserContext } from "../context/AuthUserContext";
import NavbarHomeComponent from "../components/general/navbar-home/NavbarHomeComponent";
import { CartContext } from "../context/CartContext";
import { Toaster } from 'react-hot-toast';

export default function MainLayout() {

    const { pathname } = useLocation()

    const { loading } = useContext(LoadingContext)
    const { getUser, user } = useContext(AuthUserContext)
    const { refreshCarts, setCarts } = useContext(CartContext)

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        if (user) {
            refreshCarts()
        } else {
            setCarts([])
        }
    }, [user])

    return (
        <div>
            <Toaster containerStyle={{
                top: '50%',
                left: 0,
                right: 0,
            }} />
            <LoadingComponent loading={loading} />
            {
                pathname == '/' ?
                    <NavbarHomeComponent />
                    : <NavbarComponent />
            }
            {
                pathname != '/' ?
                    <ScreenContainerComponent>
                        <Outlet />
                    </ScreenContainerComponent> : <Outlet />
            }
            <FooterComponent />
        </div>
    )
}