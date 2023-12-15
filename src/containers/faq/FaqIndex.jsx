import { useEffect, useState } from "react";
import BreadCrumbComponent from "../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../components/general/container/ContainerComponent";
import './faq.scoped.scss'
import FaqImage from './../../images/temp/faq.6084f9fb9d2b8e0ccc3b.png'
import Api from "../../utils/Api";

export default function FaqIndex() {

    /**
     * Main State
     * 
     */
    const [breadcrumb, setBreadcrumb] = useState([])
    const [arrFaqPerSection, setArrFaqPerSection] = useState([])

    useEffect(() => {
        // setLoading(true)

        loadBreadcrumb()
        loadArrFaqPerSection()
    }, [])

    const loadBreadcrumb = () => {
        setBreadcrumb([
            {
                label: 'Home',
                url: '/'
            },
            {
                label: 'FAQ'
            }
        ])
    }

    const loadArrFaqPerSection = () => {
        Api.get('/faq')
            .then((res) => {
                if (res) {
                    let arr = res.data.data
                    let tempArrFaqSection = []

                    const availableSections = arr.filter((value, index, self) =>
                        self.findIndex(v => v.section === value.section) === index
                    );

                    availableSections.map((availableSection) => {
                        tempArrFaqSection.push(arr.filter((val) => val.section == availableSection.section))
                    })

                    setArrFaqPerSection(tempArrFaqSection)
                }
            })
    }

    const toggleDropdown = (evt) => {
        evt.target.parentElement.classList.toggle('show')
    }

    return (
        <div>
            <ContainerComponent>
                <BreadCrumbComponent lists={breadcrumb} />

                <div className="faq-container">
                    <div className='left'>
                        <div className="inner">
                            <img src={FaqImage} alt="" />
                        </div>
                    </div>
                    <div className="right">
                        <div className="inner">
                            {
                                arrFaqPerSection.map((faqPerSectionItems) => (
                                    <div>
                                        <h3 className="title-h3">{faqPerSectionItems.length > 0 ? faqPerSectionItems[0].section : ''}</h3>

                                        <ul className='shop-dropdown-lists'>
                                            <li className='shop-dropdown-item'>
                                                <span className='shop-dropdown-item-title' onClick={(e) => {
                                                    toggleDropdown(e)
                                                }}>NATIONWIDE</span>

                                                <div className='shop-dropdown-item-content'>
                                                    <p>
                                                        FREE shipping nationwide for all Hermes bags. Shipping fees applied to other brands and Hermes accessories will be calculated based on package size.
                                                    </p>
                                                    <p>
                                                        We ship nationwide across Indonesia via TIKI ONS/TIKI Regular.
                                                    </p>
                                                    <p>
                                                        Specially for JABODETABEK area, we offer:
                                                    </p>

                                                    <ul>
                                                        <li>GO-JEK/GRAB</li>
                                                        <li>Private Courier Service</li>
                                                        <li>COD (Cash on Delivery)</li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li className='shop-dropdown-item'>
                                                <span className='shop-dropdown-item-title' onClick={(e) => {
                                                    toggleDropdown(e)
                                                }}>WORLD WIDE</span>

                                                <div className='shop-dropdown-item-content'>
                                                    <p>
                                                        All items are available for worldwide shipping from Jakarta, Indonesia via DHL Express. Shipping fee will be calculated based on package size.

                                                        Kindly note that clients are responsible for ensuring that items purchased can be legally imported into the destination country. Different regulations may apply for certain types of items, such as exotic leathers.

                                                        Please contact our Client Advisors for more information regarding international shipments.
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </ContainerComponent>
        </div>
    )
}