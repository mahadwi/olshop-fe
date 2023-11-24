import './stepper.scoped.scss'

export default function StepperComponent({ steps, activedIndexState }) {
    return (
        <div className='stepper-wrapper'>
            {
                steps.map((step, stepIndex) => (
                    <>
                        <div className={`step-item ${activedIndexState > stepIndex ? 'completed' : ''}`}>
                            <div className='icon-wrapper'>
                                {
                                    stepIndex == activedIndexState ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                            <circle cx="16" cy="16" r="15" stroke="#4F46E5" stroke-width="2" />
                                            <circle cx="16" cy="16" r="5" fill="#4F46E5" />
                                        </svg> : <>
                                            {
                                                activedIndexState > stepIndex ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path d="M4.1665 10.834L7.49984 14.1673L15.8332 5.83398" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg> : <></>
                                            }
                                        </>
                                }
                            </div>
                            <span>{step}</span>
                        </div>
                        {
                            stepIndex < steps.length - 1 ?
                                <div className={`line ${activedIndexState > stepIndex ? 'completed' : ''}`}></div> : <></>
                        }
                    </>
                ))
            }
        </div>
    )
}