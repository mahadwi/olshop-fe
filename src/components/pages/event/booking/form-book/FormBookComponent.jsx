import { useContext, useEffect, useState } from "react";
import "./form-book.scoped.scss";
import { CurrencyContext } from "../../../../../context/CurrencyContext";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { IconCircleX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function FormBookComponent({ event, ticketId, setActivedIndexState, user }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
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

    const [ showModalAccount, setShowModalAccount ] = useState(false);

    useEffect(() => {
        if (user) {
            const { name, email, phone } = user;
            setFullname(name);
            setEmail(email);
            setPhone(phone ? phone : "");

            if (!name || !email  || !phone) {
                setShowModalAccount(true);
            }
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
            {/* Modal Confirm */}
            <Modal
                centered
                show={showModalAccount}
            >
                <Modal.Header>
                    <Modal.Title>{t("confirmation")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-confirm-body">
                        <div>
                            <IconCircleX size={212} color={`#ff3333`} />
                        </div>
                        <div className="mt-3">
                            {t("eventconfirmnameemailphone")}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="modal-confirm-body-footer">
                        <button
                            type="button"
                            className="blue desktop"
                            onClick={() => {
                                navigate("/account");
                            }}
                        >
                            {t("editaccount")}
                        </button>
                        <button
                            type="button"
                            className="blue mobile"
                            onClick={() => {
                                navigate("/profile/account");
                            }}
                        >
                            {t("editprofile")}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            {/* End of Modal Confirm */}

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
                            disabled
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
                            disabled
                        />
                    </div>
                    <div className="form-group form-group__phone-number">
                        <label htmlFor="phone_code" className="any-code">
                            Any Code*
                        </label>
                        <select name="phone_code" id="phone_code" className="form-control form-control__phone-code" disabled>
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
                            disabled
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
