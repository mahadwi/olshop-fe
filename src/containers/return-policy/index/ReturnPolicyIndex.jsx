import { useContext, useEffect, useState } from "react";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import { useLocation } from "react-router-dom";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import './return-policy.scoped.scss'
import Api from "../../../utils/Api";
import { LoadingContext } from "../../../context/LoadingContext";

export default function ReturnPolicyIndex() {

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
    const [returnPoliceObject, setReturnPoliceObject] = useState({})

    useEffect(() => {
        loadBreadcrumb()
        loadReturnPoliceObject()
    }, [])

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const loadReturnPoliceObject = () => {
        setLoading(true)
        Api.get('/return-police')
            .then((res) => {
                if (res) {
                    setReturnPoliceObject(res.data.data[0])
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
                label: 'Return Police'
            }
        ])
    }

    return (
        <div>
            <ContainerComponent>
                <BreadCrumbComponent lists={breadcrumb} />

                <div className="return-policy-wrapper">
                    <div className="left">
                        <div className="inner">
                            <img src={returnPoliceObject.image_url} alt="" />
                        </div>
                    </div>
                    <div className="right">
                        <div className="inner">
                            <div className="box">
                                <p dangerouslySetInnerHTML={{ __html: returnPoliceObject.description }}>
                                </p>
                            </div>
                            <a target="_blank" href={`https://wa.me/${returnPoliceObject.cp}`} className="btn-action"><IconBrandWhatsapp /> <span>Contact Us</span></a>
                        </div>
                    </div>
                </div>
            </ContainerComponent>
        </div>
    )
}