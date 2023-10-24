import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getMe } from '../../config/api'
import { useEffect, useState } from 'react'

function IndexHome() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isError, user} = useSelector((state) => state.auth)
    const [userName, setUsername] = useState()

    useEffect(()=>{
       if(user){
        console.log(user)
          setUsername(user.data.user.name)
       }
    },[user])

    // useEffect(()=>{
    //     if(isError){
    //         navigate('/')
    //     }
    // },[isError,navigate])


  return (
    <div>
      
    </div>
  )
}

export default IndexHome