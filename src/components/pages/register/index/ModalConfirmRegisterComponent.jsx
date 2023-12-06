import './modal-confirm-register.scoped.scss'

export default function ModalConfirmRegisterComponent({ modalShow, setModalShow, callbackConfirm }) {
    return (
        <div className={`modal-overlay ${modalShow ? 'show' : ''}`}>
            <div className='modal-content'>
                <div className="top">
                    <h2>Confirmation</h2>
                </div>
                <div className='body'><p>Apakah data yang dimasukan sudah benar?</p></div>
                <div className='bottom'>
                    <button type='button' onClick={() => {
                        setModalShow(false)
                    }} className='close-btn'>Ubah</button>
                    <button type='button' onClick={() => {
                        callbackConfirm()
                    }} className='save-btn'>Save</button>
                </div>
            </div>
        </div>
    )
}