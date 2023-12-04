import './banner.scoped.scss'
import './banner.css'
import Flickity from 'react-flickity-component'

export default function BannerComponent({ bannerObj }) {
    const flickityOptions = {
        autoPlay: 4500,
        wrapAround: true,
        friction: 0.7,
        draggable: false
    }

    return (
        <div className='banner-component'>
            {
                bannerObj.images ?
                    <Flickity
                        options={flickityOptions}
                    >
                        {
                            bannerObj.images.map((banner) => (
                                <div className='hero-slider-item'>
                                    <img src={banner} />
                                </div>
                            ))
                        }
                    </Flickity> : <></>
            }
            <h2>{bannerObj.title}</h2>

        </div>
    )
}