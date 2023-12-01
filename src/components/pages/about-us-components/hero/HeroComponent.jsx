import BreadCrumb from "../../../general/breadcrumb/BreadCrumb";
import './hero.scoped.scss'
import './hero.css'
import parse from 'html-react-parser';

export default function HeroComponent({ aboutUsObject }) {
    return (
        <div className='hero-wrapper'>
            <div className="left">
                <BreadCrumb
                    lists={[{
                        label: 'Home',
                        url: '/'
                    }, {
                        label: 'About Us'
                    }]}
                />
                <p>
                    {parse(aboutUsObject.description ? aboutUsObject.description : '')}
                </p>
            </div>
            <img src={aboutUsObject.image_url} alt="bag-image" />
        </div>

    )
}