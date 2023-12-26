import { IconStarFilled, IconHeart, IconHeartFilled, IconShare } from '@tabler/icons-react';
import './product-description.scoped.scss'
import parse from 'html-react-parser';

export default function ProductDescriptionComponent({ productObj }) {
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
                <div className='product-price'>Rp. {productObj.sale_price}</div>
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
            </div>
        </div>
    )
}
