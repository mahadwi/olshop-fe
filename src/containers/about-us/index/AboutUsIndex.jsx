import { useContext, useEffect, useState } from "react";
import './about-us-index.scoped.scss'
import ContainerComponent from '../../../components/general/container/ContainerComponent';
import HeroComponent from '../../../components/pages/about-us-components/hero/HeroComponent';
import DescriptionComponent from '../../../components/pages/about-us-components/description/DescriptionComponent';
import FormBoxComponent from '../../../components/pages/about-us-components/form-box/FormBoxComponent';
import HighlightTitleComponent from '../../../components/general/highlight-title/HighlightTitleComponent';
import { useLocation } from 'react-router-dom';
import Api from '../../../utils/Api';
import { LoadingContext } from '../../../context/LoadingContext';
import { LanguageContext } from "../../../context/LanguageContext";

export default function AboutUsIndex() {

    const { pathname } = useLocation();
    const [aboutUsObject, setAboutUsObject] = useState({})
    const { setLoading } = useContext(LoadingContext)
    const { language } = useContext(LanguageContext)
    const suffix = language == 'id' ? '' : '_en';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        loadAboutUs()
    }, [])

    const loadAboutUs = () => {
        setLoading(true)

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
        <div className='about-us-section'>
            <div className='container-about-us'>
                <div className='top-highlight-wrapper'>
                    <HighlightTitleComponent title={aboutUsObject['title' + suffix]} background={'linear-gradient(90deg, #E4A951 0%, #E4E4EA 50.62%, #FFF 98.93%)'} />
                </div>
                <ContainerComponent>
                    <HeroComponent aboutUsObject={aboutUsObject} />

                    <DescriptionComponent aboutUsObject={aboutUsObject} />
                </ContainerComponent>
                <FormBoxComponent />
            </div>
        </div>
    )

}
