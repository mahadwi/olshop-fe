import { useContext } from 'react';
import { IconStarFilled, IconHeart, IconHeartFilled, IconShare } from '@tabler/icons-react';
import './product-description.scoped.scss'
import parse from 'html-react-parser';
import { LanguageContext } from '../../../../../context/LanguageContext';
import { CurrencyContext } from '../../../../../context/CurrencyContext';
import StringUtil from '../../../../../utils/StringUtil'
import { useTranslation } from 'react-i18next';

export default function ProductDescriptionComponent({ productObj }) {
    /**
     * Hooks
     * 
     */
    const { t } = useTranslation();

    /**
     * Context
     * 
     */
    const { language } = useContext(LanguageContext)
    const suffix = language == 'id' ? '' : '_en';
    const { currency } = useContext(CurrencyContext)

    /**
     * Func
     * 
     */
    const formater = new Intl.NumberFormat(currency == 'id' ? 'id-ID' : 'en-EN', { style: 'currency', currency: currency == 'id' ? 'IDR' : 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 })

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
                        <span className="text-sold">{t('sold')}</span>
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
                        <span className='wishlist-text'>Wishlist</span>
                    </div>
                </div>
                <div className='product-price'>{formater.format(currency == 'id' ? productObj.sale_price : productObj.sale_usd)}</div>
                <div className='product-description-body'>
                    <div className='product-detail'>
                        <h3 className='product-detail-title'>{t('productdetail')}</h3>
                        <p className='product-description-text'>{parse(productObj.description ? productObj.description : '')}</p>
                        <ul className='product-list-details'>
                            <li><strong>Brand</strong>: {productObj.brand}</li>
                            <li><strong>{t('category')}</strong>: {productObj.category}</li>
                            <li><strong>{t('weight')}</strong>: {StringUtil.numberingWithDotFormat(Math.ceil(productObj.weight))} gr</li>
                            <li><strong>{t('height')}</strong>: {productObj.height}cm</li>
                            <li><strong>{t('width')}</strong>: {productObj.width}cm</li>
                            <li><strong>{t('length')}</strong>: {productObj.length}cm</li>
                            <li><strong>{t('color')}</strong>: {productObj.color}</li>
                            <li><strong>{t('condition')}</strong>: {productObj.condition}</li>
                        </ul>
                        <h3 className='product-detail-title'>{t('history')}</h3>
                        <p className='product-description-text'>{parse(productObj['history' + suffix] ? productObj['history' + suffix] : '')}</p>
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
