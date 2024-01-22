import { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import BannerComponent from "../../../components/pages/event/show/banner/BannerComponent";
import EventDescriptionComponent from "../../../components/pages/event/show/event-description/EventDescriptionComponent";
import TicketPurchaseComponent from "../../../components/pages/event/show/ticket-purchase/TicketPurchaseComponent";
import AdditionalDetailComponent from "../../../components/pages/event/show/additional-detail/AdditionalDetailComponent";
import './event-show.scss'
import Api from "../../../utils/Api";
import { useParams, useLocation } from "react-router-dom";
import { LoadingContext } from "../../../context/LoadingContext";
import { LanguageContext } from "../../../context/LanguageContext";

export default function EventShow() {

    const { pathname } = useLocation();
    const { id } = useParams();

    /**
     * Context
     * 
     */
    const { setLoading } = useContext(LoadingContext)
    const { language } = useContext(LanguageContext)

    /**
     * Main States
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
                label: language == 'id' ? 'Beranda' : 'Home',
                url: '/'
            },
            {
                label: language == 'id' ? 'Acara' : 'Event',
                url: '/event'
            },
            {
                label: eventDetailObj.name
            }
        ])
    }

    useEffect(() => {
        loadBreadcrumbs();
    }, [language, eventDetailObj])

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
        <div className="event-show-container">

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
    )
}
