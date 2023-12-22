import { useContext } from "react";
import './return-police.scoped.scss'
import './return-police.css'
import { LanguageContext } from "../../../../../context/LanguageContext";

export default function ReturnPoliceComponent({ returnPoliceObject }) {
    const { language } = useContext(LanguageContext)
    const suffix = language == 'id' ? '' : '_en';

    return (
        <div className="return-police-information">
            <div className='left'>
                <div className="inner">
                    <img src={returnPoliceObject.image_url} alt="" />
                </div>
            </div>
            <div className="right">
                <div className="inner">
                    <div dangerouslySetInnerHTML={{ __html: returnPoliceObject['description'+suffix] }}></div>
                </div>
            </div>
        </div>
    )
}
