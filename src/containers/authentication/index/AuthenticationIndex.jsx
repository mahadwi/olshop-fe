import { useContext, useEffect, useState } from "react";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { useLocation } from "react-router-dom";
import './authentication.scoped.scss'
import Api from "../../../utils/Api";
import { LoadingContext } from "../../../context/LoadingContext";

const DATA_DUMMY = {
    title0: 'WE HATE COUNTERFEIT GOODS!',
    title1: 'All items sold on our platform are guaranteed authentic. We take our authentication process thoroughly to make sure all our luxury items are certified authentic.',
    youtubeVideoId: 'Oq30x5QpPgg',
    processes:[
        {
            image: 'https://i.ibb.co/K0r1NP0/image.png',
            title: 'QUALITY CONTROL',
            content: 'We cautiously inspect each goods that step into our ROOM to make sure the quality links up to our standard. Each one of them will be set down into a rigorous validation process by our in-house experts who have a great knowledge and experience in the art of authentication.\n\nOnce the authenticity is verified, the goods will be up on our website for sale.',
        },
        {
            image: 'https://i.ibb.co/vLrzbsZ/image.png',
            title: 'ENTRUPY / BABABEBI CHECK',
            content: 'We utilize ENTRUPY, the world’s first authentication solution for high-value goods.\n\nENTRUPY has developed an AI-powered technology that can instantly identify authentic and counterfeit luxury goods with a success rate of 99,1%. On the other hand, specifically for Hermès, we use BABABEBI’s authentication service that is owned by Ms. Dimity Giles.\n\nShe developed her expertise in authentication based on over thirty years of collecting and meticulous comparative study of the construction details and artisanship methods of Hermès handbags and other leather goods.',
        },
    ],
};

export default function AuthenticationIndex() {

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
    const [authenticationObject, setAuthenticationObject] = useState({})

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
        // TODO: connect API
        // Api.get('/authentication')
        //     .then((res) => {
        //         if (res) {
        //             setAuthenticationObject(res.data.data[0])
        //         }
        //     }).finally(() => {
        //         setLoading(false)
        //     })
        setAuthenticationObject(DATA_DUMMY);
        setLoading(false)
    }

    const loadBreadcrumb = () => {
        setBreadcrumb([
            {
                label: 'Home',
                url: '/'
            },
            {
                label: 'Authentication'
            }
        ])
    }

    return (
        <div>
            <ContainerComponent>
                <BreadCrumbComponent lists={breadcrumb} />

                <div className="authentication-wrapper">
                    <div className='title'>
                        <div className='title0'>{authenticationObject.title0}</div>
                        <div className='title1'>{authenticationObject.title1}</div>
                    </div>
                    <div className='video'>
                        <div className='video-title'>WATCH HOW WE DO IT</div>
                        <div className='video-youtube'>
                            <iframe src={`https://www.youtube-nocookie.com/embed/${authenticationObject.youtubeVideoId}?si=A1ujlX7IktTEKpc2`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div className='processes'>
                        <div className='processes-title'>OUR AUTHENTICATION PROCESS</div>
                        <div className='processes-list'>
                        {authenticationObject.processes?.map(({image, title, content}, i) => {
                            const flip = i % 2 != 0;
                            return <>
                                {i!=0? <div className='process-div'/> :null}
                                <div className={`process ${flip ? 'flip' : ''}`}>
                                    <div className='process-image'>
                                        <img src={image} alt={title} />
                                    </div>
                                    <div className='process-detail'>
                                        <div className='process-title'>{title}</div>
                                        <div className='process-content'>{content}</div>
                                    </div>
                                </div>
                            </>
                        })}
                        </div>
                    </div>
                </div>
            </ContainerComponent>
        </div>
    )
}
