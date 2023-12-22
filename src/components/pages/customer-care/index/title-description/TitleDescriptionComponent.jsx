import { useContext } from "react";
import './title-description.scoped.scss'
import { LanguageContext } from "../../../../../context/LanguageContext";

export default function TitleDescriptionComponent({ customerCareObject }) {
    const { language } = useContext(LanguageContext)
    const suffix = language == 'id' ? '' : '_en';

    return (
        <div className='title-desc'>
            <h2>{customerCareObject['title' + suffix]}</h2>
            <p dangerouslySetInnerHTML={{ __html: customerCareObject['description' + suffix] }}></p>
        </div>
    )
}
