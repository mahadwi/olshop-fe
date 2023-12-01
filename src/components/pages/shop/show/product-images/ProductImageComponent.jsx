import './product-image.scoped.scss'
import { useEffect, useState } from 'react'
export default function ProductImageComponent({ productImages }) {
    const [productBigThumb, setProductBigThumb] = useState(null)
    const [tempProductBigThumb, setTempProductBigThumb] = useState(null)
    const [backgroundPosition, setBackgroundPosition] = useState('0% 0%')

    const handleMouseMove = e => {
        const { left, top, width, height } = e.target.getBoundingClientRect()
        const x = (e.pageX - left) / width * 100
        const y = (e.pageY - top) / height * 100

        setBackgroundPosition(`${x}% ${y}%`)
    }

    useEffect(() => {
        setProductBigThumb(productImages[0])
    }, [productImages])

    return (
        <div className='product-image-wrapper'>
            <div className='inner-product-image'>
                <div className='product-preview'>
                    <figure onMouseMove={handleMouseMove} style={{ backgroundImage: `url(${tempProductBigThumb ? tempProductBigThumb : productBigThumb})`, backgroundPosition: backgroundPosition }}>
                        <img src={tempProductBigThumb ? tempProductBigThumb : productBigThumb} />
                    </figure>
                </div>
                <div className='product-images'>
                    {
                        productImages.map((productImage) => (
                            <div className={`product-image ${productImage == productBigThumb ? 'active' : ''}`} onMouseOver={() => {
                                setTempProductBigThumb(productImage)
                            }} onMouseOut={() => {
                                setTempProductBigThumb(null)
                            }} onClick={() => {
                                setProductBigThumb(productImage)
                            }}>
                                <div className='inner'>
                                    <img src={productImage} alt="" />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}