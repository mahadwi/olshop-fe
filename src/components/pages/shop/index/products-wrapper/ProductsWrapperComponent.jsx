import { useEffect, useState } from 'react'
import ProductItemComponent from '../product-item/ProductItemComponent'
import ProductImage1 from './../../../../../images/pages/shop/index/products/product-1.png'
import './products-wrapper.scoped.scss'
import PaginationComponent from '../pagination/PaginationComponent'

export default function ProductsWrapperComponent({ products }) {
    return (
        <div className="products-wrapper">
            <div className='inner-products-wrapper'>
                {
                    products.map((product) => (
                        <ProductItemComponent product={product} />
                    ))
                }
            </div>
            <PaginationComponent />
        </div>
    )
}