import { useContext, useEffect, useState } from "react";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { useLocation } from "react-router-dom";
import './work-with-us.scoped.scss'
import Api from "../../../utils/Api";
import { LoadingContext } from "../../../context/LoadingContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { IconArrowRight, IconWallet, IconDiamond } from "@tabler/icons-react";

const DATA_DUMMY = {
    image: 'https://i.ibb.co/YbJpfzj/image.png',
};

export default function WorkWithUsIndex() {

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
    const { language } = useContext(LanguageContext)
    const suffix = language == 'id' ? '' : '_en';

    /**
     * Main State
     * 
     */
    const [breadcrumb, setBreadcrumb] = useState([])
    const [workWithUsObject, setWorkWithUsObject] = useState({})
    const [sections, setSections] = useState({})

    useEffect(() => {
        loadBreadcrumb()
        loadWorkWithUsObject()
    }, [])

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const loadWorkWithUsObject = () => {
        setLoading(true)
        Api.get('/work-with-us')
            .then((res) => {
                if (res) {
                    setWorkWithUsObject({...DATA_DUMMY, ...res.data.data[0]})
                    setSections(res.data.data[0].sections.reduce((p, c) => {
                        p[c.section] = c;
                        return p;
                    },{}));
                }
            }).finally(() => {
                setLoading(false)
            })
    }

    const loadBreadcrumb = () => {
        setBreadcrumb([
            {
                label: 'Home',
                url: '/'
            },
            {
                label: 'Work With Us'
            }
        ])
    }

    return (
        <div>
            <ContainerComponent>
                <BreadCrumbComponent lists={breadcrumb} />

                <div className="work-with-us-wrapper">
                    <div className='title'>
                        <div className='title0'>{workWithUsObject['title'+suffix]}</div>
                        <div className='title1' dangerouslySetInnerHTML={{__html: workWithUsObject['description'+suffix]}}></div>
                    </div>
                    <div className='programs-summary'>
                        {[sections[1], sections[4]].map((s, i) => {
                            if (s == undefined) return <></>;
                            return <>
                                <div className="program-summary-card">
                                    <img src={s?.image} alt={s?.['title'+suffix]} />
                                    <button className='program-summary-button' onClick={() => {
                                        document.getElementById(`program-${i}`).scrollIntoView();
                                    }}>
                                        <span>{s?.['title'+suffix]}</span>
                                        <span>Learn more <IconArrowRight /></span>
                                    </button>
                                </div>
                            </>;
                        })}
                    </div>
                    <div className='programs'>
                        {[{program: sections[1], benefit: sections[2], step: sections[3]}, {program: sections[4], benefit: sections[5], step: sections[6]}]?.map(({program, benefit, step}, i) => {
                            if (program == undefined) return <></>;
                            return <>
                                {i!=0?<div className='program-div' />:null}
                                <div className='program' id={`program-${i}`}>
                                    <div className='program-image'>
                                        <img src={program.image} alt={program['title'+suffix]} />
                                    </div>
                                    <div className='program-detail'>
                                        <div className='program-title'>{program['title'+suffix]}</div>
                                        <div className='program-description' dangerouslySetInnerHTML={{__html: program['description'+suffix]}} ></div>
                                        <a href={program.link} className='program-button'>Join Us Now</a>
                                    </div>
                                </div>
                                <div className='program-benefits-title'>{benefit['title'+suffix]}</div>
                                <div className='program-benefits'>
                                    {benefit.card.map((s) => {
                                        return <div className='program-benefit'>
                                            <div className='program-benefit-icon'><img src={s.image} alt={'icon'} width={42}/></div>
                                            <div className='program-benefit-name'>{s['title'+suffix]}</div>
                                            <div className='program-benefit-description' dangerouslySetInnerHTML={{__html:s['description'+suffix]}}></div>
                                        </div>
                                    })}
                                </div>
                                <div className='program-div' />
                                <div className='program-step'>
                                    <img className='program-step-image' src={workWithUsObject.image} alt='brand' />
                                    <div className='program-step-content'>
                                        <div className='program-step-title'>{step?.['title'+suffix]}</div>
                                        <div className='program-step-grid'>
                                            {step.card.map((s) => {
                                                return <div className='program-step-card'>
                                                    <div className='program-step-card-icon'><img src={s.image} alt={'icon'} width={42}/></div>
                                                    <div className='program-step-card-name'>{s['title'+suffix]}</div>
                                                    <div className='program-step-card-description' dangerouslySetInnerHTML={{__html: s['description'+suffix]}}></div>
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
        </div>
    )
}
