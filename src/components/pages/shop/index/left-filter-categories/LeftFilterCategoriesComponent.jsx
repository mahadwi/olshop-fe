import { Link } from "react-router-dom"
import { IconMinus } from '@tabler/icons-react';
import './left-filter-categories.scoped.scss'
import Checkbox from "react-custom-checkbox";
import { IconArrowRight } from '@tabler/icons-react';

export default function LeftFilterCategoriesComponent() {

    const options = ['Sling Bag', 'Mini Bag', 'Hand Bag', 'Tote Bag', 'Backpack']

    return (
        <div className="left-filter-categories">
            <div className="inner-left-filter-categories">
                <div className="sec-title">
                    <h3>Categories</h3>
                    <IconMinus color="#111" size={19} stroke={1.5} />
                </div>
                <ul>
                    {
                        options.map((option) => (
                            <li>
                                <Checkbox
                                    icon={<div style={{ backgroundColor: "#E4A951", borderRadius: 5, padding: 5 }} />}
                                    borderWidth={1}
                                    borderRadius={3}
                                    borderColor={'#DDD'}
                                />
                                <span>{option}</span>
                            </li>
                        ))
                    }
                </ul>
                <Link>
                    <span>More</span>
                    <IconArrowRight color="#151B4F" size={12} />
                </Link>
            </div>
        </div>
    )
}