import { IconChevronCompactLeft, IconChevronCompactRight, IconStarFilled } from '@tabler/icons-react';
import ContainerComponent from '../../general/container/ContainerComponent'
import './section-9.scoped.scss'
import './section-9.css'
import Slider from 'react-slick'

export default function Section9Component() {

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
            <div className='section-9'>
                <Slider {...settings}>
                    <div className="box-wrapper">
                        <div className='testi' >
                            <div className='top'>
                                <div className='profile-pict'>
                                    <img src={require('./../../../images/testi-pp.png')} alt="" />
                                </div>
                                <div className='detail'>
                                    <h3>Hiroshi Takamoto</h3>
                                    <div className='stars'>
                                        <IconStarFilled className='active' />
                                        <IconStarFilled className='active' />
                                        <IconStarFilled className='active' />
                                        <IconStarFilled className='active' />
                                        <IconStarFilled />
                                    </div>
                                </div>
                            </div>
                            <div className='bottom'>
                                <p>I really like shopping here, because
                                    the goods offered are very high quality
                                    with extraordinary service</p>
                            </div>
                        </div>
                    </div>
                    <div className="box-wrapper">
                        <div className='testi' >
                            <div className='top'>
                                <div className='profile-pict'>
                                    <img src={require('./../../../images/testi-pp.png')} alt="" />
                                </div>
                                <div className='detail'>
                                    <h3>Hiroshi Takamoto</h3>
                                    <div className='stars'>
                                        <IconStarFilled className='active' />
                                        <IconStarFilled className='active' />
                                        <IconStarFilled className='active' />
                                        <IconStarFilled className='active' />
                                        <IconStarFilled />
                                    </div>
                                </div>
                            </div>
                            <div className='bottom'>
                                <p>I really like shopping here, because
                                    the goods offered are very high quality
                                    with extraordinary service</p>
                            </div>
                        </div>
                    </div>
                    <div className="box-wrapper">
                        <div className='testi' >
                            <div className='top'>
                                <div className='profile-pict'>
                                    <img src={require('./../../../images/testi-pp.png')} alt="" />
                                </div>
                                <div className='detail'>
                                    <h3>Hiroshi Takamoto</h3>
                                    <div className='stars'>
                                        <IconStarFilled className='active' />
                                        <IconStarFilled className='active' />
                                        <IconStarFilled className='active' />
                                        <IconStarFilled className='active' />
                                        <IconStarFilled />
                                    </div>
                                </div>
                            </div>
                            <div className='bottom'>
                                <p>I really like shopping here, because
                                    the goods offered are very high quality
                                    with extraordinary service</p>
                            </div>
                        </div>
                    </div>
                    <div className="box-wrapper">
                        <div className='testi' >
                            <div className='top'>
                                <div className='profile-pict'>
                                    <img src={require('./../../../images/testi-pp.png')} alt="" />
                                </div>
                                <div className='detail'>
                                    <h3>Hiroshi Takamoto</h3>
                                    <div className='stars'>
                                        <IconStarFilled className='active' />
                                        <IconStarFilled className='active' />
                                        <IconStarFilled className='active' />
                                        <IconStarFilled className='active' />
                                        <IconStarFilled />
                                    </div>
                                </div>
                            </div>
                            <div className='bottom'>
                                <p>I really like shopping here, because
                                    the goods offered are very high quality
                                    with extraordinary service</p>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
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