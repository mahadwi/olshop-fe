import { useEffect, useState } from "react";
import AccountOrderLayoutComponent from "../../../components/general/account-order-layout/AccountOrderLayoutComponent";
import './account-wishlist.scoped.scss'
import { IconSearch } from "@tabler/icons-react";
import ProductItemComponent from "../../../components/general/product-item/ProductItemComponent";
import BagCurrentOrder from './../../../images/temp/5c855532d5cc981711da2cd9d3b2c062.png'

export default function AccountWishlist() {
    const product = {
        images: [BagCurrentOrder],
        sale_price: 15000000,
        name: 'Satin mini-bag with crystal'
    }
    const [breadcrumb, setBreadcrumb] = useState([])

    useEffect(() => {
        loadBreadcrumb()
    }, [])

    const loadBreadcrumb = () => {
        setBreadcrumb([
            {
                label: 'Home',
                url: '/'
            },
            {
                label: 'Wishlist',
            }
        ])
    }

    return (
        <AccountOrderLayoutComponent position={'Wishlist'} breadcrumb={breadcrumb} title={'Wishlist'}>
            <div>
                <div className='top-filter'>
                    <div className='left'>
                        <div>
                            <input type="text" name="search" id="search" placeholder="Search" value={''} />
                            <button type="button" onClick={() => {
                            }}>
                                <IconSearch />
                            </button>
                        </div>
                    </div>
                    <div className='right'>
                        <div>
                            <p>10 Result</p>
                        </div>
                    </div>
                </div>

                <div className="products-wishlists">
                    <ProductItemComponent product={product} className={'product-item-wishlist'} />
                    <ProductItemComponent product={product} className={'product-item-wishlist'} />
                    <ProductItemComponent product={product} className={'product-item-wishlist'} />
                    <ProductItemComponent product={product} className={'product-item-wishlist'} />
                    <ProductItemComponent product={product} className={'product-item-wishlist'} />
                </div>
            </div>
        </AccountOrderLayoutComponent>
    )
}