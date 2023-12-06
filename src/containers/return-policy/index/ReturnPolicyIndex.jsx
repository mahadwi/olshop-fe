import { useEffect, useState } from "react";
import FooterComponent from "../../../components/footer/FooterComponent";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import NavbarComponent from "../../../components/general/navbar/NavbarComponent";
import ScreenContainerComponent from "../../../components/general/screen-container/ScreenContainerComponent";
import ReturnPolicyIllustration from './../../../images/return-policy/ReturnPolicyIllustration.png'
import { Link } from "react-router-dom";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import './return-policy.scoped.scss'

export default function ReturnPolicyIndex() {
    const [breadcrumb, setBreadcrumb] = useState([])

    useEffect(() => {
        loadBreadcrumb()
    }, [])

    const loadBreadcrumb = () => {
        setBreadcrumb([
            {
                label: 'Home',
                url: '/'
            },
            {
                label: 'Return Policy'
            }
        ])
    }

    return (
        <div>
            <NavbarComponent />
            <ScreenContainerComponent>
                <ContainerComponent>
                    <BreadCrumbComponent lists={breadcrumb} />

                    <div className="return-policy-wrapper">
                        <div className="left">
                            <div className="inner">
                                <img src={ReturnPolicyIllustration} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <div className="inner">
                                <div className="box">
                                    <p>
                                        All orders are final, we do not accept refund/returns for :

                                        <ul>
                                            <li>Discounted/Sale items</li>
                                            <li>tems shipped with international shipping</li>
                                            <li>Items that have been received for more than 24 hours</li>
                                        </ul>

                                        Items that are not according to your liking/taste
                                        We can only accept returns for items that do not match the description or conditions written on the product description page.
                                        Delivery will be borne by customer.


                                    </p>

                                    <p>
                                        <b>IMPORTANT</b> : Submit your Return Request with an unboxing video within 24 hours after you receive your order
                                    </p>

                                    <p>
                                        You can always consign the non-returnable items at www.luxi.com. Contact our Client Advisors for more information.
                                    </p>
                                </div>
                                <Link className="btn-action"><IconBrandWhatsapp /> <span>Contact Us</span></Link>
                            </div>
                        </div>
                    </div>
                </ContainerComponent>
            </ScreenContainerComponent>
            <FooterComponent />
        </div>
    )
}