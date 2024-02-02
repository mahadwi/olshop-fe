import { useContext, useEffect, useState } from "react";
import AccountOrderLayoutComponent from "../../../components/general/account-order-layout/AccountOrderLayoutComponent";
import './account-wishlist.scoped.scss'
import { IconSearch } from "@tabler/icons-react";
import ProductItemComponent from "../../../components/general/product-item/ProductItemComponent";
import { useLocation } from 'react-router-dom'
import { LoadingContext } from "../../../context/LoadingContext";
import Api from "../../../utils/Api";
import { useSearchParams } from "react-router-dom";
import PaginationComponent from "../../../components/pages/wishlist/PaginationComponent";

export default function AccountWishlist() {

    /**
     * Hooks
     * 
     */
    const { pathname, search } = useLocation();
    const [searchParams, setSearechParams] = useSearchParams();
    const currentPage = searchParams.get('page');

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
    const [searchWishlist, setSearchWishlist] = useState(searchParams.get('search'))
    const [metaPagination, setMetaPagination] = useState({})

    // Automatically scrolls to top whenever pathname or search changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname, search]);

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

    useEffect(() => {
        setLoading(true)
        loadWishlists();
    }, [searchParams]);

    const loadWishlists = () => {
        Api.get('/wishlist', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apiToken')
            },
            params: {
                search: searchWishlist ? searchWishlist : null,
                page: currentPage ? currentPage : 1,
                itemPerpage: 15,
            },
        }).then((res) => {
            if (res) {
                setArrWishlists(res.data.data)
                setMetaPagination(res.data.meta)
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
                            <input type="text" placeholder="Search" value={searchWishlist} onChange={(e) => {
                                setSearchWishlist(e.target.value)
                            }} />
                            <button type="button" onClick={() => {
                                setSearechParams((c) => {
                                    if (searchWishlist) {
                                        c.set('search', searchWishlist);
                                    } else {
                                        c.delete('search');
                                    }
                                    c.set('page', 1);
                                    return c
                                });
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
                <PaginationComponent metaPagination={metaPagination} setMetaPagination={setMetaPagination} />
            </div>
        </AccountOrderLayoutComponent>
    )
}
