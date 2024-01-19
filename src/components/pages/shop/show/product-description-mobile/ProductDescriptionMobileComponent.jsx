import { useContext } from 'react';
import './product-description-mobile.scoped.scss'
import { LanguageContext } from '../../../../../context/LanguageContext';
import parse from 'html-react-parser';
import StringUtil from '../../../../../utils/StringUtil'
import { useTranslation } from 'react-i18next';

export default function ProductDescriptionMobileComponent({ productObj }) {

    /**
     * Hooks
     * 
     */
    const { t } = useTranslation();

    const { language } = useContext(LanguageContext)
    const suffix = language == 'id' ? '' : '_en';

    return (
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
    )
}
