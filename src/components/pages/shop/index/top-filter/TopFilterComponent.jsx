import { useState } from 'react';
import './top-filter.scoped.scss'
import { IconAdjustmentsHorizontal } from '@tabler/icons-react';
import Select from 'react-select';

export default function TopFilterComponent() {

    const [selectedOption, setSelectedOption] = useState({ value: 'Relevance', label: 'Relevance' })

    const options = [
        { value: 'Relevance', label: 'Relevance', isDisabled: true },
        { value: 'New Arrival', label: 'New Arrival' },
        { value: 'Price, low to high', label: 'Price, low to high' },
        { value: 'ALphabetical, A - Z', label: 'ALphabetical, A - Z' },
        { value: 'ALphabetical, Z - A', label: 'ALphabetical, Z - A' },
        { value: 'Date, old to new', label: 'Date, old to new' },
        { value: 'Date, new to old', label: 'Date, new to old' },
    ];

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption)
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
                    <p>12 Result</p>
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
                                backgroundColor: state.isDisabled ? 'transparent' : 'transparent'
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
                        value={selectedOption}
                        onChange={handleChange}
                        options={options}
                    />
                </div>
            </div>
        </div>
    )
}