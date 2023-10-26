import React, { Component } from 'react'
import { default as ShopBanner } from '../../images/ShopBanner.svg'
import './banner.css'

export default class banner extends Component {
  render() {
    return (
      <div className='shopBanner'>
         <img src={ShopBanner}/>
      </div>
    )
  }
}
