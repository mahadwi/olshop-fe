import { IconArrowRight } from '@tabler/icons-react'
import TempBag from './../../../images/temp/5c855532d5cc981711da2cd9d3b2c062.png'
import { Link } from 'react-router-dom'
import './floating-cart.scoped.scss'
import { useContext, useEffect } from 'react'
import { CartContext } from '../../../context/CartContext'
import StringUtil from '../../../utils/StringUtil'

export default function FloatingCartComponent() {

    const { carts } = useContext(CartContext)

    useEffect(() => {
        console.log(carts)
    }, [])

    return (
        <div>
            <div className='floating-cart-content'>
                <div className="top">
                    <h3 className='title-float-cart'><span>Cart</span> ({carts.length})</h3>
                    <Link className='float-cart-link' to={'/cart'}>
                        View All
                        <IconArrowRight size={15} />
                    </Link>
                </div>
                <div className="body">
                    <div className="carts">
                        {
                            carts.map((cartObj) => (
                                <div className="cart-item">
                                    <div className="left">
                                        <img src={cartObj.product.images[0]} alt="" />
                                    </div>
                                    <div className="right">
                                        <h4 className='cart-product-title'>{cartObj.product.name}</h4>
                                        <h4 className='cart-product-price'>{StringUtil.rupiahFormat(cartObj.price)}</h4>
                                        <span className='cart-weight'>{StringUtil.numberingWithDotFormat(cartObj.qty)} pcs ({StringUtil.numberingWithDotFormat(cartObj.product.weight)} gr)</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
