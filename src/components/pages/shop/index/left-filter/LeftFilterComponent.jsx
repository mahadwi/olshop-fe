import LeftFilterBrandComponent from '../left-filter-brand/LeftFilterBrandComponent'
import LeftFilterCategoriesComponent from '../left-filter-categories/LeftFilterCategoriesComponent'
import LeftFilterColorComponent from '../left-filter-color/LeftFilterColorComponent'
import LeftFilterPriceComponent from '../left-filter-price/LeftFilterPriceComponent'
import './left-filter.scoped.scss'

export default function LeftFilterComponent() {
    return (
        <div className='left-filter'>
            <LeftFilterBrandComponent />
            <LeftFilterCategoriesComponent />
            <LeftFilterPriceComponent />
            <LeftFilterColorComponent />
        </div>
    )
}