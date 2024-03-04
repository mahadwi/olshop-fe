import { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import "./account-eticket-booking.scss";
import TicketBookingSummaryComponent from "../../../components/pages/event/booking/ticket-booking-summary/TicketBookingSummaryComponent";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { LoadingContext } from "../../../context/LoadingContext";
import Api from "../../../utils/Api";
import { useTranslation } from "react-i18next";

export default function AccountEticketBooking() {
    /**
     * Hooks
     *
     */
    const { pathname } = useLocation();
    const { id, ticket } = useParams();
    const [searchParams] = useSearchParams();
    const { t } = useTranslation();

    /**
     * Context
     *
     */
    const { setLoading } = useContext(LoadingContext);

    /**
     * Main State
     *
     */
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [eventDetailObj, setEventDetailObj] = useState({});

    useEffect(() => {
        loadBreadcrumbs();
        loadEventDetailObj(id);
    }, []);

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const loadBreadcrumbs = () => {
        setBreadcrumbs([
            {
                label: t("e-ticket"),
                url: "/account/e-ticket"
            },
            {
                label: t("information")
            }
        ]);
    };

    const loadEventDetailObj = id => {
        if (id) {
            setLoading(true);
            Api.get("/event/" + id).then(res => {
                setEventDetailObj(res.data.data);
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            })
        }
    };

    return (
        <div className="event-booking-container">
            <ContainerComponent>
                <BreadCrumb lists={breadcrumbs} />

                <TicketBookingSummaryComponent
                    bookingCode={"200"}
                    ticketId={ticket}
                    event={eventDetailObj}
                    activedIndexState={2}
                />

            </ContainerComponent>
        </div>
    );
}
