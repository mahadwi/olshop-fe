import React, { Component } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { GetBanner } from '../../config/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import './section2.css';

export default class Section2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: '',
        };
    }

    async componentDidMount() {
        try {
            const response = await axios.get(GetBanner);
            const datas = response.data.data[1];
            console.log('home slider : ', datas);
            this.setState({ images: datas });
        } catch (error) {
            console.log('error :', error);
        }
    }

    render() {
        function SampleNextArrow(props) {
            const { className, style, onClick } = props;
            return (
                <div className={className} style={{ ...style, display: 'block' }} onClick={onClick}>
                    <Button color='light'>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Button>
                </div>
            );
        }

        function SamplePrevArrow(props) {
            const { className, style, onClick } = props;
            return (
                <div className={className} style={{ ...style, display: 'block' }} onClick={onClick}>
                    <Button color='light'>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Button>
                </div>
            );
        }

        const { images } = this.state;

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
            prevArrow: <SamplePrevArrow />,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        };

        return (
            <div className='slider'>
                <Slider {...settings}>
                    {images &&
                        images.images.map((image, index) => (
                            <div className='items' key={index}>
                                <img src={image} alt={`image-${index}`} />
                            </div>
                        ))}
                </Slider>
            </div>
        );
    }
}
