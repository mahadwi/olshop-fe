import { IconMapPin } from '@tabler/icons-react'
import './section-8.scoped.scss'
import bg from '../../../images/Section8.svg'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Api from '../../../utils/Api'

export default function Section8Component() {

    const [aboutUsObj, setAboutUsObj] = useState({})

    useEffect(() => {
        loadAboutUsObj()
    }, [])

    const loadAboutUsObj = () => {
        Api.get('/about-us')
            .then((res) => {
                setAboutUsObj(res.data.data[0])
            })
    }

    return (
        <div className="section-8" style={{ backgroundImage: `url(${bg})` }}>
            <a href={aboutUsObj.maps} target='_blank' className='inner-overlay'>
                <div className='top'>
                    <IconMapPin color='#FFF' size={24} style={{ marginRight: '10px' }} />
                    <h2>{aboutUsObj.address}</h2>
                </div>
                <p>
                    {aboutUsObj.detail_address}
                </p>
            </a>
        </div>
    )
}