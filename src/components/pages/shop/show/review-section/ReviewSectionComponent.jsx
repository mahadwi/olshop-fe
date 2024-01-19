import './review-section.scoped.scss'
import { Link } from 'react-router-dom'
import { IconChevronRight } from '@tabler/icons-react';
import ReviewItemComponent from '../review-item/ReviewItemComponent';
import { useTranslation } from 'react-i18next';

export default function ReviewSectionComponent() {
    /**
     * Hooks
     * 
     */
    const { t } = useTranslation();

    return (
        <div className='review-section'>
            <div className='title-section'>
                <h2 className='title'>{t('review')}</h2>
                <Link className='view-more'>
                    <span>{t('viewall')}</span>
                    <IconChevronRight style={{ color: '#FFAC33' }} />
                </Link>
            </div>
            <div className='review-recap'>
                <span className='stars-amount'>5.0 / 5</span>
                <span className='review'>(1 {t('review')})</span>
            </div>
            <hr />
            <div className='reviews'>
                <ReviewItemComponent />
                <ReviewItemComponent />
            </div>
        </div>
    )
}