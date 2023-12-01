import React, { Component } from 'react';
import './verification-input.scoped.scss'
import { VerifyEmail } from '../../config/api';
import axios from 'axios';

class VerificationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: ['', '', '', '', '', ''], // Initialize an array to hold individual digits of OTP
            errorMessage: ''
        };
        this.otpInputs = Array(6).fill(0).map((_, index) => React.createRef());
    }


    componentDidMount() {
        this.checkAndSendVerification();
    }

    componentDidUpdate() {
        this.checkAndSendVerification();
    }

    async checkAndSendVerification() {
        const otp = this.getOtpString();
        const data = this.props;

        if (otp && otp.length === 6) {
            try {
                const response = await axios.post(VerifyEmail, {
                    email: data.email,
                    otp: otp,
                });
                if (response.data.message === 'Error') {
                    this.setState({ errorMessage: response.data.meta })
                } else if (response.data.message === 'success') {
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error('API Error:', error);
            }
        }
    }

    handleInputChange = (index, e) => {
        const { value } = e.target;
        // Allow any input, and update state accordingly
        const otp = this.state.otp.slice();
        otp[index] = value;
        this.setState({ otp });

        // Move to the previous input if Backspace is pressed and the current input is empty
        if (e.key === 'Backspace' && index > 0 && value === '') {
            this.otpInputs[index - 1].current.focus();
        }

        // Move to the next input if a digit is entered
        if (index < this.otpInputs.length - 1 && value !== '') {
            this.otpInputs[index + 1].current.focus();
        }
    };



    handleInputPaste = (e) => {
        e.preventDefault();
        const clipboardData = e.clipboardData.getData('Text').slice(0, 6);
        const otp = this.state.otp.slice();

        // Update state with pasted values
        clipboardData.split('').forEach((digit, index) => {
            otp[index] = digit;
        });

        this.setState({ otp });
    };

    getOtpString = () => {
        return this.state.otp.join('');
    };

    render() {
        const otp = this.getOtpString();
        console.log('data otp:', otp);
        return (
            <div>
                <div>{this.state.errorMessage}</div>
                {this.state.otp.map((digit, index) => (
                    <input className='inputBox'
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => this.handleInputChange(index, e)}
                        onPaste={this.handleInputPaste}
                        ref={this.otpInputs[index]}
                    />
                ))}
            </div>
        );
    }
}

export default VerificationComponent;
