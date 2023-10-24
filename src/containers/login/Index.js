import React, { Component } from 'react'
import LoginIndex from '../../components/login/loginIndex'
import IndexNavbar from '../../components/navbar/IndexNavbar'
import IndexFooter from '../../components/footer/indexFooter'


export default class Index extends Component {
  render() {
    return (
        <>
       <IndexNavbar/> 
      <LoginIndex/>
      <br/>
      <br/>
      <br/>
       <IndexFooter/>
       </>
    )
  }
}
