import { IconChevronCompactLeft, IconChevronCompactRight, IconStarFilled } from '@tabler/icons-react';
import ContainerComponent from '../../general/container/ContainerComponent'
import './section-9.scoped.scss'
import './section-9.css'
import Slider from 'react-slick'
import { useEffect, useState } from 'react';
import Api from '../../../utils/Api';

export default function Section9Component() {

    /**
     * Main State
     * 
     */
    const [reviews, setReviews] = useState([])
    const [stars, setStars] = useState([])

    useEffect(() => {
        loadReviews()
    }, [])

    useEffect(() => {
        let tempStars = []
        reviews.forEach((reviewObj, reviewObjIndex) => {
            tempStars.push({
                stars: [],
                disabled: []
            })
            for (let indexStar = 0; indexStar < reviewObj.rating; indexStar++) {
                tempStars[reviewObjIndex].stars.push(indexStar + 1)
            }

            for (let indexStar = 0; indexStar < 5 - reviewObj.rating; indexStar++) {
                tempStars[reviewObjIndex].disabled.push(indexStar + 1)
            }
        })

        setStars(tempStars)
    }, [reviews])

    const loadReviews = () => {
        Api.get('/review')
            .then((res) => {
                if (res) {
                    setReviews(res.data.data)
                }
            })
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        pauseOnHover: false,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ]
    };

    return (
        <ContainerComponent>
            {
                reviews.length > 0 && stars.length > 0 ?
                    <div className='section-9'>
                        <Slider {...settings}>
                            {
                                reviews.filter((e) => e.is_display).map((reviewObj, reviewObjIndex) => (
                                    <div className="box-wrapper">
                                        <div className='testi' >
                                            <div className='top'>
                                                <div className='profile-pict'>
                                                    <img src={reviewObj.image_url} alt="" />
                                                </div>
                                                <div className='detail'>
                                                    <h3>{reviewObj.name}</h3>
                                                    <div className='stars'>
                                                        {
                                                            stars[reviewObjIndex].stars.map(() => (
                                                                <IconStarFilled className='active' />
                                                            ))
                                                        }

                                                        {
                                                            stars[reviewObjIndex].disabled.map(() => (
                                                                <IconStarFilled />
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='bottom'>
                                                <p>{reviewObj.review}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </Slider>
                    </div> : <></>
            }
        </ContainerComponent>
    )
}

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <button className='btn btn-sm btn-light section-slide-btn' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconChevronCompactRight /></button>
        </div>
    );
}

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <button className='btn btn-sm btn-light section-slide-btn' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateX(-1.3rem)' }}><IconChevronCompactLeft /></button>
        </div>
    );
}