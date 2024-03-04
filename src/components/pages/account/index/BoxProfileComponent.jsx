// import Checkbox from 'react-custom-checkbox'
import './box-profile.scoped.scss'
import { useContext, useEffect, useRef, useState } from 'react'
import { DateUtil } from '../../../../utils/DateUtil'
import { LoadingContext } from '../../../../context/LoadingContext'
import Api from '../../../../utils/Api'
import Checkbox from 'rc-checkbox';
import ApiErrorHandling from '../../../../utils/ApiErrorHandling'
import NoPhotoImage from './../../../../images/icons/no-photo.png'

require('rc-checkbox/assets/index.css');

const PHONE_NUMBER_CODE = [
    '+62',
    '+1',
];

export default function BoxProfileComponent({ user }) {

    /**
     * Context
     * 
     */
    const { setLoading } = useContext(LoadingContext)

    /**
     * Refs
     * 
     */
    const inputPhotoRef = useRef()

    /**
     * Main State
     * 
     */
    const [availableYears, setAvailableYears] = useState([])
    const [availableMonths, setAvailableMonths] = useState([])
    const [availableDatesInMonth, setAvailableDatesInMonth] = useState([])
    const [tempUser, setTempUser] = useState(user)
    const [selectedMonth, setSelectedMonth] = useState({})
    const [selectedYear, setSelectedYear] = useState(null)
    const [selectedDateMonth, setSelectedDateMonth] = useState(null)
    const [tempUpdatePhoto, setTempUpdatePhoto] = useState(null)
    const [errorObj422, setErrorObj422] = useState({})

    useEffect(() => {
        loadAvailableYear()
        loadAvailableMonths()
    }, [])

    useEffect(() => {
        loadAvailableDatesInMonth()
    }, [selectedMonth, selectedYear])

    useEffect(() => {
        setSelectedDateMonth(availableDatesInMonth[0])
    }, [availableDatesInMonth])

    useEffect(() => {
        const { phone, ...rest } = user;
        rest.phoneCode = PHONE_NUMBER_CODE[0];
        for (const phoneCode of PHONE_NUMBER_CODE) {
            if (phone?.startsWith(phoneCode)) {
                rest.phone = phone.substring(phoneCode.length);
                rest.phonePrefix = phoneCode;
                break;
            }
        }
        setTempUser(rest)
    }, [user])

    const loadAvailableYear = () => {
        let tempAvailableYears = []
        for (let i = 1980; i <= DateUtil.getCurrentYear(); i++) {
            tempAvailableYears.push(i)
        }

        setAvailableYears(tempAvailableYears)
        setSelectedYear(tempAvailableYears[tempAvailableYears.length - 1])
    }

    const loadAvailableMonths = () => {
        setAvailableMonths(DateUtil.getAllMonthsWithNameAndIndex())
        setSelectedMonth(DateUtil.getAllMonthsWithNameAndIndex()[0])
    }

    const loadAvailableDatesInMonth = () => {
        setAvailableDatesInMonth(DateUtil.getDateFromMonthByYearAndIndex(selectedYear, selectedMonth.value))
    }

    const doUpdateProfile = () => {
        setErrorObj422({})
        setLoading(true)

        const formData = new FormData()
        formData.append('user_name', tempUser.userName)
        formData.append('name', tempUser.name)
        formData.append('no_hp', `${tempUser.phonePrefix ?? PHONE_NUMBER_CODE[0]}${tempUser.phone}`)
        formData.append('gender', tempUser.gender ? tempUser.gender.toLowerCase() : '')
        formData.append('birth_date', `${selectedYear}-${selectedMonth.value}-${selectedDateMonth}`)
        formData.append('email', tempUser.email)

        if (tempUpdatePhoto) {
            formData.append('image', tempUpdatePhoto)
        }

        Api.post('/user/update', formData, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('apiToken')
            }
        }).then((res) => {
            if (res) {
                alert('Profile updated successfully')
            }
        }).catch((err) => {
            ApiErrorHandling.handlingErr(err, [setErrorObj422])
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className='box'>
            {
                Object.keys(errorObj422).length > 0 ?
                    alert(errorObj422[Object.keys(errorObj422)[0]]) : <></>
            }
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
                                    <input type="text" className='form-control disabled' name="username" id="username" value={tempUser.userName} onChange={(e) => {
                                        setTempUser(() => {
                                            let obj = Object.assign({}, tempUser)
                                            obj.userName = e.target.value

                                            return obj
                                        })
                                    }} />
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
                                    <input type="text" className='form-control' name="name" id="name" value={tempUser.name} onChange={(e) => {
                                        setTempUser(() => {
                                            let obj = Object.assign({}, tempUser)
                                            obj.name = e.target.value

                                            return obj
                                        })
                                    }} />
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
                                    <input type="email" className='form-control' name="email" id="email" value={tempUser.email} onChange={(e) => {
                                        setTempUser(() => {
                                            let obj = Object.assign({}, tempUser)
                                            obj.email = e.target.value

                                            return obj
                                        })
                                    }} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="left-form-group">
                                    <label className='form-label' htmlFor="username">Phone Number</label>
                                </div>
                                <div className="center-form-group">
                                    <span>:</span>
                                </div>
                                <div className="right-form-group form-group__phone-number">
                                    <select name="" id="" className='form-control' onChange={(event) => {setTempUser(() => {
                                        let obj = Object.assign({}, tempUser)
                                        obj.phonePrefix = event.target.value

                                        return obj
                                    })}}>
                                        {
                                            PHONE_NUMBER_CODE.map((v) => <option selected={v == tempUser.phonePrefix} value={v}>{v}</option>)
                                        }
                                    </select>
                                    <input type="number" className="form-control" name='phone_number' id='phone_number' value={tempUser.phone} placeholder="Phone Number" onChange={(e) => {
                                        setTempUser(() => {
                                            let obj = Object.assign({}, tempUser)
                                            obj.phone = e.target.value

                                            return obj
                                        })
                                    }} />
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
                                            <Checkbox checked={tempUser.gender == 'Female'} onChange={(evt) => {
                                                if (evt.target.checked) {
                                                    let obj = Object.assign({}, tempUser)

                                                    obj.gender = 'Female'
                                                    setTempUser(obj)
                                                }
                                            }} />
                                            <label className='form-label' htmlFor="gender_female">Female</label>
                                        </div>
                                        <div className='form-check-item'>
                                            <Checkbox checked={tempUser.gender == 'Male'} onChange={(evt) => {
                                                if (evt.target.checked) {
                                                    let obj = Object.assign({}, tempUser)

                                                    obj.gender = 'Male'
                                                    setTempUser(obj)
                                                }
                                            }} />
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
                                        <select className='form-control' name="date" id="date" value={selectedDateMonth} onChange={(e) => {
                                            setSelectedDateMonth(e.target.value)
                                        }}>
                                            {
                                                availableDatesInMonth.map((date) => (
                                                    <option value={date}>{date}</option>
                                                ))
                                            }
                                        </select>
                                        <select className='form-control' name="month" id="month" value={selectedMonth.value} onChange={(e) => {
                                            const selectedOption = e.target.children[e.target.selectedIndex]

                                            setSelectedMonth({
                                                value: selectedOption.getAttribute('value'),
                                                label: selectedOption.innerHTML
                                            })
                                        }}>
                                            {
                                                availableMonths.map((availableMonth) => (
                                                    <option value={availableMonth.value}>{availableMonth.label}</option>
                                                ))
                                            }
                                        </select>
                                        <select className='form-control' name="year" id="year" value={selectedYear} onChange={(e) => {
                                            setSelectedYear(e.target.value);
                                        }}>
                                            {
                                                availableYears.map((availableYear) => (
                                                    <option value={availableYear}>{availableYear}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group__btn-save">
                            <button type='button' onClick={doUpdateProfile} className='btn-save'>Save</button>
                        </div>
                    </form>
                </div>
                <div className="right">
                    <div className="inner">
                        {
                            tempUpdatePhoto ?
                                <img src={window.URL.createObjectURL(tempUpdatePhoto)} alt="" />
                                :
                                <img src={tempUser.image ? tempUser.image : NoPhotoImage} alt="" />
                        }
                        <input type="file" name="photo" id="photo" accept='image/*' className='d-none' onChange={(e) => {
                            if (e.target.files.length !== 0) {
                                setTempUpdatePhoto(e.target.files[0])
                            }
                        }} ref={inputPhotoRef} />
                        <button type='button' onClick={() => {
                            inputPhotoRef.current.click()
                        }}>Select Image</button>
                        <input type="file" name="photo" className='d-none' id="" />
                        <p className='input-file-desc'>File size: maximum 1 MB
                            File extension: .JPEG, .PNG</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
