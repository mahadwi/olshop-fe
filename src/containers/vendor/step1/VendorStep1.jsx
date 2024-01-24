import { useContext, useEffect, useState } from "react";
import './vendorstep1.scoped.scss'
import { useLocation } from 'react-router-dom'
import 'react-responsive-modal/styles.css';
import Select from 'react-select';
import { AuthUserContext } from "../../../context/AuthUserContext";
import { LoadingContext } from "../../../context/LoadingContext";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Api from '../../../utils/Api'

const PHONE_NUMBER_CODE = [
    '+62',
    '+1',
];

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
    const { setLoading } = useContext(LoadingContext)
    const { user } = useContext(AuthUserContext)

    /**
     * Main State
     * 
     */
    const [banks, setBanks] = useState([]);
    const [selectedBank, setSelectedBank] = useState(null);

    const [name, setName] = useState('');
    const [phoneCode, setPhoneCode] = useState('+62');
    const [phone, setPhone] = useState('');
    const [ktp, setKtp] = useState('');
    const [bankAccountHolder, setBankAccountHolder] = useState('');
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [address, setAddress] = useState('');

    const doReg = () => {
        const data = {
            name: name,
            email: user.email,
            phone: `${phoneCode}${phone}`,
            ktp: ktp,
            bank: selectedBank?.value,
            bank_account_holder: bankAccountHolder,
            bank_account_number: bankAccountNumber,
            address: address,
        };
        console.log(data);
        navigate('../2')
        // setLoading(true);
        // Api.post('/vendor', data, {
        //     headers: {
        //         Authorization: 'Bearer ' + localStorage.getItem('apiToken')
        //     }
        // }).then((res) => {
        //     console.log(res.data);
        // }).catch((err) => {
        //     console.log(err);
        // }).finally(() => {
        //     setLoading(false);
        //     navigate('../2')
        // })
    }

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setLoading(true);
        Api.get('/bank-code').then((res) => {
            setBanks(res.data.data.map((v) => ({ value: v.code, label: v.name })));
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }, [])

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
                                        <input className="form-control" type="text" className='form-control disabled' name="name" id="name" onInput={(event) => setName(event.currentTarget.value)} />
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
                                        <select name="" id="" className='form-control' onChange={(event) => setPhoneCode(event.currentTarget.value)}>
                                            {
                                                PHONE_NUMBER_CODE.map((v) => <option selected={v == phoneCode} value={v}>{v}</option>)
                                            }
                                        </select>
                                        <input className="form-control" type="email" className='form-control' name="phone" id="phone" onInput={(event) => setPhone(event.currentTarget.value)} />
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
                                        <input className="form-control" type="email" className='form-control' name="nik" id="nik" onInput={(event) => setKtp(event.currentTarget.value)} />
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
                                                singleValue: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    color: '#000',
                                                    fontSize: '12px',
                                                    fontWeight: '500',
                                                    fontFamily: "'Cabin', sans-serif"
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
                                            name='banks'
                                            defaultOptions
                                            placeholder={''}
                                            value={selectedBank}
                                            onChange={setSelectedBank}
                                            options={banks} />
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
                                        <input className="form-control" type="email" className='form-control' name="rekening" id="rekening" onInput={(event) => setBankAccountNumber(event.currentTarget.value)} />
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
                                        <input className="form-control" type="email" className='form-control' name="penerima" id="penerima" onInput={(event) => setBankAccountHolder(event.currentTarget.value)} />
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
                                        <textarea name="address" id="alamat" class="form-control " cols="30" rows="10" style={{ height: "100px" }} onInput={(event) => setAddress(event.currentTarget.value)}></textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='divider' />
                    <div className='bottom'>
                        <button onClick={() => navigate('..')}>{t('cancel').toUpperCase()}</button>
                        <button onClick={doReg}>{t('next').toUpperCase()}</button>
                    </div>
                </div>
            </ContainerComponent>
        </div>
    )
}
