import React, { Component } from 'react'
import { IconHeadset, IconInfoCircleFilled, IconShoppingBag, IconTag } from '@tabler/icons-react';
import ContainerComponent from '../general/container/ContainerComponent';
import './footer.scoped.scss'
import { useTranslation } from "react-i18next";

export default function FooterComponent() {
    const { t } = useTranslation();

    return (
        <footer>
            <ContainerComponent>
                <div className='inner-footer'>
                    <div className='left'>
                        <h3>{t('footertitle')}</h3>

                        <p>{t('footerdescription')}</p>
                        <form action="">
                            <input type="email" placeholder='Enter email here' />
                            <button>{t('submit')}</button>
                        </form>
                    </div>
                    <div className='right'>
                        <div className='footer-links-wrapper'>
                            <ul>
                                <li>
                                    <IconHeadset />
                                    <span>{t('clientservice')}</span>
                                </li>
                                <li>
                                    <a href={'/delivery-and-shipping'}>{t('deliveryshipping')}</a>
                                </li>
                                <li>
                                    <a href={'/faq'}>{t('faq')}</a>
                                </li>
                                <li>
                                    <a href={'/contact'}>{t('footercontact')}</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <IconTag />
                                    <span>{t('consignsell')}</span>
                                </li>
                                <li>
                                    <a href={'/consignment'}>{t('consignment')}</a>
                                </li>
                                <li>
                                    <a href={'/authentication'}>{t('authentication')}</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <IconShoppingBag />
                                    <span>{t('buy')}</span>
                                </li>
                                <li>
                                    <a href='#'>{t('ordertracking')}</a>
                                </li>
                                <li>
                                    <a href={'/return-police'}>{t('returnpolicy')}</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <IconInfoCircleFilled />
                                    <span>Luxi</span>
                                </li>
                                <li>
                                    <a href={'/about-us'}>{t('footeraboutus')}</a>
                                </li>
                                <li>
                                    <a href={'/work-with-us'}>{t('workwithus')}</a>
                                </li>
                                <li>
                                    <a href='#'>{t('review')}</a>
                                </li>
                            </ul>
                        </div>
                        <hr />
                        <ul className='footer-foot-list'>
                            <li>
                                <a href={'/customer-care'}>{t('customercare')}</a>
                            </li>
                            <li>
                                <a href={'/term-and-conditions'}>{t('termconditions')}</a>
                            </li>
                            <li>
                                <a href={'/privacy-police'}>{t('privacypolicy')}</a>
                            </li>
                            <li>
                                <a href='#'>{t('yourprivacychoize')}</a>
                            </li>
                        </ul>
                        <p>© {new Date().getFullYear()} LUXI {t('allrightsreserved')}. | <a href={'/contact'}>{t('followoursocialmedia')}</a></p>
                    </div>
                </div>
            </ContainerComponent>
        </footer>
    )
}
