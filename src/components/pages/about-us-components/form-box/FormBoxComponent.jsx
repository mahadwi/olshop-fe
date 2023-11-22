import HighlightTitleComponent from "../highlight-title/HighlightTitleComponent";
import './form-box.scoped.scss'

export default function FormBoxComponent() {
    return (
        <div className='container-form'>
            <HighlightTitleComponent title={'Suggestion'} background={'linear-gradient(270deg, #E4A951 0%, #E4E4EA 45.18%, #FFF 87.37%)'} />

            <p>
                To improve performance and service, if you have criticism or suggestions for our shop, you can input it in the form below :
            </p>

            <div
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <form action="" style={{ width: '38%' }}>
                    <div className='form-group'>
                        <label className='form-label' htmlFor="name">Name</label>
                        <input type="text" className='form-control' name="name" id="name" placeholder='Input your name' />
                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor="email">Email</label>
                        <input type="email" className='form-control' name="email" id="email" placeholder='Input your email address' />
                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor="sugestion">Sugestion</label>
                        <textarea className='form-control' name="sugestion" id="sugestion" cols="30" rows="10" placeholder='Input your sugestion`'></textarea>
                    </div>
                    <div className='form-group form-group-button'>
                        <button className='btn'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}