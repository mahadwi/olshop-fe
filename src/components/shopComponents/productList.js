import React, { Component } from 'react'
import { Button, Card, CardBody, CardGroup } from 'react-bootstrap'
import { default as ProductImage } from '../../images/productBag.svg'
import { default as NoDataImg } from '../../images/nodataimg.png'
import './productList.css'

export default class productList extends Component {
  render() {
    return (
        <>
        <div>
        {/* <img 
            style={{width: '14vw',
            height: '30vh',
                }} src={ProductImage} /> */}
          <img style={{marginRight:'100px'}} src={NoDataImg}/>   
        </div>
      </>
    )
  }
}
