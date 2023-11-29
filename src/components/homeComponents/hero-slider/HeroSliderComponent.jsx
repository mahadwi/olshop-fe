import React, { Component, useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './hero-slider.scoped.scss'
import './hero-slider.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GetBanner } from '../../../config/api';
import axios from 'axios';
import Flickity from 'react-flickity-component'
import './../../../../node_modules/flickity/dist/flickity.min.css'

export default function HeroSliderComponent() {

    const [heroSliders, setHeroSliders] = useState({})

    const flickityOptions = {
        autoPlay: 5000,
        wrapAround: true,
        friction: 0.7
    }

    useEffect(() => {
        loadSliders()
    }, [])

    const loadSliders = async () => {
        try {
            const response = await axios.get(GetBanner)
            {
                const heroSliderData = response.data.data[0]

                setHeroSliders(heroSliderData)
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    return (
        <div className='hero-slider-container'>

            {/* Sliders */}
            {
                heroSliders.images ?
                    <Flickity
                        className={'carousel'}
                        elementType={'div'}
                        options={flickityOptions}
                        disableImagesLoaded={false}
                        reloadOnUpdate
                        static
                    >
                        {
                            heroSliders.images.map((heroSliderImage) => (
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
                    <h2>NEW SUMMER FALL edition - 2023</h2>
                    <button>Find Here</button>
                </div>
            </div>
            {/* Hero Content */}
        </div>
    )
}
