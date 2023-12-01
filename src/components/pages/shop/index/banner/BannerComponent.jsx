import './banner.scoped.scss'
import './banner.css'
import Flickity from 'react-flickity-component'

export default function BannerComponent({ banners }) {
    const flickityOptions = {
        autoPlay: 4500,
        wrapAround: true,
        friction: 0.7,
        draggable: false
    }

    return (
        <div className='banner-component'>
            <Flickity
                options={flickityOptions}
            >
                {
                    banners.map((banner) => (
                        <div className='hero-slider-item'>
                            <img src={banner} />
                        </div>
                    ))
                }
            </Flickity>
        </div>
    )
}