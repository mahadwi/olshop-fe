import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getMe } from '../../config/api'
import { useEffect, useState } from 'react'
import HomeSlider from '../../components/homeComponents/homeSlider'
import NavbarHome from '../../components/homeComponents/navbarHome'
import IndexFooter from '../../components/footer/indexFooter'

function IndexHome() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isError,user} = useSelector((state) => state.auth)

    useEffect(()=>{
      dispatch(getMe())
  },[dispatch])
     
    useEffect(()=>{
        if(isError){
            navigate('/')
        }
    },[isError,navigate])


  return (
    <div>
      <NavbarHome
      userName={user && user.name}/>
      <div><HomeSlider/></div>
      <IndexFooter/>
    </div>
  )
}

export default IndexHome