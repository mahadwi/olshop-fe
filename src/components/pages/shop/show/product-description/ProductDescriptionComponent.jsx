import { useContext } from 'react';
import { IconStarFilled, IconHeart, IconHeartFilled, IconShare } from '@tabler/icons-react';
import './product-description.scoped.scss'
import parse from 'html-react-parser';
import { LanguageContext } from '../../../../../context/LanguageContext';
import StringUtil from '../../../../../utils/StringUtil'

export default function ProductDescriptionComponent({ productObj }) {
    const { language } = useContext(LanguageContext)
    const suffix = language == 'id' ? '' : '_en';
    const formater = new Intl.NumberFormat( language == 'id' ? 'id-ID' : 'en-EN', { style: 'currency', currency: language == 'id' ? 'IDR' : 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 })

    return (
        <div className="product-description-wrapper">
            <div className="inner-product-description">
                <div className='product-name-wrapper'>
                    <h2 className='product-name'>{productObj.name}</h2>
                    <div className='product-name-icons'>
                      <button><IconHeart /></button>
                      <button><IconShare /></button>
                    </div>
                </div>
                <div className="actions-wrap">
                    <div className="sold">
                        <span className="text-sold">Sold</span>
                        <span className="amount-sold">(1)</span>
                    </div>
                    <div className="rate">
                        <span className="amount-rate">5.0</span>
                        <div className="stars">
                            <IconStarFilled size={15} style={{ color: '#FFAC33' }} />
                            <IconStarFilled size={15} style={{ color: '#FFAC33' }} />
                            <IconStarFilled size={15} style={{ color: '#FFAC33' }} />
                            <IconStarFilled size={15} style={{ color: '#FFAC33' }} />
                            <IconStarFilled size={15} style={{ color: '#FFAC33' }} />
                        </div>
                    </div>
                    <div className='wishlists'>
                        <div className='wishlist-button'>
                            {
                                productObj.is_wishlist ?
                                    <IconHeartFilled size={15} style={{ color: '#F24E1E' }} />
                                    :
                                    <IconHeart size={15} style={{ color: '#F24E1E' }} />
                            }
                        </div>
                        <span className='wishlist-text'>Whislist</span>
                    </div>
                </div>
                <div className='product-price'>{formater.format(language == 'id' ? productObj.sale_price : productObj.sale_usd )}</div>
                <div className='product-description-body'>
                    <div className='product-detail'>
                        <h3 className='product-detail-title'>Product Detail</h3>
                        <p className='product-description-text'>{parse(productObj.description ? productObj.description : '')}</p>
                        <ul className='product-list-details'>
                            <li><strong>Brand</strong>: {productObj.brand}</li>
                            <li><strong>Category</strong>: {productObj.category}</li>
                            <li><strong>Weight</strong>: {StringUtil.numberingWithDotFormat(Math.ceil(productObj.weight))} gr</li>
                            <li><strong>Height</strong>: {productObj.height}cm</li>
                            <li><strong>Width</strong>: {productObj.width}cm</li>
                            <li><strong>Length</strong>: {productObj.length}cm</li>
                            <li><strong>Color</strong>: {productObj.color}</li>
                            <li><strong>Condition</strong>: {productObj.condition}</li>
                        </ul>
                        <h3 className='product-detail-title'>History</h3>
                        <p className='product-description-text'>{parse(productObj['history'+suffix] ? productObj['history'+suffix] : '')}</p>
                    </div>
                    {/* <div className='product-materials'>
                        <h3 className='product-material-title'>Materials</h3>
                        <p className='product-material-text'>Fabric</p>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
