import { useContext, useEffect } from "react";
import './vendorstep1.scoped.scss'
import { useLocation } from 'react-router-dom'
import 'react-responsive-modal/styles.css';
import AsyncSelect from 'react-select/async';
import { AuthUserContext } from "../../../context/AuthUserContext";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function VendorStep1() {

    /**
     * Hooks
     * 
     */
    const { pathname } = useLocation();
    const { t } = useTranslation();
    const navigate = useNavigate()

    /**
     * Context
     * 
     */
    const { user } = useContext(AuthUserContext)

    /**
     * Main State
     * 
     */

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='vendor'>
            <ContainerComponent>
                <div className='step-1 bg-white'>
                    <div className='steps'>
                        <div className='step active'>{t('accountinformation')}</div>
                        <div className='step'>{t('productinformation')}</div>
                        <div className='step'>{t('reviewauthentic')}</div>
                        <div className='step'>{t('listingproduct')}</div>
                    </div>
                    <div className='divider' />
                    <div className='content'>
                        <form action="">
                            <div className="form-input">
                                <div className="form-group">
                                    <div className="left-form-group">
                                        <label className='form-label' htmlFor="name">{t('name')}</label>
                                    </div>
                                    <div className="center-form-group">
                                        <span>:</span>
                                    </div>
                                    <div className="right-form-group">
                                        <input className="form-control" type="text" className='form-control disabled' name="name" id="name" />
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
                                        <input className="form-control" type="email" disabled name="email" id="email" value={user.email} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="left-form-group">
                                        <label className='form-label' htmlFor="phone">{t('phonenumber')}</label>
                                    </div>
                                    <div className="center-form-group">
                                        <span>:</span>
                                    </div>
                                    <div className='right-form-group form-group__phone-number'>
                                        <select name="" id="" className='form-control'>
                                            <option value="+62">+62</option>
                                        </select>
                                        <input className="form-control" type="email" className='form-control' name="phone" id="phone" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="left-form-group">
                                        <label className='form-label' htmlFor="nik">{t('idcardnumber')}</label>
                                    </div>
                                    <div className="center-form-group">
                                        <span>:</span>
                                    </div>
                                    <div className='right-form-group'>
                                        <input className="form-control" type="email" className='form-control' name="nik" id="nik" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="left-form-group">
                                        <label className='form-label' htmlFor="bank">{t('bankname')}</label>
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
                                        <label className='form-label' htmlFor="rekening">{t('accountnumber')}</label>
                                    </div>
                                    <div className="center-form-group">
                                        <span>:</span>
                                    </div>
                                    <div className='right-form-group'>
                                        <input className="form-control" type="email" className='form-control' name="rekening" id="rekening" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="left-form-group">
                                        <label className='form-label' htmlFor="penerima">{t('recipientname')}</label>
                                    </div>
                                    <div className="center-form-group">
                                        <span>:</span>
                                    </div>
                                    <div className='right-form-group'>
                                        <input className="form-control" type="email" className='form-control' name="penerima" id="penerima" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="left-form-group">
                                        <label className='form-label' htmlFor="alamat">{t('address')}</label>
                                    </div>
                                    <div className="center-form-group">
                                        <span>:</span>
                                    </div>
                                    <div className='right-form-group'>
                                        <textarea name="address" id="alamat" class="form-control " placeholder="Address" cols="30" rows="10" style={{ height: "100px" }}></textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='divider' />
                    <div className='bottom'>
                        <button onClick={() => navigate('..')}>{t('cancel').toUpperCase()}</button>
                        <button onClick={() => navigate('../2')}>{t('next').toUpperCase()}</button>
                    </div>
                </div>
            </ContainerComponent>
        </div>
    )
}
