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
import { useLocation } from 'react-router-dom';
import Api from '../../../utils/Api';
import LoadingComponent from '../../../components/general/loading/LoadingComponent';

export default function AboutUsIndex() {

    const { pathname } = useLocation();
    const [aboutUsObject, setAboutUsObject] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        loadAboutUs()
    }, [])

    const loadAboutUs = () => {
        Api.get('/about-us')
            .then((res) => {
                if (res) {
                    setAboutUsObject(res.data.data[0])

                    setLoading(false)
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <LoadingComponent loading={loading} />

            <div className='about-us-section'>
                <NavbarComponent />

                <div className='container-about-us'>
                    <div className='top-highlight-wrapper'>
                        <HighlightTitleComponent title={'About Us'} background={'linear-gradient(90deg, #E4A951 0%, #E4E4EA 50.62%, #FFF 98.93%)'} />
                    </div>
                    <ContainerComponent>
                        <HeroComponent aboutUsObject={aboutUsObject} />

                        <DescriptionComponent aboutUsObject={aboutUsObject} />
                    </ContainerComponent>

                    <FormBoxComponent />
                </div>
            </div>
            <IndexFooter />
        </div>
    )

}