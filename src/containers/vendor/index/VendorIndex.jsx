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
import { LanguageContext } from "../../../context/LanguageContext";
import { CurrencyContext } from "../../../context/CurrencyContext";
import WelcomeImage from '../../../images/online shopping app.png';
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { IconList, IconPlus, IconLayoutGrid } from "@tabler/icons-react";
import Select from 'react-select';
import { useTranslation } from "react-i18next";

const STEP_1_DATA_DUMMY = [
    {
        image: "https://dev-olshop.berkatsoft.com/image/product/6544a6bc8f3ae.jpg",
        name: "Channle Anmoller",
        price: "35000000",
        price_usd: "235",
        stock: 1,
        date: "13/12/2023 13:00:00",
        status: "In Review"
    },
    {
        image: "https://dev-olshop.berkatsoft.com/image/product/656a6feb1203b.jpeg",
        name: "CROC-EFFECT GRECA GODDESS MINI BAG",
        price: "49303",
        price_usd: "95",
        stock: 1,
        date: "13/12/2023 13:00:00",
        status: "Approved"
    },
];

export default function VendorIndex() {

    /**
     * Hooks
     * 
     */
    const { pathname } = useLocation();
    const { t } = useTranslation();

    /**
     * Context
     * 
     */
    const { setLoading } = useContext(LoadingContext)
    const { user, refreshUser } = useContext(AuthUserContext)
    const { language } = useContext(LanguageContext)
    const { currency } = useContext(CurrencyContext)
    const formater = new Intl.NumberFormat(currency == 'id' ? 'id-ID' : 'en-EN', { style: 'currency', currency: currency == 'id' ? 'IDR' : 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 })
    const [sellItemIsOpen, setSellItemIsOpen] = useState(false)
    const [modalPratinjau, setModalPratinjau] = useState(false)

    /**
     * Main State
     * 
     */
    const [step, setStep] = useState(-1);
    const [layout, setLayout] = useState("list");

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='vendor'>

            {/* Modal Create */}
            <Modal size="lg" show={modalPratinjau} onHide={() => {
                setModalPratinjau(false)
            }}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-prainjau-body">
                        <p className="title-body">{t('preview')}</p>
                        <div className="body">
                            <div className="left">
                                <div>
                                    <h2>{t('previewyouroffers')}</h2>
                                    <p>{t('whencreatinganofferyoucanpreviewhowitwilllook')}</p>
                                </div>
                            </div>
                            <div className="right">
                                <div className="top">
                                    <h2 className="title">{t('title')}</h2>
                                    <h3 className="price">{t('price')}</h3>
                                    <p className="p">{t('offeredafewsecondsagoin')} Indonesia</p>
                                </div>
                                <div className="bottom">
                                    <h2 className="title">Detail</h2>
                                    <hr />
                                    <div className="seller-info">
                                        <p className="seller-info-left">{t('sellerinformation')}</p>
                                        <p className="seller-info-right">{t('sellerdetail')}</p>
                                    </div>
                                    <div className="user">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                            <g clip-path="url(#clip0_2390_8617)">
                                                <path d="M15.9998 29.3346C8.63584 29.3346 2.6665 23.3653 2.6665 16.0013C2.6665 8.6373 8.63584 2.66797 15.9998 2.66797C23.3638 2.66797 29.3332 8.6373 29.3332 16.0013C29.3332 23.3653 23.3638 29.3346 15.9998 29.3346ZM9.3505 24.3426C11.2379 25.8516 13.5834 26.6718 15.9998 26.668C18.6265 26.668 21.0305 25.7186 22.8892 24.1453C22.0208 23.2543 20.9826 22.5465 19.8359 22.0637C18.6892 21.5809 17.4573 21.333 16.2132 21.3346C14.9233 21.3331 13.6472 21.5998 12.4658 22.1176C11.2844 22.6354 10.2235 23.3931 9.3505 24.3426ZM7.48784 22.428C8.60844 21.2387 9.96073 20.2916 11.4614 19.6449C12.962 18.9983 14.5791 18.6658 16.2132 18.668C17.7887 18.6659 19.3491 18.9751 20.8048 19.5778C22.2605 20.1805 23.5828 21.0648 24.6958 22.18C25.8373 20.5735 26.5113 18.6821 26.6433 16.7159C26.7752 14.7496 26.3598 12.7851 25.4432 11.0406C24.5265 9.296 23.1445 7.83947 21.4505 6.83256C19.7564 5.82566 17.8165 5.30775 15.846 5.3363C13.8755 5.36486 11.9514 5.93875 10.2872 6.99431C8.62301 8.04987 7.28378 9.54584 6.41809 11.3162C5.5524 13.0866 5.1941 15.0623 5.38292 17.0239C5.57175 18.9856 6.30033 20.8565 7.48784 22.4293V22.428ZM15.9998 17.3346C14.5853 17.3346 13.2288 16.7727 12.2286 15.7725C11.2284 14.7723 10.6665 13.4158 10.6665 12.0013C10.6665 10.5868 11.2284 9.23026 12.2286 8.23007C13.2288 7.22987 14.5853 6.66797 15.9998 6.66797C17.4143 6.66797 18.7709 7.22987 19.7711 8.23007C20.7713 9.23026 21.3332 10.5868 21.3332 12.0013C21.3332 13.4158 20.7713 14.7723 19.7711 15.7725C18.7709 16.7727 17.4143 17.3346 15.9998 17.3346ZM15.9998 14.668C16.7071 14.668 17.3854 14.387 17.8855 13.8869C18.3856 13.3868 18.6665 12.7085 18.6665 12.0013C18.6665 11.2941 18.3856 10.6158 17.8855 10.1157C17.3854 9.61559 16.7071 9.33464 15.9998 9.33463C15.2926 9.33464 14.6143 9.61559 14.1142 10.1157C13.6141 10.6158 13.3332 11.2941 13.3332 12.0013C13.3332 12.7085 13.6141 13.3868 14.1142 13.8869C14.6143 14.387 15.2926 14.668 15.9998 14.668Z" fill="#A2A3B1" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_2390_8617">
                                                    <rect width="32" height="32" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <p>Noni_571</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {/* End of Modal Create */}

            <ContainerComponent>
                {step == -1 ?
                    <div className='bg-white'>
                        <div className='welcome'>
                            <div className='img-wrapper'>
                                <img src={WelcomeImage} alt='ilustrator' />
                            </div>
                            <div className='title'>{t('welcometoluxi')}</div>
                            <div className='description'>{t('startregistrationcontent')}</div>
                            <button onClick={() => setStep(0)} >{t('startregistration')}</button>
                        </div>
                    </div>
                    : null}
                {step == 0 ?
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
                                            <input className="form-control" type="email" className='form-control' name="email" id="email" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="left-form-group">
                                            <label className='form-label' htmlFor="phone">{t('phonenumber')}</label>
                                        </div>
                                        <div className="center-form-group">
                                            <span>:</span>
                                        </div>
                                        <div className='right-form-group'>
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
                            <button onClick={() => setStep(-1)}>{t('cancel').toUpperCase()}</button>
                            <button onClick={() => setStep(1)}>{t('next').toUpperCase()}</button>
                        </div>
                    </div>
                    : null}
                {step == 1 ?
                    <>
                        <div className='step-1 bg-white'>
                            <div className='steps'>
                                <div className='step'>{t('accountinformation')}</div>
                                <div className='step active'>{t('productinformation')}</div>
                                <div className='step'>{t('reviewauthentic')}</div>
                                <div className='step'>{t('listingproduct')}</div>
                            </div>
                        </div>
                        {
                            !sellItemIsOpen ?
                                <div className='step-1-main'>
                                    <div className='left'>
                                        <button type="button" onClick={() => {
                                            setSellItemIsOpen(true)
                                        }}>{t('sellgoods')} <IconPlus /></button>
                                        <div className='links'>
                                            <div>
                                                {t('goodssales')}
                                            </div>
                                            <div>
                                                {t('goodssaleshistory')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='right'>
                                        <div className='top'>
                                            <div className='name'>
                                                {t('youroffer')}
                                            </div>
                                            <div className='search'>
                                                <div>
                                                    {t('search')}
                                                </div>
                                                <div>
                                                    <input className="form-control" type="text" className='form-control' name="q" id="search" />
                                                </div>
                                                <div className='layout'>
                                                    <button className={`${layout == 'list' ? 'active' : ''}`} onClick={() => setLayout("list")}><IconList /></button>
                                                    <button className={`${layout == 'grid' ? 'active' : ''}`} onClick={() => setLayout("grid")}><IconLayoutGrid /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='products'>
                                            {
                                                STEP_1_DATA_DUMMY.map((c) => {
                                                    return (<>
                                                        <div className='product'>
                                                            <div className='image'>
                                                                <img src={c.image} alt='product' />
                                                            </div>
                                                            <div className='center'>
                                                                <div className='name'>{c.name}</div>
                                                                <div className='price'>{formater.format(currency == 'id' ? c.price : c.price_usd)}</div>
                                                                <div className='stock'>Stock: {c.stock}</div>
                                                                <div className='date'>{t('offeredon')} {c.date}</div>
                                                            </div>
                                                            <div className="status" data-status={`${c.status.toLowerCase()}`}>
                                                                {t(c.status.toLowerCase())}
                                                            </div>
                                                        </div>
                                                    </>)
                                                })
                                            }
                                        </div>
                                    </div>
                                </div> :
                                <div className='step-1-main sell-item'>
                                    <div className="card">
                                        <div className="top">
                                            <button type="button" onClick={() => {
                                                setSellItemIsOpen(false)
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#111111" />
                                                </svg>
                                            </button>
                                            <h2>{t('sellgoods')}</h2>
                                        </div>
                                        <div className="body">
                                            <div className="add-photo-wrap">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                        <g clip-path="url(#clip0_2390_8792)">
                                                            <path d="M20.0268 3.81V5.51667H17.4668V8.07667H15.7601V5.51667H13.2001V3.81H15.7601V1.25H17.4668V3.81H20.0268ZM12.7735 9.78333C13.1131 9.78322 13.4387 9.64821 13.6787 9.408C13.9188 9.1678 14.0536 8.84207 14.0535 8.50248C14.0534 8.16289 13.9184 7.83725 13.6781 7.59721C13.4379 7.35716 13.1122 7.22237 12.7726 7.22248C12.6045 7.22254 12.438 7.25571 12.2827 7.32011C12.1273 7.38451 11.9862 7.47887 11.8673 7.59781C11.7485 7.71675 11.6542 7.85793 11.5899 8.0133C11.5256 8.16867 11.4926 8.33519 11.4926 8.50333C11.4927 8.67148 11.5259 8.83797 11.5903 8.9933C11.6547 9.14863 11.749 9.28975 11.868 9.40861C11.9869 9.52747 12.1281 9.62173 12.2834 9.68603C12.4388 9.75033 12.6053 9.78339 12.7735 9.78333ZM15.7601 12.543L15.3224 12.0566C15.1623 11.8784 14.9665 11.7359 14.7478 11.6383C14.529 11.5407 14.2922 11.4903 14.0526 11.4903C13.8131 11.4903 13.5762 11.5407 13.3575 11.6383C13.1387 11.7359 12.9429 11.8784 12.7829 12.0566L12.2231 12.6804L8.08014 8.07667L5.52014 10.9208V5.51667H11.4935V3.81H5.52014C5.06751 3.81 4.63341 3.98981 4.31335 4.30987C3.99329 4.62993 3.81348 5.06403 3.81348 5.51667V15.7567C3.81348 16.2093 3.99329 16.6434 4.31335 16.9635C4.63341 17.2835 5.06751 17.4633 5.52014 17.4633H15.7601C16.2128 17.4633 16.6469 17.2835 16.9669 16.9635C17.287 16.6434 17.4668 16.2093 17.4668 15.7567V9.78333H15.7601V12.543Z" fill="#111111" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_2390_8792">
                                                                <rect width="20.48" height="20.48" fill="white" transform="translate(0.399902 0.398438)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                                <p>{t('addphoto')}</p>
                                            </div>
                                            <div className="input-title">
                                                <h4>{t('required')}</h4>
                                                <p>{t('giveascompleteanexplanationaspossible')}</p>
                                            </div>
                                            <div className="form-area">
                                                <div className="one-col col">
                                                    <input className="form-control" type="text" name="" id="" placeholder={t('name')} />
                                                </div>
                                                <div className="one-col col">
                                                    <Select
                                                        styles={{
                                                            placeholder: (defaultStyles) => {
                                                                return {
                                                                    ...defaultStyles,
                                                                    color: '#A2A3B1',
                                                                    fontSize: '10px',
                                                                    fontWeight: '600',
                                                                    fontFamily: "'Inter', sans-serif",
                                                                    marginLeft: '.6rem'
                                                                }
                                                            },
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
                                                                fontSize: '10px',
                                                                fontWeight: 'normal',
                                                                fontFamily: "'Inter', sans-serif"
                                                            }),
                                                            option: (baseStyles, state) => ({
                                                                ...baseStyles,
                                                                backgroundColor: state.isDisabled ? 'transparent' : 'transparent',
                                                                color: '#000',
                                                                fontSize: '10px',
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
                                                        placeholder={t('category')}
                                                        value={null}
                                                        onChange={() => { }}
                                                        options={[]} />
                                                </div>
                                                <div className="two-col col">
                                                    <div>
                                                        <input className="form-control" type="number" name="" id="" placeholder={`${t('weight')} (Kg)`} />
                                                    </div>
                                                    <div>
                                                        <input className="form-control" type="number" name="" id="" placeholder={`${t('length')} (cm)`} />
                                                    </div>
                                                </div>
                                                <div className="two-col col">
                                                    <div>
                                                        <input className="form-control" type="number" name="" id="" placeholder={`${t('width')} (cm)`} />
                                                    </div>
                                                    <div>
                                                        <input className="form-control" type="number" name="" id="" placeholder={`${t('height')} (cm)`} />
                                                    </div>
                                                </div>
                                                <div className="two-col col">
                                                    <div>
                                                        <input className="form-control" type="number" name="" id="" placeholder={`${t('price')} (RP)`} />
                                                    </div>
                                                    <div>
                                                        <input className="form-control" type="number" name="" id="" placeholder={`${t('price')} (USD)`} />
                                                    </div>
                                                </div>
                                                <div className="two-col col">
                                                    <div>
                                                        <input className="form-control" type="text" name="" id="" placeholder={t('commissiontype')} value={t('commissiontype')} />
                                                    </div>
                                                    <div>
                                                        <input className="form-control" type="number" name="" id="" placeholder={`${t('commission')} (%)`} />
                                                    </div>
                                                </div>
                                                <div className="two-col col">
                                                    <div>
                                                        <input className="form-control" type="number" name="" id="" placeholder={`${t('saleprice')} (RP)`} />
                                                    </div>
                                                    <div>
                                                        <input className="form-control" type="number" name="" id="" placeholder={`${t('saleprice')} (USD)`} />
                                                    </div>
                                                </div>
                                                <div className="one-col col">
                                                    <div className="one-col col">
                                                        <Select
                                                            styles={{
                                                                placeholder: (defaultStyles) => {
                                                                    return {
                                                                        ...defaultStyles,
                                                                        color: '#A2A3B1',
                                                                        fontSize: '10px',
                                                                        fontWeight: '600',
                                                                        fontFamily: "'Inter', sans-serif",
                                                                        marginLeft: '.6rem'
                                                                    }
                                                                },
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
                                                            name=''
                                                            defaultOptions
                                                            placeholder={t('color').toUpperCase()}
                                                            value={null}
                                                            onChange={() => { }}
                                                            options={[]} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="input-title input-title-2">
                                                <h4>{t('fulldetails')}</h4>
                                                <p>{t('attractmoreinterestbyincludingmoredetails')}</p>
                                            </div>
                                            <div className="form-area">
                                                <div className="one-col col">
                                                    <textarea name="" id="" cols="30" rows="10" placeholder={t('descriptionindonesia')}></textarea>
                                                </div>
                                                <div className="one-col col">
                                                    <textarea name="" id="" cols="30" rows="10" placeholder={t('descriptionenglish')}></textarea>
                                                </div>
                                                <div className="one-col col">
                                                    <textarea name="" id="" cols="30" rows="10" placeholder={t('historyindonesia')}></textarea>
                                                </div>
                                                <div className="one-col col">
                                                    <textarea name="" id="" cols="30" rows="10" placeholder={t('historyenglish')}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="footer">
                                            <button className="preview" type="button" onClick={() => {
                                                setModalPratinjau(true)
                                            }}>{t('preview')}</button>
                                            <button className="next">{t('next')}</button>
                                        </div>
                                    </div>
                                </div>
                        }
                    </>
                    : null}
            </ContainerComponent>
        </div>
    )
}
