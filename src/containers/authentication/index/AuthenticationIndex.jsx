import { useContext, useEffect, useState } from "react";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { useLocation } from "react-router-dom";
import './authentication.scoped.scss'
import Api from "../../../utils/Api";
import { LoadingContext } from "../../../context/LoadingContext";
import { LanguageContext } from "../../../context/LanguageContext";

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
    const { language } = useContext(LanguageContext)
    const suffix = language == 'id' ? '' : '_en';

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
        Api.get('/authentication')
            .then((res) => {
                if (res) {
                    setAuthenticationObject(res.data.data[0])
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
                        <div className='title0'>{authenticationObject['title'+suffix]}</div>
                        <div className='title1' dangerouslySetInnerHTML={{__html: authenticationObject['description'+suffix]}}></div>
                    </div>
                    <div className='video'>
                        <div className='video-title'>WATCH HOW WE DO IT</div>
                        <div className='video-youtube'>
                            <iframe src={`https://www.youtube-nocookie.com/embed/${authenticationObject.link?.split('/').at(-1)}?si=A1ujlX7IktTEKpc2`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div className='processes'>
                        <div className='processes-title'>OUR AUTHENTICATION PROCESS</div>
                        <div className='processes-list'>
                        {authenticationObject.authentication_sections?.map((a, i) => {
                            const flip = i % 2 != 0;
                            return <>
                                {i!=0? <div className='process-div'/> :null}
                                <div className={`process ${flip ? 'flip' : ''}`}>
                                    <div className='process-image'>
                                        <img src={a.image} alt={a['title'+suffix]} />
                                    </div>
                                    <div className='process-detail'>
                                        <div className='process-title'>{a['title'+suffix]}</div>
                                        <div className='process-content' dangerouslySetInnerHTML={{__html: a['description'+suffix]}}></div>
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
