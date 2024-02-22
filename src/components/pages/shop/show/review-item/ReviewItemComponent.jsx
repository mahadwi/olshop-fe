import PhotoProfile from './../../../../../images/temp/a67a2f7eda9701915477cc21beb6cb0d.png'
import { IconDotsVertical, IconStarFilled, IconThumbUp } from '@tabler/icons-react';
import Bag1Image from './../../../../../images/temp/f55f82dc90262fa6c63ee79d67c3eda0.png'
import Bag2Image from './../../../../../images/temp/5fb8a0cc92545f8e96dc1dac70ac5fd2.png'
import './review-item.scoped.scss'

export default function ReviewItemComponent({ review }) {
    const stars = [];

    for (let i = 0; i < review.rating; i++) {
        stars.push(
            <IconStarFilled size={15} style={{ color: '#FFAC33' }} />
        );
    }
    for (let i = 0; i < 5 - review.rating; i++) {
        stars.push(
            <IconStarFilled size={15} style={{ color: '#CEC9C1' }} />
        );
    }

    return (
        <div className="review-item">
            <div className="inner">
                <div className="top">
                    <div className="left">
                        <div className="photo-wrap">
                            <img src={review.user.image} alt="" />
                        </div>
                        <div className="profile-wrap">
                            <h3>{ review.user.name }</h3>
                            <div className='stars'>
                                {stars}
                            </div>
                            <span className='date'>{ review.date }</span>
                        </div>
                    </div>
                    <div className="right">
                        <div className="other-wrap">
                            <IconDotsVertical size={15} style={{ color: '#333333' }} />
                        </div>
                    </div>
                </div>
                <div className="body">
                    <p>{ review.review }</p>
                </div>
                <div className="images">
                    {
                        review.images.map((u) => {
                            return (
                                <img src={u} alt="" />
                            )
                        })
                    }
                </div>
                <div className="actions">
                    <IconThumbUp size={20} style={{ color: '#C4C4C4' }} />
                    <span>3</span>
                </div>
            </div>
        </div>
    )
}
