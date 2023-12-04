import './banner.scoped.scss'
import './banner.css'
import TempBannerImage from './../../../../../images/temp/65c5d8522420da16520c79a625a196bc.png'
import Flickity from 'react-flickity-component'
import ContainerComponent from '../../../../general/container/ContainerComponent'

export default function BannerComponent() {
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
                <div className='hero-slider-item'>
                    <div className='content'>
                        <div className='bg-image' style={{ backgroundImage: `url(${TempBannerImage})` }}>

                        </div>
                        <ContainerComponent>
                            <div className="inner">
                                <h1>VERSACE</h1>
                                <h3>GRECA GODDESS BAG</h3>

                                <p>The latest addition to the line of bags and accessories defined by the House’s Greca signifier, a classical symbol of infinity an unity is a signature of the House of Versace</p>
                            </div>
                        </ContainerComponent>
                    </div>
                </div>
                <div className='hero-slider-item'>
                    <div className='content'>
                        <div className='bg-image' style={{ backgroundImage: `url(${TempBannerImage})` }}>

                        </div>
                        <ContainerComponent>
                            <div className="inner">
                                <h1>VERSACE</h1>
                                <h3>GRECA GODDESS BAG</h3>

                                <p>The latest addition to the line of bags and accessories defined by the House’s Greca signifier, a classical symbol of infinity an unity is a signature of the House of Versace</p>
                            </div>
                        </ContainerComponent>
                    </div>
                </div>
            </Flickity>
        </div>
    )
}