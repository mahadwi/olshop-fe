import './form-book.scoped.scss'

export default function FormBookComponent({ setActivedIndexState }) {
    return (
        <div className='form-container'>
            <h2 className='title'>Contact Detail</h2>
            <hr />
            <form action="">
                <div className="form-row">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Full Name" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Email Address" />
                    </div>
                    <div className="form-group form-group__phone-number">
                        <label htmlFor="phone_code" className='any-code'>Any Code*</label>
                        <select name="phone_code" id="phone_code" className="form-control form-control__phone-code">
                            <option value="+62">+62</option>
                        </select>
                        <input type="text" className="form-control" placeholder="Phone Number" />
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