import React, {Component} from 'react'
import { default as pic1} from "../../images/pic1.svg"
import "./section3.css"
import { Button } from 'react-bootstrap'

export default class section3 extends Component {
  render() {
    return ( 
      <div className='section3' style={{marginBottom:'3rem'}}>
        <img style={{width:'110%'}} className="background-image" src={pic1}/>
        <div className='text-overlay'>
            <h3>FALL WINTER - 2023</h3><p style={{marginLeft:'30px'}}><Button className='ms-5' href="/shop" size='sm' variant='light'>Shop Now</Button></p>
        </div>
      </div>
    )
  }
}
