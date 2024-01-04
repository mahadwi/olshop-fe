import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom'
import './profile-wishlist.scoped.scss';
import { IconSearch, IconShoppingCartHeart } from "@tabler/icons-react";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { LoadingContext } from "../../../context/LoadingContext";
import Api from "../../../utils/Api";
import ProductItemComponent from "../../../components/general/product-item/ProductItemComponent";
import { useTranslation } from "react-i18next";

require('rc-checkbox/assets/index.css');

export default function ProfileWishlist() {

    /**
     * Hooks
     * 
     */
    const { pathname } = useLocation();

    /**
     * Context
     * 
     */
    const { user } = useContext(AuthUserContext)
    const { setLoading } = useContext(LoadingContext)

    /**
     * Main State
     * 
     */
    const [arrWishlists, setArrWishlists] = useState([])
    const [searchWishlist, setSearchWishlist] = useState('')

    const { t } = useTranslation();

    useEffect(() => {
        setLoading(true)

        loadWishlists()
    }, [])

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

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='profile-wishlist-page'>
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
                       <p>{arrWishlists.length} {t('result')}</p>
                   </div>
               </div>
           </div>

            { arrWishlists.length == 0 ?
                <div className='products-empty'>
                    <IconShoppingCartHeart size={80} />
                    You don’t have favorit product
                    <a href='/shop'>Shop Now</a>
                </div>
                :
                <div className='products-wishlists'>
                    {
                        arrWishlists.map((wishlistObj) => (
                            <ProductItemComponent wishlistId={wishlistObj.id} product={wishlistObj.product} className={'product-item-wishlist'} />
                        ))
                    }
                </div>
            }

        </div>
    )
}
