import HighlightTitleComponent from '../../../general/highlight-title/HighlightTitleComponent'
import './form-box.scoped.scss'
import { useContext, useState } from 'react'
import Api from '../../../../utils/Api'
import ApiErrorHandling from '../../../../utils/ApiErrorHandling'
import toast from 'react-hot-toast';
import { LoadingContext } from '../../../../context/LoadingContext'

export default function FormBoxComponent() {

    /**
     * Context
     * 
     */
    const { setLoading } = useContext(LoadingContext)

    /**
     * Main State
     * 
     */
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [suggestion, setSuggestion] = useState('')
    const [objError422, setObjError422] = useState({})

    const submitSuggestion = () => {
        setObjError422({})
        setLoading(true)

        Api.post('/suggestion', {
            name: name,
            email: email,
            suggestion: suggestion
        })
            .then((res) => {
                toast.success('Suggestion, sent successfully.')

                setName('')
                setEmail('')
                setSuggestion('')

            }).catch((err) => {
                ApiErrorHandling.handlingErr(err, [setObjError422])
            }).finally(() => {
                setLoading(false)
            })
    }

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
                        <input type="text" className={`form-control ${objError422.name ? 'is-invalid' : ''}`} name="name" id="name" placeholder='Input your name' value={name} onChange={(e) => {
                            setName(e.target.value);
                        }} />

                        {
                            objError422.name ?
                                <div className='invalid-feedback'>{objError422.name}</div>
                                : <></>
                        }
                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor="email">Email</label>
                        <input type="email" className={`form-control ${objError422.email ? 'is-invalid' : ''}`} name="email" id="email" placeholder='Input your email address' value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />

                        {
                            objError422.email ?
                                <div className='invalid-feedback'>{objError422.email}</div>
                                : <></>
                        }
                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor="sugestion">Sugestion</label>
                        <textarea className={`form-control ${objError422.suggestion ? 'is-invalid' : ''}`} name="sugestion" id="sugestion" cols="30" rows="10" placeholder='Input your sugestion' value={suggestion} onChange={(e) => {
                            setSuggestion(e.target.value)
                        }}></textarea>

                        {
                            objError422.suggestion ?
                                <div className='invalid-feedback'>{objError422.suggestion}</div>
                                : <></>
                        }
                    </div>
                    <div className='form-group form-group-button'>
                        <button type="button" onClick={() => {
                            submitSuggestion()
                        }} className='btn'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}