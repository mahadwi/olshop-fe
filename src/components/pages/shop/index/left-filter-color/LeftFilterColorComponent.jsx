import { useState } from 'react';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import './left-filter-color.scoped.scss'
import { useTranslation } from "react-i18next";

export default function LeftFilterColorComponent({ productColors, selectedFilterColor, setSelectedFilterColor }) {
    const { t } = useTranslation();
    const [ open, setOpen ] = useState(true);

    return (
        <div className="left-filter-color">
            <div className="inner-left-filter-color">
                <div className="sec-title" onClick={(e) => {e.currentTarget.parentElement.querySelector('.list-colors-wrap').classList.toggle('open'); setOpen((c) => !c)}}>
                    <h3>{t('color')}</h3>
                    { open ?
                        <IconMinus color="#111" size={19} stroke={1.5} />
                    :
                        <IconPlus color="#111" size={19} stroke={1.5} />
                    }
                </div>
                <div className='list-colors-wrap open'>
                    <ul>
                        {productColors.map((productColor) => (
                            <li className='selected'><span className={`${selectedFilterColor.includes(productColor.id) ? 'selected' : ''}`} onClick={() => {
                                if (selectedFilterColor.includes(productColor.id)) {
                                    setSelectedFilterColor(selectedFilterColor.filter((e) => e != productColor.id))
                                } else {
                                    setSelectedFilterColor(selectedFilterColor => [...selectedFilterColor, productColor.id])
                                }
                            }} style={{ background: productColor.hex_code }}></span></li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
