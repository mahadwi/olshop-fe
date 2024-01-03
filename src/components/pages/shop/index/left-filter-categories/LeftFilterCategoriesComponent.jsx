import { Link } from "react-router-dom"
import { IconMinus } from '@tabler/icons-react';
import './left-filter-categories.scoped.scss'
import Checkbox from "react-custom-checkbox";
import { IconArrowRight } from '@tabler/icons-react';
import { useTranslation } from "react-i18next";

export default function LeftFilterCategoriesComponent({ productCategories, selectedProductCategories, setSelectedProductCategories }) {
    const { t } = useTranslation();

    return (
        <div className="left-filter-categories">
            <div className="inner-left-filter-categories">
                <div className="sec-title">
                    <h3>{t('categories')}</h3>
                    <IconMinus color="#111" size={19} stroke={1.5} />
                </div>
                <ul>
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
                <Link>
                    <span>{t('more')}</span>
                    <IconArrowRight color="#151B4F" size={12} />
                </Link>
            </div>
        </div>
    )
}
