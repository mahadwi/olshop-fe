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
      dispatch(getMe())
      setUsername(user.name)
  },[dispatch])

    useEffect(()=>{
        if(isError){
            navigate('/')
        }
    },[isError,navigate])


  return (
    <div>
      Halo {userName}
    </div>
  )
}

export default IndexHome