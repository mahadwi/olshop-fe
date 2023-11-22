import { useEffect, useState } from "react";
import IndexNavbar from "../../../components/navbar/IndexNavbar";
import axios from 'axios'
import { GetBrand, GetCategory } from "../../../config/api";
import BreadCrumb from "../../../components/general/breadcrumb/BreadCrumb";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import './contact.scoped.scss'
import HeroComponent from "../../../components/pages/contact/index/hero/HeroComponent";
import FormComponent from "../../../components/pages/contact/index/form/FormComponent";
import ContactComponent from "../../../components/pages/contact/index/contact/ContactComponent";

export default function ContactIndex() {
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
        <div className="contact-page">

            {/* Navbar */}
            <IndexNavbar
                brands={brands}
                categories={categories}
            />
            {/* End of Navbar */}

            <ContainerComponent>
                {/* Breadcrumb */}
                <BreadCrumb
                    lists={[
                        {
                            label: 'Home',
                            url: '/'
                        }, {
                            label: 'Contact'
                        }]
                    }
                />
                {/* Breadcrumb */}

                <HeroComponent />

                {/* Content */}
                <h1 className="title-love">We’d love to hear from you</h1>
                {/* End of Content */}

                <div className="horizontal-line"></div>

                <div className="form-and-contact-wrapper">
                    <FormComponent />
                    <ContactComponent />
                </div>

            </ContainerComponent>
        </div>
    )
}