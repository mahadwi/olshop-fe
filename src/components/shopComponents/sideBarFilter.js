import React, { Component } from 'react'
import SidebarMenu, { SidebarMenuBody } from 'react-bootstrap-sidebar-menu'
import { Form } from 'react-bootstrap'
import './sideBarFilter.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import RangeSlider from 'react-bootstrap-range-slider'
import ReactSlider from 'react-slider'
import { Input } from 'reactstrap'
import { InputGroup } from 'react-bootstrap'
import axios from 'axios'
import { GetBrand } from '../../config/api'

export default class sideBarFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value : 0,
            min : 0,
            max : 0,
            brand : []
        }
      }

      async componentDidMount() {
        try {
          const response = await axios.get(GetBrand)
          this.setState({brand:response.data.data})
        } catch (error) {
          console.log(error)
        }
       }


  render() {
    const { value, brand } = this.state;
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      });
    console.log('data brand : ',JSON.stringify(brand))  
    return (
    <>
     <div className='sideBarFilter'>      
      <SidebarMenu>
        <SidebarMenuBody>
        <div><hr style={{width:'110%'}}/></div>
        <div><b>Brand</b></div>
        {brand.map((data,index)=>{
            return(
            <div key={index}>
            <div className='sidebarItem'><Form.Check aria-label="option 1" label={data.name}/></div>
            </div>
            )
          })}
        <div style={{fontSize:"13px", marginLeft:"70%"}}><a style={{textDecoration:"none", color:"rgba(21, 27, 79, 1)"}} href='#'>More <FontAwesomeIcon icon={faArrowRight} /></a></div>
        </SidebarMenuBody>
      </SidebarMenu>
      </div>
      <div className='sideBarFilter'>      
      <SidebarMenu>
        <SidebarMenuBody>
        <div><hr style={{width:'110%'}}/></div>
        <div><b>Categories</b></div>
            <div className='sidebarItem'><Form.Check aria-label="option 1" label="Sling Bag"/></div>
            <div className='sidebarItem'><Form.Check aria-label="option 1" label="Mini Bag"/></div>
            <div className='sidebarItem'><Form.Check aria-label="option 1" label="Hand Bag"/></div>
            <div className='sidebarItem'><Form.Check aria-label="option 1" label="Tote Bag"/></div>
            <div className='sidebarItem'><Form.Check aria-label="option 1" label="Backpack"/></div>
        <div style={{fontSize:"13px", marginLeft:"70%"}}><a style={{textDecoration:"none", color:"rgba(21, 27, 79, 1)"}} href='#'>More <FontAwesomeIcon icon={faArrowRight} /></a></div>
        </SidebarMenuBody>
      </SidebarMenu>
      <SidebarMenu>
        <SidebarMenuBody>
        <div><hr style={{width:'110%'}}/></div>
        <div><b>Price</b></div>
        <div style={{width:'110%'}}>
          <RangeSlider
            value={value}
            onChange={e => this.setState({value : e.target.value})}
            min={1000000}
            max={100000000}
          />
        </div>
        <InputGroup style={{width:'110%'}} className="mb-3">
        <Form.Control size='sm' placeholder={formatter.format(value)}/>
        <div style={{margin:'3%'}}>━</div>
        <Form.Control size='sm' placeholder={'Rp.100.000.000'} />
        </InputGroup>
        </SidebarMenuBody>
      </SidebarMenu>
      </div>
     </>
    )
  }
}
