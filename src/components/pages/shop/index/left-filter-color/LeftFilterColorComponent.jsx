import { IconMinus } from '@tabler/icons-react';
import './left-filter-color.scoped.scss'

export default function LeftFilterColorComponent({ productColors, selectedFilterColor, setSelectedFilterColor }) {

    return (
        <div className="left-filter-color">
            <div className="inner-left-filter-color">
                <div className="sec-title">
                    <h3>Color</h3>
                    <IconMinus color="#111" size={19} stroke={1.5} />
                </div>
                <div className='list-colors-wrap'>
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