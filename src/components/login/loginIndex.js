import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { LoginUser, reset } from '../../config/api'
import { Button, Form, InputGroup, Input } from "react-bootstrap";
import { FaFacebook, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { default as LoginIcon } from '../../images/icons/Login Icon.svg'
import {Row, Col} from 'react-bootstrap'

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
          setUsername(user.data.user)
          console.log(userName)
          navigate(`/`)
    } else
    if(message)
    {
        setMessage1(message)
    }
    dispatch(reset())
  },[user, isSuccess, dispatch, navigate, isError])

  
  return (
    <div>
      <Row>
        <Col>
        <img style={{marginTop:'110px', marginLeft:'110px'}} src={LoginIcon}/>
        </Col>
        <Col>
    <div className='box h-100 d-flex align-items-center justify-content-center'>
      <form className='form' style={{marginTop : "10px"}}>
      <br />
      <br />
      <Button style={{marginRight: 20}} variant="light" size='md'><FaGoogle/>  Sign up with Google</Button>
      <Button size='md' variant="light"><FaFacebook style={{color: "#0c5fed"}}/>  Sign up with Facebook</Button>
      <br/>
      <div className='or' style={{ marginTop : "30px"}}>
          <p>-OR-</p>
      </div>
      {<p style={{textAlign:'center'}}>{message1}</p>}
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
       <Button size='lg' variant='dark' disabled={!email} onClick={Auth}>Login</Button>
      </div>
       <br/>
       <div className='ppcp'>
       <span>Don’t have an account? </span><a href='/register'>Sign Up</a>
       </div>
      </form>
  </div>
  </Col>
  </Row>
  </div>
  )
}

export default LoginIndex