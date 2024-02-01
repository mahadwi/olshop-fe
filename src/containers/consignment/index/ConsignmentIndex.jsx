import { useContext, useEffect, useState } from "react";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { Link, useLocation } from "react-router-dom";
import './consignment.scoped.scss'
import Api from "../../../utils/Api";
import { LoadingContext } from "../../../context/LoadingContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";

export default function ConsignmentIndex() {

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
    const { language } = useContext(LanguageContext)
    const suffix = language == 'id' ? '' : '_en';

    /**
     * Main State
     * 
     */
    const [breadcrumb, setBreadcrumb] = useState([])
    const [consignmentObject, setConsignmentObject] = useState({})
    const [sections, setSections] = useState({})
    const [brands, setBrands] = useState([])
    const [modalCard, setModalCard] = useState(false)
    const [contentModalCard, setContentModalCard] = useState('')

    useEffect(() => {
        loadBreadcrumb()
        loadConsignmentObject()
    }, [])

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const loadConsignmentObject = () => {
        setLoading(true)
        const getConsignment = Api.get('/consignment')
            .then((res) => {
                if (res) {
                    setConsignmentObject(res.data.data[0])
                    setSections(res.data.data[0].sections.reduce((p, c) => {
                        p[c.section] = c;
                        return p;
                    },{}));
                }
            })
        const getBrands = Api.get('/brand')
            .then((res) => {
                if (res) {
                    res.data.data.sort((a, b) => a.id - b.id)
                    setBrands(res.data.data.slice(0,4));
                }
            })
        Promise.all([getConsignment, getBrands])
            .finally(() => {
                setLoading(false);
            });
    }

    const loadBreadcrumb = () => {
        setBreadcrumb([
            {
                label: 'Home',
                url: '/'
            },
            {
                label: 'Consignment'
            }
        ])
    }

    return (
        <div>
            {/* Modal Card */}
            <Modal
                centered
                show={modalCard}
                onHide={() => {
                    setModalCard(false);
                }}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div dangerouslySetInnerHTML={{__html: contentModalCard}}></div>
                </Modal.Body>
            </Modal>
            {/* End of Modal Card */}

            <ContainerComponent>
                <BreadCrumbComponent lists={breadcrumb} />

                <div className="consignment-wrapper">
                    <div className='title'>
                        <div className='title0'>{consignmentObject['title'+suffix]}</div>
                        <div className='title1' dangerouslySetInnerHTML={{__html: consignmentObject['description'+suffix]}}></div>
                    </div>
                    <div className='consignment-first-hero'>
                        <div className='consignment-first-hero-image'>
                            <img src={sections[1]?.image} alt='Hero' />
                        </div>
                        <div className='consignment-first-hero-detail'>
                            <div className='_title0'>{sections[1]?.['title'+suffix] ?? ''}</div>
                            <div className='_title1' dangerouslySetInnerHTML={{ __html: sections[1]?.['description'+suffix]?? ''}}></div>
                            <div className='_buttons'>
                                <Link className='_button'>CONSIGN WITH US</Link>
                                <button className='_button' onClick={() => {document.getElementById('consignment-about').scrollIntoView()}}>LEARN MORE</button>
                            </div>
                        </div>
                    </div>
                    <div className='consignment-div' style={{margin: "4rem 0"}} />
                    <div className='consignment-about' id='consignment-about'>
                        <div className='consignment-about-video'>
                            <iframe src={`https://www.youtube-nocookie.com/embed/${consignmentObject.sections?.at(1).link.split('/').at(-1)}?si=A1ujlX7IktTEKpc2`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                        <div className='consignment-about-detail'>
                            <div className='_title0'>{consignmentObject.sections?.at(1)['title'+suffix]}</div>
                            <div className='_title1' dangerouslySetInnerHTML={{ __html: consignmentObject.sections?.at(1)['description'+suffix]}}></div>
                        </div>
                    </div>
                    <div className='consignment-div-title' style={{margin: "4rem 0"}}>BRANDS ACCEPTED</div>
                    <div className='consignment-brands'>
                        {brands?.map(({image_url: image, name}) => {
                            return <div className='consignment-brand'><img src={image} alt={name}/>{name}</div>
                        })}
                    </div>
                    <div className='consignment-div-title' style={{margin: "4rem 0"}}>HOW TO CONSIGN WITH US ?</div>
                    <div className='programs'>
                        {[sections[4], sections[5]].map((c, i) => {
                            if (c == undefined) return <></>;
                            return <>
                                {i!=0?<div className='consignment-div' />:null}
                                <div className='program-step'>
                                    <img className='program-step-image' src={c.image} alt='brand' />
                                    <div className='program-step-content'>
                                        <div className='program-step-title'>{c['title'+suffix]}</div>
                                        <div className='program-step-grid'>
                                            {c.cards.map((s, i) => {
                                                return <div className='program-step-card'>
                                                    <div className='program-step-card-icon'><img src={s.icon} alt={'icon'} width={42}/></div>
                                                    <div className='program-step-card-name'>{s['title'+suffix]}</div>
                                                    <div className='program-step-card-description' dangerouslySetInnerHTML={{__html: s['description'+suffix]}}></div>
                                                    {s.loadmore_type ?
                                                        <div>
                                                            {s.loadmore_type == 'Link' ? 
                                                                <a className='learn-more' href={s.loadmore_link}>{t('learnmore')}</a>
                                                            : null}
                                                            {s.loadmore_type == 'Modal' ? 
                                                                <button className='learn-more' onClick={() => {
                                                                    setContentModalCard(s.loadmore_text);
                                                                    setModalCard(true);
                                                                }}>{t('learnmore')}</button>
                                                            : null}
                                                        </div>
                                                    : null}
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </>;
                        })}
                    </div>
                </div>
            </ContainerComponent>
            <div className='consignment-second-hero'>
                <div className='_title0'>{sections[6]?.['title'+suffix]}</div>
                <div className='_title1' dangerouslySetInnerHTML={{__html: sections[6]?.['description'+suffix]}}></div>
                <Link className='_button'>BOOK APPOINTMENT</Link>
            </div>
        </div>
    )
}
