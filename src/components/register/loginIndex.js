import React, { Component } from 'react'
import './loginIndex.css'
import { Button, Form, InputGroup, Input } from "react-bootstrap";
import { FaFacebook, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

export default class loginIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName :  null,
      email : null,
      password : null,
      confirmPass : null,
      checkBox : false
    }
  }


  handlePopUp = () => {
    var answer = window.confirm("Save data?");
if (answer) {
    alert("Data tersimpan")
}
else {
    //some code
}
  }

  render() {
    const {fullName} = this.state;
    console.log(fullName)
    return (
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
       <Button disabled={this.state.checkBox === false || fullName===null} size='md' onClick={this.handlePopUp}>Create Account</Button>
      </div>
       <br/>
       <div className='ppcp'>
       <span>Already have an account? </span><a href='#'>Log in</a>
       </div>
      </form>
  </div>
    )
  }
}
