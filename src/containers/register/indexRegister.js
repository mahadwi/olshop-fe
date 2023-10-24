import React, { Component } from 'react'
import RegisterIndex from '../../components/register/registerIndex'
import IndexNavbar from '../../components/navbar/IndexNavbar'
import IndexFooter from '../../components/footer/indexFooter'

export default class Index extends Component {
  render() {
    return (
      <div>
        <IndexNavbar/>
      <RegisterIndex/>
      <br/>
      <br/>
      <br/>
      <IndexFooter/>
      </div>
    )
  }
}
