import { useState } from 'react';
import './top-filter.scoped.scss'
import { IconAdjustmentsHorizontal } from '@tabler/icons-react';
import Select from 'react-select';

export default function TopFilterComponent({ productResultAmount, sortOptions, selectedSortOption, setSelectedSortOption }) {

    const handleChange = (selectedOption) => {
        setSelectedSortOption(selectedOption)
    };

    return (
        <div className='top-filter'>
            <div className='left'>
                <div>
                    <p>Hide Filter</p>
                    <IconAdjustmentsHorizontal />
                </div>
            </div>
            <div className='center'>
                <div>
                    <p>{productResultAmount} Result</p>
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
                        value={selectedSortOption}
                        onChange={handleChange}
                        options={sortOptions}
                    />
                </div>
            </div>
        </div>
    )
}