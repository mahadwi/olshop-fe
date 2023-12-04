import './banner.scoped.scss'
import './banner.css'
import Flickity from 'react-flickity-component'
import ContainerComponent from '../../../../general/container/ContainerComponent'

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
                            bannerObj.images.map((bannerImage) => (
                                <div className='hero-slider-item'>
                                    <div className='content'>
                                        <div className='bg-image' style={{ backgroundImage: `url(${bannerImage})` }}>

                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Flickity> : <></>
            }

            <div className="content-banner-text">
                <ContainerComponent>
                    <div className="inner">
                        <h1>{bannerObj.title}</h1>

                        <p>{bannerObj.description}</p>
                    </div>
                </ContainerComponent>
            </div>
        </div>
    )
}