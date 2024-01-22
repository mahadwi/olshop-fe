import { IconMapPin, IconSquareCheck } from "@tabler/icons-react";
import './card.scoped.scss'
import { useTranslation } from "react-i18next";

export default function CardComponent() {
    const { t } = useTranslation();

    return (
        <div className="card-section">
            <div className="card-component">
                <div className="card-item">
                    <IconMapPin />
                    <h3>{t('packagetracking')}</h3>
                    <p>{t('packagetrackingcontent')}</p>
                </div>
            </div>
            <div className="card-component">
                <div className="card-item">
                    <IconSquareCheck />
                    <h3>{t('insurance')}</h3>
                    <p>{t('insurancecontent')}</p>
                </div>
            </div>
        </div>
    )
}
