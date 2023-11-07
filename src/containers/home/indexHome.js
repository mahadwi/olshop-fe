import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getMe, GetBanner } from '../../config/api'
import { useEffect, useState } from 'react'
import HomeSlider from '../../components/homeComponents/homeSlider'
import NavbarHome from '../../components/homeComponents/navbarHome'
import IndexFooter from '../../components/footer/indexFooter'
import Section3 from '../../components/homeComponents/section3.js'
import Section2 from '../../components/homeComponents/section2'
import TitleSection2 from '../../components/homeComponents/titleSection2'
import Section2footer from '../../components/homeComponents/section2footer'
import Section4 from '../../components/homeComponents/section4'
import Section5 from '../../components/homeComponents/section5'
import Section6 from '../../components/homeComponents/section6'
import Section7 from '../../components/homeComponents/section7'
import Section8 from '../../components/homeComponents/section8'
import Section9 from '../../components/homeComponents/section9/section9'
import axios from 'axios'

function IndexHome() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isError,user} = useSelector((state) => state.auth)
    const [dataBanner,setDataBanner] = useState([])
    useEffect(()=>{
      dispatch(getMe())
  },[dispatch])
     
    useEffect(()=>{
        if(isError){
            navigate('/')
        }
    },[isError,navigate])

    useEffect(()=>{
      getBanner();
  },[]);

    const getBanner = async () => {
        try {
          const response = await axios.get(GetBanner)
          setDataBanner(response && response.data.data.data)
          console.log('data banner',dataBanner)
        } catch (error) {
          console.log(error)
        }
      }


  return (
    <div>
      <NavbarHome
      userName={user && user.name}/>
      <HomeSlider
      dataBanner={dataBanner}
      />
      <Fragment>
        <TitleSection2
        dataBanner={dataBanner}
        />
       <Section2/>
       <Section2footer/>
      <Section3/>
      <Section4/>
      <Section5/>
      <Section6/>
      <Section7/>
      <Section8/>
      <Section9/>
      </Fragment>
      <IndexFooter/>
    </div>
  )
}

export default IndexHome