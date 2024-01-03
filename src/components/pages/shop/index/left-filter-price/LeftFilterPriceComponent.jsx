import { IconMinus } from '@tabler/icons-react';
import './left-filter-price.scoped.scss'
import './left-filter-price.css'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import StringUtil from '../../../../../utils/StringUtil';
import { useState } from 'react';
import { useTranslation } from "react-i18next";

export default function LeftFilterPriceComponent({ selectedPriceMinAndMax, setSelectedPriceMinAndMax, minRangeValue, maxRangeValue, step }) {
    const [localPriceMin, setLocalPriceMin] = useState(selectedPriceMinAndMax.price_min)
    const [localPriceMax, setLocalPriceMax] = useState(selectedPriceMinAndMax.price_max)

    const { t } = useTranslation();

    return (
        <div className="left-filter-price">
            <div className="inner-left-filter-price">
                <div className="sec-title">
                    <h3>{t('price')}</h3>
                    <IconMinus color="#111" size={19} stroke={1.5} />
                </div>
                <div className='range-slider'>
                    <Slider min={minRangeValue} max={maxRangeValue} trackStyle={{ background: '#000' }} handleStyle={{ background: '#FFAC33', width: '14px', height: '14px', border: '0px', opacity: 1 }} railStyle={{ background: '#828181' }} range step={step} value={[localPriceMin, localPriceMax]} defaultValue={[minRangeValue, maxRangeValue]} onChange={(val) => {
                        if (!(val[0] > val[1])) {
                            setLocalPriceMin(val[0])
                            setLocalPriceMax(val[1])
                        }
                    }} onAfterChange={(val) => {
                        setSelectedPriceMinAndMax({
                            price_min: val[0],
                            price_max: val[1],
                        })
                    }} />
                </div>
                <div className='range-price'>
                    <div className='range-price-inner'>
                        <input type="text" value={StringUtil.rupiahFormat(selectedPriceMinAndMax.price_min.toString())} />
                        <span></span>
                        <input type="text" value={StringUtil.rupiahFormat(selectedPriceMinAndMax.price_max.toString())} />
                    </div>
                </div>
            </div>
        </div>
    )
}
