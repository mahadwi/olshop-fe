import { useContext, useEffect, useState } from "react";
import "./form-book.scoped.scss";
import { CurrencyContext } from "../../../../../context/CurrencyContext";

export default function FormBookComponent({ event, ticketId, setActivedIndexState, user }) {
    const { currency } = useContext(CurrencyContext);
    const formater = new Intl.NumberFormat(currency == "id" ? "id-ID" : "en-EN", {
        style: "currency",
        currency: currency == "id" ? "IDR" : "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });

    const [fullName, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const [amountTicket, setAmountTicket] = useState(0);
    const [ticketObj, setTicketObj] = useState({});

    useEffect(() => {
        if (user) {
            setFullname(user.name);
            setEmail(user.email);
            setPhone(user.phone ? user.phone : "");
        }
    }, [user]);

    useEffect(() => {
        setAmountTicket(localStorage.getItem("amount_ticket"));

        if (event.details) {
            setTicketObj(event.details[event.details.findIndex(val => val.id == ticketId)]);
        }
    }, [event]);

    return (
        <div className="form-container">
            <h2 className="title">Contact Detail</h2>
            <hr />
            <form action="">
                <div className="form-row">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Full Name"
                            value={fullName}
                            onInput={event => {
                                setFullname(event.currentTarget.value);
                            }}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email Address"
                            value={email}
                            onInput={event => {
                                setEmail(event.currentTarget.value);
                            }}
                        />
                    </div>
                    <div className="form-group form-group__phone-number">
                        <label htmlFor="phone_code" className="any-code">
                            Any Code*
                        </label>
                        <select name="phone_code" id="phone_code" className="form-control form-control__phone-code">
                            <option value="+62">+62</option>
                        </select>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Phone Number"
                            value={phone}
                            onInput={event => {
                                setPhone(event.currentTarget.value);
                            }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        className="form-control"
                        placeholder="Message Box"
                        value={message}
                        onInput={event => {
                            setMessage(event.currentTarget.value);
                        }}
                    />
                </div>
                <div className="total-payment-wrapper">
                    <div className="payment">
                        <span className="label">Total Payment</span>
                        <h3 className="price">{formater.format(ticketObj.price * amountTicket)}</h3>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            localStorage.setItem(
                                "temp_event_book",
                                JSON.stringify({
                                    message: message
                                })
                            );

                            setActivedIndexState(1);
                        }}
                    >
                        Continue to Payment
                    </button>
                </div>
            </form>
        </div>
    );
}
