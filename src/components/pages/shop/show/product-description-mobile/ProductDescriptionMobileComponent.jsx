import './product-description-mobile.scoped.scss'
import parse from 'html-react-parser';

export default function ProductDescriptionMobileComponent({ productObj }) {
    return (
    <div className='product-description-body'>
        <div className='product-detail'>
            <h3 className='product-detail-title'>Product Detail</h3>
            <p className='product-description-text'>{parse(productObj.description ? productObj.description : '')}</p>
            {/* <ul className='product-list-details'>
                <li>roduct code: 1NE515_RDH0_F0F24</li>
                <li>Zipper closure</li>
                <li>Enameled metal triangle logo</li>
                <li>Woven tape handle</li>
                <li>Logo-print Re-Nylon lining</li>
                <li>Height: 17cm</li>
                <li>Width: 22cm</li>
                <li>Length: 6cm</li>
                <li>Imported</li>
            </ul> */}
        </div>
        {/* <div className='product-materials'>
            <h3 className='product-material-title'>Materials</h3>
            <p className='product-material-text'>Fabric</p>
        </div> */}
    </div>
    )
}
