import React, { Component } from 'react'
import {default as Section8} from '../../images/Section8.svg'
import { Button } from 'react-bootstrap'
import './section8.css'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPin } from '@fortawesome/free-solid-svg-icons'

export default class section8 extends Component {
  render() {
    return (
      <div className='section8' style={{marginBottom:'3rem'}}>
        <img style={{width:'110%'}} className="background-image" src={Section8}/>
        <div className='text-overlay'>
            <a style={{textDecoration:'none', color:'white'}} href='https://www.google.com/maps/dir//Jl.+Boulevard+Bar.+Raya+No.38,+RT.18%2FRW.8,+Klp.+Gading+Bar.,+Kec.+Klp.+Gading,+Jkt+Utara,+Daerah+Khusus+Ibukota+Jakarta+14240/@-6.1505892,106.8092237,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x2e69f541081bb971:0x11e13e124ce7f530!2m2!1d106.8916256!2d-6.1505955?entry=ttu'><h3><FontAwesomeIcon icon={faLocationPin}/> Our Flagship Store Jakarta</h3>
            <p style={
              {fontSize:'20px'}
            }>Jl. Boulevard Bar. Raya No.12, 
              RT.18/RW.19, Klp. Gading Bar., 
              Kec. Klp. Gading, Jkt Utara, 
              Daerah Khusus Ibukota Jakarta 
              14240</p></a>
        </div>
      </div>
    )
  }
}
