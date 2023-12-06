import { IconMapPin, IconSquareCheck } from "@tabler/icons-react";
import './card.scoped.scss'

export default function CardComponent() {
    return (
        <div className="card-section">
            <div className="card-component">
                <div className="card-item">
                    <IconMapPin />
                    <h3>PACKAGE TRACKING</h3>
                    <p>Once your package has been shipped, we will send you a notification with your tracking number.</p>
                </div>
            </div>
            <div className="card-component">
                <div className="card-item">
                    <IconSquareCheck />
                    <h3>INSURANCE</h3>
                    <p>You may choose whether or not you want to add insurance to your delivery. The cost of insurance will be calculated according to the value of your order on the checkout page.</p>
                </div>
            </div>
        </div>
    )
}