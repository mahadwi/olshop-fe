import { IconStarFilled, IconHeart } from '@tabler/icons-react';
import './product-description.scoped.scss'

export default function ProductDescriptionComponent() {
    return (
        <div className="product-description-wrapper">
            <div className="inner-product-description">
                <h2 className='product-name'>Prada Re-Edition 2005 Re-Nylon  mini bag</h2>
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
                            <IconHeart size={15} style={{ color: '#F24E1E' }} />
                        </div>
                        <span className='wishlist-text'>Whislist</span>
                    </div>
                </div>
                <div className='product-description-body'>
                    <div className='product-detail'>
                        <h3 className='product-detail-title'>Product Detail</h3>
                        <p className='product-description-text'>A new interpretation of an iconic Prada style, the Re-Edition 2000 mini-bag is made of innovative Re-Nylon, produced from recycled, purified plastic trash collected in the ocean, fishing nets, and textile waste fibers. The accessory with zipper closure and woven tape handle is decorated with the iconic enameled metal triangle logo.</p>
                        <ul className='product-list-details'>
                            <li>roduct code: 1NE515_RDH0_F0F24</li>
                            <li>Zipper closure</li>
                            <li>Enameled metal triangle logo</li>
                            <li>Woven tape handle</li>
                            <li>Logo-print Re-Nylon lining</li>
                            <li>Height: 17cm</li>
                            <li>Width: 22cm</li>
                            <li>Length: 6cm</li>
                            <li>Imported</li>
                        </ul>
                    </div>
                    <div className='product-materials'>
                        <h3 className='product-material-title'>Materials</h3>
                        <p className='product-material-text'>Fabric</p>
                    </div>
                </div>
            </div>
        </div>
    )
}