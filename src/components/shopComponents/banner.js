import React, { Component } from 'react'
import { default as ShopBanner } from '../../images/ShopBanner.svg'
import './banner.css'

export default class banner extends Component {
  render() {
    const headerBanner = this.props.headerBanner
    return (
      <div className='shopBanner'>
         <img src={headerBanner}/>
      </div>
    )
  }
}
