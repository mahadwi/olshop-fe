import './products-wrapper.scoped.scss'
import PaginationComponent from '../../../../general/pagination/PaginationComponent'
import ProductItemComponent from '../../../../general/product-item/ProductItemComponent'
import noProduct from '../../../../../images/no-product.png'
import { useTranslation } from 'react-i18next';

export default function ProductsWrapperComponent({ products, metaPagination, setMetaPagination, user, showLoadMore, loadMoreProducts }) {
    const { t } = useTranslation();

    return (
        <div className="products-wrapper">
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
            <div className='inner-products-wrapper'>
                {
                    products.map((product) => (
                        <ProductItemComponent blur={user ? false : true} product={product} />
                    ))
                }
            </div>
            <div className='pagination-wrapper'>
                { showLoadMore && metaPagination.nextPage != null ?
                    <button onClick={loadMoreProducts}>Load More</button>
                : null
                }
            </div>
            {/* <PaginationComponent metaPagination={metaPagination} setMetaPagination={setMetaPagination} /> */}
        </div>
    )
}
