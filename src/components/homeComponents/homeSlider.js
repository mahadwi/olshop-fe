import React, { Component } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import pic1 from '../../images/1.jpg'
import pic2 from '../../images/2.jpg'
import pic3 from '../../images/3.jpg'
import './homeSlider.css'
import { Button } from 'react-bootstrap';

export default class homeSlider extends Component {
  render() {
    return (
      <div>
         <Carousel autoPlay interval="3000" transitionTime="3000" showThumbs={false}>
                <div>
                    <img src={pic1} />
                </div>
                <div>
                    <img src={pic2} />
                </div>
                <div>
                    <img src={pic3} />
                </div>
            </Carousel>
      </div>
    )
  }
}
