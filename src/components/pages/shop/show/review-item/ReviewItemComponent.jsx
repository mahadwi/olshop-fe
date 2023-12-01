import PhotoProfile from './../../../../../images/temp/a67a2f7eda9701915477cc21beb6cb0d.png'
import { IconDotsVertical, IconStarFilled, IconThumbUp } from '@tabler/icons-react';
import Bag1Image from './../../../../../images/temp/f55f82dc90262fa6c63ee79d67c3eda0.png'
import Bag2Image from './../../../../../images/temp/5fb8a0cc92545f8e96dc1dac70ac5fd2.png'
import './review-item.scoped.scss'

export default function ReviewItemComponent() {
    return (
        <div className="review-item">
            <div className="inner">
                <div className="top">
                    <div className="left">
                        <div className="photo-wrap">
                            <img src={PhotoProfile} alt="" />
                        </div>
                        <div className="profile-wrap">
                            <h3>Hiroshi Takamoto</h3>
                            <div className='stars'>

                                <IconStarFilled size={15} style={{ color: '#FFAC33' }} />
                                <IconStarFilled size={15} style={{ color: '#FFAC33' }} />
                                <IconStarFilled size={15} style={{ color: '#FFAC33' }} />
                                <IconStarFilled size={15} style={{ color: '#FFAC33' }} />
                                <IconStarFilled size={15} style={{ color: '#CEC9C1' }} />
                            </div>
                            <span className='date'>20-01-2023</span>
                        </div>
                    </div>
                    <div className="right">
                        <div className="other-wrap">
                            <IconDotsVertical size={15} style={{ color: '#333333' }} />
                        </div>
                    </div>
                </div>
                <div className="body">
                    <p>The product is really very satisfying and really real as in the picture, and the certificate attached is also very complete</p>
                </div>
                <div className="images">
                    <img src={Bag1Image} alt="" />
                    <img src={Bag2Image} alt="" />
                </div>
                <div className="actions">
                    <IconThumbUp size={20} style={{ color: '#C4C4C4' }} />
                    <span>3</span>
                </div>
            </div>
        </div>
    )
}