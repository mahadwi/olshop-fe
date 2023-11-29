import './review-section.scoped.scss'
import { Link } from 'react-router-dom'
import { IconChevronRight } from '@tabler/icons-react';
import ReviewItemComponent from '../review-item/ReviewItemComponent';

export default function ReviewSectionComponent() {
    return (
        <div className='review-section'>
            <div className='title-section'>
                <h2 className='title'>Review</h2>
                <Link className='view-more'>
                    <span>View All</span>
                    <IconChevronRight style={{ color: '#FFAC33' }} />
                </Link>
            </div>
            <div className='review-recap'>
                <span className='stars-amount'>5.0 / 5</span>
                <span className='review'>(1 Review)</span>
            </div>
            <hr />
            <div className='reviews'>
                <ReviewItemComponent />
                <ReviewItemComponent />
            </div>
        </div>
    )
}