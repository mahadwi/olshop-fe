import { useEffect, useState } from "react";
import IndexNavbar from "../../../components/navbar/IndexNavbar";
import { GetBrand, GetCategory } from "../../../config/api";
import axios from 'axios'
import BreadCrumb from "../../../components/general/breadcrumb/BreadCrumb";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import BannerComponent from "../../../components/pages/event/show/banner/BannerComponent";
import EventDescriptionComponent from "../../../components/pages/event/show/event-description/EventDescriptionComponent";
import TicketPurchaseComponent from "../../../components/pages/event/show/ticket-purchase/TicketPurchaseComponent";
import AdditionalDetailComponent from "../../../components/pages/event/show/additional-detail/AdditionalDetailComponent";

export default function EventShow() {

    /**
     * Redundant States
     * 
     */
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])

    /**
     * First Load
     * 
     */
    useEffect(() => {
        handleDropDownDesign()
        handleDropDownCollective()
    }, [])

    useEffect(() => {
        loadBreadcrumbs()
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
            </ContainerComponent>

            <BannerComponent />

            <ContainerComponent>
                <EventDescriptionComponent />
            </ContainerComponent>

            <TicketPurchaseComponent />

            <AdditionalDetailComponent />

            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}