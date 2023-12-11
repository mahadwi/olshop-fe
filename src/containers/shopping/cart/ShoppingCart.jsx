import Checkbox from "react-custom-checkbox";
import BagCurrentOrder from './../../../images/temp/5c855532d5cc981711da2cd9d3b2c062.png'
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import './shopping-cart.scoped.scss'
import ContainerComponent from "../../../components/general/container/ContainerComponent";

export default function ShoppingCart() {
    return (
        <ContainerComponent>
            <div className="shopping-cart-container">
                <h2 className="title-page">My Shopping Cart</h2>
                <h4 className="desc-page">10 items in your cart</h4>

                <div className="carts-head">
                    <div className="checkbox-head">
                        <Checkbox borderColor={'#DADADA'} />
                    </div>
                    <div className="item-head"><h4>Item</h4></div>
                    <div className="item-price-head"><h4>Item Price</h4></div>
                    <div className="qty-head"><h4>Quantity</h4></div>
                    <div className="price-head"><h4>Price</h4></div>
                    <div className="delete-head"></div>
                </div>

                <div className="carts-wrapper">
                    <div className="cart-item">
                        <div className="checkbox-col">
                            <Checkbox borderColor={'#DADADA'} />
                        </div>
                        <div className="product-col">
                            <img src={BagCurrentOrder} alt="" />
                            <div className="product-desc">
                                <h4 className="product-name">Prada Re-Edition 2005 Re-Nylon  mini bag</h4>
                                <span className="product-weight">1 pcs (500 gr)</span>
                            </div>
                        </div>
                        <div className="item-price-col">
                            <h4 className="item-price">Rp. 19.631.312</h4>
                        </div>
                        <div className="qty-col">
                            <div>
                                <button><IconMinus size={16} /></button>
                                <input type="text" name="" value={1} id="" />
                                <button><IconPlus size={16} /></button>
                            </div>
                        </div>
                        <div className="price-col">
                            <h4 className="price">Rp. 19.631.312</h4>
                        </div>
                        <div className="delete-col">
                            <button><IconTrash size={20} color="#F24E1E" /></button>
                        </div>
                    </div>
                    <div className="cart-item">
                        <div className="checkbox-col">
                            <Checkbox borderColor={'#DADADA'} />
                        </div>
                        <div className="product-col">
                            <img src={BagCurrentOrder} alt="" />
                            <div className="product-desc">
                                <h4 className="product-name">Prada Re-Edition 2005 Re-Nylon  mini bag</h4>
                                <span className="product-weight">1 pcs (500 gr)</span>
                            </div>
                        </div>
                        <div className="item-price-col">
                            <h4 className="item-price">Rp. 19.631.312</h4>
                        </div>
                        <div className="qty-col">
                            <div>
                                <button><IconMinus size={16} /></button>
                                <input type="text" name="" value={1} id="" />
                                <button><IconPlus size={16} /></button>
                            </div>
                        </div>
                        <div className="price-col">
                            <h4 className="price">Rp. 19.631.312</h4>
                        </div>
                        <div className="delete-col">
                            <button><IconTrash size={20} color="#F24E1E" /></button>
                        </div>
                    </div>
                </div>

                <div className="box-bottom-checkout">
                    <div className="top-voucher">
                        <div className="inner">
                            <div className="text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M14.8 8L16 9.2L9.2 16L8 14.8L14.8 8ZM4 4H20C21.11 4 22 4.89 22 6V10C21.4696 10 20.9609 10.2107 20.5858 10.5858C20.2107 10.9609 20 11.4696 20 12C20 12.5304 20.2107 13.0391 20.5858 13.4142C20.9609 13.7893 21.4696 14 22 14V18C22 19.11 21.11 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V14C3.11 14 4 13.11 4 12C4 11.4696 3.78929 10.9609 3.41421 10.5858C3.03914 10.2107 2.53043 10 2 10V6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4ZM4 6V8.54C4.60768 8.8904 5.11236 9.39466 5.46325 10.0021C5.81415 10.6094 5.9989 11.2985 5.9989 12C5.9989 12.7015 5.81415 13.3906 5.46325 13.9979C5.11236 14.6053 4.60768 15.1096 4 15.46V18H20V15.46C19.3923 15.1096 18.8876 14.6053 18.5367 13.9979C18.1858 13.3906 18.0011 12.7015 18.0011 12C18.0011 11.2985 18.1858 10.6094 18.5367 10.0021C18.8876 9.39466 19.3923 8.8904 20 8.54V6H4ZM9.5 8C10.33 8 11 8.67 11 9.5C11 10.33 10.33 11 9.5 11C8.67 11 8 10.33 8 9.5C8 8.67 8.67 8 9.5 8ZM14.5 13C15.33 13 16 13.67 16 14.5C16 15.33 15.33 16 14.5 16C13.67 16 13 15.33 13 14.5C13 13.67 13.67 13 14.5 13Z" fill="#E4A951" />
                                </svg>
                                <h5>Platform Voucher</h5>
                            </div>
                            <input type="text" placeholder="Select or enter code" />
                        </div>
                    </div>
                    <div className="body-price">
                        <div className="top-desc">
                            <div className="left-select">
                                <Checkbox />
                                <span>Select all (10)</span>
                            </div>
                            <div className="right-price">
                                <div className="left-select-text">
                                    <h4>CART SUB TOTAL</h4>
                                    <span>Items (2)</span>
                                </div>
                                <div className="right-price-text">
                                    <h4>
                                        Rp. 39.262.624
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="bottom-action">
                            <button type="button" onClick={() => {
                                window.location.href = '/shopping/checkout'
                            }}>Check Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerComponent>
    )
}