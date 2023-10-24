import React, { Component } from 'react'
import './registerIndex.css'
import { Button, Form, InputGroup, Input } from "react-bootstrap";
import { FaFacebook, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { RegisterUser } from '../../config/api';
import axios from 'axios';
import IndexModal from '../general/modal/indexModal';

export default class registerIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName :  null,
      email : null,
      password : null,
      confirmPass : null,
      checkBox : false,
      errorMessage : "",
      showModal : false
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
  } catch (errorCode) {
    if (errorCode === 422){
      this.setState({errorMessage : errorCode.message})
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


  render() {
    const {fullName} = this.state;
    console.log(fullName)
    return (
      <>
      <IndexModal
       handleShowModal={this.handleShowModal}
       showModal={this.state.showModal}
       confirmRegist={this.handleRegister} 
      />
      <div className='box h-100 d-flex align-items-center justify-content-center'>
      <form className='form' style={{marginTop : "10px"}}>
      <br />
      <br />
      <br />
      <br />
      <Button style={{marginRight: 20}} variant="light" size='md'><FaGoogle/>  Sign up with Google</Button>
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
    <input
     onChange={ (e)=> {this.setState({password : e.target.value})}}
     type="password" className='inp' placeholder='Password'/>
      </div>
      <br/>
      <div className="d-grid gap-2">
     <input
     onChange={ (e)=> {this.setState({confirmPass : e.target.value})}}
     type="password" className='inp' placeholder='Confirm Password'/>
      </div>
      <br />
      <input type='checkbox' onChange={()=>{this.setState({checkBox : !this.state.checkBox})}}/>
      <span className='ppcp'> By clicking Register, you agree to our Terms, Privacy Policy and Cookie Policy.</span>
      <br/>
      <br/>
      <div className="d-grid gap-2">
       <Button disabled={this.state.checkBox === false || fullName===null} size='md' onClick={this.handleShowModal}>Create Account</Button>
      </div>
       <br/>
       <div className='ppcp'>
       <span>Already have an account? </span><a href='/'>Log in</a>
       </div>
      </form>
  </div>
  </>
    )
  }
}
