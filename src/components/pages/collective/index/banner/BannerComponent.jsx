import { useContext } from 'react';
import './banner.scoped.scss'
import './banner.css'
import Flickity from 'react-flickity-component'
import ContainerComponent from '../../../../general/container/ContainerComponent'
import { LanguageContext } from '../../../../../context/LanguageContext';

export default function BannerComponent({ bannerObj }) {
    const { language } = useContext(LanguageContext)
    const suffix = language == 'id' ? '' : '_en';

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
                        <h1>{bannerObj['title'+suffix]}</h1>

                        <p>{bannerObj['description'+suffix]}</p>
                    </div>
                </ContainerComponent>
            </div>
        </div>
    )
}
