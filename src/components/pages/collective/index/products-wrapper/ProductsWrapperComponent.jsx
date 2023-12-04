import ProductItemComponent from '../../../../general/product-item/ProductItemComponent'
import './product-wrapper.scoped.scss'
import PaginationComponent from '../../../../general/pagination/PaginationComponent'

export default function ProductsWrapperComponent({ products, metaPagination, setMetaPagination }) {
    return (
        <div>
            <div className='products-wrapper'>
                {
                    products.map((product) => (
                        <ProductItemComponent className="product-item-collective-designers-index" product={product} />
                    ))
                }
            </div>
            <PaginationComponent metaPagination={metaPagination} setMetaPagination={setMetaPagination} />
        </div>
    )
}