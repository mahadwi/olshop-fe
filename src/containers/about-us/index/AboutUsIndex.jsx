import axios from 'axios'
import { useEffect, useState } from "react";

import './about-us-index.scoped.scss'
import { GetBrand, GetCategory } from '../../../config/api';
import ContainerComponent from '../../../components/general/container/ContainerComponent';
import HeroComponent from '../../../components/pages/about-us-components/hero/HeroComponent';
import DescriptionComponent from '../../../components/pages/about-us-components/description/DescriptionComponent';
import FormBoxComponent from '../../../components/pages/about-us-components/form-box/FormBoxComponent';
import HighlightTitleComponent from '../../../components/general/highlight-title/HighlightTitleComponent';
import NavbarComponent from '../../../components/homeComponents/navbar/NavbarComponent';
import IndexFooter from '../../../components/footer/indexFooter';

export default function AboutUsIndex() {

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
            <div className='about-us-section'>
                <NavbarComponent />

                <div className='container-about-us'>
                    <div className='top-highlight-wrapper'>
                        <HighlightTitleComponent title={'About Us'} background={'linear-gradient(90deg, #E4A951 0%, #E4E4EA 50.62%, #FFF 98.93%)'} />
                    </div>
                    <ContainerComponent>
                        <HeroComponent />

                        <DescriptionComponent />
                    </ContainerComponent>

                    <FormBoxComponent />
                </div>
            </div>
            <IndexFooter />
        </div>
    )

}