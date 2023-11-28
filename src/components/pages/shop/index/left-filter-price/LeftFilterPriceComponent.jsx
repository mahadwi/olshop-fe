import { IconMinus } from '@tabler/icons-react';
import './left-filter-price.scoped.scss'
import './left-filter-price.css'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';

export default function LeftFilterPriceComponent() {

    const [startRangeValue, setStartRangeValue] = useState(3000000)
    const [endRangeValue, setEndRangeValue] = useState(9000000)

    return (
        <div className="left-filter-price">
            <div className="inner-left-filter-price">
                <div className="sec-title">
                    <h3>Price</h3>
                    <IconMinus color="#111" size={19} stroke={1.5} />
                </div>
                <div className='range-slider'>
                    <Slider min={1000000} max={15000000} trackStyle={{ background: '#000' }} handleStyle={{ background: '#FFAC33', width: '14px', height: '14px', border: '0px', opacity: 1 }} railStyle={{ background: '#828181' }} range step={500000} value={[startRangeValue, endRangeValue]} defaultValue={[startRangeValue, endRangeValue]} onChange={(val) => {
                        if (!(val[0] > val[1])) {
                            setStartRangeValue(val[0])
                            setEndRangeValue(val[1])
                        }
                    }} />
                </div>
                <div className='range-price'>
                    <div className='range-price-inner'>
                        <input type="text" value={'Rp. ' + startRangeValue} />
                        <span></span>
                        <input type="text" value={'Rp ' + endRangeValue} />
                    </div>
                </div>
            </div>
        </div>
    )
}