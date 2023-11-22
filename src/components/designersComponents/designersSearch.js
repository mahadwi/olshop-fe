import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './designersSearch.css'

export default class designersSearch extends Component {
  render() {
    const banyakProduct = this.props.banyakProduct;
    const categories = this.props.categories
    const handleFilterCategory = this.props.handleFilterCategory
    const handleNonFilter = this.props.handleNonFilter
    const handleNewArrivalProd = this.props.handleNewArrivalProd
    const handlePriceLowToHigh = this.props.handlePriceLowToHigh
    const handleLowToHigh = this.props.handleLowToHigh
    const handleAtoZ = this.props.handleAtoZ
    const handleZtoA = this.props.handleZtoA
    const handleConditionNew = this.props.handleConditionNew
    const handleConditionLikeNew = this.props.handleConditionLikeNew
    return (
      <div className='designerSearch'>
         <InputGroup className="mb-3">
         <Form.Control placeholder='Search' aria-label="Text input with dropdown button"/>
         <Form.Control className='w-50' placeholder={`${banyakProduct} Results`||'0 Results'} disabled aria-label="Text input with dropdown button" />
         <DropdownButton
          variant="outline-secondary"
          title="Filter by categories"
          id="input-group-dropdown-2"
          align="end"
        >
          <Dropdown.Item onClick={handleNonFilter}>ALL</Dropdown.Item>
          {categories.map((data,index)=>{return(
          <Dropdown.Item key={index} onClick={()=> handleFilterCategory(data.id) }>{data.name}</Dropdown.Item>
        )})}
        </DropdownButton>
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
    )
  }
}
