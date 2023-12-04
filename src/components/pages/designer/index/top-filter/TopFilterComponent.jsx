import './top-filter.scoped.scss'
import { IconAlignCenter, IconSearch } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { IconMinus } from '@tabler/icons-react';
import Checkbox from "react-custom-checkbox";

export default function TopFilterComponent({ searchNameProduct, setSearchNameProduct, productResultAmount, sortOptions, selectedSortOption, setSelectedSortOption, categories, selectedCategories, setSelectedCategories }) {
    const [tempSearchNameProduct, setTempSearchNameProduct] = useState(searchNameProduct)
    const dropdownFilterBrand = useRef()

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
                    <input type="text" name="search" id="search" placeholder="Search" value={tempSearchNameProduct} onChange={(e) => {
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
                    <p>{productResultAmount} Result</p>
                </div>
            </div>
            <div className='right-center'>
                <div className='inner-right-center' onClick={() => {
                    dropdownFilterBrand.current.classList.toggle('show')
                }}>
                    <p>Filter By Categories</p>
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
                                categories.map((brand) => (
                                    <li>
                                        <Checkbox
                                            icon={<div style={{ backgroundColor: "#E4A951", borderRadius: 5, padding: 5 }} />}
                                            borderWidth={1}
                                            borderRadius={3}
                                            borderColor={'#DDD'}
                                            checked={selectedCategories.includes(brand.id)}
                                            value={brand.id}
                                            onChange={(e) => {
                                                if (e) {
                                                    setSelectedCategories(selectedCategories => [...selectedCategories, brand.id])
                                                } else {
                                                    setSelectedCategories(() => {
                                                        return selectedCategories.filter((e) => e != brand.id)
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
            </div>
        </div>
    )
}