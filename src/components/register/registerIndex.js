import React, { Component, Fragment } from 'react'
import './registerIndex.css'
import { Button, Row, Col } from "react-bootstrap";
import { Input } from 'reactstrap';
import { FaFacebook, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { RegisterUser } from '../../config/api';
import axios from 'axios';
import IndexModal from '../general/modal/indexModal';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { default as LogoRegist } from '../../images/Online Shopping app.svg'

class registerIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName :  null,
      email : null,
      password : null,
      confirmPass : null,
      checkBox : false,
      errorMessage : "",
      showModal : false,
      showPassword: false,
      showConfPassword: false,
    }
  }

handleRegister = async () => {
  const {fullName, email, password, confirmPass} = this.state;
  try {
  const response =  await axios.post(RegisterUser,{
      name : fullName,
      email : email,
      password : password,
      password_confirmation : confirmPass
    })
    this.setState({
      errorMessage : response.data.message,
      showModal : false
    })
    window.location.href = '/verify';
  } catch (err) {
    window.location.href = '/verify';
    if (err.code==="ERR_BAD_REQUEST" && password.length <= 8){
      this.setState({errorMessage : <div>The password must be at least 8 characters. <p>
                                          The password confirmation must be at least 8 characters.</p></div>,
      showModal : false
    })
    } else if (err.code==="ERR_BAD_REQUEST" && confirmPass.length <= 8){
      this.setState({errorMessage : "The password confirmation must be at least 8 characters.",
      showModal : false
    })
    }
  }
} 


  handlePopUp = () => {
    var answer = window.confirm("Save data?");
if (answer) {
    alert("Data tersimpan")
    this.handleRegister()
}
else {
    //some code
}
  }

  handleShowModal = () => {
    const {showModal} = this.state;
    this.setState({showModal : !showModal})
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleClickShowConfPassword = () => {
    this.setState({ showConfPassword: !this.state.showConfPassword });
  };
  

  render() {

    const {fullName} = this.state;
    console.log(fullName)
    const { t } = this.props;
    const { showPassword, showConfPassword } = this.state;
    return (
      <>
      <IndexModal
       handleShowModal={this.handleShowModal}
       showModal={this.state.showModal}
       confirmRegist={this.handleRegister} 
      />
      <Row>
      <Col>
      <img style={{marginTop:'140px', marginLeft:'140px'}} src={LogoRegist}/>
      </Col>
      <Col style={{marginRight:'70px'}}>
      <div className='box h-100 d-flex align-items-center justify-content-center'>
      <form className='form' style={{marginTop : "10px"}}>
      <br />
      <br />
      <Button style={{marginRight: 20}} variant="light" size='md'><FaGoogle/>  {t('signupgoogle')}</Button>
      <Button size='md' variant="light"><FaFacebook style={{color: "#0c5fed"}}/>  Sign up with Facebook</Button>
      <br/>
      <div className='or' style={{ marginTop : "30px"}}>
          <p>-OR-</p>
      </div>
      <br/>
      <p className='errorMessage'>{this.state.errorMessage}</p>
      <div className="d-grid gap-2">
        <input
        onChange={ (e)=> {this.setState({
           fullName : e.target.value})}}
        type="text" className='inp' placeholder='Fullname'/>
      </div>
      <br/>
      <div className="d-grid gap-2">
        <input
        onChange={ (e)=> {this.setState({email : e.target.value})}}
        type="text" className='inp' placeholder='Email Address'/>
      </div>
      <br/>
     <div className="d-grid gap-2">
      <label className='label'>
    <input
     onChange={ (e)=> {this.setState({password : e.target.value})}}
     type={showPassword === true ? 'text' : 'password'} className='inp' placeholder='Password'/>
     <span onClick={this.handleClickShowPassword} className='label'>
     <FontAwesomeIcon icon={showPassword === false ? faEyeSlash : faEye} />
     </span>
     </label>
      </div>
      <br/>
      <div className="d-grid gap-2">
      <label className='label'>
    <input
     onChange={ (e)=> {this.setState({confirmPass : e.target.value})}}
     type={showConfPassword === true ? 'text' : 'password'} className='inp' placeholder='Confirm Password'/>
     <span onClick={this.handleClickShowConfPassword} className='label'>
     <FontAwesomeIcon icon={showConfPassword === false ? faEyeSlash : faEye} />
     </span>
     </label>
      </div>
      <br />
      <input type='checkbox' onChange={()=>{this.setState({checkBox : !this.state.checkBox})}}/>
      <span className='ppcp'> By clicking Register, you agree to our Terms, Privacy Policy and Cookie Policy.</span>
      <br/>
      <br/>
      <div className="d-grid gap-2">
       <Button disabled={this.state.checkBox === false || fullName===null} variant='dark' size='lg' onClick={this.handleShowModal}>Create Account</Button>
      </div>
       <br/>
       <div className='ppcp'>
       <span>Already have an account? </span><a href='/login'>Log in</a>
       </div>
      </form>
  </div>
  </Col>
  </Row>
  </>
    )
  }
}



export default withTranslation()(registerIndex);
