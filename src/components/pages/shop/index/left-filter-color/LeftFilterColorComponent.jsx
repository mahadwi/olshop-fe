import { IconMinus } from '@tabler/icons-react';
import './left-filter-color.scoped.scss'

export default function LeftFilterColorComponent() {

    const colors = ['#1A1B1D', '#CDB9A0', '#A4A4A6', '#965A40', '#FA91B2', '#E4E8D5'];

    return (
        <div className="left-filter-color">
            <div className="inner-left-filter-color">
                <div className="sec-title">
                    <h3>Color</h3>
                    <IconMinus color="#111" size={19} stroke={1.5} />
                </div>
                <div className='list-colors-wrap'>
                    <ul>
                        {colors.map((color) => (
                            <li><span style={{ background: color }}></span></li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}