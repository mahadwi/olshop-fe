import React, { Component } from 'react'
import { default as ShopBanner } from '../../images/ShopBanner.svg'
import './banner.css'

export default class banner extends Component {
  render() {
    const headerBanner = this.props.headerBanner
    const windowWidth = this.props.windowWidth
    return (
      <div>
      {windowWidth > 900 ? (
      <div className='shopBanner'>
         <img src={headerBanner}/>
      </div>):(<div>
        <img style={{maxWidth:'95%', height:'auto', marginTop:'10px'}} src={headerBanner}/></div>)}
      </div>
    )
  }
}
