import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { LoginUser, reset } from '../../config/api'
import { Button, Form, InputGroup, Input } from "react-bootstrap";
import { FaFacebook, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

function LoginIndex() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message1, setMessage1] = useState("")
    const [userName, setUsername] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth )
    const Auth = (e)=>{
      e.preventDefault()
      dispatch(LoginUser({email, password}))
    } 

  useEffect(()=>{
   if(user || isSuccess){
    if(user.message === "Unauthorized"){
      setMessage1(user.message)
    } else {
      setUsername(user.data.user)
      console.log(userName)
      navigate(`/home`)
    }
    }
    dispatch(reset())
  },[user, isSuccess, dispatch, navigate])

  
  return (
    <div className='box h-100 d-flex align-items-center justify-content-center'>
      <form className='form' style={{marginTop : "10px"}}>
      <br />
      <br />
      <Button style={{marginRight: 20}} variant="light" size='md'><FaGoogle/>  Sign up with Google</Button>
      <Button size='md' variant="light"><FaFacebook style={{color: "#0c5fed"}}/>  Sign up with Facebook</Button>
      <br/>
      <div className='or' style={{ marginTop : "30px"}}>
          <p>-OR-</p>
          {<p className='has-text-centered'>{message1}</p>}
      </div>
      <br/>
      <div className="d-grid gap-2">
        <input
         value={email}
         onChange={(e) => setEmail(e.target.value)}
        type="text" className='inp' placeholder='Email Address'/>
      </div>
      <br/>
     <div className="d-grid gap-2">
    <input
     value={password}
     onChange={(e) => setPassword(e.target.value)}
     type="password" className='inp' placeholder='Password'/>
      </div>
      <br />
      <input type='checkbox' onChange={()=>{this.setState({checkBox : !this.state.checkBox})}}/>
      <span className='ppcp'> Remember Me.</span>
      <br/>
      <br/>
      <div className="d-grid gap-2">
       <Button onClick={Auth}>Login</Button>
      </div>
       <br/>
       <div className='ppcp'>
       <span>Don’t have an account? </span><a href='/register'>Sign Up</a>
       </div>
      </form>
  </div>
  )
}

export default LoginIndex