import Bag1Image from './../../../../../images/temp/f55f82dc90262fa6c63ee79d67c3eda0.png'
import Bag2Image from './../../../../../images/temp/5fb8a0cc92545f8e96dc1dac70ac5fd2.png'
import Bag3Image from './../../../../../images/temp/49127f9d8fe5248ea5159de56a399fd5.png'
import Bag4Image from './../../../../../images/temp/d1afd1a2280acab2cdf3295f62a04797.png'
import './product-image.scoped.scss'
import { useState } from 'react'
export default function ProductImageComponent() {
    const [productBigThumb, setProductBigThumb] = useState(Bag1Image)
    const [tempProductBigThumb, setTempProductBigThumb] = useState(null)
    const [backgroundPosition, setBackgroundPosition] = useState('0% 0%')

    const handleMouseMove = e => {
        const { left, top, width, height } = e.target.getBoundingClientRect()
        const x = (e.pageX - left) / width * 100
        const y = (e.pageY - top) / height * 100

        setBackgroundPosition(`${x}% ${y}%`)
    }

    return (
        <div className='product-image-wrapper'>
            <div className='inner-product-image'>
                <div className='product-preview'>
                    <figure onMouseMove={handleMouseMove} style={{ backgroundImage: `url(${tempProductBigThumb ? tempProductBigThumb : productBigThumb})`, backgroundPosition: backgroundPosition }}>
                        <img src={tempProductBigThumb ? tempProductBigThumb : productBigThumb} />
                    </figure>
                </div>
                <div className='product-images'>
                    <div className={`product-image ${Bag1Image == productBigThumb ? 'active' : ''}`} onMouseOver={() => {
                        setTempProductBigThumb(Bag1Image)
                    }} onMouseOut={() => {
                        setTempProductBigThumb(null)
                    }} onClick={() => {
                        setProductBigThumb(Bag1Image)
                    }}>
                        <div className='inner'>
                            <img src={Bag1Image} alt="" />
                        </div>
                    </div>
                    <div className={`product-image ${Bag2Image == productBigThumb ? 'active' : ''}`} onMouseOver={() => {
                        setTempProductBigThumb(Bag2Image)
                    }} onMouseOut={() => {
                        setTempProductBigThumb(null)
                    }} onClick={() => {
                        setProductBigThumb(Bag2Image)
                    }}>
                        <div className='inner'>
                            <img src={Bag2Image} alt="" />
                        </div>
                    </div>
                    <div className={`product-image ${Bag3Image == productBigThumb ? 'active' : ''}`} onMouseOver={() => {
                        setTempProductBigThumb(Bag3Image)
                    }} onMouseOut={() => {
                        setTempProductBigThumb(null)
                    }} onClick={() => {
                        setProductBigThumb(Bag3Image)
                    }}>
                        <div className='inner'>
                            <img src={Bag3Image} alt="" />
                        </div>
                    </div>
                    <div className={`product-image ${Bag4Image == productBigThumb ? 'active' : ''}`} onMouseOver={() => {
                        setTempProductBigThumb(Bag4Image)
                    }} onMouseOut={() => {
                        setTempProductBigThumb(null)
                    }} onClick={() => {
                        setProductBigThumb(Bag4Image)
                    }}>
                        <div className='inner'>
                            <img src={Bag4Image} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}