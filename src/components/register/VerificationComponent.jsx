import React, { Component } from 'react';
import './verification-input.scooped.scss'

class VerificationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: ['', '', '', '', '', ''], // Initialize an array to hold individual digits of OTP
    };
    this.otpInputs = Array(6).fill(0).map((_, index) => React.createRef());
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

  render() {
    return (
      <div>
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
