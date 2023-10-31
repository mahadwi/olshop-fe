import React, { Component } from 'react'
import Slider from 'react-slick'
import {default as Section9} from '../../../images/comment.png'
import './section9.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap'

export default class section9 extends Component {
  render() {

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
          className={className}
          style={{ ...style, display: "block" }}
          onClick={onClick}
      >
          <Button color='light'><FontAwesomeIcon icon={faCaretRight} /></Button>
      </div>
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block"}}
            onClick={onClick}
          >
            <Button color='light'><FontAwesomeIcon  icon={faCaretLeft} /></Button>
          </div>
        );
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
        prevArrow: <SamplePrevArrow />
      };
    return (
        <div className='section9slider'>
        <Slider {...settings}>
        <div className='items' >
            <img src={Section9} alt="image" />
          </div>
          <div className='items' >
            <img   src={Section9} alt="image" />
          </div>
          <div className='items' >
            <img  src={Section9} alt="image" />
          </div>
          <div className='items' >
            <img   src={Section9} alt="image" />
          </div>
          <div className='items' >
            <img   src={Section9} alt="image" />
          </div>
</Slider>
</div>
    )
  }
}
