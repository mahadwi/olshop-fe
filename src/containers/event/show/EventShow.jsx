import { useEffect, useState } from "react";
import BreadCrumb from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import BannerComponent from "../../../components/pages/event/show/banner/BannerComponent";
import EventDescriptionComponent from "../../../components/pages/event/show/event-description/EventDescriptionComponent";
import TicketPurchaseComponent from "../../../components/pages/event/show/ticket-purchase/TicketPurchaseComponent";
import AdditionalDetailComponent from "../../../components/pages/event/show/additional-detail/AdditionalDetailComponent";
import NavbarComponent from "../../../components/general/navbar/NavbarComponent";
import './event-show.scss'
import FooterComponent from "../../../components/footer/FooterComponent";
import ScreenContainerComponent from "../../../components/general/screen-container/ScreenContainerComponent";
import Api from "../../../utils/Api";
import { useParams, useLocation } from "react-router-dom";
import LoadingComponent from "../../../components/general/loading/LoadingComponent";

export default function EventShow() {

    const { pathname } = useLocation();
    const { id } = useParams();
    const [loading, setLoading] = useState(true)

    /**
     * Redundant States
     * 
     */
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const [eventDetailObj, setEventDetailObj] = useState({})

    useEffect(() => {
        loadBreadcrumbs()
        loadEventDetailObj(id)
    }, [])

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const loadBreadcrumbs = () => {
        setBreadcrumbs([
            {
                label: 'Home',
                url: '/'
            },
            {
                label: 'Event',
                url: '/event'
            },
            {
                label: 'Fashion Week 2023'
            }
        ])
    }

    const loadEventDetailObj = (id) => {
        if (id) {
            setLoading(true)
            Api.get('/event/' + id)
                .then((res) => {
                    setEventDetailObj(res.data.data)
                    setLoading(false)
                })
        }
    }

    return (
        <div>
            <LoadingComponent loading={loading} />

            <ScreenContainerComponent>
                <div className="event-show-container">

                    <NavbarComponent />

                    <ContainerComponent>
                        <BreadCrumb lists={breadcrumbs} />
                    </ContainerComponent>

                    <BannerComponent eventDetailObj={eventDetailObj} />

                    <ContainerComponent>
                        <EventDescriptionComponent eventDetailObj={eventDetailObj} />
                    </ContainerComponent>

                    <TicketPurchaseComponent eventDetailObj={eventDetailObj} />

                    <AdditionalDetailComponent />
                </div>
            </ScreenContainerComponent>
            <FooterComponent />
        </div>
    )
}