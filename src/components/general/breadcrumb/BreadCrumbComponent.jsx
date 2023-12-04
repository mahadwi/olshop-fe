import { NavLink } from "react-router-dom";
import './BreadCrumb.scoped.scss'

export default function BreadCrumbComponent({ lists }) {

    return (
        <div className="breadcrumb-container">
            <ul className="breadcrumb-list-wrapper">
                {
                    lists.map((list) => (
                        <li className={`breadcrumb-list-item ${!list.url ? 'active' : ''}`}>
                            {
                                list.url ?
                                    <NavLink to={list.url}>{list.label}</NavLink>
                                    : <span>{list.label}</span>
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}