import './title-description.scoped.scss'

export default function TitleDescriptionComponent({ customerCareObject }) {
    return (
        <div className='title-desc'>
            <h2>{customerCareObject.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: customerCareObject.description }}></p>
        </div>
    )
}