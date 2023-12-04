import { useEffect, useState } from 'react'
import './section-2.scoped.scss'
import './section-2.css'
import axios from 'axios'
import { GetBanner } from '../../../config/api'
import ContainerComponent from '../../general/container/ContainerComponent'
import Slider from 'react-slick'
import { IconTriangleFilled } from '@tabler/icons-react';
import { Link } from 'react-router-dom'

export default function Section2Component({ item }) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        pauseOnHover: false,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div className="title-book-section">
            <ContainerComponent>
                <div className='title-section'>
                    <h2>Look Book</h2>
                </div>
                <div className='title-book-sliders'>
                    {
                        item.images ?
                            <Slider {...settings}>
                                {item.images.map((image) => (
                                    <div className='title-book-slider-item'>
                                        <img src={image} alt="" />
                                    </div>
                                ))}
                            </Slider> : <></>
                    }
                </div>
                <div className="description-component">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>

                    <Link to={'/shop'}>Learn More</Link>
                </div>
            </ContainerComponent>
        </div>
    )
}

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;

    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <button style={{ background: 'transparent', border: '0px', outline: 'none', transform: 'rotate(-90deg) translateY(-.8rem)' }}><IconTriangleFilled style={{ color: '#333333' }} width={20} /></button>
        </div>
    );
}

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;

    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <button style={{ background: 'transparent', border: '0px', outline: 'none', transform: 'rotate(90deg)' }}><IconTriangleFilled style={{ color: '#333333' }} width={20} /></button>
        </div>
    );
}

