import { IconStarFilled, IconHeart, IconHeartFilled } from '@tabler/icons-react';
import './product-item.scoped.scss'
import { Link } from 'react-router-dom';

export default function ProductItemComponent({ product }) {
    return (
        <div className="product-item">
            <div className="product-image">
                <img src={product.image} alt="" />

                <div className='product-action'>
                    <button className='btn-cart'>Add to cart</button>
                    <button className='btn-buy'>Buy Now</button>
                </div>

                <span className='love-wrap'>
                    <IconHeart />

                    <IconHeartFilled className='heart-red-filled' style={{ color: '#F44336' }} />
                </span>
            </div>
            <div className="product-body">
                <h3>
                    <Link to={'/shop/1'}>{product.name}</Link>
                </h3>
                <h4>{product.price}</h4>
                <div className="recap">
                    <div className="rate">
                        <span>{product.rate}</span>
                        <IconStarFilled style={{ color: '#FFAC33' }} size={12} />
                    </div>
                    <div className='selled'>
                        <span>({product.amountSell}) Terjual</span>
                    </div>
                </div>
            </div>
        </div>
    )
}