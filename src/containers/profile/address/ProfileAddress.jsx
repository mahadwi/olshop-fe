import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from 'react-router-dom'
import './profile-address.scoped.scss';
import Modal from 'react-bootstrap/Modal';
import AsyncSelect from 'react-select/async';
import { AuthUserContext } from "../../../context/AuthUserContext";
import { LoadingContext } from "../../../context/LoadingContext";
import Api from "../../../utils/Api";
import ApiErrorHandling from "../../../utils/ApiErrorHandling";
import ProductItemComponent from "../../../components/general/product-item/ProductItemComponent";
import { useTranslation } from "react-i18next";

require('rc-checkbox/assets/index.css');

export default function ProfileAddress() {

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
    const { user, refreshUser } = useContext(AuthUserContext)

    /**
     * Main State
     * 
     */
    const [modalCreateAddress, setModalCreateAddress] = useState(false)
    const [modalEditAddress, setModalEditAddress] = useState(false)
    const [nameCreateAddress, setNameCreateAddress] = useState('')
    const [phoneCreateAddress, setPhoneCreateAddress] = useState('')
    const [addressCreateAddress, setAddressCreateAddress] = useState('')
    const [subDistrictCreateAddress, setSubDistrictCreateAddress] = useState({ value: '', label: '' })
    const [tagCreateAddress, setTagCreateAddress] = useState('Home')
    const [errorObj422, setErrorObj422] = useState({})
    const [objEditAddress, setObjEditAddress] = useState({})
    const [selectedSubDistrictEdit, setSelectedSubDistrictEdit] = useState({ value: '', label: '' })

    const loadDistricts = (inputValue, cb) => {
        if (inputValue.length > 2) {
            setTimeout(async () => {
                try {
                    const response = await Api.get(`/kecamatan?name=${inputValue}`)

                    cb(response.data.data.map((e) => {
                        return {
                            value: e.id,
                            label: e.fullname
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
                setModalCreateAddress(false)
                setNameCreateAddress('')
                setPhoneCreateAddress('')
                setAddressCreateAddress('')
                setSubDistrictCreateAddress({ value: '', label: '' })
                setTagCreateAddress('')

                refreshUser()
            }
        }).catch((err) => {
            ApiErrorHandling.handlingErr(err, [setErrorObj422])
        }).finally(() => {
            setLoading(false)
        })
    }

    const doSetDefault = (objAddress) => {
        setLoading(true)

        Api.put(`/address/${objAddress.id}`, {
            name: objAddress.name,
            phone: objAddress.phone,
            address: objAddress.phone,
            subdistrict_id: objAddress.subdistrict_id,
            tag: objAddress.tag,
            is_primary: true
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apiToken')
            }
        }).then((res) => {
            if (res) {
                refreshUser()
            }
        }).catch((err) => {

        }).finally(() => {
            setLoading(false)
        })
    }

    const doUpdateAddress = () => {
        setErrorObj422({})
        setLoading(true)

        Api.put(`/address/${objEditAddress.id}`, {
            name: objEditAddress.name,
            phone: objEditAddress.phone,
            address: objEditAddress.phone,
            subdistrict_id: selectedSubDistrictEdit.value,
            tag: objEditAddress.tag,
            is_primary: objEditAddress.is_primary
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apiToken')
            }
        }).then((res) => {
            if (res) {
                setObjEditAddress({})
                setSelectedSubDistrictEdit({ value: '', label: '' })

                refreshUser()
                setModalEditAddress(false)
            }
        }).catch((err) => {
            ApiErrorHandling.handlingErr(err, [setErrorObj422])
        }).finally(() => {
            setLoading(false)
        })
    }

    const doDeleteAddress = (id) => {
        if(window.confirm("Are you sure ?")) {
            setLoading(true)

            Api.delete(`/address/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('apiToken')
                }
            }).then(() => {
                refreshUser();
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                setLoading(false)
            });
        }
    };

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='profile-address-page'>
            {/* Modal Create */}
            <Modal show={modalCreateAddress} onHide={() => {
                setModalCreateAddress(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className='row gx-3'>
                            <div className="col form-group mb-3">
                                <label htmlFor="name" className="d-none">Name</label>
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
                            <div className="col form-group mb-3">
                                <label htmlFor="phone" className="d-none">Phone</label>
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
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="address" className="d-none">Address</label>
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
                        <div className="form-group mb-3">
                            <label htmlFor="sub_district" className="d-none">Sub District</label>
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
                        <div className="form-group">
                            <div className="row justify-content-between align-items-center">
                                <div className="col address-label">Mark as:</div>
                                <div className="col text-end">
                                    <button className={`address-mark-as ${tagCreateAddress == "Office" ? "active":""}`} onClick={() => setTagCreateAddress('Office')}>
                                        Office
                                    </button>
                                    <button className={`address-mark-as ${tagCreateAddress == "Home" ? "active":""}`} onClick={() => setTagCreateAddress('Home')}>
                                        Home
                                    </button>
                                </div>
                            </div>
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
                        setModalCreateAddress(false)
                    }} className="cancel-button">Cancel</button>
                    <button type="button" className="send-button" onClick={() => {
                        doSaveAddress()
                    }}>Send</button>
                </Modal.Footer>
            </Modal>
            {/* End of Modal Create */}

            {/* Modal Edit Address */}
            <Modal show={modalEditAddress} onHide={() => {
                setModalEditAddress(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="row gx-3">
                            <div className="col form-group mb-3">
                                <label htmlFor="name" className="d-none">Name</label>
                                <input type="text" name="name" id="name" className={`form-control ${errorObj422.name ? 'is-invalid' : ''}`} placeholder="Name" value={objEditAddress.name} onChange={(e) => {
                                    setObjEditAddress(() => {
                                        let obj = Object.assign({}, objEditAddress)
                                        obj.name = e.target.value

                                        return obj
                                    })
                                }} />

                                {
                                    errorObj422.name ?
                                        <div className="invalid-feedback">
                                            {errorObj422.name}
                                        </div> : <></>
                                }
                            </div>
                            <div className="col form-group mb-3">
                                <label htmlFor="phone" className="d-none">Phone</label>
                                <input type="number" name="phone" id="phone" className={`form-control ${errorObj422.phone ? 'is-invalid' : ''}`} placeholder="Phone" value={objEditAddress.phone} onChange={(e) => {
                                    setObjEditAddress(() => {
                                        let obj = Object.assign({}, objEditAddress)
                                        obj.phone = e.target.value

                                        return obj
                                    })
                                }} />

                                {
                                    errorObj422.phone ?
                                        <div className="invalid-feedback">
                                            {errorObj422.phone}
                                        </div> : <></>
                                }
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="address" className="d-none">Address</label>
                            <textarea name="address" style={{ height: '200px' }} id="address" className={`form-control ${errorObj422.address ? 'is-invalid' : ''}`} placeholder="Address" cols="30" rows="10" value={objEditAddress.address} onChange={(e) => {
                                setObjEditAddress(() => {
                                    let obj = Object.assign({}, objEditAddress)
                                    obj.address = e.target.value

                                    return obj
                                })
                            }}></textarea>

                            {
                                errorObj422.address ?
                                    <div className="invalid-feedback">
                                        {errorObj422.address}
                                    </div> : <></>
                            }
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="sub_district" className="d-none">Sub District</label>
                            <AsyncSelect cacheOptions loadOptions={loadDistricts} defaultOptions value={selectedSubDistrictEdit} onChange={(val) => {
                                setSelectedSubDistrictEdit(val)
                            }} />

                            {
                                errorObj422.subdistrict_id ?
                                    <div className="text-danger">
                                        {errorObj422.subdistrict_id}
                                    </div> : <></>
                            }
                        </div>
                        <div className="form-group">
                            <div className="row justify-content-between align-items-center">
                                <div className="col address-label">Mark as:</div>
                                <div className="col text-end">
                                    <button className={`address-mark-as ${objEditAddress.tag == "Office" ? "active":""}`} onClick={() => {
                                        setObjEditAddress(() => {
                                            let obj = Object.assign({}, objEditAddress)

                                            obj.tag = "Office"

                                            return obj
                                        })
                                    }}>
                                        Office
                                    </button>
                                    <button className={`address-mark-as ${objEditAddress.tag == "Home" ? "active":""}`} onClick={() => {
                                        setObjEditAddress(() => {
                                            let obj = Object.assign({}, objEditAddress)

                                            obj.tag = "Home"

                                            return obj
                                        })
                                    }}>
                                        Home
                                    </button>
                                </div>
                            </div>
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
                        setModalEditAddress(false)
                    }} className="cancel-button">Cancel</button>
                    <button type="button" className="send-button" onClick={() => {
                        doUpdateAddress()
                    }}>Send</button>
                </Modal.Footer>
            </Modal>
            {/* End of Modal Edit Address */}
            <div className='addresses'>
                {
                    user.addresses.map((addressObj) => (
                        <div className={`address-box ${addressObj.is_primary ? 'active' : ''}`}>
                            <div className="inner-address-box">
                                <div className="top">
                                    <h4 className="place-text">{addressObj.tag}</h4>
                                    <div className="list-button">
                                        <button className="edit" type="button" onClick={() => {
                                            setSelectedSubDistrictEdit({ value: addressObj.subdistrict_id, label: addressObj.subdistrict })
                                            setObjEditAddress(addressObj)
                                            setModalEditAddress(true)
                                        }}>Edit</button>
                                        <div className="divider" />
                                        <button type="button" onClick={() => {
                                            doSetDefault(addressObj)
                                        }} className="set-default" style={{ color: addressObj.is_primary ? '#A2A3B1' : '#FFAC33', cursor: addressObj.is_primary ? 'default' : 'pointer' }}>Set as default</button>
                                        {
                                            !addressObj.is_primary ?
                                                <><div className="divider" />
                                                <button className="delete" onClick={() => doDeleteAddress(addressObj.id)}>Delete</button></> : <></>
                                        }
                                    </div>
                                </div>
                                <div className="middle">
                                    <h4 className="name-text">{addressObj.name}</h4>
                                    <div className="divider"/>
                                    <h4 className="number-phone-text">{addressObj.phone}</h4>
                                </div>
                                <div className="bottom">
                                    <p>{addressObj.address}, {addressObj.full_address}</p>
                                </div>
                                {
                                    addressObj.is_primary ?
                                        <div className="bottom-bottom">
                                            <p>Default</p>
                                        </div> : <></>
                                }
                            </div>
                        </div>
                    ))
                }
                <div className="form-group__btn-save">
                    <Link to={'..'} className='btn-back'>Back</Link>
                    <button type='button' className='btn-add-new-address' onClick={() => setModalCreateAddress(true)}>Add New Address</button>
                </div>
            </div>
        </div>
    )
}
