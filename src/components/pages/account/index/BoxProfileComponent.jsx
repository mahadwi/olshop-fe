import Checkbox from 'react-custom-checkbox'
import './box-profile.scoped.scss'
import PhotoProfilePict from './../../../../images/temp/2d3944dc8e5acaa7d442d2a2427fc553.jpeg'

export default function BoxProfileComponent() {
    return (
        <div className='box'>
            <div className='inner-box'>
                <div className="left">
                    <form action="">
                        <div className="form-input">
                            <div className="form-group">
                                <div className="left-form-group">
                                    <label className='form-label' htmlFor="username">Username</label>
                                </div>
                                <div className="center-form-group">
                                    <span>:</span>
                                </div>
                                <div className="right-form-group">
                                    <input type="text" className='form-control disabled' readOnly name="username" id="username" value={'Inon_471'} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="left-form-group">
                                    <label className='form-label' htmlFor="name">Name</label>
                                </div>
                                <div className="center-form-group">
                                    <span>:</span>
                                </div>
                                <div className='right-form-group'>
                                    <input type="text" className='form-control' name="name" id="name" value={'Noni'} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="left-form-group">
                                    <label className='form-label' htmlFor="email">Email</label>
                                </div>
                                <div className="center-form-group">
                                    <span>:</span>
                                </div>
                                <div className='right-form-group'>
                                    <input type="email" className='form-control' name="email" id="email" value={'Noni@gmail.com'} />
                                </div>
                            </div>
                            <div className="form-group form-group__phone-number-wrap">
                                <div className="left-form-group">
                                    <label className='form-label' htmlFor="username">Phone Number</label>
                                </div>
                                <div className="center-form-group">
                                    <span>:</span>
                                </div>
                                <div className="right-form-group form-group__phone-number">
                                    <label htmlFor="phone_code" className='any-code'>Any Code*</label>
                                    <select name="phone_code" id="phone_code" className="form-control form-control__phone-code">
                                        <option value="+62">+62</option>
                                    </select>
                                    <input type="text" className="form-control" name='phone_number' id='phone_number' placeholder="Phone Number" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="left-form-group">
                                    <label className='form-label' htmlFor="shop_name">Gender</label>
                                </div>
                                <div className="center-form-group">
                                    <span>:</span>
                                </div>
                                <div className="right-form-group">
                                    <div className='form-check-wrap'>
                                        <div className='form-check-item'>
                                            <Checkbox borderColor={'#DADADA'} name={'gender_female'} />
                                            <label className='form-label' htmlFor="gender_female">Female</label>
                                        </div>
                                        <div className='form-check-item'>
                                            <Checkbox borderColor={'#DADADA'} name={'gender_male'} />
                                            <label className='form-label' htmlFor="gender_male">Male</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="left-form-group">
                                    <label className='form-label' htmlFor="date_of_birth">Date of Birth</label>
                                </div>
                                <div className="center-form-group">
                                    <span>:</span>
                                </div>
                                <div className="right-form-group">
                                    <div className='input-dob-wrap'>
                                        <select className='form-control' name="date" id="date">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                        <select className='form-control' name="month" id="month">
                                            <option value="January">January</option>
                                            <option value="February">February</option>
                                            <option value="March">March</option>
                                            <option value="April">April</option>
                                        </select>
                                        <select className='form-control' name="year" id="year">
                                            <option value="1995">1995</option>
                                            <option value="1996">1996</option>
                                            <option value="1997">1997</option>
                                            <option value="1998">1998</option>
                                            <option value="1999">1999</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group__btn-save">
                            <button className='btn-save'>Save</button>
                        </div>
                    </form>
                </div>
                <div className="right">
                    <div className="inner">
                        <img src={PhotoProfilePict} alt="" />
                        <button>Select Image</button>
                        <input type="file" name="photo" className='d-none' id="" />
                        <p className='input-file-desc'>File size: maximum 1 MB
                            File extension: .JPEG, .PNG</p>
                    </div>
                </div>
            </div>
        </div>
    )
}