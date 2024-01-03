import './top-filter.scoped.scss'
import { IconAlignCenter, IconSearch, IconX, IconChevronDown } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { IconMinus } from '@tabler/icons-react';
import Checkbox from "react-custom-checkbox";
import { useTranslation } from "react-i18next";

export default function TopFilterComponent({ searchNameProduct, setSearchNameProduct, productResultAmount, sortOptions, selectedSortOption, setSelectedSortOption, brands, selectedBrands, setSelectedBrands }) {
    const [tempSearchNameProduct, setTempSearchNameProduct] = useState(searchNameProduct)
    const dropdownFilterBrand = useRef()
    const [showMobileBrandFilter, setShowMobileBrandFilter] = useState(false)
    const [showMobileRelevance, setShowMobileRelevance] = useState(false);
    const { t } = useTranslation();

    const handleChange = (selectedOption) => {
        setSelectedSortOption(selectedOption)
    };

    useEffect(() => {
        setTempSearchNameProduct(searchNameProduct)
    }, [searchNameProduct])

    return (
        <div className='top-filter'>
            <div className='left'>
                <div>
                    <input type="text" name="search" id="search" placeholder={t('search')} value={tempSearchNameProduct} onChange={(e) => {
                        setTempSearchNameProduct(e.target.value)
                    }} />
                    <button type="button" onClick={() => {
                        setSearchNameProduct(tempSearchNameProduct)
                    }}>
                        <IconSearch />
                    </button>
                </div>
            </div>
            <div className='left-center'>
                <div>
                    <p>{productResultAmount} {t('result')}</p>
                </div>
            </div>
            <div className='right-center'>
                <button className='filter-mobile-button' onClick={()=>{setShowMobileBrandFilter((current) => !current)}}>{t('filter')}</button>
                <div className='inner-right-center' onClick={() => {
                    dropdownFilterBrand.current.classList.toggle('show')
                }}>
                    <p>{t('filterbybrand')}</p>
                    <IconAlignCenter />
                </div>

                <div className="left-filter-brand" ref={dropdownFilterBrand}>
                    <div className="inner-left-filter-brand">
                        <div className="sec-title">
                            <h3>Brand</h3>
                            <IconMinus color="#111" size={19} stroke={1.5} />
                        </div>
                        <hr />
                        <ul>
                            {
                                brands.map((brand) => (
                                    <li>
                                        <Checkbox
                                            icon={<div style={{ backgroundColor: "#E4A951", borderRadius: 5, padding: 5 }} />}
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
                    </div>
                </div>
            </div>
            <div className='right'>
                <div className='inner-right'>
                    <div className='relevance-desktop'>
                        <Select
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderWidth: '0px',
                                    boxShadow: 'none',
                                    backgroundColor: state.isDisabled ? 'transparent' : 'transparent',
                                }),
                                container: (baseStyles, state) => ({
                                    ...baseStyles,
                                    width: '100%',
                                }),
                                input: (baseStyles, state) => ({
                                    ...baseStyles,
                                    color: '#545454',
                                    fontSize: '12px',
                                    fontWeight: '300',
                                    fontFamily: "'Inter', sans-serif"
                                }),
                                option: (baseStyles, state) => ({
                                    ...baseStyles,
                                    backgroundColor: state.isDisabled ? 'transparent' : 'transparent',
                                    color: '#000',
                                    fontSize: '12px',
                                    fontWeight: state.isDisabled ? '700' : '400',
                                    fontFamily: "'Inter', sans-serif",
                                    borderBottom: state.isDisabled ? '1px solid #C4C4C4;' : '0px',
                                    "&:hover": {
                                        backgroundColor: state.isDisabled ? '#FFF' : "#000",
                                        color: state.isDisabled ? '#000' : '#FFF'
                                    }
                                }),
                            }}
                            options={sortOptions}
                            value={selectedSortOption}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='relevance-mobile'>
                        <button className='relevance-button' onClick={() => setShowMobileRelevance((current) => !current)}>{selectedSortOption.label.substring(0,15)} &nbsp; <IconChevronDown /></button>
                    </div>
                </div>
            </div>
            <div className={`brand-filter ${showMobileBrandFilter ? 'mobile-show': 'mobile-hide'}`}>
                <div className='brand-filter-close'><button onClick={() => setShowMobileBrandFilter(false)}><IconX size={32} /></button></div>
                <div className='brand-filter-title'>Brand</div>
                <ul>
                {brands?.map(({id, name}) => {
                    return <li>
                        <Checkbox
                            icon={<div style={{ backgroundColor: "#E4A951", borderRadius: 5, padding: 5 }} />}
                            style={{ backgroundColor: "#fff" }}
                            borderWidth={1}
                            borderRadius={3}
                            borderColor={'#DDD'}
                            checked={selectedBrands.includes(id)}
                            value={id}
                            onChange={(e) => {
                                if (e) {
                                    setSelectedBrands(selectedBrands => [...selectedBrands, id])
                                } else {
                                    setSelectedBrands(() => {
                                        return selectedBrands.filter((e) => e != id)
                                    })
                                }
                            }}
                        />
                        <span>{name}</span>
                    </li>
                })}
                </ul>
            </div>
            <div className={`relevance-filter ${showMobileRelevance ? 'mobile-show': 'mobile-hide'}`}>
                <div className='relevance-filter-close'><button onClick={() => setShowMobileRelevance(false)}><IconX size={32} /></button></div>
                <div className='relevance-filter-title'>{t('relevance')}</div>
                <ul>
                    {sortOptions.map(({value, label}) => <li><button onClick={() => {setSelectedSortOption({value, label});setShowMobileRelevance(false)}}>{label}</button></li>)}
                </ul>
            </div>
        </div>
    )
}
