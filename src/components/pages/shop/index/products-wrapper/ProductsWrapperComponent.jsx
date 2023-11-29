import { useEffect, useState } from 'react'
import ProductItemComponent from '../product-item/ProductItemComponent'
import ProductImage1 from './../../../../../images/pages/shop/index/products/product-1.png'
import './products-wrapper.scoped.scss'
import PaginationComponent from '../pagination/PaginationComponent'

export default function ProductsWrapperComponent() {

    const [products, setProducts] = useState([])

    const product = {
        image: ProductImage1,
        name: 'Prada Arqué leather shoulder bag',
        price: 'Rp. 15.000.000,00',
        rate: '5.0',
        amountSell: 10
    }

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = () => {
        const tempProducts = []

        for (let i = 0; i < 12; i++) {
            tempProducts.push(product)
        }
        setProducts(tempProducts)
    }

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