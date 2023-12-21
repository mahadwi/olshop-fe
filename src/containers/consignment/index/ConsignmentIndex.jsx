import { useContext, useEffect, useState } from "react";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { Link, useLocation } from "react-router-dom";
import './consignment.scoped.scss'
import Api from "../../../utils/Api";
import { LoadingContext } from "../../../context/LoadingContext";
import { IconArrowRight, IconWallet, IconDiamond } from "@tabler/icons-react";

const icons = {
    'wallet': IconWallet,
    'diamond': IconDiamond,
};

const DATA_DUMMY = {
    title0: 'SELL WITH US',
    title1: 'Sell your pre-loved items to make some extra money or to declutter your closet',
    aboutYoutubeVideoId: 'yqQfrJw8s0g',
    aboutTitle0: 'About Consignment',
    aboutTitle1: 'Our consignment option will get you the highest price in comparison to our other selling options.',
    firstHeroImage: 'https://i.ibb.co/r7r1G0c/image.png',
    firstHeroTitle0: 'Sell Your Luxury Items With Us In Just A Few Clicks',
    firstHeroTitle1: 'No hassle, no fuss, just self-upload or send us your pre-loved items',
    brands: [
        {
            image: 'https://i.ibb.co/7WdTrK5/image.png',
            name: 'Hermes',
        },
        {
            image: 'https://i.ibb.co/xLJD0NT/image.png',
            name: 'Channel',
        },
        {
            image: 'https://i.ibb.co/10tY7tG/image.png',
            name: 'Dior',
        },
        {
            image: 'https://i.ibb.co/r7r1G0c/image.png',
            name: 'Louis Vuitton',
        },
    ],
    programs: [
        {
            image: 'https://i.ibb.co/QPZwfK3/image.png',
            name: 'Belle&Kate ROOM Service',
            step: [
                {
                    icon: 'wallet',
                    name: 'UPLOAD SPECIFICATIONS ONLINE',
                    description: 'Submit brief details and photo of your designer bag(s) (min 5 items) that you would like to consign with us. The team will conduct an initial review of the items virtually and will only pick up your bag(s) that have been accepted.',
                },
                {
                    icon: 'wallet',
                    name: 'UPLOAD SPECIFICATIONS ONLINE',
                    description: 'Submit brief details and photo of your designer bag(s) (min 5 items) that you would like to consign with us. The team will conduct an initial review of the items virtually and will only pick up your bag(s) that have been accepted.',
                },
                {
                    icon: 'wallet',
                    name: 'UPLOAD SPECIFICATIONS ONLINE',
                    description: 'Submit brief details and photo of your designer bag(s) (min 5 items) that you would like to consign with us. The team will conduct an initial review of the items virtually and will only pick up your bag(s) that have been accepted.',
                },
                {
                    icon: 'wallet',
                    name: 'UPLOAD SPECIFICATIONS ONLINE',
                    description: 'Submit brief details and photo of your designer bag(s) (min 5 items) that you would like to consign with us. The team will conduct an initial review of the items virtually and will only pick up your bag(s) that have been accepted.',
                },
            ]
        },
        {
            image: 'https://i.ibb.co/qsxMGWq/image.png',
            name: 'Register your item yourself',
            step: [
                {
                    icon: 'wallet',
                    name: 'UPLOAD SPECIFICATIONS ONLINE',
                    description: 'Submit brief details and photo of your designer bag(s) (min 5 items) that you would like to consign with us. The team will conduct an initial review of the items virtually and will only pick up your bag(s) that have been accepted.',
                },
                {
                    icon: 'wallet',
                    name: 'UPLOAD SPECIFICATIONS ONLINE',
                    description: 'Submit brief details and photo of your designer bag(s) (min 5 items) that you would like to consign with us. The team will conduct an initial review of the items virtually and will only pick up your bag(s) that have been accepted.',
                },
                {
                    icon: 'wallet',
                    name: 'UPLOAD SPECIFICATIONS ONLINE',
                    description: 'Submit brief details and photo of your designer bag(s) (min 5 items) that you would like to consign with us. The team will conduct an initial review of the items virtually and will only pick up your bag(s) that have been accepted.',
                },
                {
                    icon: 'wallet',
                    name: 'UPLOAD SPECIFICATIONS ONLINE',
                    description: 'Submit brief details and photo of your designer bag(s) (min 5 items) that you would like to consign with us. The team will conduct an initial review of the items virtually and will only pick up your bag(s) that have been accepted.',
                },
            ]
        }
    ],
    secondHeroTitle0: 'WANT TO PERSONALLY DROP OFF YOUR BAGS IN STORE?',
    secondHeroTitle1: 'Ready to sell or trade your items? Bring accepted styles to Belle&Kate Room store and receive the most competitive price.',
};

