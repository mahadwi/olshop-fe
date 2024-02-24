import { useContext, useEffect, useState } from "react";
import ContainerComponent from "../../../../general/container/ContainerComponent";
import "./form-payment.scss";
import { CurrencyContext } from "../../../../../context/CurrencyContext";
import Api from "../../../../../utils/Api";
import { LoadingContext } from "../../../../../context/LoadingContext";
import { toast } from "react-hot-toast";
import { IconCircleX } from "@tabler/icons-react";

export default function FormPaymentComponent({ event, ticketId, setActivedIndexState }) {
    const { setLoading } = useContext(LoadingContext);
    const { currency } = useContext(CurrencyContext);
    const formater = new Intl.NumberFormat(currency == "id" ? "id-ID" : "en-EN", {
        style: "currency",
        currency: currency == "id" ? "IDR" : "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });

    const [amountTicket, setAmountTicket] = useState(0);
    const [ticketObj, setTicketObj] = useState({});
    const [note, setNote] = useState("");

    useEffect(() => {
        setAmountTicket(localStorage.getItem("amount_ticket"));

        if (event.details) {
            setTicketObj(event.details[event.details.findIndex(val => val.id == ticketId)]);
        }
    }, [event]);

    const doBookEvent = () => {
        setLoading(true);
        const tempEventFormBook = JSON.parse(localStorage.getItem("temp_event_book"));
        const formData = new FormData();

        formData.append("event_detail_id", ticketId);
        formData.append("qty", amountTicket);
        formData.append("total", ticketObj.price * amountTicket);
        formData.append("note", note);
        formData.append("message", tempEventFormBook.message);

        Api.post("/booking", formData, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("apiToken")
            }
        })
            .then(res => {
                localStorage.setItem("event_booking_success", JSON.stringify(res.data.data));
                window.location.href = res.data.data.payment.invoice_url;
            })
            .catch(err => {
                toast(
                    <div>
                        <div className="text-center">
                            <IconCircleX size={212} color={`#ff3333`} />
                        </div>
                        <div>
                            {err.response.data.message}
                            {/* {t("toastuploaddocumentfailed")} */}
                        </div>
                    </div>
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <ContainerComponent>
            <div className="form-payment-container">
                <div className="notes-and-booking">
                    <div className="box-item notes">
                        <label htmlFor="notes">Notes</label>
                        <input
                            type="text"
                            name="notes"
                            id="notes"
                            value={note}
                            onInput={event => {
                                setNote(event.target.value);
                            }}
                        />
                    </div>
                    <div className="box-item booking">
                        <h3>Booking ID</h3>
                        <span>:</span>
                        <h4>1084428136</h4>
                    </div>
                </div>
                {/* <div className='platform-voucher-and-code'>
                    <div className='box-item platform-voucher'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path d="M14.8 8.01562L16 9.21562L9.2 16.0156L8 14.8156L14.8 8.01562ZM4 4.01562H20C21.11 4.01562 22 4.90562 22 6.01562V10.0156C21.4696 10.0156 20.9609 10.2263 20.5858 10.6014C20.2107 10.9765 20 11.4852 20 12.0156C20 12.5461 20.2107 13.0548 20.5858 13.4298C20.9609 13.8049 21.4696 14.0156 22 14.0156V18.0156C22 19.1256 21.11 20.0156 20 20.0156H4C3.46957 20.0156 2.96086 19.8049 2.58579 19.4298C2.21071 19.0548 2 18.5461 2 18.0156V14.0156C3.11 14.0156 4 13.1256 4 12.0156C4 11.4852 3.78929 10.9765 3.41421 10.6014C3.03914 10.2263 2.53043 10.0156 2 10.0156V6.01562C2 5.48519 2.21071 4.97648 2.58579 4.60141C2.96086 4.22634 3.46957 4.01563 4 4.01562ZM4 6.01562V8.55562C4.60768 8.90602 5.11236 9.41029 5.46325 10.0177C5.81415 10.6251 5.9989 11.3142 5.9989 12.0156C5.9989 12.7171 5.81415 13.4062 5.46325 14.0136C5.11236 14.621 4.60768 15.1252 4 15.4756V18.0156H20V15.4756C19.3923 15.1252 18.8876 14.621 18.5367 14.0136C18.1858 13.4062 18.0011 12.7171 18.0011 12.0156C18.0011 11.3142 18.1858 10.6251 18.5367 10.0177C18.8876 9.41029 19.3923 8.90602 20 8.55562V6.01562H4ZM9.5 8.01562C10.33 8.01562 11 8.68563 11 9.51562C11 10.3456 10.33 11.0156 9.5 11.0156C8.67 11.0156 8 10.3456 8 9.51562C8 8.68563 8.67 8.01562 9.5 8.01562ZM14.5 13.0156C15.33 13.0156 16 13.6856 16 14.5156C16 15.3456 15.33 16.0156 14.5 16.0156C13.67 16.0156 13 15.3456 13 14.5156C13 13.6856 13.67 13.0156 14.5 13.0156Z" fill="#E4A951" />
                        </svg>
                        <h3>Platform Voucher</h3>
                    </div>
                    <div className='box-item code'>
                        <input placeholder='Enter Code' />
                    </div>
                </div> */}
                {/* <div className='payment-method-and-bank'>
                    <div className='box-item payment-method'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M5.25 4.5C4.25544 4.5 3.30161 4.89509 2.59835 5.59835C1.89509 6.30161 1.5 7.25544 1.5 8.25V9H22.5V8.25C22.5 7.25544 22.1049 6.30161 21.4016 5.59835C20.6984 4.89509 19.7446 4.5 18.75 4.5H5.25ZM22.5 10.5H1.5V15.75C1.5 16.7446 1.89509 17.6984 2.59835 18.4017C3.30161 19.1049 4.25544 19.5 5.25 19.5H18.75C19.7446 19.5 20.6984 19.1049 21.4016 18.4017C22.1049 17.6984 22.5 16.7446 22.5 15.75V10.5ZM15.75 15H18.75C18.9489 15 19.1397 15.079 19.2803 15.2197C19.421 15.3603 19.5 15.5511 19.5 15.75C19.5 15.9489 19.421 16.1397 19.2803 16.2803C19.1397 16.421 18.9489 16.5 18.75 16.5H15.75C15.5511 16.5 15.3603 16.421 15.2197 16.2803C15.079 16.1397 15 15.9489 15 15.75C15 15.5511 15.079 15.3603 15.2197 15.2197C15.3603 15.079 15.5511 15 15.75 15Z" fill="#151B4F" />
                        </svg>
                        <h3>Platform Voucher</h3>
                    </div>
                    <div className='box-item bank'>
                        <p>
                            <span>Transfer Bank</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <g clip-path="url(#clip0_644_851)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7069 16.6907C12.5193 16.8782 12.265 16.9835 11.9999 16.9835C11.7347 16.9835 11.4804 16.8782 11.2929 16.6907L5.63585 11.0337C5.54034 10.9415 5.46416 10.8312 5.41175 10.7091C5.35934 10.5871 5.33176 10.4559 5.3306 10.3231C5.32945 10.1904 5.35475 10.0587 5.40503 9.93579C5.45531 9.81289 5.52957 9.70124 5.62346 9.60735C5.71735 9.51345 5.829 9.4392 5.9519 9.38892C6.0748 9.33864 6.20648 9.31334 6.33926 9.31449C6.47204 9.31564 6.60325 9.34323 6.72526 9.39564C6.84726 9.44805 6.95761 9.52423 7.04985 9.61974L11.9999 14.5697L16.9499 9.61974C17.1385 9.43758 17.3911 9.33679 17.6533 9.33907C17.9155 9.34135 18.1663 9.44651 18.3517 9.63192C18.5371 9.81733 18.6423 10.0681 18.6445 10.3303C18.6468 10.5925 18.546 10.8451 18.3639 11.0337L12.7069 16.6907Z" fill="#111111" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_644_851">
                                        <rect width="24" height="24" fill="white" transform="translate(0 0.984375)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </p>
                    </div>
                </div> */}
                <div className="box-item pricing-recap">
                    <div className="pricing-items">
                        {/* <div className="pricing-item">
                            <label>Order Total</label>
                            <h4>Rp. 500.000</h4>
                        </div> */}
                        {/* <div className='pricing-item'>
                            <label>Handling Fee</label>
                            <h4>Rp. 50.000</h4>
                        </div> */}
                        <div className="pricing-item">
                            <label className="label-total">Total Payment</label>
                            <h4 className="price-total">{formater.format(ticketObj.price * amountTicket)}</h4>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            doBookEvent();
                        }}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </ContainerComponent>
    );
}
