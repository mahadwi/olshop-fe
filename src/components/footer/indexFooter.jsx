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
                                    <Link>Contact Us</Link>
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
                                    <Link>About Us</Link>
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
                        <p>© 2023 LUXI All rights Reserved. | <Link>Follow Our Social Media</Link></p>
                    </div>
                </div>
            </ContainerComponent>
        </footer>
    )
}
// export default class indexFooter extends Component {
//     render() {
//         return (
//             <footer>
//                 div
//             </footer>

//             // <Card className='footer rounded-0'>
//             //     <Row>
//             //         <Col className='col-3' style={{ marginRight: "60px" }}>
//             //             <Card.Body>
//             //                 <Card.Title style={{ color: "white" }}>Never Miss a Beat</Card.Title>
//             //                 <Card.Text style={{ color: "white" }}>
//             //                     Be the first to hear about product launches, collaborations, and more when you sign up for our emails
//             //                 </Card.Text>
//             //                 <input className='inputEmail' placeholder='Enter Email Here' />
//             //                 <Button variant="warning" className='buttonEmail' size='sm'>Submit</Button>
//             //             </Card.Body>
//             //         </Col>
//             //         <Col className='col-2'>
//             //             <Card.Body>
//             //                 <Card.Title style={{ color: "white", fontSize: "18px" }}><img src={ClientServiceLogo} /> Client Service</Card.Title>
//             //                 <Card.Text style={{ color: "white" }}>
//             //                     <a className='footerlink' href='#'>Delivery & Shipping</a>
//             //                     <br />
//             //                     <a className='footerlink' href='#'>FAQ</a>
//             //                     <br />
//             //                     <a className='footerlink' href='#'>Contact Us</a>
//             //                 </Card.Text>
//             //             </Card.Body>
//             //         </Col>
//             //         <Col className='col-2'>
//             //             <Card.Body>
//             //                 <Card.Title style={{ color: "white", fontSize: "18px" }}><img src={ConsignSellLogo} /> Consign & Sell</Card.Title>
//             //                 <Card.Text style={{ color: "white" }}>
//             //                     <a className='footerlink' href='#'>Consignment</a>
//             //                     <br />
//             //                     <a className='footerlink' href='#'>Trade - In</a>
//             //                     <br />
//             //                     <a className='footerlink' href='#'>Direct Selling</a>
//             //                 </Card.Text>
//             //             </Card.Body>
//             //         </Col>
//             //         <Col className='col-2'>
//             //             <Card.Body>
//             //                 <Card.Title style={{ color: "white", fontSize: "18px" }}><img src={BuyLogo} /> Buy</Card.Title>
//             //                 <Card.Text style={{ color: "white" }}>
//             //                     <a className='footerlink' href='#'>Order Tracking</a>
//             //                     <br />
//             //                     <a className='footerlink' href='#'>Return Policy</a>
//             //                     <br />
//             //                     <a className='footerlink' href='#'>Authentication</a>
//             //                 </Card.Text>
//             //             </Card.Body>
//             //         </Col>
//             //         <Col className='col-2'>
//             //             <Card.Body>
//             //                 <Card.Title style={{ color: "white", fontSize: "18px" }}><img src={LuxiLogo} /> Luxi</Card.Title>
//             //                 <Card.Text style={{ color: "white" }}>
//             //                     <a className='footerlink' href='#'>About Us</a>
//             //                     <br />
//             //                     <a className='footerlink' href='#'>Work With Us</a>
//             //                     <br />
//             //                     <a className='footerlink' href='#'>Review</a>
//             //                 </Card.Text>
//             //             </Card.Body>
//             //         </Col>
//             //     </Row>
//             // </Card>
//         )
//     }
// }
