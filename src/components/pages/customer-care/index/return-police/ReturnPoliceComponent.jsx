import './return-police.scoped.scss'
import './return-police.css'

export default function ReturnPoliceComponent({ returnPoliceObject }) {
    return (
        <div className="return-police-information">
            <div className='left'>
                <div className="inner">
                    <img src={returnPoliceObject.image_url} alt="" />
                </div>
            </div>
            <div className="right">
                <div className="inner">
                    <div dangerouslySetInnerHTML={{ __html: returnPoliceObject.description }}></div>
                </div>
            </div>
        </div>
    )
}