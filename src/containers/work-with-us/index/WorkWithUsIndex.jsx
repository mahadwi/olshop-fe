import { useContext, useEffect, useState } from "react";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { useLocation } from "react-router-dom";
import './work-with-us.scoped.scss'
import Api from "../../../utils/Api";
import { LoadingContext } from "../../../context/LoadingContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { IconArrowRight, IconWallet, IconDiamond } from "@tabler/icons-react";

const icons = {
    'wallet': IconWallet,
    'diamond': IconDiamond,
};

const DATA_DUMMY = {
    title0: 'WORK WITH US',
    title1: 'Get additional income without capital as part of our tribe and receive outstanding benefits!',
    image: 'https://i.ibb.co/YbJpfzj/image.png',
    programs: [
        {
            image: 'https://i.ibb.co/zZ197PT/image.png',
            name: 'Belle & Kate Clique',
            description: 'Our Belle&Kate Clique program is suitable for you who have significant social media following and would like to share a special promo code for your followers.',
            benefits: [
                {
                    icon: 'wallet',
                    name: 'COMMISION',
                    description: 'Get commission on each item',
                },
                {
                    icon: 'diamond',
                    name: 'VIP EVENTS',
                    description: 'Get invited to our VIP events and latest product promotions',
                },
            ],
            step: [
                {
                    icon: 'wallet',
                    name: 'FILL IN FORM',
                    description: 'Fill in our application to list yourself as Belle&Kate Clique Program',
                },
                {
                    icon: 'wallet',
                    name: 'WAIT FOR OUR REVIEW',
                    description: 'Our team will review your date and process your approval',
                },
                {
                    icon: 'wallet',
                    name: 'Fill In Form',
                    description: 'We will activate and notify your promo code to give special promotion to your audience and viewers',
                },
                {
                    icon: 'wallet',
                    name: 'Commision',
                    description: 'Our team will review your date and process your approval',
                },
            ]
        },
        {
            image: 'https://i.ibb.co/xLZ2M2m/image.png',
            name: 'Belle & Kate Agents',
            description: 'Our Belle&Kate Agent program is fitting for individuals who would like to receive extra income with no requirements of a significant social media following nor Instagram business account.',
            benefits: [
                {
                    icon: 'wallet',
                    name: 'COMMISION',
                    description: 'Get commission on each item',
                },
                {
                    icon: 'wallet',
                    name: 'COMMISION',
                    description: 'Get commission on each item',
                },
                {
                    icon: 'diamond',
                    name: 'VIP EVENTS',
                    description: 'Get invited to our VIP events and latest product promotions',
                },
            ],
            step: [
                {
                    icon: 'wallet',
                    name: 'FILL IN FORM',
                    description: 'Fill in our application to list yourself as Belle&Kate Clique Program',
                },
                {
                    icon: 'wallet',
                    name: 'WAIT FOR OUR REVIEW',
                    description: 'Our team will review your date and process your approval',
                },
                {
                    icon: 'wallet',
                    name: 'Fill In Form',
                    description: 'We will activate and notify your promo code to give special promotion to your audience and viewers',
                },
                {
                    icon: 'wallet',
                    name: 'Commision',
                    description: 'Our team will review your date and process your approval',
                },
            ]
        }
    ],
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

    useEffect(() => {
        loadBreadcrumb()
        loadAuthenticationObject()
    }, [])

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const loadAuthenticationObject = () => {
        setLoading(true)
        Api.get('/work-with-us')
            .then((res) => {
                if (res) {
                    setWorkWithUsObject({...DATA_DUMMY, ...res.data.data[0]})
                }
            }).finally(() => {
                setLoading(false)
            })
        setWorkWithUsObject(DATA_DUMMY);
        // setLoading(false)
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
                        <div className="program-summary-card">
                            <img src={workWithUsObject.sections?.at(0).image} alt={workWithUsObject.sections?.at(0)['title'+suffix]} />
                            <button className='program-summary-button' onClick={() => {
                                document.getElementById(`program-0`).scrollIntoView();
                            }}>
                                <span>{workWithUsObject.sections?.at(0)['title'+suffix]}</span>
                                <span>Learn more <IconArrowRight /></span>
                            </button>
                        </div>
                        <div className="program-summary-card">
                            <img src={workWithUsObject.sections?.at(1).image} alt={workWithUsObject.sections?.at(1)['title'+suffix]} />
                            <button className='program-summary-button' onClick={() => {
                                document.getElementById(`program-1`).scrollIntoView();
                            }}>
                                <span>{workWithUsObject.sections?.at(1)['title'+suffix]}</span>
                                <span>Learn more <IconArrowRight /></span>
                            </button>
                        </div>
                    </div>
                    <div className='programs'>
                        {workWithUsObject.programs?.map(({image, name, description, benefits, step}, i) => {
                            return <>
                                {i!=0?<div className='program-div' />:null}
                                <div className='program' id={`program-${i}`}>
                                    <div className='program-image'>
                                        <img src={image} alt={name} />
                                    </div>
                                    <div className='program-detail'>
                                        <div className='program-title'>{name}</div>
                                        <div className='program-description'>{description}</div>
                                        <button className='program-button'>Join Us Now</button>
                                    </div>
                                </div>
                                <div className='program-benefits-title'>WHY YOU SHOULD JOIN</div>
                                <div className='program-benefits'>
                                    {benefits.map(({icon, name, description}) => {
                                        const Icon = icons[icon];
                                        return <div className='program-benefit'>
                                            <div className='program-benefit-icon'><Icon size={48} /></div>
                                            <div className='program-benefit-name'>{name}</div>
                                            <div className='program-benefit-description'>{description}</div>
                                        </div>
                                    })}
                                </div>
                                <div className='program-div' />
                                <div className='program-step'>
                                    <img className='program-step-image' src={workWithUsObject.image} alt='brand' />
                                    <div className='program-step-content'>
                                        <div className='program-step-title'>How to join {name} Program</div>
                                        <div className='program-step-grid'>
                                            {step.map(({icon, name, description}, i) => {
                                                const Icon = icons[icon];
                                                return <div className='program-step-card'>
                                                    <div className='program-step-card-icon'><Icon size={48} /></div>
                                                    <div className='program-step-card-name'>{i+1}. {name}</div>
                                                    <div className='program-step-card-description'>{description}</div>
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
