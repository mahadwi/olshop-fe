import './top-filter.scoped.scss'
import './top-filter.css'
import { IconAdjustmentsHorizontal, IconChevronDown, IconX } from '@tabler/icons-react';
import Select from 'react-select';
import { useState } from 'react';
import { useTranslation } from "react-i18next";

export default function TopFilterComponent({ productResultAmount, sortOptions, selectedSortOption, setSelectedSortOption, setShowMobileFilter }) {
    const [showMobileRelevance, setShowMobileRelevance] = useState(false);
    const { t } = useTranslation();

    const handleChange = (selectedOption) => {
        setSelectedSortOption(selectedOption)
    };

    const toggleMobileFilter = () => {
        setShowMobileFilter((current) => !current);
      
    };

    const toggleMobileRelevence = () => {
        setShowMobileRelevance((current) => !current);
    };

    return (
        <div className='top-filter'>
            <div className='left'>
                <div onClick={toggleMobileFilter}>
                    <p>{t('filter')}</p>
                    <IconAdjustmentsHorizontal />
                </div>
            </div>
            <div className='center'>
                <div>
                    <p>{productResultAmount} {t('result')}</p>
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
                            value={selectedSortOption}
                            onChange={handleChange}
                            options={sortOptions}
                        />
                    </div>
                    <div className='relevance-mobile'>
                        <button className='relevance-button' onClick={toggleMobileRelevence}>{selectedSortOption.label.substring(0,15)} &nbsp; <IconChevronDown /></button>
                    </div>
                </div>
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
