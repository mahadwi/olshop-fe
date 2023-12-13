import { useContext, useEffect, useState } from "react";
import AccountOrderLayoutComponent from "../../../components/general/account-order-layout/AccountOrderLayoutComponent";
import './address.scoped.scss'
import { useLocation } from 'react-router-dom'
import 'react-responsive-modal/styles.css';
import AsyncSelect from 'react-select/async';
import Api from "../../../utils/Api";
import Modal from 'react-bootstrap/Modal';
import { LoadingContext } from "../../../context/LoadingContext";
import ApiErrorHandling from "../../../utils/ApiErrorHandling";

export default function AddressIndex() {

    /**
     * Hooks
     * 
     */
    const { pathname } = useLocation();

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
    const [modalCreateAddressShow, setModalCreateAddressShow] = useState(false)
    const [nameCreateAddress, setNameCreateAddress] = useState('')
    const [phoneCreateAddress, setPhoneCreateAddress] = useState('')
    const [addressCreateAddress, setAddressCreateAddress] = useState('')
    const [subDistrictCreateAddress, setSubDistrictCreateAddress] = useState({ value: '', label: '' })
    const [tagCreateAddress, setTagCreateAddress] = useState('')
    const [errorObj422, setErrorObj422] = useState({})

    useEffect(() => {
        loadBreadcrumb()
        // loadArrAddress()
    }, [])

    const loadBreadcrumb = () => {
        setBreadcrumb([
            {
                label: 'Home',
                url: '/'
            },
            {
                label: 'My Account'
            }
        ])
    }

    const loadDistricts = (inputValue, cb) => {
        if (inputValue.length > 2) {
            setTimeout(async () => {
                try {
                    const response = await Api.get(`/kecamatan?name=${inputValue}`)

                    cb(response.data.data.map((e) => {
                        return {
                            value: e.id,
                            label: e.name
                        }
                    }))
                } catch (error) {

                }
            }, 1000);
        }
    }

    const doSaveAddress = () => {
        setErrorObj422({})
        setLoading(true)

        Api.post('/address', {
            name: nameCreateAddress,
            phone: phoneCreateAddress,
            address: addressCreateAddress,
            subdistrict_id: subDistrictCreateAddress.value,
            tag: tagCreateAddress,
            is_primary: false
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apiToken')
            }
        }).then((res) => {
            if (res) {
                setModalCreateAddressShow(false)
                setNameCreateAddress('')
                setPhoneCreateAddress('')
                setAddressCreateAddress('')
                setSubDistrictCreateAddress({ value: '', label: '' })
                setTagCreateAddress('')

                // loadArrAddress()
            }
        }).catch((err) => {
            ApiErrorHandling.handlingErr(err, [setErrorObj422])
        }).finally(() => {
            setLoading(false)
        })
    }

    const loadArrAddress = () => {
        Api.get('/address', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apiToken')
            }
        }).then((res) => {
            if (res) {
                console.log(res.data.data)
            }
        })
    }

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <AccountOrderLayoutComponent breadcrumb={breadcrumb} position={'Address'} title={'Address'} buttonAddress={true} setShowButtonAddress={setModalCreateAddressShow}>

            <div className="addresess" data-id="fksdfjsn">

                {/* Modal Create */}
                <Modal show={modalCreateAddressShow} onHide={() => {
                    setModalCreateAddressShow(false)
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal Create Address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="form-group mb-1">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="name" className={`form-control ${errorObj422.name ? 'is-invalid' : ''}`} placeholder="Name" value={nameCreateAddress} onChange={(e) => {
                                    setNameCreateAddress(e.target.value)
                                }} />

                                {
                                    errorObj422.name ?
                                        <div className="invalid-feedback">
                                            {errorObj422.name}
                                        </div> : <></>
                                }
                            </div>
                            <div className="form-group mb-1">
                                <label htmlFor="phone">Phone</label>
                                <input type="number" name="phone" id="phone" className={`form-control ${errorObj422.phone ? 'is-invalid' : ''}`} placeholder="Phone" value={phoneCreateAddress} onChange={(e) => {
                                    setPhoneCreateAddress(e.target.value)
                                }} />

                                {
                                    errorObj422.phone ?
                                        <div className="invalid-feedback">
                                            {errorObj422.phone}
                                        </div> : <></>
                                }
                            </div>
                            <div className="form-group mb-1">
                                <label htmlFor="address">Address</label>
                                <textarea name="address" style={{ height: '200px' }} id="address" className={`form-control ${errorObj422.address ? 'is-invalid' : ''}`} placeholder="Address" cols="30" rows="10" value={addressCreateAddress} onChange={(e) => {
                                    setAddressCreateAddress(e.target.value)
                                }}></textarea>

                                {
                                    errorObj422.address ?
                                        <div className="invalid-feedback">
                                            {errorObj422.address}
                                        </div> : <></>
                                }
                            </div>
                            <div className="form-group mb-1">
                                <label htmlFor="sub_district">Sub District</label>
                                <AsyncSelect cacheOptions loadOptions={loadDistricts} defaultOptions value={subDistrictCreateAddress} onChange={(val) => {
                                    setSubDistrictCreateAddress(val)
                                }} />

                                {
                                    errorObj422.subdistrict_id ?
                                        <div className="text-danger">
                                            {errorObj422.subdistrict_id}
                                        </div> : <></>
                                }
                            </div>
                            <div className="form-group mb-1">
                                <label htmlFor="tag">Tag</label>
                                <input type="text" name="tag" id="tag" className={`form-control ${errorObj422.tag ? 'is-invalid' : ''}`} placeholder="Tag" value={tagCreateAddress} onChange={(e) => {
                                    setTagCreateAddress(e.target.value)
                                }} />

                                {
                                    errorObj422.tag ?
                                        <div className="invalid-feedback">
                                            {errorObj422.tag}
                                        </div> : <></>
                                }
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={() => {
                            setModalCreateAddressShow(false)
                        }} className="btn btn-secondary">Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => {
                            doSaveAddress()
                        }}>Add Address</button>
                    </Modal.Footer>
                </Modal>
                {/* End of Modal Create */}

                <div className="address-box active">
                    <div className="inner-address-box">
                        <div className="top">
                            <h4 className="place-text">Home</h4>
                            <div className="list-button">
                                <button className="edit">Edit</button>
                                <button className="set-default">Set as default</button>
                                <button className="delete">Delete</button>
                            </div>
                        </div>
                        <div className="middle">
                            <h4 className="name-text">Roberto Marquez</h4>
                            <h4 className="number-phone-text">(+62) 89000111222</h4>
                        </div>
                        <div className="bottom">
                            <p>Jl. Lidah Bukit Mas, Lidah Wetan, Kec. Lakarsantri, Surabaya, Jawa Timur 60213</p>
                        </div>
                    </div>
                </div>
                <div className="address-box">
                    <div className="inner-address-box">
                        <div className="top">
                            <h4 className="place-text">Home</h4>
                            <div className="list-button">
                                <button className="edit">Edit</button>
                                <button className="set-default">Set as default</button>
                                <button className="delete">Delete</button>
                            </div>
                        </div>
                        <div className="middle">
                            <h4 className="name-text">Roberto Marquez</h4>
                            <h4 className="number-phone-text">(+62) 89000111222</h4>
                        </div>
                        <div className="bottom">
                            <p>Jl. Lidah Bukit Mas, Lidah Wetan, Kec. Lakarsantri, Surabaya, Jawa Timur 60213</p>
                        </div>
                    </div>
                </div>
                <div className="address-box">
                    <div className="inner-address-box">
                        <div className="top">
                            <h4 className="place-text">Home</h4>
                            <div className="list-button">
                                <button className="edit">Edit</button>
                                <button className="set-default">Set as default</button>
                                <button className="delete">Delete</button>
                            </div>
                        </div>
                        <div className="middle">
                            <h4 className="name-text">Roberto Marquez</h4>
                            <h4 className="number-phone-text">(+62) 89000111222</h4>
                        </div>
                        <div className="bottom">
                            <p>Jl. Lidah Bukit Mas, Lidah Wetan, Kec. Lakarsantri, Surabaya, Jawa Timur 60213</p>
                        </div>
                    </div>
                </div>
            </div>
        </AccountOrderLayoutComponent>
    )
}