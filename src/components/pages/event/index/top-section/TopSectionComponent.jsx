import './top-section.scoped.scss'
import { useTranslation } from 'react-i18next';

export default function TopSectionComponent() {
    const { t } = useTranslation();

    return (
        <div>
            <h1>LUXURYHUB {t('journal')}</h1>
            <p>{t('eventjournaldescription')}</p>
        </div>
    )
}
