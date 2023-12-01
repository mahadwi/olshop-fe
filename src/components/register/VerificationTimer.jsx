import React, { Component } from 'react'
import './verification-footer.scoped.scss'

export default class VerificationTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 30,
            resend: false
        };
    }

    componentDidMount() {
        this.timerInterval = setInterval(() => {
            this.setState(prevState => ({
                seconds: prevState.seconds > 0 ? prevState.seconds - 1 : 0,
            }));

            // Clear the interval if the timer reaches 0
            if (this.state.seconds === 0) {
                clearInterval(this.timerInterval);
                // Optionally, you can add a callback or perform some action when the timer reaches 0.
                this.setState({ resend: true })
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerInterval);
    }
    render() {
        const { seconds, resend } = this.state;
        return (
            <div className='verifyFooter'>
                {resend === false ? (<div>Please wait within {seconds} seconds to resend</div>) : (<div>Didn't receive the code? <a href='#'>Resending</a></div>)}

            </div>
        )
    }
}
