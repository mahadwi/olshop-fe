import LeftFilterBrandComponent from '../left-filter-brand/LeftFilterBrandComponent'
import LeftFilterCategoriesComponent from '../left-filter-categories/LeftFilterCategoriesComponent'
import LeftFilterColorComponent from '../left-filter-color/LeftFilterColorComponent'
import LeftFilterPriceComponent from '../left-filter-price/LeftFilterPriceComponent'
import './left-filter.scoped.scss'

export default function LeftFilterComponent({ brands, productCategories, productColors, selectedBrands, setSelectedBrands, selectedProductCategories, setSelectedProductCategories, selectedPriceMinAndMax, setSelectedPriceMinAndMax, selectedFilterColor, setSelectedFilterColor }) {
    return (
        <div className='left-filter'>
            <LeftFilterBrandComponent brands={brands} selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands} />
            <LeftFilterCategoriesComponent productCategories={productCategories} selectedProductCategories={selectedProductCategories} setSelectedProductCategories={setSelectedProductCategories} />
            <LeftFilterPriceComponent selectedPriceMinAndMax={selectedPriceMinAndMax} setSelectedPriceMinAndMax={setSelectedPriceMinAndMax} minRangeValue={1000000} maxRangeValue={150000000} step={500000} />
            <LeftFilterColorComponent productColors={productColors} selectedFilterColor={selectedFilterColor} setSelectedFilterColor={setSelectedFilterColor} />
        </div>
    )
}