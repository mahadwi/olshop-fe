import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './designersSearch.css'

export default class designersSearch extends Component {
  render() {
    const placeholder = "Results"
    const categories = this.props.categories
    const handleFilterCategory = this.props.handleFilterCategory
    const handleNonFilter = this.props.handleNonFilter
    return (
      <div className='designerSearch'>
         <InputGroup className="mb-3">
         <Form.Control placeholder='Search' aria-label="Text input with dropdown button"/>
         <Form.Control className='w-50' placeholder={placeholder} disabled aria-label="Text input with dropdown button" />
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
          <Dropdown.Item href="#">New Arrival</Dropdown.Item>
          <Dropdown.Item href="#">Price, low to high</Dropdown.Item>
          <Dropdown.Item href="#">Price, hight to low</Dropdown.Item>
          <Dropdown.Item href="#">Alphabetical, A - Z</Dropdown.Item>
          <Dropdown.Item href="#">Alphabetical, Z - A</Dropdown.Item>
          <Dropdown.Item href="#">New</Dropdown.Item>
          <Dropdown.Item href="#">Like New</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      </div>
    )
  }
}
