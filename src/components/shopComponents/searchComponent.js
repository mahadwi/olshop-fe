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
    return (
        <>
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
      </>
    )
  }
}
