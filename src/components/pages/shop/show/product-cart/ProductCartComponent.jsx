import { useContext, useState } from 'react'
import './product-cart.scoped.scss'
import './product-cart.css'
import { Collapse } from 'react-collapse';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { IconChevronDown, IconChevronUp, IconMinus, IconPlus, IconShoppingCartFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'
import { AuthUserContext } from '../../../../../context/AuthUserContext';
import { LanguageContext } from '../../../../../context/LanguageContext';

export default function ProductCartComponent({onlyDesktop, onlyMobile, productObj, qty, doSubtractQty, doAddQty, shipTo, setShipTo, loadDistricts, couriers, selectedCourier, setSelectedCourier, shippingFeeOpened, setShippingFeeOpened, shippingFees, selectedShippingFees, setSelectedShippingFees}) {

    /**
     * Hooks
     * 
     */
    const navigate = useNavigate();

    /**
     * Context
     * 
     */
    const { user } = useContext(AuthUserContext)
    const { language } = useContext(LanguageContext)
    const formater = new Intl.NumberFormat( language == 'id' ? 'id-ID' : 'en-EN', { style: 'currency', currency: language == 'id' ? 'IDR' : 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 })

    return (
        <div className={`product-cart-wrapper ${onlyDesktop ? 'only-desktop' : ''} ${onlyMobile ? 'only-mobile': ''}`}>
            <form action="">
                <div className='group'>
                    <label htmlFor="shipping_option">Shipping Option</label>
                    <Select
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: '#C4C4C4',
                                borderWidth: '1px',
                                boxShadow: 'none',
                                backgroundColor: state.isDisabled ? 'transparent' : 'transparent',
                                '&:hover': {
                                    borderColor: '#C4C4C4',
                                }
                            }),
                            container: (baseStyles, state) => ({
                                ...baseStyles,
                                width: '100%',
                            }),
                            input: (baseStyles, state) => ({
                                ...baseStyles,
                                color: '#545454',
                                fontSize: '12px',
                                fontWeight: '300',
                                fontFamily: "'Inter', sans-serif"
                            }),
                            option: (baseStyles, state) => ({
                                ...baseStyles,
                                backgroundColor: state.isDisabled ? 'transparent' : 'transparent',
                                color: '#000',
                                fontSize: '12px',
                                fontWeight: state.isDisabled ? '700' : '400',
                                fontFamily: "'Inter', sans-serif",
                                borderBottom: state.isDisabled ? '1px solid #C4C4C4;' : '0px',
                                "&:hover": {
                                    backgroundColor: state.isDisabled ? '#FFF' : "#000",
                                    color: state.isDisabled ? '#000' : '#FFF'
                                }
                            }),
                        }}
                        name='shipping_option'
                        value={selectedCourier}
                        onChange={setSelectedCourier}
                        options={couriers} />
                </div>
                <div className='group'>
                    <label htmlFor="shipping_to">Shipping To</label>
                    <AsyncSelect cacheOptions loadOptions={loadDistricts} defaultOptions value={shipTo} onChange={(val) => {
                        setShipTo(val)
                    }} />
                </div>
                <div className='group only-desktop'>
                    <label htmlFor="weight">Weight</label>
                    <input type="text" name="weight" className='form-text' id="weight" value={(productObj.weight * qty / 1000).toFixed(2)} readOnly />
                    <span className='unit'>Kg</span>
                </div>
                <div className='group'>
                    <button type='button' className='button-shipping-fee' onClick={() => {
                        setShippingFeeOpened(!shippingFeeOpened)
                    }}>
                        <span>Shipping Fee</span>
                        <IconChevronDown style={{ transform: 'translateY(-3px)' }} />
                    </button>
                    <div className='collapse-content'>
                        <div className='shipping-fee-select'>
                            <Collapse isOpened={shippingFeeOpened}>
                                <div className='shipping-fee-contents'>
                                    {shippingFees.map((c, i) => {
                                        return (
                                            <div className='shipping-fee-content' onClick={() => {setSelectedShippingFees(i); setShippingFeeOpened(false)}}>
                                                <div className='top'>
                                                    <div className='name'>
                                                        {c.service}
                                                    </div>
                                                    <div className='price'>
                                                        {c.cost[0].value}
                                                    </div>
                                                </div>
                                                <div className='bottom'>
                                                    Receive: {c.cost[0].etd}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Collapse>
                        </div>
                    </div>
                </div>
                <div className="group only-desktop">
                    <label>Total Stock : {productObj.stock}</label>
                    <div className='stock-increase-decrease'>
                        <button type='button' disabled={qty == 1} onClick={doSubtractQty}><IconMinus size={15} style={{ color: '#FFF' }} /></button>
                        <input type="number" name="amount_buy" id="amount_buy" value={qty} readOnly />
                        <button type='button' disabled={qty >= productObj.stock} onClick={doAddQty}><IconPlus size={15} style={{ color: '#FFF' }} /></button>
                    </div>
                </div>
                <div className='group only-desktop'>
                    <div className='price-row-item'>
                        <span className='label'>Price</span>
                        <span className={`val ${user ? '' : 'blur'}`}>{user ? formater.format(language == 'id' ? productObj.sale_price : productObj.sale_usd ) : 'Rp. 19.631.312'}</span>
                    </div>
                    <div className='price-row-item'>
                        <span className='label'>Sub Total</span>
                        <span className={`val ${user ? '' : 'blur'}`}>{user ? formater.format(Number(language == 'id' ? productObj.sale_price : productObj.sale_usd) * qty ) : 'Rp. 19.631.312'}</span>
                    </div>
                    {
                        !user ?
                            <>
                                <div className='price-row-item'>
                                    <button onClick={() => {
                                        navigate('/login')
                                    }}>Cek Harga</button>
                                </div>
                                <hr className='hr-button-price-check' />
                            </>
                            : <></>
                    }
                </div>
                <div className='group only-desktop'>
                    <button type='button' className='btn-cart'><IconShoppingCartFilled /> Add to cart</button>
                    <button type='button' className='btn-buy'>Buy Now</button>
                </div>
            </form>
            <div className='product-cart-mobile'>
                <div className='product-cart-mobile-wrapper'>
                    <div className='product-cart-mobile-input'>
                        <button disabled={qty == 1} onClick={doSubtractQty}><IconMinus size={14} /></button>
                        <input type={'number'} value={qty} />
                        <button type='button' disabled={qty >= productObj.stock} onClick={doAddQty}><IconPlus size={14} /></button>
                        <div className='total-stock'>Total Stock: {productObj.stock}</div>
                    </div>
                    <div className='line-div' />
                    <div className='product-cart-mobile-cart'>
                        <button>
                            <IconShoppingCartFilled />
                        </button>
                    </div>
                </div>
                <button className='buy-now'>Buy Now</button>
            </div>
        </div>
    )
}
