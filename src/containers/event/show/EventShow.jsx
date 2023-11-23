import { useEffect, useState } from "react";
import IndexNavbar from "../../../components/navbar/IndexNavbar";
import { GetBrand, GetCategory } from "../../../config/api";
import axios from 'axios'
import BreadCrumb from "../../../components/general/breadcrumb/BreadCrumb";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import BannerComponent from "../../../components/pages/event-page-components/banner/BannerComponent";
import EventDescriptionComponent from "../../../components/pages/event-page-components/event-description/EventDescriptionComponent";

export default function EventShow() {

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

    return (
        <div>

            {/* Navbar */}
            <IndexNavbar
                brands={brands}
                categories={categories}
            />
            {/* End of Navbar */}

            <ContainerComponent>
                <BreadCrumb
                    lists={[{
                        label: 'Home',
                        url: '/'
                    }, {
                        label: 'Event'
                    }]}
                />
            </ContainerComponent>

            <BannerComponent />

            <ContainerComponent>
                <EventDescriptionComponent />
            </ContainerComponent>
        </div>
    )
}