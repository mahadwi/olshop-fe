import { useEffect, useState } from "react";
import FooterComponent from "../../../components/footer/FooterComponent";
import BreadCrumbComponent from "../../../components/general/breadcrumb/BreadCrumbComponent";
import ContainerComponent from "../../../components/general/container/ContainerComponent";
import NavbarComponent from "../../../components/general/navbar/NavbarComponent";
import ScreenContainerComponent from "../../../components/general/screen-container/ScreenContainerComponent";
import TermAndConditionIllustration from './../../../images/term-and-condition/TermAndConditionIllustration.png'
import './term-and-condition.scoped.scss'
import Api from "../../../utils/Api";
import LoadingComponent from "../../../components/general/loading/LoadingComponent";
import { useLocation } from 'react-router-dom';

export default function TermAndConditionIndex() {
    const { pathname } = useLocation();

    const [breadcrumb, setBreadcrumb] = useState([])
    const [contactObj, setContactObj] = useState({})
    const [loading, setLoading] = useState(true)

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        loadBreadcrumb()
        loadContact()
    }, [])

    const loadContact = () => {

        setLoading(true)
        Api.get('/contact')
            .then((res) => {
                setContactObj(res.data.data[0])

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
                label: 'Privacy Police',
            }
        ])
    }

    return (
        <div>
            <LoadingComponent loading={loading} />
            <NavbarComponent />
            <ScreenContainerComponent>
                <div className="privacy-police">
                    <ContainerComponent>
                        <BreadCrumbComponent lists={breadcrumb} />
                    </ContainerComponent>

                    <div className="hero">
                        <div className="inner-bg">
                            <h3>TERM AND</h3>
                            <h3>CONDITION</h3>
                        </div>
                        <img src={TermAndConditionIllustration} alt="" />
                    </div>
                    <ContainerComponent>
                        <div className='follow-us-wrap'>
                            <h4>
                                Follow us on :
                            </h4>
                            <ul>
                                <li>
                                    <a target='_blank' href={contactObj.facebook} style={{ background: '#081CC9' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M4.599 10.75H6.599V6.745H8.401L8.599 4.755H6.599V3.75C6.599 3.61739 6.65168 3.49021 6.74545 3.39645C6.83922 3.30268 6.96639 3.25 7.099 3.25H8.599V1.25H7.099C6.43596 1.25 5.80008 1.51339 5.33123 1.98223C4.86239 2.45107 4.599 3.08696 4.599 3.75V4.755H3.599L3.401 6.745H4.599V10.75Z" fill="white" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a target='_blank' href={contactObj.instagram} style={{ background: '#593AB4' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <g clip-path="url(#clip0_484_1097)">
                                                <path d="M6 0C4.37175 0 4.167 0.0075 3.52725 0.036C2.8875 0.066 2.45175 0.1665 2.07 0.315C1.66957 0.465614 1.30687 0.70187 1.00725 1.00725C0.702057 1.30702 0.46583 1.66968 0.315 2.07C0.1665 2.451 0.06525 2.8875 0.036 3.525C0.0075 4.16625 0 4.37025 0 6.00075C0 7.62975 0.0075 7.83375 0.036 8.4735C0.066 9.1125 0.1665 9.54825 0.315 9.93C0.46875 10.3245 0.6735 10.659 1.00725 10.9928C1.34025 11.3265 1.67475 11.532 2.06925 11.685C2.45175 11.8335 2.88675 11.9347 3.52575 11.964C4.16625 11.9925 4.37025 12 6 12C7.62975 12 7.833 11.9925 8.4735 11.964C9.11175 11.934 9.549 11.8335 9.93075 11.685C10.3309 11.5343 10.6934 11.2981 10.9928 10.9928C11.3265 10.659 11.5312 10.3245 11.685 9.93C11.8328 9.54825 11.934 9.1125 11.964 8.4735C11.9925 7.83375 12 7.62975 12 6C12 4.37025 11.9925 4.16625 11.964 3.52575C11.934 2.8875 11.8328 2.451 11.685 2.07C11.5342 1.66967 11.298 1.30701 10.9928 1.00725C10.6932 0.701757 10.3305 0.465484 9.93 0.315C9.5475 0.1665 9.111 0.06525 8.47275 0.036C7.83225 0.0075 7.629 0 5.9985 0H6.00075H6ZM5.46225 1.0815H6.00075C7.60275 1.0815 7.7925 1.08675 8.42475 1.116C9.00975 1.14225 9.32775 1.2405 9.53925 1.32225C9.819 1.431 10.0192 1.5615 10.2292 1.7715C10.4392 1.9815 10.569 2.181 10.6778 2.4615C10.7603 2.67225 10.8577 2.99025 10.884 3.57525C10.9132 4.2075 10.9193 4.39725 10.9193 5.9985C10.9193 7.59975 10.9132 7.79025 10.884 8.4225C10.8577 9.0075 10.7595 9.32475 10.6778 9.53625C10.5816 9.79677 10.428 10.0323 10.2285 10.2255C10.0185 10.4355 9.819 10.5653 9.5385 10.674C9.3285 10.7565 9.0105 10.854 8.42475 10.881C7.7925 10.9095 7.60275 10.9163 6.00075 10.9163C4.39875 10.9163 4.20825 10.9095 3.576 10.881C2.991 10.854 2.67375 10.7565 2.46225 10.674C2.20162 10.5779 1.96584 10.4247 1.77225 10.2255C1.57256 10.032 1.41879 9.79624 1.32225 9.5355C1.2405 9.32475 1.14225 9.00675 1.116 8.42175C1.0875 7.7895 1.0815 7.59975 1.0815 5.997C1.0815 4.395 1.0875 4.206 1.116 3.57375C1.143 2.98875 1.2405 2.67075 1.323 2.45925C1.43175 2.1795 1.56225 1.97925 1.77225 1.76925C1.98225 1.55925 2.18175 1.4295 2.46225 1.32075C2.67375 1.23825 2.991 1.14075 3.576 1.11375C4.1295 1.08825 4.344 1.08075 5.46225 1.08V1.0815ZM9.20325 2.0775C9.1087 2.0775 9.01507 2.09612 8.92772 2.13231C8.84036 2.16849 8.76099 2.22152 8.69413 2.28838C8.62727 2.35524 8.57424 2.43461 8.53806 2.52197C8.50187 2.60932 8.48325 2.70295 8.48325 2.7975C8.48325 2.89205 8.50187 2.98568 8.53806 3.07303C8.57424 3.16039 8.62727 3.23976 8.69413 3.30662C8.76099 3.37348 8.84036 3.42651 8.92772 3.46269C9.01507 3.49888 9.1087 3.5175 9.20325 3.5175C9.39421 3.5175 9.57734 3.44164 9.71237 3.30662C9.84739 3.17159 9.92325 2.98846 9.92325 2.7975C9.92325 2.60654 9.84739 2.42341 9.71237 2.28838C9.57734 2.15336 9.39421 2.0775 9.20325 2.0775ZM6.00075 2.919C5.59205 2.91262 5.18617 2.98761 4.80673 3.13961C4.4273 3.2916 4.08189 3.51755 3.79061 3.80432C3.49934 4.09108 3.26802 4.43293 3.11013 4.80995C2.95224 5.18696 2.87093 5.59163 2.87093 6.00037C2.87093 6.40912 2.95224 6.81379 3.11013 7.1908C3.26802 7.56782 3.49934 7.90967 3.79061 8.19643C4.08189 8.4832 4.4273 8.70915 4.80673 8.86114C5.18617 9.01314 5.59205 9.08813 6.00075 9.08175C6.80966 9.06913 7.58116 8.73893 8.14873 8.16244C8.71631 7.58594 9.03443 6.80938 9.03443 6.00037C9.03443 5.19137 8.71631 4.41481 8.14873 3.83831C7.58116 3.26182 6.80966 2.93162 6.00075 2.919ZM6.00075 3.99975C6.53125 3.99975 7.04002 4.21049 7.41514 4.58561C7.79026 4.96073 8.001 5.4695 8.001 6C8.001 6.5305 7.79026 7.03927 7.41514 7.41439C7.04002 7.78951 6.53125 8.00025 6.00075 8.00025C5.47025 8.00025 4.96148 7.78951 4.58636 7.41439C4.21124 7.03927 4.0005 6.5305 4.0005 6C4.0005 5.4695 4.21124 4.96073 4.58636 4.58561C4.96148 4.21049 5.47025 3.99975 6.00075 3.99975Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_484_1097">
                                                    <rect width="12" height="12" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a target='_blank' href={contactObj.tiktok} style={{ background: '#111' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M8.29996 2.91C7.95817 2.51981 7.76981 2.01872 7.76996 1.5H6.22496V7.7C6.21304 8.03551 6.07139 8.35331 5.82984 8.58647C5.58829 8.81963 5.26568 8.94995 4.92996 8.95C4.21996 8.95 3.62996 8.37 3.62996 7.65C3.62996 6.79 4.45996 6.145 5.31496 6.41V4.83C3.58996 4.6 2.07996 5.94 2.07996 7.65C2.07996 9.315 3.45996 10.5 4.92496 10.5C6.49496 10.5 7.76996 9.225 7.76996 7.65V4.505C8.39645 4.95493 9.14864 5.19632 9.91996 5.195V3.65C9.91996 3.65 8.97996 3.695 8.29996 2.91Z" fill="white" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </ContainerComponent>
                    <ContainerComponent>
                        <div className="body">
                            <h3>TERMS AND CONDITIONS PT LUXI KNOWN AS LUXI</h3>
                            <h3>INTRODUCTION</h3>

                            <p>
                                Welcome to PT Luxi (“Company”, “we”, “our”, “us”)! These Terms of Service (“Terms”, “Terms of Service”) govern your use of our website located at belleandkate.com (together or individually “Service”) operated by PT Berkah Nusantara Kayana. Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages.
                            </p>

                            <p>
                                Your agreement with us includes these Terms and our Privacy Policy (“Agreements”). You acknowledge that you have read and understood Agreements, and agree to be bound of them. If you do not agree with (or cannot comply with) Agreements, then you may not use the Service, but please let us know by emailing at berkahnusantarakayana@gmail.com so we can try to find a solution. These Terms apply to all visitors, users and others who wish to access or use Service.
                            </p>

                            <h3>
                                COMMUNICATIONS
                            </h3>

                            <p>
                                By using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or by emailing at berkahnusantarakayana@gmail.com.
                            </p>

                            <h3>
                                PURCHASES
                            </h3>

                            <p>
                                If you wish to purchase any product or service made available through Service (“Purchase”), you may be asked to supply certain information relevant to your Purchase including but not limited to, your credit or debit card number, the expiration date of your card, your billing address, and your shipping information.
                            </p>

                            <p>
                                You represent and warrant that: (i) you have the legal right to use any card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete.
                            </p>

                            <p>
                                We may employ the use of third party services for the purpose of facilitating payment and the completion of Purchases. By submitting your information, you grant us the right to provide the information to these third parties subject to our Privacy Policy.
                            </p>

                            <p>
                                We reserve the right to refuse or cancel your order at any time for reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order or other reasons.
                            </p>

                            <p>
                                We reserve the right to refuse or cancel your order if fraud or an unauthorized or illegal transaction is suspected.
                            </p>

                            <h3>
                                CONTESTS, SWEEPSTAKES AND PROMOTIONS
                            </h3>


                            <p>
                                Any contests, sweepstakes or other promotions (collectively, “Promotions”) made available through Service may be governed by rules that are separate from these Terms of Service. If you participate in any Promotions, please review the applicable rules as well as our Privacy Policy. If the rules for a Promotion conflict with these Terms of Service, Promotion rules will apply.
                            </p>

                            <h3>
                                REFUNDS
                            </h3>

                            <p>
                                We issue refunds for Contracts within 60 days of the original purchase of the Contract.
                            </p>

                            <h3>
                                CONTENT
                            </h3>

                            <p>
                                Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material (“Content”). You are responsible for Content that you post on or through Service, including its legality, reliability, and appropriateness.
                            </p>

                            <p>
                                By posting Content on or through Service, You represent and warrant that: (i) Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity. We reserve the right to terminate the account of anyone found to be infringing on a copyright.
                            </p>

                            <h3>
                                You retain any and all of your rights to any Content you submit, post or display on or through Service and you are responsible for protecting those rights. We take no responsibility and assume no liability for Content you or any third party posts on or through Service. However, by posting Content using Service you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through Service. You agree that this license includes the right for us to make your Content available to other users of Service, who may also use your Content subject to these Terms.
                            </h3>

                            <p>
                                PT Luxi has the right but not the obligation to monitor and edit all Content provided by users.
                            </p>

                            <p>
                                In addition, Content found on or through this Service are the property of PT Luxi or used with permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission from us.
                            </p>

                            <h3>
                                DELIVERY POLICY
                            </h3>

                            <ol>
                                <li>
                                    Your order will be delivered within 1 (one) day after we receive the payment.
                                </li>
                                <li>
                                    Belle&Kate will check the condition and inclusion of your items before we proceed with delivery.
                                </li>
                                <li>
                                    Private Courier Delivery is only available in Jakarta and Tangerang
                                </li>
                                <li>
                                    Customers MUST keep the record of their unboxing video in 1x24 hours after the item has arrived to file a complaint
                                </li>
                            </ol>

                            <h3>
                                PROHIBITED USES
                            </h3>

                            <p>
                                You may use Service only for lawful purposes and in accordance with Terms. You agree not to use Service:
                            </p>

                            <ol>
                                <li>
                                    In any way that violates any applicable national or international law or regulation.
                                </li>
                                <li>
                                    For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.
                                </li>
                                <li>
                                    To transmit, or procure the sending of, any advertising or promotional material, including any “junk mail”, “chain letter,” “spam,” or any other similar solicitation.
                                </li>
                                <li>
                                    To impersonate or attempt to impersonate Company, a Company employee, another user, or any other person or entity.
                                </li>
                                <li>
                                    In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.
                                </li>
                                <li>
                                    To engage in any other conduct that restricts or inhibits anyone’s use or enjoyment of Service, or which, as determined by us, may harm or offend Company or users of Service or expose them to liability.
                                </li>
                            </ol>

                            <p>
                                Additionally, you agree not to:
                            </p>

                            <ol>
                                <li>
                                    Use Service in any manner that could disable, overburden, damage, or impair Service or interfere with any other party’s use of Service, including their ability to engage in real time activities through Service.
                                </li>
                                <li>
                                    Use any robot, spider, or other automatic device, process, or means to access Service for any purpose, including monitoring or copying any of the material on Service.
                                </li>
                                <li>
                                    Use any manual process to monitor or copy any of the material on Service or for any other unauthorized purpose without our prior written consent.
                                </li>
                                <li>
                                    Use any device, software, or routine that interferes with the proper working of Service.
                                </li>
                                <li>
                                    Introduce any viruses, trojan horses, worms, logic bombs, or other material which is malicious or technologically harmful.
                                </li>
                                <li>
                                    Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of Service, the server on which Service is stored, or any server, computer, or database connected to Service.
                                </li>
                                <li>
                                    Attack Service via a denial-of-service attack or a distributed denial-of-service attack.
                                </li>
                                <li>
                                    Take any action that may damage or falsify Company rating.
                                </li>
                                <li>
                                    Otherwise attempt to interfere with the proper working of Service.
                                </li>
                            </ol>

                            <h3>
                                ANALYTICS
                            </h3>

                            <p>
                                We may use third-party Service Providers to monitor and analyze the use of our Service.
                            </p>

                            <h3>
                                NO USE BY MINORS
                            </h3>

                            <p>
                                Service is intended only for access and use by individuals at least eighteen (18) years old. By accessing or using Service, you warrant and represent that you are at least eighteen (18) years of age and with the full authority, right, and capacity to enter into this agreement and abide by all of the terms and conditions of Terms. If you are not at least eighteen (18) years old, you are prohibited from both the access and usage of Service.
                            </p>

                            <h3>
                                ACCOUNTS
                            </h3>

                            <p>
                                When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on Service.
                            </p>
                            <p>
                                You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                            </p>

                            <p>
                                You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you, without appropriate authorization. You may not use as a username any name that is offensive, vulgar or obscene.
                            </p>

                            <p>
                                We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in our sole discretion.
                            </p>

                            <p>
                                Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of PT Luxi and its licensors. Service is protected by copyright, trademark, and other laws of and foreign countries. Our trademarks may not be used in connection with any product or service without the prior written consent of PT Luxi.
                            </p>

                            <h3>
                                COPYRIGHT POLICY
                            </h3>

                            <p>
                                We respect the intellectual property rights of others. It is our policy to respond to any claim that Content posted on Service infringes on the copyright or other intellectual property rights (“Infringement”) of any person or entity.
                            </p>
                            <p>
                                If you are a copyright owner, or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via email to berkahnusantarakayana@gmail.com, with the subject line: “Copyright Infringement” and include in your claim a detailed description of the alleged Infringement as detailed below, under “DMCA Notice and Procedure for Copyright Infringement Claims”
                            </p>

                            <p>
                                You may be held accountable for damages (including costs and attorneys’ fees) for misrepresentation or bad-faith claims on the infringement of any Content found on and/or through Service on your copyright.
                            </p>

                            <h3>
                                ERROR REPORTING AND FEEDBACK
                            </h3>

                            <p>
                                You may provide us either directly at berkahnusantarakayana@gmail.com or via third party sites and tools with information and feedback concerning errors, suggestions for improvements, ideas, problems, complaints, and other matters related to our Service (“Feedback”). You acknowledge and agree that: (i) you shall not retain, acquire or assert any intellectual property right or other right, title or interest in or to the Feedback; (ii) Company may have development ideas similar to the Feedback; (iii) Feedback does not contain confidential information or proprietary information from you or any third party; and (iv) Company is not under any obligation of confidentiality with respect to the Feedback. In the event the transfer of the ownership to the Feedback is not possible due to applicable mandatory laws, you grant Company and its affiliates an exclusive, transferable, irrevocable, free-of-charge, sub-licensable, unlimited and perpetual right to use (including copy, modify, create derivative works, publish, distribute and commercialize) Feedback in any manner and for any purpose.
                            </p>

                            <h3>
                                LINKS TO OTHER WEB SITES
                            </h3>

                            <p>
                                Our Service may contain links to third party web sites or services that are not owned or controlled by PT Luxi.
                            </p>
                            <p>
                                PT Luxi has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third party web sites or services. We do not warrant the offerings of any of these entities/individuals or their websites.
                            </p>

                            <p>
                                For example, the outlined Terms of Use have been created using PolicyMaker.io, a free web application for generating high-quality legal documents. PolicyMaker’s Terms and Conditions generator is an easy-to-use free tool for creating an excellent standard Terms of Service template for a website, blog, e-commerce store or app.
                            </p>

                            <p>
                                YOU ACKNOWLEDGE AND AGREE THAT COMPANY SHALL NOT BE RESPONSIBLE OR LIABLE, DIRECTLY OR INDIRECTLY, FOR ANY DAMAGE OR LOSS CAUSED OR ALLEGED TO BE CAUSED BY OR IN CONNECTION WITH USE OF OR RELIANCE ON ANY SUCH CONTENT, GOODS OR SERVICES AVAILABLE ON OR THROUGH ANY SUCH THIRD PARTY WEB SITES OR SERVICES.
                            </p>
                            <p>
                                WE STRONGLY ADVISE YOU TO READ THE TERMS OF SERVICE AND PRIVACY POLICIES OF ANY THIRD PARTY WEB SITES OR SERVICES THAT YOU VISIT.
                            </p>

                            <h3>
                                DISCLAIMER OF WARRANTY
                            </h3>

                            <p>
                                These services are provided by company on an “as is” and “as available” basis. company makes no representations or warranties of any kind, express or implied, as to the operation of their services, or the information, content or materials included therein. you expressly agree that your use of these services, their content, and any services or items obtained from us is at your sole risk.
                            </p>

                            <p>
                                Neither company nor any person associated with company makes any warranty or representation with respect to the completeness, security, reliability, quality, accuracy, or availability of the services. without limiting the foregoing, neither company nor anyone associated with company represents or warrants that the services, their content, or any services or items obtained through the services will be accurate, reliable, error-free, or uninterrupted, that defects will be corrected, that the services or the server that makes it available are free of viruses or other harmful components or that the services or any services or items obtained through the services will otherwise meet your needs or expectations.
                            </p>

                            <p>
                                Company hereby disclaims all warranties of any kind, whether express or implied, statutory, or otherwise, including but not limited to any warranties of merchantability, non-infringement, and fitness for particular purpose.
                            </p>

                            <p>
                                The foregoing does not affect any warranties which cannot be excluded or limited under applicable law.
                            </p>

                            <h3>
                                CHANGES TO SERVICE
                            </h3>

                            <p>
                                We reserve the right to withdraw or amend our Service, and any service or material we provide via Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of Service is unavailable at any time or for any period. From time to time, we may restrict access to some parts of Service, or the entire Service, to users, including registered users.
                            </p>

                            <h3>
                                AMENDMENTS TO TERMS
                            </h3>

                            <p>
                                We may amend Terms at any time by posting the amended terms on this site. It is your responsibility to review these Terms periodically.
                            </p>
                            <p>
                                Your continued use of the Platform following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.
                            </p>


                            <p>
                                By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use Service.
                            </p>

                            <h3>
                                WAIVER AND SEVERABILITY
                            </h3>
                            <p>
                                No waiver by Company of any term or condition set forth in Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of Company to assert a right or provision under Terms shall not constitute a waiver of such right or provision.
                            </p>
                            <p>
                                If any provision of Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of Terms will continue in full force and effect.
                            </p>
                            <h3>
                                ACKNOWLEDGEMENT
                            </h3>

                            <p>
                                By using service or other services provided by us, you acknowledge that you have read these terms of service and agree to be bound by them.
                            </p>
                            <h3>
                                CONTACT US
                            </h3>
                            <p>
                                Please send your feedback, comments, requests for technical support by email : customerservice@luxi.com
                            </p>
                        </div>
                    </ContainerComponent>
                </div>
            </ScreenContainerComponent>
            <FooterComponent />
        </div>
    )
}