import { useContext, useEffect, useState } from "react";
import BreadCrumbComponent from "../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../components/general/container/ContainerComponent";
import './faq.scoped.scss'
import FaqImage from './../../images/temp/faq.6084f9fb9d2b8e0ccc3b.png'
import Api from "../../utils/Api";
import { LoadingContext } from "../../context/LoadingContext";
import { LanguageContext } from "../../context/LanguageContext";

export default function FaqIndex() {

    /**
     * Context
     * 
     */
    const { setLoading } = useContext(LoadingContext)
    const { language } = useContext(LanguageContext)
    const suffix = language == 'id' ? '' : '_en';

    /**
     * Main State
     * 
     */
    const [breadcrumb, setBreadcrumb] = useState([])
    const [arrFaqPerSection, setArrFaqPerSection] = useState([])
    const [faqImage, setFaqImage] = useState(FaqImage);

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
                    setFaqImage(res.data.data.image)
                    setArrFaqPerSection(res.data.data.faq_section)
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
                            <img src={faqImage} alt="" />
                        </div>
                    </div>
                    <div className="right">
                        <div className="inner">
                            {
                                arrFaqPerSection.map((a) => (
                                    <div>
                                        <h3 className="title-h3">{a['section'+suffix]}</h3>

                                        <ul className='shop-dropdown-lists'>
                                            {
                                                a.faqs.map((b) => (
                                                    <li className='shop-dropdown-item'>
                                                        <span className='shop-dropdown-item-title' onClick={(e) => {
                                                            toggleDropdown(e)
                                                        }}>{b['question'+suffix]}</span>

                                                        <div className='shop-dropdown-item-content'>
                                                            <p dangerouslySetInnerHTML={{ __html: b['answer'+suffix] }} />
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
