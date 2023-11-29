import { IconChevronRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom'
import './other-products.scoped.scss'
import ProductItemComponent from '../product-item/ProductItemComponent';
import ProductImage1 from './../../../../../images/pages/shop/index/products/product-1.png'

export default function OtherProductsComponent() {

    const product = {
        image: ProductImage1,
        name: 'Prada Arqué leather shoulder bag',
        price: 'Rp. 15.000.000,00',
        rate: '5.0',
        amountSell: 10
    }

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
                <ProductItemComponent product={product} />
                <ProductItemComponent product={product} />
                <ProductItemComponent product={product} />
                <ProductItemComponent product={product} />
                <ProductItemComponent product={product} />
                <ProductItemComponent product={product} />
            </div>
        </div>
    )
}