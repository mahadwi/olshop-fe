import { useContext, useEffect, useState } from "react";
import AccountOrderLayoutComponent from "../../../components/general/account-order-layout/AccountOrderLayoutComponent";
import './account-wishlist.scoped.scss'
import { IconSearch } from "@tabler/icons-react";
import ProductItemComponent from "../../../components/general/product-item/ProductItemComponent";
import { useLocation } from 'react-router-dom'
import { LoadingContext } from "../../../context/LoadingContext";
import Api from "../../../utils/Api";

export default function AccountWishlist() {

    /**
     * Hooks
     * 
     */
    const { pathname } = useLocation();

    /**
     * Context
     * 
     */
    const { setLoading } = useContext(LoadingContext)

    /**
     * Main State
     * 
     */
    const [breadcrumb, setBreadcrumb] = useState([])
    const [arrWishlists, setArrWishlists] = useState([])
    const [searchWishlist, setSearchWishlist] = useState('')

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setLoading(true)

        loadBreadcrumb()
        loadWishlists()
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

    const loadWishlists = () => {
        Api.get('/wishlist', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apiToken')
            }
        }).then((res) => {
            if (res) {
                console.log(res.data.data)
                setArrWishlists(res.data.data)
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <AccountOrderLayoutComponent position={'Wishlist'} breadcrumb={breadcrumb} title={'Wishlist'}>
            <div>
                <div className='top-filter'>
                    <div className='left'>
                        <div>
                            <input type="text" name="search" id="search" placeholder="Search" value={searchWishlist} onChange={(e) => {
                                setSearchWishlist(e.target.value)
                            }} />
                            <button type="button" onClick={() => {
                                // Do nothing
                            }}>
                                <IconSearch />
                            </button>
                        </div>
                    </div>
                    <div className='right'>
                        <div>
                            <p>{arrWishlists.length} Result</p>
                        </div>
                    </div>
                </div>

                <div className="products-wishlists">
                    {
                        arrWishlists.map((wishlistObj) => (
                            <ProductItemComponent wishlistId={wishlistObj.id} product={wishlistObj.product} className={'product-item-wishlist'} />
                        ))
                    }
                </div>
            </div>
        </AccountOrderLayoutComponent>
    )
}