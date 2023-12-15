import { useContext, useEffect, useState } from "react";
import BreadCrumbComponent from "../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../components/general/container/ContainerComponent";
import './faq.scoped.scss'
import FaqImage from './../../images/temp/faq.6084f9fb9d2b8e0ccc3b.png'
import Api from "../../utils/Api";
import { LoadingContext } from "../../context/LoadingContext";

export default function FaqIndex() {

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
    const [arrFaqPerSection, setArrFaqPerSection] = useState([])

    useEffect(() => {
        setLoading(true)

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
            }).finally(() => {
                setLoading(false)
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
                                            {
                                                faqPerSectionItems.map((faqPerSectionItem) => (
                                                    <li className='shop-dropdown-item'>
                                                        <span className='shop-dropdown-item-title' onClick={(e) => {
                                                            toggleDropdown(e)
                                                        }}>{faqPerSectionItem.title}</span>

                                                        <div className='shop-dropdown-item-content'>
                                                            <p dangerouslySetInnerHTML={{ __html: faqPerSectionItem.description }} />
                                                        </div>
                                                    </li>
                                                ))
                                            }
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