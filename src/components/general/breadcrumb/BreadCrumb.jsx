import { NavLink } from "react-router-dom";
import './BreadCrumb.scoped.scss'

export default function BreadCrumb() {

    return (
        <div className="breadcrumb-container">
            <ul className="breadcrumb-list-wrapper">
                <li className="breadcrumb-list-item">
                    <NavLink>Home</NavLink>
                </li>
                <li className="breadcrumb-list-item">
                    <NavLink>Event</NavLink>
                </li>
                <li className="breadcrumb-list-item active">
                    <span>Fashion Week 2023</span>
                </li>
            </ul>
        </div>
    )
}