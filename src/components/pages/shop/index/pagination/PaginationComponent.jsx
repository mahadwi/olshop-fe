import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import './pagination.scoped.scss'

export default function PaginationComponent() {
    return (
        <div className='pagination-wrapper'>
            <div className='pagination'>
                <span className='prev'><IconChevronLeft style={{ color: '#444' }} size={18} /></span>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>...</li>
                    <li>...</li>
                    <li>9</li>
                </ul>
                <span className='next'><IconChevronRight style={{ color: '#444' }} size={18} /></span>
            </div>
        </div>
    )
}