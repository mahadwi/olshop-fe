import { useContext } from "react";
import BreadCrumb from "../../../general/breadcrumb/BreadCrumbComponent";
import './hero.scoped.scss'
import './hero.css'
import parse from 'html-react-parser';
import { LanguageContext } from "../../../../context/LanguageContext";

export default function HeroComponent({ aboutUsObject }) {
    const { language } = useContext(LanguageContext)
    const suffix = language == 'id' ? '' : '_en';

    return (
        <div className='hero-wrapper'>
            <div className="left">
                <BreadCrumb
                    lists={[{
                        label: 'Home',
                        url: '/'
                    }, {
                        label: aboutUsObject['title'+suffix]
                    }]}
                />
                <p>
                    {parse(aboutUsObject['description'+suffix] ? aboutUsObject['description'+suffix] : '')}
                </p>
            </div>
            <img src={aboutUsObject.image_url} alt="bag-image" />
        </div>

    )
}
