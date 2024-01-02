import React, { Component } from 'react'
import { IconHeadset, IconInfoCircleFilled, IconShoppingBag, IconTag } from '@tabler/icons-react';
import ContainerComponent from '../general/container/ContainerComponent';
import './footer.scoped.scss'

export default function FooterComponent() {
    return (
        <footer>
            <ContainerComponent>
                <div className='inner-footer'>
                    <div className='left'>
                        <h3>Never Miss a Beat</h3>

                        <p>Be the first to hear about product launches, collaborations, and more when you sign up for our emails.</p>
                        <form action="">
                            <input type="email" placeholder='Enter email here' />
                            <button>Submit</button>
                        </form>
                    </div>
                    <div className='right'>
                        <div className='footer-links-wrapper'>
                            <ul>
                                <li>
                                    <IconHeadset />
                                    <span>Client Service</span>
                                </li>
                                <li>
                                    <a href={'/delivery-and-shipping'}>Delivery & Shipping</a>
                                </li>
                                <li>
                                    <a href={'/faq'}>FAQ</a>
                                </li>
                                <li>
                                    <a href={'/contact'}>Contact</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <IconTag />
                                    <span>Consign & Sell</span>
                                </li>
                                <li>
                                    <a href={'/consignment'}>Consignment</a>
                                </li>
                                <li>
                                    <a href={'/authentication'}>Authentication</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <IconShoppingBag />
                                    <span>Buy</span>
                                </li>
                                <li>
                                    <a href='#'>Order Tracking</a>
                                </li>
                                <li>
                                    <a href={'/return-police'}>Return Policy</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <IconInfoCircleFilled />
                                    <span>Luxi</span>
                                </li>
                                <li>
                                    <a href={'/about-us'}>About Us</a>
                                </li>
                                <li>
                                    <a href={'/work-with-us'}>Work With Us</a>
                                </li>
                                <li>
                                    <a href='#'>Review</a>
                                </li>
                            </ul>
                        </div>
                        <hr />
                        <ul className='footer-foot-list'>
                            <li>
                                <a href={'/customer-care'}>Customer Care</a>
                            </li>
                            <li>
                                <a href={'/term-and-conditions'}>Term & conditions</a>
                            </li>
                            <li>
                                <a href={'/privacy-police'}>Privacy Policy</a>
                            </li>
                            <li>
                                <a href='#'>Your Privacy Choize</a>
                            </li>
                        </ul>
                        <p>© 2023 LUXI All rights Reserved. | <a href={'/contact'}>Follow Our Social Media</a></p>
                    </div>
                </div>
            </ContainerComponent>
        </footer>
    )
}
