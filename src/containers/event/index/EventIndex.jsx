import { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import TopSectionComponent from "../../../components/pages/event/index/top-section/TopSectionComponent";
import BannerComponent from "../../../components/pages/event/index/banner/BannerComponent";
import BestJournalsComponent from "../../../components/pages/event/index/best-journals/BestJournalsComponent";
import OurJournalsComponent from "../../../components/pages/event/index/our-journals/OurJournalsComponent";
import './event-index.scoped.scss'
import { useLocation } from 'react-router-dom';
import Api from "../../../utils/Api";
import { LoadingContext } from "../../../context/LoadingContext";
import { LanguageContext } from "../../../context/LanguageContext";

export default function EventIndex() {

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
    const { language } = useContext(LanguageContext)

    /**
     * Main State
     * 
     */
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const [events, setEvents] = useState([])

    /**
     * First Load
     * 
     */
    useEffect(() => {
        loadBreadcrumbs()
        loadEvents()
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
            }
        ])
    }
    useEffect(() => {
        loadBreadcrumbs();
    }, [language]);

    const loadEvents = () => {

        setLoading(true)
        Api.get('/event')
            .then((res) => {
                setEvents(res.data.data)
                setLoading(false)
            })
    }

    return (
        <div className="event-index-page">
            <ContainerComponent>
                <BreadCrumb lists={breadcrumbs} />
                <TopSectionComponent />
            </ContainerComponent>
            <BannerComponent event={events[0]} />
            <ContainerComponent>
                <BestJournalsComponent events={events} />
            </ContainerComponent>
            <OurJournalsComponent events={events} />
        </div>
    )
}
