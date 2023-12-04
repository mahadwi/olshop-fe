import { useEffect, useState } from "react";
import BreadCrumb from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import TopSectionComponent from "../../../components/pages/event/index/top-section/TopSectionComponent";
import BannerComponent from "../../../components/pages/event/index/banner/BannerComponent";
import BestJournalsComponent from "../../../components/pages/event/index/best-journals/BestJournalsComponent";
import OurJournalsComponent from "../../../components/pages/event/index/our-journals/OurJournalsComponent";
import './event-index.scoped.scss'
import NavbarComponent from "../../../components/homeComponents/navbar/NavbarComponent";
import FooterComponent from "../../../components/footer/FooterComponent";
import { useLocation } from 'react-router-dom';
import Api from "../../../utils/Api";
import LoadingComponent from "../../../components/general/loading/LoadingComponent";

export default function EventIndex() {

    const { pathname } = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

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
                label: 'Home',
                url: '/'
            },
            {
                label: 'Event',
            }
        ])
    }

    const loadEvents = () => {

        setLoading(true)
        Api.get('/event')
            .then((res) => {
                setEvents(res.data.data)
                setLoading(false)
            })
    }

    return (
        <div>
            <LoadingComponent loading={loading} />

            <div className="event-index-page">

                <NavbarComponent />

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
            <FooterComponent />
        </div>
    )
}