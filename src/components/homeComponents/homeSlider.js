import React, { Component } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import Slider from 'react-slick';
import pic1 from '../../images/1.jpg'
import pic2 from '../../images/2.jpg'
import pic3 from '../../images/3.jpg'
import test from '../../images/Rectangle 21.svg'
import './homeSlider.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class homeSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: false,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
         <Slider {...settings}>
            <div>
                <img className='pic1'  src={test} alt="image" />
              </div>
              <div>
                <img className='pic1'  src={test} alt="image" />
              </div>
              <div>
                <img className='pic1' src={test} alt="image" />
              </div>
              <div>
                <img className='pic1'  src={test} alt="image" />
              </div>
              <div>
                <img className='pic1'  src={test} alt="image" />
              </div>
    </Slider>
    )
  }
}
