import axios from 'axios'
import { useEffect, useState } from "react";
import IndexNavbar from "../../components/navbar/IndexNavbar";
import { GetBrand, GetCategory } from '../../config/api';
import HighlightTitleComponent from '../../components/pages/about-us-components/highlight-title/HighlightTitleComponent';
import BagImage from './../../images/bag-about-us.png'
import ContainerComponent from '../../components/general/container/ContainerComponent';
import BreadCrumb from '../../components/general/breadcrumb/BreadCrumb';
import './about-us.scoped.scss'

export default function AboutUsIndex() {

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

            <div style={{ marginTop: '3.8rem' }}>
                <div style={{ width: '50%' }}>
                    <HighlightTitleComponent title={'About Us'} background={'linear-gradient(90deg, #E4A951 0%, #E4E4EA 50.62%, #FFF 98.93%)'} />
                </div>
                <ContainerComponent>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ width: '42%' }}>
                            <BreadCrumb
                                lists={[{
                                    label: 'Home',
                                    url: '/'
                                }, {
                                    label: 'About Us'
                                }]}
                            />
                            <p style={{ color: '#000', textAlign: 'justify', fontFamily: 'Inter', fontSize: '15px', lineHeight: '23px', fontWeight: 400, textIndent: 35 }}>
                                Luxury Bags for the Elegant and Expensive is a leading retailer of luxury handbags and leather accessories. We offer a wide selection of bags from top brands such as Hermès, Chanel, Louis Vuitton, Gucci, and Prada. Our bags are carefully selected for their quality, craftsmanship, and timeless style.
                            </p>
                            <p style={{ color: '#000', textAlign: 'justify', fontFamily: 'Inter', fontSize: '15px', lineHeight: '23px', fontWeight: 400 }}>
                                We are committed to providing our customers with the best possible shopping experience. Our team of experienced and knowledgeable stylists is always available to help customers find the perfect bag for their needs. We also offer a variety of convenient services, such as free shipping and returns, and personalized gift wrapping.
                            </p>
                            <p style={{ color: '#000', textAlign: 'justify', fontFamily: 'Inter', fontSize: '15px', lineHeight: '23px', fontWeight: 400 }}>
                                Our goal is to help our customers feel confident and stylish. We believe that a luxury bag is more than just an accessory; it is a statement of personal style and success.
                            </p>
                        </div>
                        <img src={BagImage} alt="bag-image" style={{ width: '58%' }} />
                    </div>

                    <div
                        style={{ marginTop: '30px' }}
                    >
                        <div>
                            <h4 style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#000', marginBottom: '6px' }}>Mission: </h4>
                            <p style={{
                                color: '#000', textAlign: 'justify', fontFamily: 'Inter', fontSize: '15px', fontWeight: 400, lineHeight: '20px', marginTop: '3px'
                            }}>To provide our customers with the finest luxury handbags and leather accessories, and to offer them an exceptional shopping experience.</p>
                        </div>
                        <div style={{ marginTop: '1.3rem' }}>
                            <h4 style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#000', marginBottom: '6px' }}>Values: </h4>
                            <ul>
                                <li style={{
                                    color: '#000', textAlign: 'justify', fontFamily: 'Inter', fontSize: '15px', fontWeight: 400, lineHeight: '20px', marginTop: '3px'
                                }}
                                >Quality: We are committed to offering our customers the highest quality products.</li>
                                <li style={{
                                    color: '#000', textAlign: 'justify', fontFamily: 'Inter', fontSize: '15px', fontWeight: 400, lineHeight: '20px', marginTop: '3px'
                                }}
                                >Craftsmanship: We appreciate the fine craftsmanship of luxury handbags and leather accessories.</li>
                                <li style={{
                                    color: '#000', textAlign: 'justify', fontFamily: 'Inter', fontSize: '15px', fontWeight: 400, lineHeight: '20px', marginTop: '3px'
                                }}
                                >Timeless style: We believe that luxury bags should be timeless and never go out of fashion.</li>
                                <li style={{
                                    color: '#000', textAlign: 'justify', fontFamily: 'Inter', fontSize: '15px', fontWeight: 400, lineHeight: '20px', marginTop: '3px'
                                }}
                                >Customer service: We are dedicated to providing our customers with the best possible shopping experience.</li>
                            </ul>
                        </div>
                        <div style={{ marginTop: '1.3rem' }}>
                            <h4 style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#000', marginBottom: '6px' }}>Target Audience: </h4>
                            <p style={{
                                color: '#000', textAlign: 'justify', fontFamily: 'Inter', fontSize: '15px', fontWeight: 400, lineHeight: '20px', marginTop: '3px'
                            }}>Our target audience is women who are looking for high-quality, stylish, and timeless luxury handbags and leather accessories. Our customers are typically affluent and have a discerning taste in fashion.</p>
                        </div>
                        <div style={{ marginTop: '1.3rem' }}>
                            <h4 style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#000', marginBottom: '6px' }}>Target Audience: </h4>
                            <p style={{
                                color: '#000', textAlign: 'justify', fontFamily: 'Inter', fontSize: '15px', fontWeight: 400, lineHeight: '20px', marginTop: '3px'
                            }}>Our competitive advantage is our wide selection of luxury handbags and leather accessories from top brands, our team of experienced and knowledgeable stylists, and our commitment to providing our customers with the best possible shopping experience.
                                We are confident that Luxury Bags for the Elegant and Expensive is the best place to shop for luxury handbags and leather accessories. We invite you to browse our selection and experience the difference for yourself.</p>
                        </div>
                        <div style={{ marginTop: '3.3rem' }}>
                            <h4 style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#000', marginBottom: '6px' }}>Our Store Location: </h4>
                            <div style={{ display: 'flex', width: '100%', columnGap: '2.35rem', marginTop: '23px' }}>
                                <div style={{ flex: 1.5 }}>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666307543373!2d106.82458402554342!3d-6.175408343811989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2db8c5617%3A0x4e446b7ac891d847!2sMonas%2C%20Gambir%2C%20Kecamatan%20Gambir%2C%20Kota%20Jakarta%20Pusat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1700552424025!5m2!1sid!2sid" width="100%" height="350" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div>
                                        <div
                                            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M8 9C7.50555 9 7.0222 8.85338 6.61108 8.57868C6.19995 8.30397 5.87952 7.91352 5.6903 7.45671C5.50108 6.99989 5.45157 6.49723 5.54804 6.01228C5.6445 5.52732 5.8826 5.08187 6.23223 4.73223C6.58187 4.3826 7.02732 4.1445 7.51228 4.04804C7.99723 3.95157 8.49989 4.00108 8.95671 4.1903C9.41353 4.37952 9.80397 4.69995 10.0787 5.11108C10.3534 5.5222 10.5 6.00555 10.5 6.5C10.4992 7.1628 10.2356 7.79822 9.76689 8.26689C9.29822 8.73556 8.6628 8.99921 8 9ZM8 5C7.70333 5 7.41332 5.08797 7.16665 5.2528C6.91997 5.41762 6.72771 5.65189 6.61418 5.92598C6.50065 6.20007 6.47095 6.50167 6.52882 6.79264C6.5867 7.08361 6.72956 7.35088 6.93934 7.56066C7.14912 7.77044 7.41639 7.9133 7.70737 7.97118C7.99834 8.02906 8.29994 7.99935 8.57403 7.88582C8.84812 7.77229 9.08238 7.58003 9.24721 7.33336C9.41203 7.08668 9.5 6.79667 9.5 6.5C9.4996 6.1023 9.34144 5.721 9.06022 5.43978C8.779 5.15856 8.3977 5.0004 8 5Z" fill="black" />
                                                <path d="M8.00001 15L3.78201 10.0255C3.7234 9.95081 3.66539 9.87564 3.60801 9.8C2.8875 8.85089 2.49826 7.69161 2.50001 6.5C2.50001 5.04131 3.07947 3.64236 4.11092 2.61091C5.14237 1.57946 6.54131 1 8.00001 1C9.4587 1 10.8576 1.57946 11.8891 2.61091C12.9205 3.64236 13.5 5.04131 13.5 6.5C13.5018 7.69107 13.1127 8.84982 12.3925 9.7985L12.392 9.8C12.392 9.8 12.242 9.997 12.2195 10.0235L8.00001 15ZM4.40601 9.1975C4.40701 9.1975 4.52301 9.3515 4.54951 9.3845L8.00001 13.454L11.455 9.379C11.477 9.3515 11.594 9.1965 11.5945 9.196C12.1831 8.42056 12.5012 7.47352 12.5 6.5C12.5 5.30653 12.0259 4.16193 11.182 3.31802C10.3381 2.47411 9.19348 2 8.00001 2C6.80653 2 5.66194 2.47411 4.81803 3.31802C3.97411 4.16193 3.50001 5.30653 3.50001 6.5C3.49896 7.47412 3.81689 8.42171 4.40601 9.1975Z" fill="black" />
                                            </svg>
                                            <h4
                                                style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: '600', marginBottom: 0 }}
                                            >
                                                Our Flagship Store
                                            </h4>
                                        </div>
                                    </div>
                                    <div
                                        style={{ paddingLeft: '20px' }}
                                    >
                                        <h4
                                            style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: '600', marginBottom: 0, marginTop: '2.25px' }}
                                        >Jakarta</h4>
                                        <p
                                            style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: '300', marginBottom: 0, marginTop: '3.5px' }}
                                        >Jl. Boulevard Bar. Raya No.12, RT.18/RW.19, Klp. Gading Bar., Kec. Klp. Gading, Jkt Utara, Daerah Khusus Ibukota Jakarta 14240</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ContainerComponent>

                <div style={{ marginTop: '2rem' }}>
                    <HighlightTitleComponent title={'Suggestion'} background={'linear-gradient(270deg, #E4A951 0%, #E4E4EA 45.18%, #FFF 87.37%)'} />

                    <p
                        style={{
                            marginTop: '1.75rem',
                            color: '#000',
                            fontFamily: 'Inter',
                            fontSize: '15px',
                            fontStyle: 'normal',
                            fontWeight: '300',
                            lineHeight: '16px',
                            textAlign: 'center'
                        }}
                    >
                        To improve performance and service, if you have criticism or suggestions for our shop, you can input it in the form below :
                    </p>

                    <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <form action="" style={{ width: '38%' }}>
                            <div className='form-group' style={{ marginBottom: '10px' }}>
                                <label className='form-label' htmlFor="name"
                                    style={{
                                        color: '#222B45',
                                        fontFamily: 'Cabin',
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: '600',
                                        lineHeight: 'normal',
                                    }}
                                >Name</label>
                                <input type="text" className='form-control' style={{ marginTop: '2px' }} name="name" id="name" placeholder='Input your name' />
                            </div>
                            <div className='form-group' style={{ marginBottom: '10px' }}>
                                <label className='form-label' htmlFor="email"
                                    style={{
                                        color: '#222B45',
                                        fontFamily: 'Cabin',
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: '600',
                                        lineHeight: 'normal',
                                    }}
                                >Email</label>
                                <input type="email" className='form-control' style={{ marginTop: '2px' }} name="email" id="email" placeholder='Input your email address' />
                            </div>
                            <div className='form-group' style={{ marginBottom: '10px' }}>
                                <label className='form-label' htmlFor="sugestion"
                                    style={{
                                        color: '#222B45',
                                        fontFamily: 'Cabin',
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: '600',
                                        lineHeight: 'normal',
                                    }}
                                >Sugestion</label>
                                <textarea className='form-control' style={{ marginTop: '2px', height: '200px' }} name="sugestion" id="sugestion" cols="30" rows="10" placeholder='Input your sugestion`'></textarea>
                            </div>
                            <div className='form-group' style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                                <button className='btn btn-dark' style={{ paddingLeft: '27.5px', paddingRight: '27.5px', paddingTop: '8px', paddingBottom: '8px', fontSize: '14px', fontWeight: '600', background: '#151B4F' }}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
        </div>
    )

}