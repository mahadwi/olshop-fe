import './form.scoped.scss'

export default function FormComponent() {
    return (
        <div style={{
            width: '70%'
        }}>
            <p
                style={{
                    marginTop: '2.2rem',
                    color: '#000',
                    fontFamily: 'Poppins',
                    fontSize: '15px',
                    fontStyle: 'normal',
                    fontWeight: 300,
                    lineHeight: 'normal',
                }}
            >
                Have a question? You may find an answer in our <span style={{
                    color: '#081CC9',
                    fontWeight: '700'
                }}>FAQs</span>. <br />
                But you can also contact us
            </p>

            <form action="">
                <div className="form-row">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="First Name" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Last Name" />
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
                <div className="form-group form-group__bottom">
                    <p className='bottom-paragraph'>
                        By sending your message, you agree to accept the <a href="">General Terms and Conditions</a> of Use
                        and that your data will be processed in compliance with the <a href="">Privacy Policy</a> of Luxi.
                    </p>
                    <button className='btn btn-dark'>Submit</button>
                </div>
            </form>
        </div>
    )
}