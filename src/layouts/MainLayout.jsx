import { useContext, useEffect } from "react";
import FooterComponent from "../components/footer/FooterComponent";
import NavbarComponent from "../components/general/navbar/NavbarComponent";
import ScreenContainerComponent from "../components/general/screen-container/ScreenContainerComponent";
import { Outlet, useLocation } from 'react-router-dom'
import LoadingComponent from "../components/general/loading/LoadingComponent";
import { LoadingContext } from "../context/LoadingContext";
import { AuthUserContext } from "../context/AuthUserContext";
import NavbarHomeComponent from "../components/general/navbar-home/NavbarHomeComponent";

export default function MainLayout() {

    const { pathname } = useLocation()

    const { loading } = useContext(LoadingContext)
    const { getUser } = useContext(AuthUserContext)

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div>
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