import React, { Component, useContext } from "react";
import { IconHeadset, IconInfoCircleFilled, IconShoppingBag, IconTag } from "@tabler/icons-react";
import ContainerComponent from "../general/container/ContainerComponent";
import "./footer.scoped.scss";
import { AuthUserContext } from "../../context/AuthUserContext";
import { SiteSettingContext } from "../../context/SiteSettingContext";
import { useTranslation } from "react-i18next";
import IconAppStore from "./../../images/App_Store_(iOS).svg";
import IconGooglePlay from "./../../images/1664285914google-play-logo-png.png";

export default function FooterComponent() {
    const { user } = useContext(AuthUserContext);
    const { siteSetting } = useContext(SiteSettingContext);
    const { t } = useTranslation();

    return (
        <footer>
            <ContainerComponent>
                <div className="inner-footer">
                    <div className="left">
                        <h3>{t("footertitle")}</h3>

                        <p>{t("footerdescription")}</p>
                        <form action="">
                            <input type="email" placeholder="Enter email here" />
                            <button>{t("submit")}</button>
                        </form>
                    </div>
                    <div className="right">
                        <div className="footer-links-wrapper">
                            <ul>
                                <li>
                                    <IconHeadset />
                                    <span>{t("clientservice")}</span>
                                </li>
                                <li>
                                    <a href={"/delivery-and-shipping"}>{t("deliveryshipping")}</a>
                                </li>
                                <li>
                                    <a href={"/faq"}>{t("faq")}</a>
                                </li>
                                <li>
                                    <a href={"/contact"}>{t("footercontact")}</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <IconTag />
                                    <span>{t("consignsell")}</span>
                                </li>
                                <li>
                                    <a href={"/consignment"}>{t("consignment")}</a>
                                </li>
                                <li>
                                    <a href={"/authentication"}>{t("authentication")}</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <IconShoppingBag />
                                    <span>{t("buy")}</span>
                                </li>
                                <li>
                                    {user ? (
                                        <>
                                            <a className="only-desktop" href="/account/orders">
                                                {t("ordertracking")}
                                            </a>
                                            <a className="only-mobile" href="/profile/orders">
                                                {t("ordertracking")}
                                            </a>
                                        </>
                                    ) : (
                                        <a href="/login">{t("ordertracking")}</a>
                                    )}
                                </li>
                                <li>
                                    <a href={"/policy"}>{t("returnpolicy")}</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <IconInfoCircleFilled />
                                    <span>LUXURYHUB</span>
                                </li>
                                <li>
                                    <a href={"/about-us"}>{t("footeraboutus")}</a>
                                </li>
                                <li>
                                    <a href={"/work-with-us"}>{t("workwithus")}</a>
                                </li>
                                <li>
                                    <a href="/#review">{t("review")}</a>
                                </li>
                            </ul>
                        </div>
                        <hr />
                        <ul className="footer-foot-list">
                            <li>
                                <a href={"/customer-care"}>{t("customercare")}</a>
                            </li>
                            <li>
                                <a href={"/term-and-conditions"}>{t("termconditions")}</a>
                            </li>
                            <li>
                                <a href={"/privacy-policy"}>{t("privacypolicy")}</a>
                            </li>
                            <li>
                                <a href="#">{t("yourprivacychoize")}</a>
                            </li>
                        </ul>
                        <p>
                            © {siteSetting.copyright} {t("allrightsreserved")}. |{" "}
                            <a href={"/contact"}>{t("followoursocialmedia")}</a>
                        </p>
                        <div className="application-link">
                            <div>
                                <p>DOWNLOAD :</p>
                                <ul>
                                    <li>
                                        <a href="">
                                            <img src={IconAppStore} alt="" />
                                            APPS STORE
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <img src={IconGooglePlay} alt="" />
                                            GOOGLE PLAY
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </ContainerComponent>
        </footer>
    );
}
