import { useEffect, useState } from 'react'
import './banner.scoped.scss'
import './banner.css'
import Flickity from 'react-flickity-component'
import imageBanner1 from './../../../../../images/pages/shop/index/banners/1.jpeg'

export default function BannerComponent() {
    const [images, setImages] = useState([])
    const flickityOptions = {
        autoPlay: 4500,
        wrapAround: true,
        friction: 0.7,
        draggable: false
    }

    useEffect(() => {
        loadImages()
    }, [])

    const loadImages = () => {
        setImages([imageBanner1, imageBanner1, imageBanner1])
    }

    return (
        <div className='banner-component'>
            <Flickity
                options={flickityOptions}
            >
                {
                    images.map((image) => (
                        <div className='hero-slider-item'>
                            <img src={image} />
                        </div>
                    ))
                }
            </Flickity>
        </div>
    )
}