import { useEffect, useState } from "react";
import IndexNavbar from "../../components/navbar/IndexNavbar";
import axios from 'axios'
import { GetBrand, GetCategory } from "../../config/api";
import BreadCrumb from "../../components/general/breadcrumb/BreadCrumb";
import ContainerComponent from "../../components/general/container/ContainerComponent";
import contactHeroImage from './../../images/contact-hero.png'
import './contact.scoped.scss'

export default function ContactIndex() {
    /**
     * Redundant States
     * 
     */
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])

    /**
 * First Load
 * 
 */
    useEffect(() => {
        handleDropDownDesign()
        handleDropDownCollective()
    }, [])

    /**
* (Redundant) Getting Data Dropdown Design Navbar
* 
*/
    const handleDropDownDesign = async () => {
        try {
            const response = await axios.get(GetBrand)

            setBrands(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * (Redundant) Getting Data Categories Navbar
     * 
     */
    const handleDropDownCollective = async () => {
        try {
            const response = await axios.get(GetCategory)

            setCategories(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>

            {/* Navbar */}
            <IndexNavbar
                brands={brands}
                categories={categories}
            />
            {/* End of Navbar */}

            <ContainerComponent>
                {/* Breadcrumb */}
                <BreadCrumb
                    lists={[
                        {
                            label: 'Home',
                            url: '/'
                        }, {
                            label: 'Contact'
                        }]
                    }
                    title={'ok'}
                />
                {/* Breadcrumb */}

                {/* Hero */}
                <div style={{ backgroundImage: `url(${contactHeroImage})`, height: '400px', backgroundPositionX: '50%', backgroundPositionY: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h1
                        style={{
                            color: '#FFF',
                            textAlign: 'center',
                            fontFamily: 'Poppins',
                            fontSize: '32px',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            lineHeight: 'normal',
                        }}
                    >CONTACT US</h1>
                </div>
                {/* End of Hero */}

                {/* Content */}
                <h1
                    style={{
                        marginTop: '2rem',
                        color: '#000',
                        fontFamily: 'Poppins',
                        fontSize: '24px',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        lineHeight: 'normal',
                    }}
                >We’d love to hear from you</h1>
                {/* End of Content */}

                <div style={{
                    marginTop: '0.75rem',
                    background: '#000',
                    width: '68px',
                    height: '2px',
                }}></div>

                <div
                    style={{
                        display: 'flex',
                        columnGap: '2rem'
                    }}
                >
                    <div style={{
                        width: '70%'
                    }}>
                        <p
                            style={{
                                marginTop: '2.2rem',
                                color: '#000',
                                fontFamily: 'Poppins',
                                fontSize: '15px',
                                fontStyle: 'normal',
                                fontWeight: 300,
                                lineHeight: 'normal',
                            }}
                        >
                            Have a question? You may find an answer in our <span style={{
                                color: '#081CC9',
                                fontWeight: '700'
                            }}>FAQs</span>. <br />
                            But you can also contact us
                        </p>

                        <form action="">
                            <div style={{ display: 'flex', columnGap: '1rem', marginBottom: '1.75rem' }}>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <input type="text" className="form-control" placeholder="First Name" />
                                </div>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <input type="text" className="form-control" placeholder="Last Name" />
                                </div>
                            </div>
                            <div style={{ display: 'flex', columnGap: '1rem', marginBottom: '1.75rem' }}>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <input type="text" className="form-control" placeholder="Email Address" />
                                </div>
                                <div className="form-group" style={{ flex: 1, display: 'flex', position: 'relative' }}>
                                    <label htmlFor="" style={{
                                        position: 'absolute',
                                        top: '-.9rem',
                                        left: '.35rem',
                                        zIndex: 20,
                                        color: '#000',
                                        fontFamily: 'Cabin',
                                        fontSize: '10px',
                                        fontStyle: 'normal',
                                        fontWeight: '500',
                                        lineHeight: 'normal',
                                    }}>Any Code*</label>
                                    <select name="" id="" className="form-control" style={{ width: '4rem', zIndex: 10 }}>
                                        <option value="">+62</option>
                                    </select>
                                    <input type="text" className="form-control" placeholder="Phone Number" style={{ transform: 'translateX(-10px)' }} />
                                </div>
                            </div>
                            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                                <input type="text" className="form-control" placeholder="Subject" />
                            </div>
                            <div className="form-group">
                                <textarea name="" id="" cols="30" rows="10" className="form-control" style={{ height: '225px' }} placeholder="Message Box"></textarea>
                            </div>
                            <div className="form-group" style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <p style={{
                                    width: '60%',
                                    color: '#000',
                                    fontFamily: 'Inter',
                                    fontSize: '14px',
                                    fontStyle: 'normal',
                                    fontWeight: '300',
                                    lineHeight: '19px',
                                    letterSpacing: '0.1px',
                                }}>
                                    By sending your message, you agree to accept the <a href="" style={{ color: 'inherit' }}>General Terms and Conditions</a> of Use
                                    and that your data will be processed in compliance with the <a href="" style={{ color: 'inherit' }}>Privacy Policy</a> of Luxi.
                                </p>
                                <button className='btn btn-dark' style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '4px', paddingBottom: '4px', fontSize: '14px', fontWeight: '600', background: '#151B4F' }}>Submit</button>
                            </div>
                        </form>
                    </div>
                    <div style={{ width: '30%', marginTop: '3.5rem' }}>
                        <h2
                            style={{
                                color: '#000',
                                fontFamily: 'Poppins',
                                fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: '700',
                                lineHeight: 'normal',
                            }}
                        >Contact Us</h2>
                        <div style={{
                            marginTop: '0.75rem',
                            background: '#000',
                            width: '68px',
                            height: '2px',
                        }}></div>
                        <ul
                            style={{
                                paddingLeft: '1.6rem',
                                marginTop: '1.2rem'
                            }}
                        >
                            <li
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    columnGap: '1rem',
                                    marginBottom: '.5rem'
                                }}
                            >
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none">
                                        <path d="M7.99998 7.66634C7.55795 7.66634 7.13403 7.49075 6.82147 7.17819C6.50891 6.86563 6.33331 6.4417 6.33331 5.99967C6.33331 5.55765 6.50891 5.13372 6.82147 4.82116C7.13403 4.5086 7.55795 4.33301 7.99998 4.33301C8.44201 4.33301 8.86593 4.5086 9.17849 4.82116C9.49105 5.13372 9.66665 5.55765 9.66665 5.99967C9.66665 6.21854 9.62354 6.43527 9.53978 6.63748C9.45602 6.83969 9.33326 7.02342 9.17849 7.17819C9.02373 7.33295 8.83999 7.45572 8.63779 7.53947C8.43558 7.62323 8.21885 7.66634 7.99998 7.66634ZM7.99998 1.33301C6.7623 1.33301 5.57532 1.82467 4.70015 2.69984C3.82498 3.57501 3.33331 4.762 3.33331 5.99967C3.33331 9.49967 7.99998 14.6663 7.99998 14.6663C7.99998 14.6663 12.6666 9.49967 12.6666 5.99967C12.6666 4.762 12.175 3.57501 11.2998 2.69984C10.4246 1.82467 9.23766 1.33301 7.99998 1.33301Z" fill="#063BC1" />
                                    </svg>
                                </div>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Inter',
                                    fontSize: '14px',
                                    fontStyle: 'normal',
                                    fontWeight: 300,
                                    lineHeight: '16px',
                                    marginBottom: 0
                                }}>
                                    Jakarta Utara, Indonesia
                                </p>
                            </li>
                            <li
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    columnGap: '1rem',
                                    marginBottom: '.5rem'
                                }}
                            >
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none">
                                        <path d="M13.3 14C11.9111 14 10.5389 13.6971 9.18333 13.0913C7.82778 12.4856 6.59444 11.6273 5.48333 10.5167C4.37222 9.40556 3.514 8.17222 2.90867 6.81667C2.30333 5.46111 2.00044 4.08889 2 2.7C2 2.5 2.06667 2.33333 2.2 2.2C2.33333 2.06667 2.5 2 2.7 2H5.4C5.55556 2 5.69444 2.05289 5.81667 2.15867C5.93889 2.26444 6.01111 2.38933 6.03333 2.53333L6.46667 4.86667C6.48889 5.04444 6.48333 5.19444 6.45 5.31667C6.41667 5.43889 6.35556 5.54444 6.26667 5.63333L4.65 7.26667C4.87222 7.67778 5.136 8.07489 5.44133 8.458C5.74667 8.84111 6.08289 9.21067 6.45 9.56667C6.79444 9.91111 7.15556 10.2307 7.53333 10.5253C7.91111 10.82 8.31111 11.0893 8.73333 11.3333L10.3 9.76667C10.4 9.66667 10.5307 9.59156 10.692 9.54133C10.8533 9.49111 11.0116 9.47733 11.1667 9.5L13.4667 9.96667C13.6222 10.0111 13.75 10.0918 13.85 10.2087C13.95 10.3256 14 10.456 14 10.6V13.3C14 13.5 13.9333 13.6667 13.8 13.8C13.6667 13.9333 13.5 14 13.3 14Z" fill="#063BC1" />
                                    </svg>
                                </div>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Inter',
                                    fontSize: '14px',
                                    fontStyle: 'normal',
                                    fontWeight: 300,
                                    lineHeight: '16px',
                                    marginBottom: 0
                                }}>
                                    (+62) 12312312312
                                </p>
                            </li>
                            <li
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    columnGap: '1rem',
                                    marginBottom: '.5rem'
                                }}
                            >
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none">
                                        <path d="M7.99998 1.33398C4.31798 1.33398 1.33331 4.31865 1.33331 8.00065C1.33331 11.6827 4.31798 14.6673 7.99998 14.6673C11.682 14.6673 14.6666 11.6827 14.6666 8.00065C14.6666 4.31865 11.682 1.33398 7.99998 1.33398ZM7.99998 13.334L9.33331 12.0007L9.99998 11.334V10.0007H8.66665V9.33398L7.99998 8.66732H5.99998V10.6673L7.33331 12.0007V13.288C4.70665 12.958 2.66665 10.7153 2.66665 8.00065L3.33331 8.66732H4.66665V7.33398H5.99998L7.99998 5.33398V4.00065H6.66665L5.99998 3.33398V3.05998C7.28206 2.53717 8.7179 2.53717 9.99998 3.05998V4.00065L9.33331 4.66732V6.00065L9.99998 6.66732L12.0866 4.58065C12.5943 5.18794 12.96 5.9008 13.1573 6.66732H12L10.6666 8.00065V9.33398L11.3333 10.0007H12.6666L12.8573 10.1913C12.0193 12.0413 10.1593 13.334 7.99998 13.334Z" fill="#063BC1" />
                                    </svg>
                                </div>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Inter',
                                    fontSize: '14px',
                                    fontStyle: 'normal',
                                    fontWeight: 300,
                                    lineHeight: '16px',
                                    marginBottom: 0
                                }}>
                                    www.luxi.com
                                </p>
                            </li>
                            <li
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    columnGap: '1rem',
                                    marginBottom: '.5rem'
                                }}
                            >
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none">
                                        <path d="M13.3333 2.66602H2.66665C1.93331 2.66602 1.33998 3.26602 1.33998 3.99935L1.33331 11.9993C1.33331 12.7327 1.93331 13.3327 2.66665 13.3327H13.3333C14.0666 13.3327 14.6666 12.7327 14.6666 11.9993V3.99935C14.6666 3.26602 14.0666 2.66602 13.3333 2.66602ZM13.3333 5.33268L7.99998 8.66602L2.66665 5.33268V3.99935L7.99998 7.33268L13.3333 3.99935V5.33268Z" fill="#063BC1" />
                                    </svg>
                                </div>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Inter',
                                    fontSize: '14px',
                                    fontStyle: 'normal',
                                    fontWeight: 300,
                                    lineHeight: '16px',
                                    marginBottom: 0
                                }}>
                                    Customer@Luxi.com
                                </p>
                            </li>
                        </ul>
                        <div
                            style={{ display: 'flex', marginTop: '1.25rem' }}
                        >
                            <h4
                                style={{
                                    color: '#000',
                                    fontFamily: 'Inter',
                                    fontSize: '15px',
                                    fontStyle: 'normal',
                                    fontWeight: 700,
                                    lineHeight: '16px'
                                }}>
                                Follow us on :
                            </h4>
                            <ul
                                style={{
                                    listStyle: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    columnGap: '.5rem',
                                    paddingLeft: '1rem'
                                }}
                            >
                                <li>
                                    <div style={{
                                        background: '#081CC9',
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M4.599 10.75H6.599V6.745H8.401L8.599 4.755H6.599V3.75C6.599 3.61739 6.65168 3.49021 6.74545 3.39645C6.83922 3.30268 6.96639 3.25 7.099 3.25H8.599V1.25H7.099C6.43596 1.25 5.80008 1.51339 5.33123 1.98223C4.86239 2.45107 4.599 3.08696 4.599 3.75V4.755H3.599L3.401 6.745H4.599V10.75Z" fill="white" />
                                        </svg>
                                    </div>
                                </li>
                                <li>
                                    <div style={{
                                        background: '#593AB4',
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <g clip-path="url(#clip0_484_1097)">
                                                <path d="M6 0C4.37175 0 4.167 0.0075 3.52725 0.036C2.8875 0.066 2.45175 0.1665 2.07 0.315C1.66957 0.465614 1.30687 0.70187 1.00725 1.00725C0.702057 1.30702 0.46583 1.66968 0.315 2.07C0.1665 2.451 0.06525 2.8875 0.036 3.525C0.0075 4.16625 0 4.37025 0 6.00075C0 7.62975 0.0075 7.83375 0.036 8.4735C0.066 9.1125 0.1665 9.54825 0.315 9.93C0.46875 10.3245 0.6735 10.659 1.00725 10.9928C1.34025 11.3265 1.67475 11.532 2.06925 11.685C2.45175 11.8335 2.88675 11.9347 3.52575 11.964C4.16625 11.9925 4.37025 12 6 12C7.62975 12 7.833 11.9925 8.4735 11.964C9.11175 11.934 9.549 11.8335 9.93075 11.685C10.3309 11.5343 10.6934 11.2981 10.9928 10.9928C11.3265 10.659 11.5312 10.3245 11.685 9.93C11.8328 9.54825 11.934 9.1125 11.964 8.4735C11.9925 7.83375 12 7.62975 12 6C12 4.37025 11.9925 4.16625 11.964 3.52575C11.934 2.8875 11.8328 2.451 11.685 2.07C11.5342 1.66967 11.298 1.30701 10.9928 1.00725C10.6932 0.701757 10.3305 0.465484 9.93 0.315C9.5475 0.1665 9.111 0.06525 8.47275 0.036C7.83225 0.0075 7.629 0 5.9985 0H6.00075H6ZM5.46225 1.0815H6.00075C7.60275 1.0815 7.7925 1.08675 8.42475 1.116C9.00975 1.14225 9.32775 1.2405 9.53925 1.32225C9.819 1.431 10.0192 1.5615 10.2292 1.7715C10.4392 1.9815 10.569 2.181 10.6778 2.4615C10.7603 2.67225 10.8577 2.99025 10.884 3.57525C10.9132 4.2075 10.9193 4.39725 10.9193 5.9985C10.9193 7.59975 10.9132 7.79025 10.884 8.4225C10.8577 9.0075 10.7595 9.32475 10.6778 9.53625C10.5816 9.79677 10.428 10.0323 10.2285 10.2255C10.0185 10.4355 9.819 10.5653 9.5385 10.674C9.3285 10.7565 9.0105 10.854 8.42475 10.881C7.7925 10.9095 7.60275 10.9163 6.00075 10.9163C4.39875 10.9163 4.20825 10.9095 3.576 10.881C2.991 10.854 2.67375 10.7565 2.46225 10.674C2.20162 10.5779 1.96584 10.4247 1.77225 10.2255C1.57256 10.032 1.41879 9.79624 1.32225 9.5355C1.2405 9.32475 1.14225 9.00675 1.116 8.42175C1.0875 7.7895 1.0815 7.59975 1.0815 5.997C1.0815 4.395 1.0875 4.206 1.116 3.57375C1.143 2.98875 1.2405 2.67075 1.323 2.45925C1.43175 2.1795 1.56225 1.97925 1.77225 1.76925C1.98225 1.55925 2.18175 1.4295 2.46225 1.32075C2.67375 1.23825 2.991 1.14075 3.576 1.11375C4.1295 1.08825 4.344 1.08075 5.46225 1.08V1.0815ZM9.20325 2.0775C9.1087 2.0775 9.01507 2.09612 8.92772 2.13231C8.84036 2.16849 8.76099 2.22152 8.69413 2.28838C8.62727 2.35524 8.57424 2.43461 8.53806 2.52197C8.50187 2.60932 8.48325 2.70295 8.48325 2.7975C8.48325 2.89205 8.50187 2.98568 8.53806 3.07303C8.57424 3.16039 8.62727 3.23976 8.69413 3.30662C8.76099 3.37348 8.84036 3.42651 8.92772 3.46269C9.01507 3.49888 9.1087 3.5175 9.20325 3.5175C9.39421 3.5175 9.57734 3.44164 9.71237 3.30662C9.84739 3.17159 9.92325 2.98846 9.92325 2.7975C9.92325 2.60654 9.84739 2.42341 9.71237 2.28838C9.57734 2.15336 9.39421 2.0775 9.20325 2.0775ZM6.00075 2.919C5.59205 2.91262 5.18617 2.98761 4.80673 3.13961C4.4273 3.2916 4.08189 3.51755 3.79061 3.80432C3.49934 4.09108 3.26802 4.43293 3.11013 4.80995C2.95224 5.18696 2.87093 5.59163 2.87093 6.00037C2.87093 6.40912 2.95224 6.81379 3.11013 7.1908C3.26802 7.56782 3.49934 7.90967 3.79061 8.19643C4.08189 8.4832 4.4273 8.70915 4.80673 8.86114C5.18617 9.01314 5.59205 9.08813 6.00075 9.08175C6.80966 9.06913 7.58116 8.73893 8.14873 8.16244C8.71631 7.58594 9.03443 6.80938 9.03443 6.00037C9.03443 5.19137 8.71631 4.41481 8.14873 3.83831C7.58116 3.26182 6.80966 2.93162 6.00075 2.919ZM6.00075 3.99975C6.53125 3.99975 7.04002 4.21049 7.41514 4.58561C7.79026 4.96073 8.001 5.4695 8.001 6C8.001 6.5305 7.79026 7.03927 7.41514 7.41439C7.04002 7.78951 6.53125 8.00025 6.00075 8.00025C5.47025 8.00025 4.96148 7.78951 4.58636 7.41439C4.21124 7.03927 4.0005 6.5305 4.0005 6C4.0005 5.4695 4.21124 4.96073 4.58636 4.58561C4.96148 4.21049 5.47025 3.99975 6.00075 3.99975Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_484_1097">
                                                    <rect width="12" height="12" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </li>
                                <li>
                                    <div style={{
                                        background: '#111',
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M8.29996 2.91C7.95817 2.51981 7.76981 2.01872 7.76996 1.5H6.22496V7.7C6.21304 8.03551 6.07139 8.35331 5.82984 8.58647C5.58829 8.81963 5.26568 8.94995 4.92996 8.95C4.21996 8.95 3.62996 8.37 3.62996 7.65C3.62996 6.79 4.45996 6.145 5.31496 6.41V4.83C3.58996 4.6 2.07996 5.94 2.07996 7.65C2.07996 9.315 3.45996 10.5 4.92496 10.5C6.49496 10.5 7.76996 9.225 7.76996 7.65V4.505C8.39645 4.95493 9.14864 5.19632 9.91996 5.195V3.65C9.91996 3.65 8.97996 3.695 8.29996 2.91Z" fill="white" />
                                        </svg>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </ContainerComponent>
            <br />
            <br />
            <br />
        </div>
    )
}