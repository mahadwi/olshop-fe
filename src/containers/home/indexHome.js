import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getMe } from '../../config/api'
import { useEffect, useState } from 'react'
import HomeSlider from '../../components/homeComponents/homeSlider'
import NavbarHome from '../../components/homeComponents/navbarHome'
import IndexFooter from '../../components/footer/indexFooter'
import Section3 from '../../components/homeComponents/section3.js'
import Section2 from '../../components/homeComponents/section2'
import TitleSection2 from '../../components/homeComponents/titleSection2'
import Section2footer from '../../components/homeComponents/section2footer'
import Section4 from '../../components/homeComponents/section4'

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
      <HomeSlider/>
      <Fragment>
        <TitleSection2/>
       <Section2/>
       <Section2footer/>
      <Section3/>
      <Section4/>
      </Fragment>
      <IndexFooter/>
    </div>
  )
}

export default IndexHome