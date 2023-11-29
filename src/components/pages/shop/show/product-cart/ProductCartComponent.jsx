import { useState } from 'react'
import './product-cart.scoped.scss'
import './product-cart.css'
import { Collapse } from 'react-collapse';
import Select from 'react-select';
import { IconChevronDown, IconChevronUp, IconMinus, IconPlus, IconShoppingCartFilled } from '@tabler/icons-react';

export default function ProductCartComponent() {
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
        <div className="product-cart-wrapper">
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
                <div className='group'>
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
                <div className="group">
                    <label>Total Stock : 30</label>
                    <div className='stock-increase-decrease'>
                        <button type='button'><IconMinus size={15} style={{ color: '#FFF' }} /></button>
                        <input type="number" name="amount_buy" id="amount_buy" value={1} readOnly />
                        <button type='button'><IconPlus size={15} style={{ color: '#FFF' }} /></button>
                    </div>
                </div>
                <div className='group'>
                    <div className='price-row-item'>
                        <span className='label'>Price</span>
                        <span className='val'>Rp. 19.631.312</span>
                    </div>
                    <div className='price-row-item'>
                        <span className='label'>Sub Total</span>
                        <span className='val'>Rp. 19.631.312</span>
                    </div>
                </div>
                <div className='group'>
                    <button type='button' className='btn-cart'><IconShoppingCartFilled /> Add to cart</button>
                    <button type='button' className='btn-buy'>Buy Now</button>
                </div>
            </form>
        </div>
    )
}