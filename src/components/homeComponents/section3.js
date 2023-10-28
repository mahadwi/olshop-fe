import React, {Component} from 'react'
import { default as pic1} from "../../images/pic1.svg"
import "./section3.css"

export default class section3 extends Component {
  render() {
    return (  
      <div style={{marginBottom:"3rem"}}><img className='section3' src={pic1}/></div>
    )
  }
}
