import { useEffect, useState } from 'react'
import './title-book.scoped.scss'
import './title-book.css'
import axios from 'axios'
import { GetBanner } from '../../../config/api'
import ContainerComponent from '../../general/container/ContainerComponent'
import Slider from 'react-slick'
import { IconTriangleFilled } from '@tabler/icons-react';

export default function TitleBookSectionComponent() {

    const [images, setImages] = useState([])

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

    useEffect(() => {
        loadImages()
    }, [])

    const loadImages = async () => {
        try {
            const response = await axios.get(GetBanner)
            {
                const datas = response.data.data[1].images

                setImages(datas)
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    return (
        <div className="title-book-section">
            <ContainerComponent>
                <div className='title-section'>
                    <h2>Look Book</h2>
                </div>
                <div className='title-book-sliders'>
                    <Slider {...settings}>
                        {images.map((image) => (
                            <div className='title-book-slider-item'>
                                <img src={image} alt="" />
                            </div>
                        ))}
                    </Slider>
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

