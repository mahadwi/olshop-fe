import './products-wrapper.scoped.scss'
import PaginationComponent from '../../../../general/pagination/PaginationComponent'
import ProductItemComponent from '../../../../general/product-item/ProductItemComponent'

export default function ProductsWrapperComponent({ products, metaPagination, setMetaPagination, user }) {
    return (
        <div className="products-wrapper">
            <div className='inner-products-wrapper'>
                {
                    products.map((product) => (
                        <ProductItemComponent blur={user ? false : true} product={product} />
                    ))
                }
            </div>
            <PaginationComponent metaPagination={metaPagination} setMetaPagination={setMetaPagination} />
        </div>
    )
}