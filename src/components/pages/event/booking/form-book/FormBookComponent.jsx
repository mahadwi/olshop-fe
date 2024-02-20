import { useEffect, useState } from 'react';
import './form-book.scoped.scss'

export default function FormBookComponent({ setActivedIndexState, user }) {
    const [fullName, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (user) {
            setFullname(user.name);
            setEmail(user.email);
            setPhone(user.phone);
        }
    }, [user]);

    return (
        <div className='form-container'>
            <h2 className='title'>Contact Detail</h2>
            <hr />
            <form action="">
                <div className="form-row">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Full Name" value={fullName} onInput={(event) => { setFullname(event.currentTarget.value) }} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Email Address" value={email} onInput={(event) => { setEmail(event.currentTarget.value) }} />
                    </div>
                    <div className="form-group form-group__phone-number">
                        <label htmlFor="phone_code" className='any-code'>Any Code*</label>
                        <select name="phone_code" id="phone_code" className="form-control form-control__phone-code">
                            <option value="+62">+62</option>
                        </select>
                        <input type="text" className="form-control" placeholder="Phone Number" value={phone} onInput={(event) => { setPhone(event.currentTarget.value) }} />
                    </div>
                </div>
                <div className='form-row'>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Subject" />
                    </div>
                </div>
                <div className="form-group">
                    <textarea name="" id="" cols="30" rows="10" className="form-control" placeholder="Message Box"></textarea>
                </div>
                <div className='total-payment-wrapper'>
                    <div className='payment'>
                        <span className='label'>Total Payment</span>
                        <h3 className='price'>Rp. 500.000</h3>
                    </div>
                    <button type='button' onClick={() => {
                        setActivedIndexState(1)
                    }}>Continue to Payment</button>
                </div>
            </form>
        </div>
    )
}
