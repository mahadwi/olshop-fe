import { useState } from 'react';
import { Link } from "react-router-dom"
import { IconMinus, IconPlus } from '@tabler/icons-react';
import './left-filter-brand.scoped.scss'
import Checkbox from "react-custom-checkbox";
import { IconArrowRight } from '@tabler/icons-react';
import { useTranslation } from "react-i18next";

export default function LeftFilterBrandComponent({ brands, selectedBrands, setSelectedBrands }) {
    const { t } = useTranslation();
    const [ open, setOpen ] = useState(true);

    return (
        <div className="left-filter-brand">
            <div className="inner-left-filter-brand">
                <div className="sec-title" onClick={(e) => {e.currentTarget.parentElement.querySelectorAll('ul,button').forEach((el) => el.classList.toggle('open')); setOpen((c) => !c)}}>
                    <h3>Brand</h3>
                    { open ?
                        <IconMinus color="#111" size={19} stroke={1.5} />
                    :
                        <IconPlus color="#111" size={19} stroke={1.5} />
                    }
                </div>
                <ul className='open'>
                    {
                        brands.map((brand) => (
                            <li>
                                <Checkbox
                                    icon={<div style={{ backgroundColor: "#E4A951", borderRadius: 5, padding: 5 }} />}
                                    style={{ backgroundColor: "#fff" }}
                                    borderWidth={1}
                                    borderRadius={3}
                                    borderColor={'#DDD'}
                                    checked={selectedBrands.includes(brand.id)}
                                    value={brand.id}
                                    onChange={(e) => {
                                        if (e) {
                                            setSelectedBrands(selectedBrands => [...selectedBrands, brand.id])
                                        } else {
                                            setSelectedBrands(() => {
                                                return selectedBrands.filter((e) => e != brand.id)
                                            })
                                        }
                                    }}
                                />
                                <span>{brand.name}</span>
                            </li>
                        ))
                    }
                </ul>
                { brands.length > 5 ?
                    <button className='open' onClick={(e) => {const t = e.currentTarget; t.parentElement.querySelector('ul').classList.toggle('show'); t.remove()}}>
                        <span>{t('more')}</span>
                        <IconPlus color="#151B4F" size={12} />
                    </button>
                : null
                }
            </div>
        </div>
    )
}
