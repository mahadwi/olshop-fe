import { IconMapPin } from '@tabler/icons-react'
import './section-8.scoped.scss'
import bg from '../../../images/Section8.svg'

export default function Section8Component() {
    return (
        <div className="section-8" style={{ backgroundImage: `url(${bg})` }}>
            <div className='inner-overlay'>
                <div className='top'>
                    <IconMapPin color='#FFF' size={24} style={{ marginRight: '10px' }} />
                    <h2>Our Flagship Store <br />Jakarta</h2>
                </div>
                <p>
                    Jl. Boulevard Bar. Raya No.12,
                    RT.18/RW.19, Klp. Gading Bar.,
                    Kec. Klp. Gading, Jkt Utara,
                    Daerah Khusus Ibukota Jakarta
                    14240
                </p>
            </div>
        </div>
    )
}