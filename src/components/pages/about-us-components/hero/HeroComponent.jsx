import BreadCrumb from "../../../general/breadcrumb/BreadCrumb";
import './hero.scoped.scss'
import './hero.css'

export default function HeroComponent({ aboutUsObject }) {
    return (
        <div className='hero-wrapper-432836'>
            <div className="left">
                <BreadCrumb
                    lists={[{
                        label: 'Home',
                        url: '/'
                    }, {
                        label: 'About Us'
                    }]}
                />
                <p dangerouslySetInnerHTML={{ __html: aboutUsObject.description }}>{ }</p>
            </div>
        </div>
    )
}