export default function ConsignmentIndex() {

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

    /**
     * Main State
     * 
     */
    const [breadcrumb, setBreadcrumb] = useState([])
    const [consignmentObject, setConsignmentObject] = useState({})

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
        // TODO: connect API
        // Api.get('/work-with-us')
        //     .then((res) => {
        //         if (res) {
        //             setConsignmentObject(res.data.data[0])
        //         }
        //     }).finally(() => {
        //         setLoading(false)
        //     })
        setConsignmentObject(DATA_DUMMY);
        setLoading(false)
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
            <ContainerComponent>
                <BreadCrumbComponent lists={breadcrumb} />

                <div className="consignment-wrapper">
                    <div className='title'>
                        <div className='title0'>{consignmentObject.title0}</div>
                        <div className='title1'>{consignmentObject.title1}</div>
                    </div>
                    <div className='consignment-first-hero'>
                        <div className='consignment-first-hero-image'>
                            <img src={consignmentObject.firstHeroImage} alt='Hero' />
                        </div>
                        <div className='consignment-first-hero-detail'>
                            <div className='_title0'>{consignmentObject.firstHeroTitle0}</div>
                            <div className='_title1'>{consignmentObject.firstHeroTitle1}</div>
                            <div className='_buttons'>
                                <Link className='_button'>CONSIGN WITH US</Link>
                                <button className='_button' onClick={() => {document.getElementById('consignment-about').scrollIntoView()}}>LEARN MORE</button>
                            </div>
                        </div>
                    </div>
                    <div className='consignment-div' style={{margin: "4rem 0"}} />
                    <div className='consignment-about' id='consignment-about'>
                        <div className='consignment-about-video'>
                            <iframe src={`https://www.youtube-nocookie.com/embed/${consignmentObject.aboutYoutubeVideoId}?si=A1ujlX7IktTEKpc2`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                        <div className='consignment-about-detail'>
                            <div className='_title0'>{consignmentObject.aboutTitle0}</div>
                            <div className='_title1'>{consignmentObject.aboutTitle1}</div>
                        </div>
                    </div>
                    <div className='consignment-div-title' style={{margin: "4rem 0"}}>BRANDS ACCEPTED</div>
                    <div className='consignment-brands'>
                        {consignmentObject.brands?.map(({image, name}) => {
                            return <div className='consignment-brand'><img src={image} alt={name}/>{name}</div>
                        })}
                    </div>
                    <div className='consignment-div-title' style={{margin: "4rem 0"}}>HOW TO CONSIGN WITH US ?</div>
                    <div className='programs'>
                        {consignmentObject.programs?.map(({image, name, step}, i) => {
                            return <>
                                {i!=0?<div className='consignment-div' />:null}
                                <div className='program-step'>
                                    <img className='program-step-image' src={image} alt='brand' />
                                    <div className='program-step-content'>
                                        <div className='program-step-title'>{name}</div>
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
            <div className='consignment-second-hero'>
                <div className='_title0'>{consignmentObject.secondHeroTitle0}</div>
                <div className='_title1'>{consignmentObject.secondHeroTitle1}</div>
                <Link className='_button'>BOOK APPOINTMENT</Link>
            </div>
        </div>
    )
}
