import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'
import {default as Section21 } from '../../images/Section2-1.svg'
import {default as Section22} from '../../images/Section2-2.svg'
import {default as Section23} from '../../images/Rectangle 53 (1).svg'
import {default as Section24} from '../../images/Rectangle 54 (1).svg'
import Slider from 'react-slick'
import './section2.css'

export default class section2 extends Component {

  render() {

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "black" }}
            onClick={onClick}
          />
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "black" }}
            onClick={onClick}
          />
        );
      }

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
        <div className='slider'>
        <Slider {...settings}>
        <div className='items' >
            <img src={Section21} alt="image" />
          </div>
          <div className='items' >
            <img   src={Section22} alt="image" />
          </div>
          <div className='items' >
            <img  src={Section23} alt="image" />
          </div>
          <div className='items' >
            <img   src={Section24} alt="image" />
          </div>
          <div className='items' >
            <img   src={Section23} alt="image" />
          </div>
</Slider>
</div>
    )
  }
}
