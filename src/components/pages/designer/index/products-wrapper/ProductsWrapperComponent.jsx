import ProductItemComponent from '../../../../general/product-item/ProductItemComponent'
import './product-wrapper.scoped.scss'
import PaginationComponent from '../../../../general/pagination/PaginationComponent'

export default function ProductsWrapperComponent({ user, products, metaPagination, setMetaPagination, showLoadMore, loadMoreProducts }) {
    return (
        <div>
            <div className='products-wrapper'>
                {
                    products.map((product) => (
                        <ProductItemComponent className="product-item-collective-designers-index" product={product} blur={user ? false : true} />
                    ))
                }
            </div>
            <div className='pagination-wrapper'>
                { showLoadMore && metaPagination.nextPage != null ?
                    <button onClick={loadMoreProducts}>Load More</button>
                : null
                }
            </div>
            {/*<PaginationComponent metaPagination={metaPagination} setMetaPagination={setMetaPagination} />*/}
        </div>
    )
}
