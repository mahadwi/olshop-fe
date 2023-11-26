import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './searchComponent.css'
import { faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';

export default class searchComponent extends Component {
  render() {
    const banyakProduct = this.props.banyakProduct; 
    const placeholder = banyakProduct || 'Results';
    const handleHideFilter = this.props.handleHideFilter
    const handleNewArrivalProd = this.props.handleNewArrivalProd
    const handlePriceLowToHigh = this.props.handlePriceLowToHigh
    const handleLowToHigh = this.props.handleLowToHigh
    const handleAtoZ = this.props.handleAtoZ
    const handleZtoA = this.props.handleZtoA
    const handleConditionNew = this.props.handleConditionNew
    const handleConditionLikeNew = this.props.handleConditionLikeNew
    const windowWidth = this.props.windowWidth
    const hideFilter = this.props.hideFilter
    return (
        <>
        {windowWidth > 900 ? (
        <div className='searchComponent'>
       <InputGroup className="mb-3">
        <Button variant='light' onClick={handleHideFilter} className='w-30'>Hide Filter</Button>
        <Form.Control className='w-50' placeholder={`${banyakProduct} Results`||'0 Results'} disabled aria-label="Text input with dropdown button" />
        <DropdownButton
          variant="outline-secondary"
          title="Relevance"
          id="input-group-dropdown-2"
          align="end"
        >
          <Dropdown.Item href="#"><b>Relevance</b></Dropdown.Item>
          <Dropdown.Divider/>
          <Dropdown.Item onClick={handleNewArrivalProd}>New Arrival</Dropdown.Item>
          <Dropdown.Item onClick={handlePriceLowToHigh}>Price, low to high</Dropdown.Item>
          <Dropdown.Item onClick={handleLowToHigh}>Price, hight to low</Dropdown.Item>
          <Dropdown.Item onClick={handleAtoZ}>Alphabetical, A - Z</Dropdown.Item>
          <Dropdown.Item onClick={handleZtoA}>Alphabetical, Z - A</Dropdown.Item>
          <Dropdown.Item onClick={handleConditionNew}>New</Dropdown.Item>
          <Dropdown.Item onClick={handleConditionLikeNew}>Like New</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      </div>
      ):(
        <div style={{maxWidth:'95%', height:'50%', marginTop:'10px'}}>
       <InputGroup className="mb-3">
        <Button variant='light' style={{fontSize:'10px'}} onClick={handleHideFilter} className='w-10'>Filter</Button>
        <Form.Control className='w-10' style={{fontSize:'10px'}} placeholder={`${banyakProduct} Results`||'0 Results'} disabled aria-label="Text input with dropdown button" />
        <Button variant='light' style={{fontSize:'10px'}} className='w-10'>Relevance</Button>
      </InputGroup>
      </div>
      )}
      </>
    )
  }
}
