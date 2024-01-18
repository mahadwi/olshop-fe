import { useContext } from 'react';
import './product-description-mobile.scoped.scss'
import { LanguageContext } from '../../../../../context/LanguageContext';
import parse from 'html-react-parser';
import StringUtil from '../../../../../utils/StringUtil'

export default function ProductDescriptionMobileComponent({ productObj }) {
    const { language } = useContext(LanguageContext)
    const suffix = language == 'id' ? '' : '_en';

    return (
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
    )
}
