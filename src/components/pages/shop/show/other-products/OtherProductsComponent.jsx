import { IconChevronRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom'
import './other-products.scoped.scss'
import ProductItemComponent from '../../../../general/product-item/ProductItemComponent';
import { useTranslation } from 'react-i18next';

export default function OtherProductsComponent({ productsByCategory, user }) {
    /**
     * Hooks
     * 
     */
    const { t } = useTranslation();

    return (
        <div className='other-products-section'>
            <div className='title-section'>
                <h2 className='title'>{t('otherproduct')}</h2>
                <Link className='view-more'>
                    <span>{t('viewall')}</span>
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
            <div className='products-mobile'>
                {
                    productsByCategory?.slice(0, 2)?.map((product) => (
                        <ProductItemComponent blur={!user} product={product} />
                    ))
                }
            </div>
        </div>
    )
}
