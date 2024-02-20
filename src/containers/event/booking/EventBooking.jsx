import { useContext, useEffect, useState } from 'react'
import BreadCrumb from '../../../components/general/breadcrumb/BreadCrumbComponent'
import ContainerComponent from '../../../components/general/container/ContainerComponent'
import './event-booking.scss'
import StepperComponent from '../../../components/pages/event/booking/stepper/StepperComponent'
import FormBookComponent from '../../../components/pages/event/booking/form-book/FormBookComponent'
import FormPaymentComponent from '../../../components/pages/event/booking/form-payment/FormPaymentComponent'
import TicketBookingSummaryComponent from '../../../components/pages/event/booking/ticket-booking-summary/TicketBookingSummaryComponent'
import { useLocation } from 'react-router-dom'
import { AuthUserContext } from "../../../context/AuthUserContext";

export default function EventBooking() {

    /**
     * Hooks
     * 
     */
    const { pathname } = useLocation();

    /**
     * Context
     * 
     */
    const { user } = useContext(AuthUserContext)

    /**
     * Main State
     * 
     */
    const [breadcrumbs, setBreadcrumbs] = useState([])

    /**
     * Stepper State
     * 
     */
    const [arrFormStepStates, setArrFormStepStates] = useState([])
    const [activedIndexState, setActivedIndexState] = useState(0)

    useEffect(() => {
        loadBreadcrumbs()
        loadArrFormStepStates()
    }, [])

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const loadArrFormStepStates = () => {
        setArrFormStepStates(['Book', 'Payment', 'E-Ticket'])
    }

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
                label: 'Fashion Week 2023',
                url: '/event/fashion-week-2023'
            },
            {
                label: 'Booking'
            }
        ])
    }

    return (
        <div className='event-booking-container'>
            <ContainerComponent>
                <BreadCrumb lists={breadcrumbs} />

                <TicketBookingSummaryComponent />

                <StepperComponent activedIndexState={activedIndexState} steps={arrFormStepStates} />

                <div className='stepper-content-wrapper'>
                    {
                        activedIndexState == 0 ?
                            <FormBookComponent setActivedIndexState={setActivedIndexState} user={user} />
                            : <>{
                                activedIndexState == 1 ?
                                    <FormPaymentComponent setActivedIndexState={setActivedIndexState} /> : <h1 style={{ width: '70%', float: 'right' }}>E-Ticket</h1>
                            }</>

                    }
                </div>

            </ContainerComponent>
        </div>
    )
}
