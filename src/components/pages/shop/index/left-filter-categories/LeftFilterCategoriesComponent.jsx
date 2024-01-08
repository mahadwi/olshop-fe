import { useState } from 'react';
import { Link } from "react-router-dom"
import { IconMinus } from '@tabler/icons-react';
import './left-filter-categories.scoped.scss'
import Checkbox from "react-custom-checkbox";
import { IconArrowRight, IconPlus } from '@tabler/icons-react';
import { useTranslation } from "react-i18next";

export default function LeftFilterCategoriesComponent({ productCategories, selectedProductCategories, setSelectedProductCategories }) {
    const { t } = useTranslation();
    const [ open, setOpen ] = useState(true);

    return (
        <div className="left-filter-categories">
            <div className="inner-left-filter-categories">
                <div className="sec-title" onClick={(e) => {e.currentTarget.parentElement.querySelectorAll('ul,button').forEach((el) => el.classList.toggle('open')); setOpen((c) => !c)}}>
                    <h3>{t('categories')}</h3>
                    { open ?
                        <IconMinus color="#111" size={19} stroke={1.5} />
                    :
                        <IconPlus color="#111" size={19} stroke={1.5} />
                    }
                </div>
                <ul className='open'>
                    {
                        productCategories.map((productCategory) => (
                            <li>
                                <Checkbox
                                    icon={<div style={{ backgroundColor: "#E4A951", borderRadius: 5, padding: 5 }} />}
                                    style={{ backgroundColor: "#fff" }}
                                    borderWidth={1}
                                    borderRadius={3}
                                    borderColor={'#DDD'}
                                    checked={selectedProductCategories.includes(productCategory.id)}
                                    value={productCategory.id}
                                    onChange={(e) => {
                                        if (e) {
                                            setSelectedProductCategories(selectedProductCategories => [...selectedProductCategories, productCategory.id])
                                        } else {
                                            setSelectedProductCategories(() => {
                                                return selectedProductCategories.filter((e) => e != productCategory.id)
                                            })
                                        }
                                    }}
                                />
                                <span>{t(productCategory.name)}</span>
                            </li>
                        ))
                    }
                </ul>
                { productCategories.length > 5 ?
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
