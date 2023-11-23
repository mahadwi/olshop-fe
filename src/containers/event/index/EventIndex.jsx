import { useEffect, useState } from "react";
import BreadCrumb from "../../../components/general/breadcrumb/BreadCrumb";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import IndexNavbar from "../../../components/navbar/IndexNavbar";
import { GetBrand, GetCategory } from "../../../config/api";
import axios from 'axios'
import TopSectionComponent from "../../../components/pages/event/index/top-section/TopSectionComponent";
import BannerComponent from "../../../components/pages/event/index/banner/BannerComponent";
import BestJournalsComponent from "../../../components/pages/event/index/best-journals/BestJournalsComponent";
import OurJournalsComponent from "../../../components/pages/event/index/our-journals/OurJournalsComponent";
import './event-index.scoped.scss'

export default function EventIndex() {

    const [breadcrumbs, setBreadcrumbs] = useState([])

    /**
    * Redundant States
    * 
    */
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])

    /**
     * First Load
     * 
     */
    useEffect(() => {
        loadBreadcrumbs()

        handleDropDownDesign()
        handleDropDownCollective()
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
            }
        ])
    }

    return (
        <div className="event-index-page">
            {/* Navbar */}
            <IndexNavbar
                brands={brands}
                categories={categories}
            />
            {/* End of Navbar */}

            <ContainerComponent>
                <BreadCrumb lists={breadcrumbs} />
                <TopSectionComponent />
            </ContainerComponent>
            <BannerComponent />
            <ContainerComponent>
                <BestJournalsComponent />
            </ContainerComponent>
            <OurJournalsComponent />
        </div>
    )
}