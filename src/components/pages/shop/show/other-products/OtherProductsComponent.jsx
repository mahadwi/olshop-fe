import { IconChevronRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom'
import './other-products.scoped.scss'
import ProductItemComponent from '../../../../general/product-item/ProductItemComponent';

export default function OtherProductsComponent({ productsByCategory, user }) {

    return (
        <div className='other-products-section'>
            <div className='title-section'>
                <h2 className='title'>Other Product</h2>
                <Link className='view-more'>
                    <span>View All</span>
                    <IconChevronRight style={{ color: '#FFAC33' }} />
                </Link>
            </div>
            <hr />
            <div className='products'>
                {
                    productsByCategory.map((product) => (
                        <ProductItemComponent blur={!user} product={product} />
                    ))
                }
            </div>
        </div>
    )
}