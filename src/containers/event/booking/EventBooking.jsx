import { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import "./event-booking.scss";
import StepperComponent from "../../../components/pages/event/booking/stepper/StepperComponent";
import FormBookComponent from "../../../components/pages/event/booking/form-book/FormBookComponent";
import FormPaymentComponent from "../../../components/pages/event/booking/form-payment/FormPaymentComponent";
import TicketBookingSummaryComponent from "../../../components/pages/event/booking/ticket-booking-summary/TicketBookingSummaryComponent";
import { useLocation, useParams } from "react-router-dom";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { LoadingContext } from "../../../context/LoadingContext";
import Api from "../../../utils/Api";

export default function EventBooking() {
    /**
     * Hooks
     *
     */
    const { pathname } = useLocation();
    const { id, ticket } = useParams();

    /**
     * Context
     *
     */
    const { user } = useContext(AuthUserContext);
    const { setLoading } = useContext(LoadingContext);

    /**
     * Main State
     *
     */
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [eventDetailObj, setEventDetailObj] = useState({});

    /**
     * Stepper State
     *
     */
    const [arrFormStepStates, setArrFormStepStates] = useState([]);
    const [activedIndexState, setActivedIndexState] = useState(0);

    useEffect(() => {
        loadBreadcrumbs();
        loadArrFormStepStates();
        loadEventDetailObj(id);
    }, []);

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const loadArrFormStepStates = () => {
        setArrFormStepStates(["Book", "Payment", "E-Ticket"]);
    };

    const loadBreadcrumbs = () => {
        setBreadcrumbs([
            {
                label: "Home",
                url: "/"
            },
            {
                label: "Event",
                url: "/event"
            },
            {
                label: "Fashion Week 2023",
                url: "/event/fashion-week-2023"
            },
            {
                label: "Booking"
            }
        ]);
    };

    const loadEventDetailObj = id => {
        if (id) {
            setLoading(true);
            Api.get("/event/" + id).then(res => {
                setEventDetailObj(res.data.data);
                setLoading(false);
            });
        }
    };

    return (
        <div className="event-booking-container">
            <ContainerComponent>
                <BreadCrumb lists={breadcrumbs} />

                {activedIndexState == 2 ? (
                    <>
                        <StepperComponent
                            activedIndexState={activedIndexState}
                            steps={arrFormStepStates}
                            setActivedIndexState={setActivedIndexState}
                        />
                    </>
                ) : null}

                <TicketBookingSummaryComponent
                    ticketId={ticket}
                    event={eventDetailObj}
                    activedIndexState={activedIndexState}
                />

                {activedIndexState != 2 ? (
                    <>
                        <StepperComponent
                            activedIndexState={activedIndexState}
                            steps={arrFormStepStates}
                            setActivedIndexState={setActivedIndexState}
                        />
                        <div className="stepper-content-wrapper">
                            {activedIndexState == 0 ? (
                                <FormBookComponent
                                    ticketId={ticket}
                                    event={eventDetailObj}
                                    setActivedIndexState={setActivedIndexState}
                                    user={user}
                                />
                            ) : null}
                            {activedIndexState == 1 ? (
                                <FormPaymentComponent
                                    ticketId={ticket}
                                    event={eventDetailObj}
                                    setActivedIndexState={setActivedIndexState}
                                />
                            ) : null}
                        </div>
                    </>
                ) : null}
            </ContainerComponent>
        </div>
    );
}
