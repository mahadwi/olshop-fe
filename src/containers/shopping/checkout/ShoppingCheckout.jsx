import { useContext, useEffect, useState, useRef } from "react";
import { IconArrowLeft, IconArrowRight, IconPencil } from "@tabler/icons-react"
import ContainerComponent from "../../../components/general/container/ContainerComponent"
import BagCurrentOrder from './../../../images/temp/5c855532d5cc981711da2cd9d3b2c062.png'
import './shopping-checkout.scoped.scss'
import Api from "../../../utils/Api";
import Modal from 'react-bootstrap/Modal';
import { AuthUserContext } from "../../../context/AuthUserContext";
import { LoadingContext } from "../../../context/LoadingContext";
import { LanguageContext } from "../../../context/LanguageContext";
import StringUtil from "../../../utils/StringUtil";
import { Link } from "react-router-dom";
import Select from 'react-select';
import Flickity from 'react-flickity-component'
import Checkbox from "react-custom-checkbox";
import toast from 'react-hot-toast';

export default function ShoppingCheckout() {
    /**
     * Context
     * 
     */
    const { user } = useContext(AuthUserContext)
    const { setLoading } = useContext(LoadingContext)
    const { language } = useContext(LanguageContext)
    const formater = new Intl.NumberFormat(language == 'id' ? 'id-ID' : 'en-EN', { style: 'currency', currency: language == 'id' ? 'IDR' : 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 })

    /**
     * Main State
     * 
     */
    const [arrCarts, setArrCarts] = useState([])
    const [selected, setSelected] = useState({})
    const [selectedAddress, setSelectedAddress] = useState(0)
    const [modalChangeCourier, setModalChangeCourier] = useState(false)
    const flkty = useRef()
    const [couriers, setCouriers] = useState([]);
    const [selectedCourier, setSelectedCourier] = useState('')

    const [shippingFees, setShippingFees] = useState([]);
    const [selectedShippingFees, setSelectedShippingFees] = useState(-1);

    const [modalVoucher, setModalVoucher] = useState(false)

    useEffect(() => {
        setLoading(true)
        setSelected(JSON.parse(localStorage.getItem('selectedObj')))
        loadCarts()
        loadCouriers()
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
            setModalChangeCourier(true)
        })
    }

    const loadCouriers = () => {
        Api.get(`/courier`)
            .then((res) => {
                const r = Object.entries(res.data.data).map(([key, value]) => ({ value: value, label: key }));
                setCouriers(r);
                // setSelectedCourier(r[0]);
            });
    }

    useEffect(() => {
        if (selectedCourier != '' && user) {
            setLoading(true)
            Api.post('/ongkir', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('apiToken')
                },
                courier: selectedCourier.value,
                destination: user.addresses[selectedAddress].subdistrict_id,
                weight: arrCarts.reduce((p, c) => {
                    const key = `${c.id}`
                    if (key in selected) {
                        p += c.product.weight;
                    }
                    return p;
                }, 0),
            })
                .then((res) => {
                    setShippingFees(res.data.data[0].costs)
                    setSelectedShippingFees(-1);
                })
                .catch((error) => console.log(error))
                .finally(() => {
                    setLoading(false)
                    if (!modalChangeCourier) {
                        setModalChangeCourier(true)
                    }
                })
        }
    }, [selectedCourier, selectedAddress])

    const doOrder = () => {
        setLoading(true)
        const ongkir = selectedShippingFees != -1 ? shippingFees[selectedShippingFees].cost[0].value : 0;
        let total = ongkir;
        const details = [];

        for (const c of arrCarts) {
            const key = `${c.id}`
            if (key in selected) {
                const { qty } = selected[key];
                const price = language == 'id' ? Number(c.product.sale_price) : Number(c.product.sale_usd)
                const t = price * qty
                total += t
                details.push({
                    product_id: c.product.id,
                    qty: qty,
                    price: price,
                    total: t,
                })
            }
        }

        const data = {
            user_id: user.id,
            courier: selectedCourier.value,
            ongkir: ongkir,
            address_id: user.addresses[selectedAddress].id,
            // voucher: "",
            // discount: 10000,
            total: total + ((total - ongkir) * 0.01),
            note: "tes",
            details: details,
        };
        Api.post(`/order`, data, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apiToken')
            },
        }).then((res) => {
            setLoading(false)

            window.location.href = res.data.data.payment.invoice_url
        }).catch((err) => {
            setLoading(false)
        });
    }

    const [ vouchers, setVouchers ] = useState([]);
    const [ selectedVoucher, setSelectedVoucher ] = useState(null);

    const doLoadVouchers = () => {
        if (vouchers.length != 0) {
            setModalVoucher(true)
            return
        }

        setLoading(true);
        Api.get(`/voucher/?use_for=Product`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apiToken'),
            },
        }).then((res) => {
            setVouchers(res.data.data)
            setModalVoucher(true)
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false)
        })
    }

    const [ voucherCode, setVoucherCode ] = useState("");

    const doApplyVoucherCode = () => {
        setLoading(true);
        Api.get(`/voucher/${voucherCode}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apiToken'),
            },
        }).then((res) => {
            setSelectedVoucher(res.data.data)
            setModalVoucher(false)
        }).catch((err) => {
            toast.error("Voucher Not Found")
            console.log(err);
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <ContainerComponent>
            {/* Modal Create */}
            <Modal show={modalChangeCourier} centered onHide={() => {
                setModalChangeCourier(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Shipping Option</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-courier">
                        <div className="courier-option">
                            <div className="title">
                                Shipping Option
                            </div>
                            <div className="select">
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
                                    defaultOptions
                                    placeholder='COURIER'
                                    value={selectedCourier}
                                    onChange={setSelectedCourier}
                                    options={couriers} />
                            </div>
                        </div>
                        <div className="shipping-fee-contents">
                            {shippingFees.map((c, i) => {
                                return (
                                    <div className={`shipping-fee-content ${selectedShippingFees == i ? 'active' : ''}`} onClick={() => { setSelectedShippingFees(i) }}>
                                        <div className='top'>
                                            <div className='name'>
                                                {c.service}
                                            </div>
                                            <div className='price'>
                                                {user ? formater.format(Number(language == 'id' ? c.cost[0].value : c.cost[0].value)) : null}
                                            </div>
                                        </div>
                                        <div className='bottom'>
                                            Receive: {c.cost[0].etd}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='modal-courier-bottom'>
                        <button onClick={() => { setModalChangeCourier(false) }}>
                            CANCEL
                        </button>
                        <button onClick={() => { setModalChangeCourier(false) }}>
                            SUBMIT
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            {/* End of Modal Create */}
            {/* Modal Voucher */}
            <Modal show={modalVoucher} centered onHide={() => {
                setModalVoucher(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Voucher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-courier">
                        <div className="courier-option">
                            <div className="title">
                                Add Voucher
                            </div>
                            <div className="input-text">
                                <input type="text" className='form-control' name="voucher" id="voucher" onInput={(e) => setVoucherCode(e.currentTarget.value)} />
                            </div>
                            <button onClick={doApplyVoucherCode}>
                                APPLY
                            </button>
                        </div>
                        <div className="voucher-contents">
                            {vouchers.map((c) => {
                                return (
                                    <div className={`voucher-content`}>
                                        <div className="left">
                                            <div className="name">{c.name}</div>
                                            <div className="code">{c.code}</div>
                                            <div className="expiring">
                                                Expiring: {c.duration}
                                            </div>
                                        </div>
                                        <Checkbox borderColor={'#DADADA'} checked={selectedVoucher?.code == c.code} onChange={(value) => {setSelectedVoucher(value ? c : null)}} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='modal-courier-bottom'>
                        <button onClick={() => { setModalVoucher(false) }}>
                            CANCEL
                        </button>
                        <button onClick={() => { setModalVoucher(false) }}>
                            SUBMIT
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            {/* End of Modal Voucher */}
            <div className="shopping-checkout-wrapper">
                <h2 className="title-checkout">Check Out</h2>

                <div className="box-shipping-address">
                    <div className="action-box-shipping-address">
                        <div className="text-action-shipping-address">
                            <h4 className="text-select-shipping">Select Shipping Address</h4>
                            <Link className="only-desktop" to={`/account/address`}><h4 className="manage-address"><IconPencil size={20} /> Manage Address</h4></Link>
                            <Link className="only-mobile" to={`/profile/address`}><h4 className="manage-address"><IconPencil size={20} /> Manage Address</h4></Link>
                        </div>
                        <div className="arrow-wrap">
                            <button onClick={() => flkty.current.previous()} ><IconArrowLeft color="#828181" /></button>
                            <button onClick={() => flkty.current.next()}><IconArrowRight color="#FFAC33" /></button>
                        </div>
                    </div>
                    <div className="address-wrapper">
                        <Flickity flickityRef={(c) => { flkty.current = c }} options={{ pageDots: false, draggable: false, prevNextButtons: false, contain: true, cellAlign: 'left' }}>
                            {user.addresses?.map((addressObj, i) => (
                                <div className={`address-item ${i == selectedAddress ? "active" : ""}`} onClick={() => setSelectedAddress(i)}>
                                    <h5 className="address-title">{addressObj.tag}</h5>
                                    <div className="name-phone-number">
                                        <h5 className="address-name">{addressObj.name}</h5>
                                        <h5 className="address-phone">{addressObj.phone}</h5>
                                    </div>
                                    <p>{addressObj.address} {addressObj.full_address}</p>
                                </div>
                            ))}
                        </Flickity>
                    </div>
                </div>

                <hr />

                <div className="box-product-order">
                    <div className="head-row">
                        <div className="product-order-head">
                            <h4>Product Order</h4>
                        </div>
                        <div className="basc-order-head">
                            <span>Item Price</span>
                        </div>
                        <div className="basc-order-head">
                            <span>Quantity</span>
                        </div>
                        <div className="basc-order-head">
                            <span>Price</span>
                        </div>
                    </div>
                    {
                        arrCarts.reduce((p, c) => {
                            const key = `${c.id}`
                            if (key in selected) {
                                const { qty } = selected[key]
                                p.push(
                                    <div className="row-data">
                                        <div className="product-order-data">
                                            <img src={c.product.images[0]} alt="" />
                                            <div className="product-item-data-text">
                                                <h4>{c.product.name}</h4>
                                                <span>
                                                    {qty} pcs ({StringUtil.numberingWithDotFormat(Math.ceil(c.product.weight * qty))} gr)
                                                </span>
                                            </div>
                                        </div>
                                        <div className="basic-row-data">
                                            <h4>{formater.format(language == 'id' ? c.product.sale_price : c.product.sale_usd)}</h4>
                                        </div>
                                        <div className="basic-row-data">
                                            <h4>{qty}</h4>
                                        </div>
                                        <div className="basic-row-data basic-row-data__price">
                                            <h4>{formater.format((language == 'id' ? Number(c.product.sale_price) : Number(c.product.sale_usd)) * qty)}</h4>
                                        </div>
                                    </div>
                                );
                            }
                            return p;
                        }, [])
                    }
                </div>

                <div className="box-order-transaction">
                    <div className="recap-text">
                        <div className="left">
                            <div className="inner">
                                <h4>Notes</h4>
                                <input type="text" name="" id="" />
                            </div>
                        </div>
                        <div className="right">
                            <div className="inner">
                                <div>
                                    <h4>Shipping Option</h4>
                                </div>
                                <div>
                                    <h4 className="courier">Courier: {selectedShippingFees != -1 ? `${selectedCourier.label} - ${shippingFees[selectedShippingFees].service}` : "-"}</h4>
                                    <span>Receive: {selectedShippingFees != -1 ? shippingFees[selectedShippingFees].cost[0].etd : "-"}</span>
                                </div>
                                <div>
                                    <h4 onClick={() => { setModalChangeCourier(true) }}>Change</h4>
                                </div>
                                <div>
                                    <h4>{formater.format(selectedShippingFees != -1 ? shippingFees[selectedShippingFees].cost[0].value : 0)}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="basic-row basic-row__voucher">
                        <div className="left">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <path d="M14.8 8.01562L16 9.21562L9.2 16.0156L8 14.8156L14.8 8.01562ZM4 4.01562H20C21.11 4.01562 22 4.90562 22 6.01562V10.0156C21.4696 10.0156 20.9609 10.2263 20.5858 10.6014C20.2107 10.9765 20 11.4852 20 12.0156C20 12.5461 20.2107 13.0548 20.5858 13.4298C20.9609 13.8049 21.4696 14.0156 22 14.0156V18.0156C22 19.1256 21.11 20.0156 20 20.0156H4C3.46957 20.0156 2.96086 19.8049 2.58579 19.4298C2.21071 19.0548 2 18.5461 2 18.0156V14.0156C3.11 14.0156 4 13.1256 4 12.0156C4 11.4852 3.78929 10.9765 3.41421 10.6014C3.03914 10.2263 2.53043 10.0156 2 10.0156V6.01562C2 5.48519 2.21071 4.97648 2.58579 4.60141C2.96086 4.22634 3.46957 4.01563 4 4.01562ZM4 6.01562V8.55562C4.60768 8.90602 5.11236 9.41029 5.46325 10.0177C5.81415 10.6251 5.9989 11.3142 5.9989 12.0156C5.9989 12.7171 5.81415 13.4062 5.46325 14.0136C5.11236 14.621 4.60768 15.1252 4 15.4756V18.0156H20V15.4756C19.3923 15.1252 18.8876 14.621 18.5367 14.0136C18.1858 13.4062 18.0011 12.7171 18.0011 12.0156C18.0011 11.3142 18.1858 10.6251 18.5367 10.0177C18.8876 9.41029 19.3923 8.90602 20 8.55562V6.01562H4ZM9.5 8.01562C10.33 8.01562 11 8.68563 11 9.51562C11 10.3456 10.33 11.0156 9.5 11.0156C8.67 11.0156 8 10.3456 8 9.51562C8 8.68563 8.67 8.01562 9.5 8.01562ZM14.5 13.0156C15.33 13.0156 16 13.6856 16 14.5156C16 15.3456 15.33 16.0156 14.5 16.0156C13.67 16.0156 13 15.3456 13 14.5156C13 13.6856 13.67 13.0156 14.5 13.0156Z" fill="#E4A951" />
                            </svg>
                            <h4>Platform Voucher</h4>
                        </div>
                        <div className="right">
                            <h4 onClick={doLoadVouchers}>{ selectedVoucher == null ? "Enter code" : selectedVoucher.code}</h4>
                        </div>
                    </div>
                    { /* <div className="basic-row basic-row__payment">
                        <div className="left">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M5.25 4.5C4.25544 4.5 3.30161 4.89509 2.59835 5.59835C1.89509 6.30161 1.5 7.25544 1.5 8.25V9H22.5V8.25C22.5 7.25544 22.1049 6.30161 21.4016 5.59835C20.6984 4.89509 19.7446 4.5 18.75 4.5H5.25ZM22.5 10.5H1.5V15.75C1.5 16.7446 1.89509 17.6984 2.59835 18.4017C3.30161 19.1049 4.25544 19.5 5.25 19.5H18.75C19.7446 19.5 20.6984 19.1049 21.4016 18.4017C22.1049 17.6984 22.5 16.7446 22.5 15.75V10.5ZM15.75 15H18.75C18.9489 15 19.1397 15.079 19.2803 15.2197C19.421 15.3603 19.5 15.5511 19.5 15.75C19.5 15.9489 19.421 16.1397 19.2803 16.2803C19.1397 16.421 18.9489 16.5 18.75 16.5H15.75C15.5511 16.5 15.3603 16.421 15.2197 16.2803C15.079 16.1397 15 15.9489 15 15.75C15 15.5511 15.079 15.3603 15.2197 15.2197C15.3603 15.079 15.5511 15 15.75 15Z" fill="#151B4F" />
                            </svg>
                            <h4>Method Payment</h4>
                        </div>
                        <div className="right">
                            <h4>Transfer bank</h4>
                        </div>
                    </div */ }
                    <div className="price-row">
                        <div>
                            <h4>Transfer bank</h4>
                            <h4>
                                {formater.format(
                                    arrCarts.reduce((p, c) => {
                                        const key = `${c.id}`
                                        if (key in selected) {
                                            const { qty } = selected[key];
                                            return p + ((language == 'id' ? Number(c.product.sale_price) : Number(c.product.sale_usd)) * qty)
                                        }
                                        return p;
                                    }, 0)
                                )}
                            </h4>
                        </div>
                        <div>
                            <h4>Shipping Total</h4>
                            <h4>{formater.format(selectedShippingFees != -1 ? shippingFees[selectedShippingFees].cost[0].value : 0)}</h4>
                        </div>
                        <div>
                            <h4>Handling fee</h4>
                            <h4>
                                {formater.format(
                                    arrCarts.reduce((p, c) => {
                                        const key = `${c.id}`
                                        if (key in selected) {
                                            const { qty } = selected[key];
                                            return p + ((language == 'id' ? Number(c.product.sale_price) : Number(c.product.sale_usd)) * qty)
                                        }
                                        return p;
                                    }, 0) * 0.01
                                )}
                            </h4>
                        </div>
                        <div className="total">
                            <h4>Total Payment</h4>
                            <h4>
                                {formater.format(
                                    arrCarts.reduce((p, c) => {
                                        const key = `${c.id}`
                                        if (key in selected) {
                                            const { qty } = selected[key];
                                            return p + ((language == 'id' ? Number(c.product.sale_price) : Number(c.product.sale_usd)) * qty)
                                        }
                                        return p;
                                    }, selectedShippingFees != -1 ? shippingFees[selectedShippingFees].cost[0].value : 0)
                                    +
                                    (arrCarts.reduce((p, c) => {
                                        const key = `${c.id}`
                                        if (key in selected) {
                                            const { qty } = selected[key];
                                            return p + ((language == 'id' ? Number(c.product.sale_price) : Number(c.product.sale_usd)) * qty)
                                        }
                                        return p;
                                    }, 0) * 0.01)
                                )}
                            </h4>
                        </div>
                    </div>
                    <div className="btn-row">
                        <button onClick={doOrder}>Place Order</button>
                    </div>
                </div>
            </div>
        </ContainerComponent>
    )
}
