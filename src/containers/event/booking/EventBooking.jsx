import { useEffect, useState } from 'react'
import BreadCrumb from '../../../components/general/breadcrumb/BreadCrumb'
import ContainerComponent from '../../../components/general/container/ContainerComponent'
import './event-booking.scss'
import IndexNavbar from '../../../components/navbar/IndexNavbar'
import { GetBrand, GetCategory } from '../../../config/api'
import axios from 'axios'
import StepperComponent from '../../../components/pages/event/booking/stepper/StepperComponent'
import FormBookComponent from '../../../components/pages/event/booking/form-book/FormBookComponent'
import FormPaymentComponent from '../../../components/pages/event/booking/form-payment/FormPaymentComponent'
import TicketBookingSummaryComponent from '../../../components/pages/event/booking/ticket-booking-summary/TicketBookingSummaryComponent'

export default function EventBooking() {

    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])
    const [breadcrumbs, setBreadcrumbs] = useState([])

    /**
     * Stepper State
     * 
     */
    const [arrFormStepStates, setArrFormStepStates] = useState([])
    const [activedIndexState, setActivedIndexState] = useState(0)

    useEffect(() => {
        handleDropDownDesign()
        handleDropDownCollective()

        loadBreadcrumbs()

        loadArrFormStepStates()
    }, [])

    /**
     * (Redundant) Getting Data Dropdown Design Navbar
     * 
     */
    const handleDropDownDesign = async () => {
        try {
            const response = await axios.get(GetBrand)

            setBrands(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * (Redundant) Getting Data Categories Navbar
     * 
     */
    const handleDropDownCollective = async () => {
        try {
            const response = await axios.get(GetCategory)

            setCategories(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

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
        <div>
            {/* Navbar */}
            <IndexNavbar
                brands={brands}
                categories={categories}
            />
            {/* End of Navbar */}

            <ContainerComponent>
                <BreadCrumb lists={breadcrumbs} />

                <TicketBookingSummaryComponent />

                <StepperComponent activedIndexState={activedIndexState} steps={arrFormStepStates} />

                <div className='stepper-content-wrapper'>
                    {
                        activedIndexState == 0 ?
                            <FormBookComponent setActivedIndexState={setActivedIndexState} />
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