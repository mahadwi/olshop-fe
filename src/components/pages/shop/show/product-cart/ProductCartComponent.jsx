import { useContext, useState } from 'react'
import './product-cart.scoped.scss'
import './product-cart.css'
import { Collapse } from 'react-collapse';
import Select from 'react-select';
import { IconChevronDown, IconChevronUp, IconMinus, IconPlus, IconShoppingCartFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'
import { AuthUserContext } from '../../../../../context/AuthUserContext';

export default function ProductCartComponent({onlyDesktop, onlyMobile}) {

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

    /**
     * Main State
     * 
     */
    const [selectedShippingOption, setSelectedShippingOption] = useState({ value: 'Courier', label: 'Courier' })
    const [selectedShippingToOption, setSelectedShippingToOption] = useState({ value: 'Kota Bandung', label: 'Kota Bandung' })
    const [shippingFeeOpened, setShippingFeeOpened] = useState(false)
    const shippingOptions = [
        { value: 'Courier', label: 'Courier' }
    ];
    const shippingToOptions = [
        { value: 'Kota Bandung', label: 'Kota Bandung' },
        { value: 'Kota Semarang', label: 'Kota Semarang' },
        { value: 'Kab. Malang', label: 'Kab. Malang' }
    ];

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
                        value={selectedShippingOption}
                        options={shippingOptions} />
                </div>
                <div className='group'>
                    <label htmlFor="shipping_to">Shipping To</label>
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
                        name='shipping_to'
                        value={selectedShippingToOption}
                        options={shippingToOptions} />
                </div>
                <div className='group only-desktop'>
                    <label htmlFor="weight">Weight</label>
                    <input type="text" name="weight" className='form-text' id="weight" value={'1,25'} readOnly />
                    <span className='unit'>Kg</span>
                </div>
                <div className='group'>
                    <button type='button' className='button-shipping-fee' onClick={() => {
                        setShippingFeeOpened(!shippingFeeOpened)
                    }}>
                        <span>Shipping Fee</span>
                        <IconChevronDown style={{ transform: 'translateY(-3px)' }} />
                    </button>
                    <Collapse isOpened={shippingFeeOpened}>
                        <div className='collapse-content'>Random content</div>
                    </Collapse>
                </div>
                <div className="group only-desktop">
                    <label>Total Stock : 30</label>
                    <div className='stock-increase-decrease'>
                        <button type='button'><IconMinus size={15} style={{ color: '#FFF' }} /></button>
                        <input type="number" name="amount_buy" id="amount_buy" value={1} readOnly />
                        <button type='button'><IconPlus size={15} style={{ color: '#FFF' }} /></button>
                    </div>
                </div>
                <div className='group only-desktop'>
                    <div className='price-row-item'>
                        <span className='label'>Price</span>
                        <span className={`val ${user ? '' : 'blur'}`}>Rp. 19.631.312</span>
                    </div>
                    <div className='price-row-item'>
                        <span className='label'>Sub Total</span>
                        <span className={`val ${user ? '' : 'blur'}`}>Rp. 19.631.312</span>
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
                        <button><IconMinus size={14} /></button>
                        <input type={'number'} value={0} />
                        <button><IconPlus size={14} /></button>
                        <div className='total-stock'>Total Stock: 30</div>
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
