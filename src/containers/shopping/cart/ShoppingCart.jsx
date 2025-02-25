import Checkbox from "react-custom-checkbox";
import BagCurrentOrder from './../../../images/temp/5c855532d5cc981711da2cd9d3b2c062.png'
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import './shopping-cart.scoped.scss'
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { useContext, useEffect, useState } from "react";
import { AuthUserContext } from "../../../context/AuthUserContext";
import { LoadingContext } from "../../../context/LoadingContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { CurrencyContext } from "../../../context/CurrencyContext";
import { ModalAddressContext } from "../../../context/ModalAddressContext";
import Api from "../../../utils/Api";
import StringUtil from "../../../utils/StringUtil";
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";

export default function ShoppingCart() {

    /**
     * Context
     * 
     */
    const { user } = useContext(AuthUserContext)
    const { setLoading } = useContext(LoadingContext)
    const { language } = useContext(LanguageContext)
    const { currency } = useContext(CurrencyContext)
    const formater = new Intl.NumberFormat(currency == 'id' ? 'id-ID' : 'en-EN', { style: 'currency', currency: currency == 'id' ? 'IDR' : 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 })
    const { setShowModalAddress } = useContext(ModalAddressContext)

    /**
     * Hooks
     * 
     */
    const { t } = useTranslation();

    /**
     * Main State
     * 
     */
    const [arrCarts, setArrCarts] = useState([])
    const [selectAll, setSelectAll] = useState(false)

    useEffect(() => {
        setLoading(true)

        loadCarts()
    }, [])

    const loadCarts = () => {
        Api.get('/cart', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apiToken')
            }
        }).then((res) => {
            if (res) {
                setArrCarts(res.data.data)
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    const doDeleteCart = (cartObj) => {
        setLoading(true)

        Api.delete(`/cart/${cartObj.id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apiToken')
            }
        }).then((res) => {
            if (res) {
                loadCarts()
            }
        })
    }

    const doDeleteSelectedCart = () => {
        if (window.confirm('Are you sure?')) {
            setLoading(true);

            Api.post(`/cart-delete`, {
                cart_id: (arrCarts.reduce((p, c) => {
                    if (c.selected) {
                        p.push(c.id)
                    }
                    return p
                }, [])),
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('apiToken')
                },
            }).then(() => {
                loadCarts()
            }).catch((err) => console.log(err));
        }
    }

    const changeSelectedCart = (cartObj, value) => {
        const copyArrCarts = []
        for (const cartObjState of arrCarts) {
            if (cartObjState === cartObj) {
                cartObjState.selected = value;

                if (!value) {
                    setSelectAll(false);
                }
            }
            copyArrCarts.push(cartObjState);
        }
        setArrCarts(copyArrCarts)
    }

    const changeQtyCart = (cartObj, qty) => {
        if (qty > 0) {
            // setLoading(true);

            Api.put(`/cart/${cartObj?.id}`, {
                qty: qty
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('apiToken')
                },
            }).then(() => {
                loadCarts()
            }).catch((err) => console.log(err)).finally(() => setLoading(false));
        }
    }

    const doCheckOut = () => {
        const selectedObj = (arrCarts.reduce((p, c) => {
            if (c.selected) {
                p[`${c.id}`] = {
                    qty: c.qty
                }
            }
            return p
        }, {}));

        if (Object.keys(selectedObj).length == 0) {
            toast.error("No selection made. Please choose an item before proceeding")
            return false;
        }

        // if (user.addresses.length == 0) {
        //     setShowModalAddress(true);
        //     return false;
        // }

        localStorage.setItem('selectedObj', JSON.stringify(selectedObj));
        localStorage.setItem('isDirect', '0');
        return true
    }

    return (
        <ContainerComponent>
            <div className="shopping-cart-container">
                <h2 className="title-page">{t('myshoppingcart')}</h2>
                <h4 className="desc-page">{arrCarts.length} {t('itemsinyourcart')}</h4>

                <div className="carts-head">
                    <div className="checkbox-head">
                        <Checkbox borderColor={'#DADADA'} checked={selectAll} onChange={(value) => {
                            const copyArrCarts = []
                            for (const cartObj of arrCarts) {
                                cartObj.selected = value;
                                copyArrCarts.push(cartObj);
                            }
                            setArrCarts(copyArrCarts);
                            setSelectAll(value);
                        }} />
                        <span className="only-mobile">Select All</span>
                    </div>
                    <div className="item-head only-desktop"><h4>{t('item')}</h4></div>
                    <div className="item-price-head only-desktop"><h4>{t('itemprice')}</h4></div>
                    <div className="qty-head only-desktop"><h4>{t('quantity')}</h4></div>
                    <div className="price-head only-desktop"><h4>{t('price')}</h4></div>
                    <div className="delete-head"></div>
                </div>

                <div className="carts-wrapper">
                    {
                        arrCarts.map((cartObj) => (
                            <div className="cart-item">
                                <div className="checkbox-col">
                                    <Checkbox borderColor={'#DADADA'} checked={!!cartObj.selected} onChange={(value) => changeSelectedCart(cartObj, value)} />
                                </div>
                                <div className="product-col">
                                    <img src={cartObj.product.images[0]} alt="" />
                                    <div className="product-desc">
                                        <h4 className="product-name">{cartObj.product.name}</h4>
                                        <span className="product-weight only-desktop">{cartObj.qty} pcs ({StringUtil.numberingWithDotFormat(Math.ceil(cartObj.product.weight * cartObj.qty))} gr)</span>
                                        <div className="price-col only-mobile">
                                            <h4 className="price">{formater.format((currency == 'id' ? Number(cartObj.product.sale_price) : Number(cartObj.product.sale_usd)) * cartObj.qty)}</h4>
                                        </div>
                                        <div className="qty-col only-mobile">
                                            <div>
                                                <button onClick={() => {
                                                    changeQtyCart(cartObj, cartObj.qty - 1)
                                                }}><IconMinus size={16} /></button>
                                                <input type="text" name="" value={cartObj.qty} id="" />
                                                <button type="button" onClick={() => {
                                                    changeQtyCart(cartObj, cartObj.qty + 1)
                                                }}><IconPlus size={16} color="#fff" /></button>
                                                <button className="delete" type="button" onClick={() => {
                                                    if (window.confirm('Are you sure?')) {
                                                        doDeleteCart(cartObj)
                                                    }
                                                }}><IconTrash size={20} color="#fff" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item-price-col only-desktop">
                                    <h4 className="item-price">{formater.format(currency == 'id' ? cartObj.product.sale_price : cartObj.product.sale_usd)}</h4>
                                </div>
                                <div className="qty-col only-desktop">
                                    <div>
                                        <button onClick={() => {
                                            changeQtyCart(cartObj, cartObj.qty - 1)
                                        }}><IconMinus size={16} /></button>
                                        <input type="text" name="" value={cartObj.qty} id="" />
                                        <button type="button" onClick={() => {
                                            changeQtyCart(cartObj, cartObj.qty + 1)
                                        }}><IconPlus size={16} /></button>
                                    </div>
                                </div>
                                <div className="price-col only-desktop">
                                    <h4 className="price">{formater.format((currency == 'id' ? Number(cartObj.product.sale_price) : Number(cartObj.product.sale_usd)) * cartObj.qty)}</h4>
                                </div>
                                <div className="delete-col only-desktop">
                                    <button type="button" onClick={() => {
                                        if (window.confirm('Are you sure?')) {
                                            doDeleteCart(cartObj)
                                        }
                                    }}><IconTrash size={20} color="#F24E1E" /></button>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="box-bottom-checkout only-desktop">
                    {/* <div className="top-voucher">
                        <div className="inner">
                            <div className="text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M14.8 8L16 9.2L9.2 16L8 14.8L14.8 8ZM4 4H20C21.11 4 22 4.89 22 6V10C21.4696 10 20.9609 10.2107 20.5858 10.5858C20.2107 10.9609 20 11.4696 20 12C20 12.5304 20.2107 13.0391 20.5858 13.4142C20.9609 13.7893 21.4696 14 22 14V18C22 19.11 21.11 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V14C3.11 14 4 13.11 4 12C4 11.4696 3.78929 10.9609 3.41421 10.5858C3.03914 10.2107 2.53043 10 2 10V6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4ZM4 6V8.54C4.60768 8.8904 5.11236 9.39466 5.46325 10.0021C5.81415 10.6094 5.9989 11.2985 5.9989 12C5.9989 12.7015 5.81415 13.3906 5.46325 13.9979C5.11236 14.6053 4.60768 15.1096 4 15.46V18H20V15.46C19.3923 15.1096 18.8876 14.6053 18.5367 13.9979C18.1858 13.3906 18.0011 12.7015 18.0011 12C18.0011 11.2985 18.1858 10.6094 18.5367 10.0021C18.8876 9.39466 19.3923 8.8904 20 8.54V6H4ZM9.5 8C10.33 8 11 8.67 11 9.5C11 10.33 10.33 11 9.5 11C8.67 11 8 10.33 8 9.5C8 8.67 8.67 8 9.5 8ZM14.5 13C15.33 13 16 13.67 16 14.5C16 15.33 15.33 16 14.5 16C13.67 16 13 15.33 13 14.5C13 13.67 13.67 13 14.5 13Z" fill="#E4A951" />
                                </svg>
                                <h5>{t('platformvoucher')}</h5>
                            </div>
                            <input type="text" placeholder={t('selectorentercode')} />
                        </div>
                    </div> */}
                    <div className="body-price">
                        <div className="top-desc">
                            <div className="left-select">
                                <button className="delete" disabled={!arrCarts.find((cartObj) => {
                                    if (cartObj.selected) return true;
                                    return false;
                                })} onClick={doDeleteSelectedCart}>{t('delete')}</button>
                            </div>
                            <div className="right-price">
                                <div className="left-select-text">
                                    <h4>{t('cartsubtotal').toUpperCase()}</h4>
                                    <span>{t('items')} ({arrCarts.length})</span>
                                </div>
                                <div className="right-price-text">
                                    <h4>
                                        {formater.format(arrCarts.reduce((total, cartObj) => {
                                            if (!cartObj.selected) return total;
                                            return Number(currency == 'id' ? cartObj.product.sale_price : cartObj.product.sale_usd) * cartObj.qty + total
                                        }, 0))}
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="bottom-action">
                            <button type="button" onClick={() => {
                                if (doCheckOut()) {
                                    window.location.href = '/shopping/checkout'
                                }
                            }}>{t('checkout')}</button>
                        </div>
                    </div>
                </div>

                <div className="delete-mobile">
                    <button className="delete" disabled={!arrCarts.find((cartObj) => {
                        if (cartObj.selected) return true;
                        return false;
                    })} onClick={doDeleteSelectedCart}>{t('delete')}</button>
                </div>

                <div className="box-bottom-checkout-mobile">
                    {/* <div className="top-voucher">
                        <div className="inner">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M14.8 8L16 9.2L9.2 16L8 14.8L14.8 8ZM4 4H20C21.11 4 22 4.89 22 6V10C21.4696 10 20.9609 10.2107 20.5858 10.5858C20.2107 10.9609 20 11.4696 20 12C20 12.5304 20.2107 13.0391 20.5858 13.4142C20.9609 13.7893 21.4696 14 22 14V18C22 19.11 21.11 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V14C3.11 14 4 13.11 4 12C4 11.4696 3.78929 10.9609 3.41421 10.5858C3.03914 10.2107 2.53043 10 2 10V6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4ZM4 6V8.54C4.60768 8.8904 5.11236 9.39466 5.46325 10.0021C5.81415 10.6094 5.9989 11.2985 5.9989 12C5.9989 12.7015 5.81415 13.3906 5.46325 13.9979C5.11236 14.6053 4.60768 15.1096 4 15.46V18H20V15.46C19.3923 15.1096 18.8876 14.6053 18.5367 13.9979C18.1858 13.3906 18.0011 12.7015 18.0011 12C18.0011 11.2985 18.1858 10.6094 18.5367 10.0021C18.8876 9.39466 19.3923 8.8904 20 8.54V6H4ZM9.5 8C10.33 8 11 8.67 11 9.5C11 10.33 10.33 11 9.5 11C8.67 11 8 10.33 8 9.5C8 8.67 8.67 8 9.5 8ZM14.5 13C15.33 13 16 13.67 16 14.5C16 15.33 15.33 16 14.5 16C13.67 16 13 15.33 13 14.5C13 13.67 13.67 13 14.5 13Z" fill="#E4A951" />
                            </svg>
                            Voucher
                        </div>
                        <input type="text" placeholder="Enter code" />
                    </div> */}
                    <div className="body-price">
                        <div className="top-desc">
                            <span>Total</span>
                            <span>
                                {formater.format(arrCarts.reduce((total, cartObj) => {
                                    if (!cartObj.selected) return total;
                                    return Number(currency == 'id' ? cartObj.product.sale_price : cartObj.product.sale_usd) * cartObj.qty + total
                                }, 0))}
                            </span>
                        </div>
                        <button type="button" onClick={() => {
                            if (doCheckOut()) {
                                window.location.href = '/shopping/checkout'
                            }
                        }}>Check Out</button>
                    </div>
                </div>
            </div>
        </ContainerComponent>
    )
}
