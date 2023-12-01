import React, { Component } from 'react'
import { IconHeadset, IconInfoCircleFilled, IconShoppingBag } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import ContainerComponent from '../general/container/ContainerComponent';
import './footer.scoped.scss'

export default function IndexFooter() {
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
                                    <Link>Delivery & Shipping</Link>
                                </li>
                                <li>
                                    <Link>FAQ</Link>
                                </li>
                                <li>
                                    <Link to={'/contact'}>Contact</Link>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <IconHeadset />
                                    <span>Consign & Sell</span>
                                </li>
                                <li>
                                    <Link>Consignment</Link>
                                </li>
                                <li>
                                    <Link>Trade - In</Link>
                                </li>
                                <li>
                                    <Link>Direct Selling</Link>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <IconShoppingBag />
                                    <span>Buy</span>
                                </li>
                                <li>
                                    <Link>Order Tracking</Link>
                                </li>
                                <li>
                                    <Link>Return Policy</Link>
                                </li>
                                <li>
                                    <Link>Authentication</Link>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <IconInfoCircleFilled />
                                    <span>Luxi</span>
                                </li>
                                <li>
                                    <Link to={'/about-us'}>About Us</Link>
                                </li>
                                <li>
                                    <Link>Work With Us</Link>
                                </li>
                                <li>
                                    <Link>Review</Link>
                                </li>
                            </ul>
                        </div>
                        <hr />
                        <ul className='footer-foot-list'>
                            <li>
                                <Link>Customer Care</Link>
                            </li>
                            <li>
                                <Link>Term & conditions</Link>
                            </li>
                            <li>
                                <Link>Privacy Policy</Link>
                            </li>
                            <li>
                                <Link>Your Privacy Choize</Link>
                            </li>
                        </ul>
                        <p>© 2023 LUXI All rights Reserved. | <Link to={'/contact'}>Follow Our Social Media</Link></p>
                    </div>
                </div>
            </ContainerComponent>
        </footer>
    )
}