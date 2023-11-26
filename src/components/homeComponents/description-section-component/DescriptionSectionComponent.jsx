import { Link } from "react-router-dom";
import './description.scoped.scss'

export default function DescriptionSectionComponent() {
    return (
        <div className="description-component">
            <h2>the return of the winter edition of the series - 2023</h2>
            <p>the thing he had been waiting for so long finally returned in the present</p>

            <Link>Learn More</Link>
        </div>
    )
}