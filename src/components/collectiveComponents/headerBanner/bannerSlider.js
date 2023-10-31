import React, { Component } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {default as CollectiveSlider} from '../../../images/header collective.png'
export default class bannerSlider extends Component {
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
        <div style={{marginLeft:'8%', marginRight:'8%'}}>
        <Slider {...settings}>
        <div>
            <img style={{width:'80%'}}  src={CollectiveSlider} alt="image" />
          </div>
          <div>
            <img style={{width:'80%'}}   src={CollectiveSlider} alt="image" />
          </div>
          <div>
            <img style={{width:'80%'}}  src={CollectiveSlider} alt="image" />
          </div>
          <div>
            <img style={{width:'80%'}}  src={CollectiveSlider} alt="image" />
          </div>
          <div>
            <img style={{width:'80%'}}   src={CollectiveSlider} alt="image" />
          </div>
</Slider>
</div>
    )
  }
}
