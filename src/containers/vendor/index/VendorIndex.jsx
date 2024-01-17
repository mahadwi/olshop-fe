import { useContext, useEffect, useState } from "react";
import AccountOrderLayoutComponent from "../../../components/general/account-order-layout/AccountOrderLayoutComponent";
import './vendor.scoped.scss'
import { useLocation } from 'react-router-dom'
import 'react-responsive-modal/styles.css';
import AsyncSelect from 'react-select/async';
import Api from "../../../utils/Api";
import Modal from 'react-bootstrap/Modal';
import { LoadingContext } from "../../../context/LoadingContext";
import ApiErrorHandling from "../../../utils/ApiErrorHandling";
import { AuthUserContext } from "../../../context/AuthUserContext";
import WelcomeImage from '../../../images/online shopping app.png';
import ContainerComponent from "../../../components/general/container/ContainerComponent";

export default function VendorIndex() {

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
    const [step, setStep] = useState(-1);

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='vendor'>
            <ContainerComponent>
                { step == -1 ?
                    <div className='bg-white'>
                        <div className='welcome'>
                            <div className='img-wrapper'>
                                <img src={WelcomeImage} alt='ilustrator' />
                            </div>
                            <div className='title'>Welcome to LUXI!</div>
                            <div className='description'>To start as a vendor, register and complete the following information by clicking start registration</div>
                            <button onClick={() => setStep(0)} >Start Registration</button>
                        </div>
                    </div>
                : null }
                { step == 0 ?
                    <div className='step-1 bg-white'>
                        <div className='steps'>
                            <div className='step active'>Account Information</div>
                            <div className='step'>Product Information</div>
                            <div className='step'>Review & Authentic</div>
                            <div className='step'>Listing Product</div>
                        </div>
                        <div className='divider' />
                        <div className='content'>
                            <form action="">
                                <div className="form-input">
                                    <div className="form-group">
                                        <div className="left-form-group">
                                            <label className='form-label' htmlFor="name">Name</label>
                                        </div>
                                        <div className="center-form-group">
                                            <span>:</span>
                                        </div>
                                        <div className="right-form-group">
                                            <input type="text" className='form-control disabled' name="name" id="name" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="left-form-group">
                                            <label className='form-label' htmlFor="email">Email</label>
                                        </div>
                                        <div className="center-form-group">
                                            <span>:</span>
                                        </div>
                                        <div className='right-form-group'>
                                            <input type="email" className='form-control' name="email" id="email" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="left-form-group">
                                            <label className='form-label' htmlFor="phone">Phone Number</label>
                                        </div>
                                        <div className="center-form-group">
                                            <span>:</span>
                                        </div>
                                        <div className='right-form-group'>
                                            <input type="email" className='form-control' name="phone" id="phone" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="left-form-group">
                                            <label className='form-label' htmlFor="nik">NIK</label>
                                        </div>
                                        <div className="center-form-group">
                                            <span>:</span>
                                        </div>
                                        <div className='right-form-group'>
                                            <input type="email" className='form-control' name="nik" id="nik" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="left-form-group">
                                            <label className='form-label' htmlFor="bank">Nama Bank</label>
                                        </div>
                                        <div className="center-form-group">
                                            <span>:</span>
                                        </div>
                                        <div className='right-form-group'>

                                        <AsyncSelect cacheOptions loadOptions={() => []} defaultOptions />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="left-form-group">
                                            <label className='form-label' htmlFor="rekening">No Rekening</label>
                                        </div>
                                        <div className="center-form-group">
                                            <span>:</span>
                                        </div>
                                        <div className='right-form-group'>
                                            <input type="email" className='form-control' name="rekening" id="rekening" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="left-form-group">
                                            <label className='form-label' htmlFor="penerima">Nama Penerima</label>
                                        </div>
                                        <div className="center-form-group">
                                            <span>:</span>
                                        </div>
                                        <div className='right-form-group'>
                                            <input type="email" className='form-control' name="penerima" id="penerima" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="left-form-group">
                                            <label className='form-label' htmlFor="alamat">Alamat</label>
                                        </div>
                                        <div className="center-form-group">
                                            <span>:</span>
                                        </div>
                                        <div className='right-form-group'>
                                            <textarea name="address" id="alamat" class="form-control " placeholder="Address" cols="30" rows="10" style={{height: "100px"}}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='divider' />
                        <div className='bottom'>
                            <button onClick={() => setStep(-1)}>CANCEL</button>
                            <button onClick={() => setStep(1)}>NEXT</button>
                        </div>
                    </div>
                : null }
                { step == 1 ?
                    <div className='step-1 bg-white'>
                        <div className='steps'>
                            <div className='step'>Account Information</div>
                            <div className='step active'>Product Information</div>
                            <div className='step'>Review & Authentic</div>
                            <div className='step'>Listing Product</div>
                        </div>
                    </div>
                : null }
            </ContainerComponent>
      </div>
    )
}
