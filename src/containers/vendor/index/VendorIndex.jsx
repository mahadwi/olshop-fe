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
import WelcomeImage from '../../../images/online shopping app.png';
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { IconList, IconPlus, IconLayoutGrid } from "@tabler/icons-react";

const STEP_1_DATA_DUMMY = [
    {
        image: "https://dev-olshop.berkatsoft.com/image/product/6544a6bc8f3ae.jpg",
        name: "Channle Anmoller",
        price: "35000000",
        price_usd: "235",
        stock: 1,
        date: "13/12/2023 13:00:00",
        status: "Review"
    },
    {
        image: "https://dev-olshop.berkatsoft.com/image/product/656a6feb1203b.jpeg",
        name: "CROC-EFFECT GRECA GODDESS MINI BAG",
        price: "49303",
        price_usd: "95",
        stock: 1,
        date: "13/12/2023 13:00:00",
        status: "Approve"
    },
];

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
    const { language } = useContext(LanguageContext)
    const formater = new Intl.NumberFormat( language == 'id' ? 'id-ID' : 'en-EN', { style: 'currency', currency: language == 'id' ? 'IDR' : 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 })

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
                    <>
                    <div className='step-1 bg-white'>
                        <div className='steps'>
                            <div className='step'>Account Information</div>
                            <div className='step active'>Product Information</div>
                            <div className='step'>Review & Authentic</div>
                            <div className='step'>Listing Product</div>
                        </div>
                    </div>
                    <div className='step-1-main'>
                        <div className='left'>
                            <button>Jual Barang <IconPlus /></button>
                            <div className='links'>
                                <div>
                                    Penjualan Barang
                                </div>
                                <div>
                                    Riwayat Penjualan Barang
                                </div>
                            </div>
                        </div>
                        <div className='right'>
                            <div className='top'>
                                <div className='name'>
                                    Tawaran Anda
                                </div>
                                <div className='search'>
                                    <div>
                                        Search
                                    </div>
                                    <div>
                                        <input type="text" className='form-control' name="q" id="search" />
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
                                                        <div className='price'>{formater.format(language == 'id' ? c.price : c.price_usd )}</div>
                                                        <div className='stock'>Stock: {c.stock}</div>
                                                        <div className='date'>Ditawarkan pada {c.date}</div>
                                                    </div>
                                                    <div className={`status ${c.status.toLowerCase()}`}>
                                                        {c.status}
                                                    </div>
                                                </div>
                                            </>)
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    </>
                : null }
            </ContainerComponent>
      </div>
    )
}
