import { IconStarFilled, IconHeart, IconHeartFilled } from '@tabler/icons-react';
import './product-item.scoped.scss'
import { Link, useNavigate } from 'react-router-dom';
import NoPhotoProduct from './../../../images/product-item/no-photo-product.png'
import StringUtil from '../../../utils/StringUtil';
import Api from '../../../utils/Api';
import { useContext, useEffect, useState } from 'react';
import { AuthUserContext } from '../../../context/AuthUserContext';
import { LoadingContext } from '../../../context/LoadingContext';

export default function ProductItemComponent({ product, className, blur }) {

    /**
     * Context
     * 
     */
    const { user } = useContext(AuthUserContext)
    const { setLoading } = useContext(LoadingContext)

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

    useEffect(() => {
        setTempProduct(product)
    }, [product])

    const toggleWishlist = () => {
        if (!user) {
            navigate('/login')
        } else {
            if (!product.is_wishlist) {
                Api.post('/wishlist', {
                    product_id: product.id
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('apiToken')
                    }
                })
                    .then((res) => {
                        if (res) {
                            setTempProduct(res.data.data.product)
                            alert('Berhasil dimasukan wishlist')
                        }
                    })
            } else {
                Api.delete('/wishlist/' + product.id, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('apiToken')
                    }
                })
                    .then((res) => {
                        if (res) {
                            setTempProduct(res.data.data.product)
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
                    alert('Berhasil dimasukan cart')
                }
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    return (
        <div className={`product-item ${className ? className : ''}`}>
            <div className="product-image">
                <img src={tempProduct.images.length > 0 ? tempProduct.images[0] : NoPhotoProduct} alt="" />

                <div className='product-action'>
                    <button type='button' className='btn-cart' onClick={() => {
                        doAddToCart()
                    }}>Add to cart</button>
                    <button className='btn-buy'>Buy Now</button>
                </div>

                <span className='love-wrap' onClick={toggleWishlist}>
                    {
                        tempProduct.is_wishlist ?
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
                        <h4 className={`${blur ? 'blur' : ''}`}>{blur ? 'Rpxxx.xxx' : StringUtil.rupiahFormat(`${tempProduct.sale_price}`)}</h4>

                        {
                            blur ?
                                <button onClick={() => {
                                    navigate('/login')
                                }}>Cek Harga</button>
                                : <></>
                        }
                    </div>
                    <div className="recap">
                        <div className="rate">
                            <span>{5}</span>
                            <IconStarFilled style={{ color: '#FFAC33' }} size={12} />
                        </div>
                        <div className='selled'>
                            <span>({10}) Terjual</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}