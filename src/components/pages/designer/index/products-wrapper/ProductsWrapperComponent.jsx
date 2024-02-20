import ProductItemComponent from '../../../../general/product-item/ProductItemComponent'
import './product-wrapper.scoped.scss'
import PaginationComponent from '../../../../general/pagination/PaginationComponent'
import noProduct from '../../../../../images/no-product.png'
import { useTranslation } from 'react-i18next';

export default function ProductsWrapperComponent({ user, products, metaPagination, setMetaPagination, showLoadMore, loadMoreProducts }) {
    const { t } = useTranslation();

    return (
        <div>
            {products.length == 0 ?
                <div className='product-not-available'>
                    <div>
                        <img src={noProduct} alt="No Product" />
                    </div>
                    <div>
                        {t('productnotavailable')}
                    </div>
                </div>
            : null }
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
