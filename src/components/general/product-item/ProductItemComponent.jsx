import { IconStarFilled, IconHeart, IconHeartFilled } from '@tabler/icons-react';
import './product-item.scoped.scss'
import { Link } from 'react-router-dom';
import NoPhotoProduct from './../../../images/product-item/no-photo-product.png'
import StringUtil from '../../../utils/StringUtil';

export default function ProductItemComponent({ product, className }) {
    return (
        <div className={`product-item ${className ? className : ''}`}>
            <div className="product-image">
                <img src={product.images.length > 0 ? product.images[0] : NoPhotoProduct} alt="" />

                <div className='product-action'>
                    <button className='btn-cart'>Add to cart</button>
                    <button className='btn-buy'>Buy Now</button>
                </div>

                <span className='love-wrap'>
                    {
                        product.is_wishlist ?
                            <IconHeartFilled style={{ color: '#F44336' }} />
                            :
                            <IconHeart />
                    }

                    <IconHeartFilled className='heart-red-filled' style={{ color: '#F44336' }} />
                </span>
            </div>
            <div className="product-body">
                <h3>
                    <Link to={'/shop/' + product.id}>{product.name}</Link>
                </h3>
                <h4>{StringUtil.rupiahFormat(`${product.sale_price}`)}</h4>
                <div className="recap">
                    <div className="rate">
                        <span>{5}</span>
                        <IconStarFilled style={{ color: '#FFAC33' }} size={12} />
                    </div>
                    <div className='selled'>
                        <span>({10}) Terjual</span>
                    </div>
                </div>
            </div>
        </div>
    )
}