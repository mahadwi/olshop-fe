import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'
import {default as Section21 } from '../../images/Section2-1.svg'
import {default as Section22} from '../../images/Section2-2.svg'
import {default as Section23} from '../../images/Rectangle 53 (1).svg'
import {default as Section24} from '../../images/Rectangle 54 (1).svg'
import Slider from 'react-slick'
import './section2.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap'
import axios from 'axios'
import { GetBanner } from '../../config/api'

export default class section2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images : '',
    }
  }

  async componentDidMount() {
    try {
     const response = await axios.get(GetBanner)
     {
         const datas = response.data.data[1]
         console.log('home slider : ',datas)
         this.setState({images:datas})
     }
    } catch (error) {
         console.log('error :',error)
    }
   }

  render() {

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
          className={className}
          style={{ ...style, display: "block" }}
          onClick={onClick}
      >
          <Button color='light'><FontAwesomeIcon icon={faChevronRight} /></Button>
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
            <Button color='light'><FontAwesomeIcon  icon={faChevronLeft} /></Button>
          </div>
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

      const { images } = this.state;

    return (
        <div className='slider'>
        <Slider {...settings}>
        <div className='items' >
            <img src={images && images.images[0]} alt="image" />
          </div>
          <div className='items' >
            <img   src={images && images.images[1]} alt="image" />
          </div>
          <div className='items' >
            <img  src={images && images.images[2]} alt="image" />
          </div>
          <div className='items' >
            <img   src={images && images.images[3]} alt="image" />
          </div>
          <div className='items' >
            <img   src={images && images.images[0]} alt="image" />
          </div>
</Slider>
</div>
    )
  }
}
