import { IconStarFilled, IconHeart, IconHeartFilled } from '@tabler/icons-react';
import './product-item.scoped.scss'
import { Link, useNavigate } from 'react-router-dom';
import NoPhotoProduct from './../../../images/product-item/no-photo-product.png'
import StringUtil from '../../../utils/StringUtil';
import Api from '../../../utils/Api';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthUserContext } from '../../../context/AuthUserContext';
import { LoadingContext } from '../../../context/LoadingContext';
import { CartContext } from '../../../context/CartContext';
import { LanguageContext } from '../../../context/LanguageContext';
import { useTranslation } from "react-i18next";

export default function ProductItemComponent({ product, className, blur, wishlistId }) {

    /**
     * Refs
     * 
     */
    const productItemRef = useRef()

    /**
     * Context
     * 
     */
    const { user } = useContext(AuthUserContext)
    const { setLoading } = useContext(LoadingContext)
    const { refreshCarts } = useContext(CartContext)
    const { language } = useContext(LanguageContext)
    const formater = new Intl.NumberFormat( language == 'id' ? 'id-ID' : 'en-EN', { style: 'currency', currency: language == 'id' ? 'IDR' : 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 })

    /**
     * State
     * 
     */
    const [tempProduct, setTempProduct] = useState(product)

    /**
     * Hooks
     * 
     */
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        setTempProduct(product)
    }, [product])

    const toggleWishlist = () => {
        if (!user) {
            navigate('/login')
        } else {
            if (wishlistId) {
                Api.delete('/wishlist/' + wishlistId, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('apiToken')
                    }
                })
                    .then((res) => {
                        if (res) {
                            let objProduct = Object.assign({}, tempProduct)
                            objProduct.is_wishlist = false

                            setTempProduct(objProduct)
                            alert('Berhasil dihapus dari wishlist')
                            productItemRef.current.remove()
                        }
                    })
            } else if (!tempProduct.is_wishlist) {
                Api.post('/wishlist', {
                    product_id: tempProduct.id
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('apiToken')
                    }
                })
                    .then((res) => {
                        if (res) {
                            let objProduct = Object.assign({}, tempProduct)
                            objProduct.is_wishlist = true
                            objProduct.wishlist = {
                                id: res.data.data.id
                            }

                            setTempProduct(objProduct)
                            alert('Berhasil dimasukan wishlist')
                        }
                    })
            } else {
                Api.delete('/wishlist/' + tempProduct.wishlist.id, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('apiToken')
                    }
                })
                    .then((res) => {
                        if (res) {
                            let objProduct = Object.assign({}, tempProduct)
                            objProduct.is_wishlist = false

                            setTempProduct(objProduct)
                            alert('Berhasil dihapus dari wishlist')
                        }
                    })
            }
        }

    }

    const doAddToCart = () => {
        if (user) {
            setLoading(true)
            Api.post('/cart', {
                product_id: tempProduct.id,
                qty: 1
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('apiToken')
                }
            }).then((res) => {
                if (res) {
                    refreshCarts()
                    alert('Berhasil dimasukan cart')
                }
            }).finally(() => {
                setLoading(false)
            })
        } else {
            navigate('/login');
        }
    }

    const doBuyNow = () => {
        if (user) {
        } else {
            navigate('/login');
        }
    }

    return (
        <div className={`product-item ${className ? className : ''}`} ref={productItemRef}>
            <div className="product-image">
                <img src={tempProduct.images.length > 0 ? tempProduct.images[0] : NoPhotoProduct} alt="" />

                <div className='product-action'>
                    <button type='button' className='btn-cart' onClick={() => {
                        doAddToCart()
                    }}>{t('addtocart')}</button>
                    <button className='btn-buy' onClick={() => doBuyNow()}>{t('buynow')}</button>
                </div>

                <span className='love-wrap' onClick={toggleWishlist}>
                    {
                        wishlistId ? <IconHeartFilled style={{ color: '#F44336' }} /> : tempProduct.is_wishlist ?
                            <IconHeartFilled style={{ color: '#F44336' }} />
                            :
                            <IconHeart />
                    }

                    <IconHeartFilled className='heart-red-filled' style={{ color: '#F44336' }} />
                </span>
            </div>
            <div className="product-body">
                <h3>
                    <Link to={'/shop/' + tempProduct.id}>{tempProduct.name}</Link>
                </h3>
                <div>
                    <div className='price-area'>
                        <h4 className={`${blur ? 'blur' : ''}`}>{blur ? 'Rpxxx.xxx' : formater.format(language == 'id' ? tempProduct.sale_price : tempProduct.sale_usd )}</h4>

                        {
                            blur ?
                                <button onClick={() => {
                                    navigate('/login')
                                }}>{t('checkprices')}</button>
                                : <></>
                        }
                    </div>
                    <div className="recap">
                        <div className="rate">
                            <span>{5}</span>
                            <IconStarFilled style={{ color: '#FFAC33' }} size={12} />
                        </div>
                        <div className='selled'>
                            <span>({0}) {t('sold')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
