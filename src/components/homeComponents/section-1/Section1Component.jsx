import React, { Component, useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './section-1.scoped.scss'
import './section-1.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GetBanner } from '../../../config/api';
import axios from 'axios';
import Flickity from 'react-flickity-component'
import './../../../../node_modules/flickity/dist/flickity.min.css'
import { Link } from 'react-router-dom';

export default function Section1Component({ item }) {

    const flickityOptions = {
        autoPlay: 5000,
        wrapAround: true,
        friction: 0.7
    }

    return (
        <div className='hero-slider-container'>

            {/* Sliders */}
            {
                item.images ?
                    <Flickity
                        className={'carousel'}
                        elementType={'div'}
                        options={flickityOptions}
                        disableImagesLoaded={false}
                        reloadOnUpdate
                        static
                    >
                        {
                            item.images.map((heroSliderImage) => (
                                <div className='hero-slider-item'>
                                    <img src={heroSliderImage} />
                                </div>
                            ))
                        }
                    </Flickity> : <></>
            }
            {/* Sliders */}

            {/* Hero Content */}
            <div className='hero-content'>
                <div className='inner'>
                    <h2>{item.title}</h2>
                    <Link to={'/shop?sort_option=is_new_arrival'}>Find Here</Link>
                </div>
            </div>
            {/* Hero Content */}
        </div>
    )
}
